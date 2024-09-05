/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Define padrões remotos para carregamento de imagens. Neste caso, permite
   * que imagens sejam carregadas do domínio fakestoreapi.com usando o protocolo HTTPS.
   *
   * @type {import('next').ImageConfig}
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
