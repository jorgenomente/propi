import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Propi',
    short_name: 'Propi',
    description: 'Registro personal de propinas con Supabase y Next.js.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f5f7',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/propi-logo.png',
        sizes: '862x840',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
