/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ["tr", "en", "de"],
    defaultLocale: "tr",
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lotusabroad.net" }],
        destination: "https://www.lotusabroad.net/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const isLocal = !process.env.VERCEL && !process.env.VERCEL_ENV;
    const allowEval = isDev || isLocal;

    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      ...(allowEval ? ["'unsafe-eval'"] : []),
      "https://assets.calendly.com",
      "https://va.vercel-scripts.com",
    ].join(" ");

    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: https: https://*.supabase.co",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `script-src ${scriptSrc}`,
      "media-src 'self' blob: data: https://*.supabase.co",
      "frame-src https://calendly.com https://*.calendly.com https://www.google.com",
      "connect-src 'self' https://calendly.com https://*.calendly.com https://assets.calendly.com https://vitals.vercel-insights.com https://vitals.vercel-analytics.com https://*.supabase.co wss://*.supabase.co",
      "upgrade-insecure-requests",
    ]
      .join("; ")
      .trim();

    const securityHeaders = [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
      { key: "X-XSS-Protection", value: "0" },
      {
        key: "Permissions-Policy",
        value: [
          "accelerometer=()",
          "autoplay=()",
          "camera=()",
          "encrypted-media=()",
          "fullscreen=(self)",
          "geolocation=()",
          "gyroscope=()",
          "magnetometer=()",
          "microphone=()",
          "midi=()",
          "payment=()",
          "picture-in-picture=()",
          "usb=()",
        ].join(", "),
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
