// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { supabase } from "./app/supabase";

// export async function middleware(req: NextRequest) {
//   console.log("Middleware executed for:", req.nextUrl.pathname);
//   const token = req.cookies.get("sb-access-token")?.value;
//   if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }
//   const { data, error } = await supabase.auth.getUser(token);

//   if (!error || !data.user) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/dashboard/:path*",
// };
