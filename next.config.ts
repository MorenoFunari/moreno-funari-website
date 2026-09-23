import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/wa",
        destination:
          "https://wa.me/393793408630?text=Ciao%20Moreno%2C%20vorrei%20info%20sul%20percorso%20pilota",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/documents/un-passo-possibile-moreno-funari.pdf",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
