import type { NextApiRequest, NextApiResponse } from "next";

type StoryVideoResponse =
  | { ok: true; url: string; expiresIn: number }
  | { ok: false; error: string };

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
  if (!Number.isFinite(parsed)) return 60 * 60 * 24; // 24h
  return Math.min(Math.max(parsed, 60), 60 * 60 * 24 * 30); // 1m..30d
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

  const bucket = normalizeBucket(
    typeof req.query.bucket === "string"
      ? req.query.bucket
      : process.env.NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET ?? "videos",
  );
  const path = normalizePath(typeof req.query.path === "string" ? req.query.path : "");
  if (!path) return res.status(400).json({ ok: false, error: "Missing path." });

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return res.status(400).json({ ok: false, error: "Path must be a storage object path, not a URL." });
  }

  if (path.length > 240) {
    return res.status(400).json({ ok: false, error: "Path too long." });
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

    res.setHeader("Cache-Control", "private, max-age=60");
    return res.status(200).json({ ok: true, url: absoluteUrl, expiresIn });
  } catch {
    return res.status(502).json({ ok: false, error: "Could not reach Supabase." });
  }
}
