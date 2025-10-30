// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = [/^\/messages($|\/)/, /^\/api\/messages($|\/)/];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPath = PROTECTED_PATHS.some((re) => re.test(pathname));
  if (!protectedPath) return NextResponse.next();

  const auth = req.headers.get("authorization");
  const user = process.env.ADMIN_USER || "admin";
  const pass = process.env.ADMIN_PASS || "password";

  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
    });
  }

  const [u, p] = Buffer.from(auth.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (u === user && p === pass) return NextResponse.next();

  return new NextResponse("Unauthorized", { status: 401 });
}

export const config = {
  matcher: ["/messages/:path*", "/api/messages/:path*"],
};
