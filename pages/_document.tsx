import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from "next/document";

type Props = DocumentInitialProps & { locale?: string };

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  render() {
    const locale = this.props.locale ?? "tr";

    return (
      <Html className="light" lang={locale}>
        <Head>
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <meta content="#f9f506" name="theme-color" />

          <link href="/favicon.ico" rel="icon" sizes="any" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <link href="/favicon-48x48.png" rel="icon" sizes="48x48" type="image/png" />
          <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
          <link href="/favicon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          <link href="/favicon.svg" rel="icon" sizes="any" />
          <link href="/landing_page_logo.png" rel="apple-touch-icon" />

          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />

          <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              tailwind.config = {
                darkMode: "class",
                theme: {
                  extend: {
                    colors: {
                      "primary": "#f9f506",
                      "background-light": "#f8f8f5",
                      "background-dark": "#23220f",
                      "surface-light": "#ffffff",
                      "surface-dark": "#2c2b18",
                      "text-main": "#181811",
                      "text-muted": "#6b6b60",
                      "text-main-light": "#181811",
                      "text-main-dark": "#ffffff",
                      "text-sec-light": "#8c8b5f",
                      "text-sec-dark": "#a8a89a",
                      "border-light": "#e5e5e0",
                      "border-dark": "#3a3928",
                    },
                    fontFamily: {
                      "display": ["Spline Sans", "sans-serif"],
                      "sans": ["Spline Sans", "sans-serif"],
                      "body": ["Noto Sans", "sans-serif"]
                    },
                    borderRadius: {
                      "DEFAULT": "1rem",
                      "lg": "1.5rem",
                      "xl": "2rem",
                      "2xl": "3rem",
                      "full": "9999px"
                    },
                    animation: {
                      marquee: 'marquee 40s linear infinite',
                    },
                    keyframes: {
                      marquee: {
                        '0%': { transform: 'translateX(0%)' },
                        '100%': { transform: 'translateX(-100%)' },
                      }
                    }
                  },
                },
              }
            `,
            }}
            id="tailwind-config"
          />
          <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .lotus-logo .lotus-petal {
            transform-box: fill-box;
            transform-origin: center;
            transition: transform 950ms cubic-bezier(0.2, 0.9, 0.2, 1);
            will-change: transform;
          }

          .lotus-logo .lotus-petal--center {
            transition-delay: 0ms;
          }
          .lotus-logo .lotus-petal--leftMid,
          .lotus-logo .lotus-petal--rightMid {
            transition-delay: 120ms;
          }
          .lotus-logo .lotus-petal--leftOuter,
          .lotus-logo .lotus-petal--rightOuter {
            transition-delay: 240ms;
          }

          .lotus-logo__glow {
            pointer-events: none;
            position: absolute;
            inset: -10px;
            border-radius: 9999px;
            opacity: 0;
            transform: scale(0.75);
            background: radial-gradient(
              circle at center,
              rgba(249, 245, 6, 0.65) 0%,
              rgba(249, 245, 6, 0.24) 28%,
              rgba(249, 245, 6, 0.0) 64%
            );
            filter: blur(8px);
            transition: opacity 900ms ease, transform 900ms ease;
          }

          .lotus-logo--home:hover .lotus-logo__glow {
            opacity: 1;
            transform: scale(1.12);
            animation: lotusGlowPulse 1600ms ease-in-out infinite;
          }

          .lotus-logo--home:hover .lotus-logo__mark {
            filter: drop-shadow(0 0 10px rgba(249, 245, 6, 0.18));
          }

          .lotus-logo--home:hover .lotus-petal--center {
            transform: scale(1.04);
          }
          .lotus-logo--home:hover .lotus-petal--leftMid {
            transform: translate(-1.6px, -1.1px) rotate(-10deg);
          }
          .lotus-logo--home:hover .lotus-petal--rightMid {
            transform: translate(1.6px, -1.1px) rotate(10deg);
          }
          .lotus-logo--home:hover .lotus-petal--leftOuter {
            transform: translate(-2.2px, 0.6px) rotate(-16deg);
          }
          .lotus-logo--home:hover .lotus-petal--rightOuter {
            transform: translate(2.2px, 0.6px) rotate(16deg);
          }

          @keyframes lotusGlowPulse {
            0% {
              filter: blur(8px);
              opacity: 0.7;
              transform: scale(1.06);
            }
            50% {
              filter: blur(12px);
              opacity: 1;
              transform: scale(1.18);
            }
            100% {
              filter: blur(8px);
              opacity: 0.7;
              transform: scale(1.06);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .lotus-logo .lotus-petal {
              transition: none !important;
            }
            .lotus-logo__glow {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>
        </Head>
        <body className="font-display bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-300 overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
