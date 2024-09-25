import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const handleSecurityHeaders: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set(
    "Content-Security-Policy",
    "base-uri 'self'; child-src 'self'; connect-src 'self' ws://localhost:* https://vercel.live; img-src https: 'self' data:; font-src 'self' data:; form-action 'self'; frame-ancestors 'self'; frame-src 'self' https://www.youtube-nocookie.com https://vercel.live; manifest-src 'self'; media-src 'self' https: data:; object-src 'none'; style-src 'self' 'unsafe-inline'; default-src 'self'; script-src https://vercel.live 'unsafe-eval' 'self' 'unsafe-inline'; worker-src 'self';"
  );

  return response;
};

export const handle = sequence(handleSecurityHeaders);
