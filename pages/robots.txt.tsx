import type { GetServerSideProps } from "next";

function getBaseUrl(req: Parameters<GetServerSideProps>[0]["req"]) {
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const hostValue = Array.isArray(host) ? host[0] : host;
  const protoValue = Array.isArray(proto) ? proto[0] : proto;
  if (!hostValue) return "https://www.lotusabroad.net";
  return `${protoValue}://${hostValue}`;
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const baseUrl = getBaseUrl(req);
  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(content);
  res.end();
  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}

