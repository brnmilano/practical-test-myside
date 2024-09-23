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
  /**
   * Garante que os source maps sejam gerados para os arquivos JavaScript,
   * o que pode ser útil para depuração de problemas no ambiente de produção,
   * como aqueles relatados pelo Lighthouse.
   */
  productionBrowserSourceMaps: true,

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
