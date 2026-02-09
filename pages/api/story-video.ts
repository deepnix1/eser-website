import type { NextApiRequest, NextApiResponse } from "next";

type StoryVideoResponse =
  | { ok: true; url: string; expiresIn: number }
  | { ok: false; error: string };

const DEFAULT_BUCKET = (process.env.NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET ?? "videos")
  .trim()
  .replace(/^\/+|\/+$/g, "");

const DEFAULT_ALLOWED_PATHS = [
  "kerem.mov",
  "ibrahim.mov",
  "zeynep.mov",
  "WhatsApp Video 2026-02-09 at 3.17.01 PM.mp4",
] as const;

function encodePathSegment(segment: string) {
  return encodeURIComponent(segment).replace(/[!'()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function normalizeBucket(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, "");
}

function normalizePath(value: string) {
  return value.trim().replace(/^\/+/, "");
}

function applyLegacyAliases(path: string) {
  // Backward-compatible aliases for previously shipped object names.
  // Keeps production working even if old env vars still point to legacy filenames.
  if (path === "IMG_6266 (1).mov") return "ibrahim.mov";
  return path;
}

function isUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

function loadAllowedPaths(): Set<string> {
  const allow = new Set<string>(DEFAULT_ALLOWED_PATHS);

  const fromEnvList = (process.env.STORY_VIDEO_ALLOWED_PATHS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const item of fromEnvList) {
    const normalized = applyLegacyAliases(normalizePath(item));
    if (!normalized || isUrl(normalized)) continue;
    allow.add(normalized);
  }

  const envCandidates = [
    process.env.NEXT_PUBLIC_STORY_VIDEO_SARAH,
    process.env.NEXT_PUBLIC_STORY_VIDEO_AHMET,
    process.env.NEXT_PUBLIC_STORY_VIDEO_ELENA,
    process.env.NEXT_PUBLIC_STORY_VIDEO_JOHN,
  ];
  for (const candidate of envCandidates) {
    const raw = (candidate ?? "").trim();
    if (!raw || isUrl(raw)) continue;
    allow.add(applyLegacyAliases(normalizePath(raw)));
  }

  return allow;
}

function getSupabaseBaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    "https://balauszpznhuceqbgubs.supabase.co";
  return url.replace(/\/+$/, "");
}

function getServiceRoleKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    ""
  ).trim();
}

function getExpiresInSeconds(value: string | undefined) {
  const parsed = value ? Number.parseInt(value, 10) : NaN;
  // Keep URLs short-lived to reduce replay/hotlinking risk.
  const max = 60 * 15; // 15m
  if (!Number.isFinite(parsed)) return max;
  return Math.min(Math.max(parsed, 60), max); // 1m..15m
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoryVideoResponse>,
) {
  // Best-effort rate limit to reduce abuse of the signing endpoint.
  // Note: In serverless environments this state may reset between invocations.
  const rl = ((globalThis as any).__lotusStoryVideoRateLimit ??= {
    hits: new Map<string, { count: number; resetAt: number }>(),
  }) as { hits: Map<string, { count: number; resetAt: number }> };
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const maxHits = 60;
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip =
    (typeof forwardedFor === "string" ? forwardedFor.split(",")[0]?.trim() : "") ||
    (req.socket as any)?.remoteAddress ||
    "unknown";
  const hit = rl.hits.get(ip);
  if (!hit || hit.resetAt <= now) {
    rl.hits.set(ip, { count: 1, resetAt: now + windowMs });
  } else {
    hit.count += 1;
    if (hit.count > maxHits) {
      res.setHeader("Retry-After", String(Math.ceil((hit.resetAt - now) / 1000)));
      return res.status(429).json({ ok: false, error: "Too many requests." });
    }
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const supabaseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) {
    return res
      .status(501)
      .json({ ok: false, error: "Signing is not configured (missing SUPABASE_SERVICE_ROLE_KEY)." });
  }

  // Do not allow arbitrary buckets to be signed with the service key.
  const bucketQuery = typeof req.query.bucket === "string" ? req.query.bucket : "";
  const bucket = DEFAULT_BUCKET || "videos";
  if (bucketQuery && normalizeBucket(bucketQuery) !== bucket) {
    return res.status(403).json({ ok: false, error: "Bucket not allowed." });
  }

  const path = applyLegacyAliases(
    normalizePath(typeof req.query.path === "string" ? req.query.path : ""),
  );
  if (!path) return res.status(400).json({ ok: false, error: "Missing path." });

  if (isUrl(path)) {
    return res.status(400).json({ ok: false, error: "Path must be a storage object path, not a URL." });
  }

  if (path.length > 240) {
    return res.status(400).json({ ok: false, error: "Path too long." });
  }

  const allowed = loadAllowedPaths();
  if (!allowed.has(path)) {
    return res.status(403).json({ ok: false, error: "Path not allowed." });
  }

  const expiresIn = getExpiresInSeconds(
    typeof req.query.expiresIn === "string" ? req.query.expiresIn : undefined,
  );

  const encodedPath = path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodePathSegment(segment))
    .join("/");

  const endpoint = `${supabaseUrl}/storage/v1/object/sign/${encodePathSegment(bucket)}/${encodedPath}`;

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn }),
    });

    const json = (await resp.json().catch(() => null)) as any;
    const signedUrl = (json?.signedURL ?? json?.signedUrl ?? json?.signed_url ?? "").toString();

    if (!resp.ok || !signedUrl) {
      const errorMessage =
        typeof json?.message === "string"
          ? json.message
          : typeof json?.error === "string"
            ? json.error
            : "Could not create signed URL.";
      return res.status(502).json({ ok: false, error: `${errorMessage} (${resp.status})` });
    }

    const absoluteUrl =
      signedUrl.startsWith("http://") || signedUrl.startsWith("https://")
        ? signedUrl
        : signedUrl.startsWith("/storage/v1/")
          ? `${supabaseUrl}${signedUrl}`
          : signedUrl.startsWith("/object/")
            ? `${supabaseUrl}/storage/v1${signedUrl}`
            : signedUrl.startsWith("/")
              ? `${supabaseUrl}${signedUrl}`
              : `${supabaseUrl}/${signedUrl}`;

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ ok: true, url: absoluteUrl, expiresIn });
  } catch {
    return res.status(502).json({ ok: false, error: "Could not reach Supabase." });
  }
}
