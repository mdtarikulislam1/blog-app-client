import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  console.log(isAdmin);

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("admin-dashboard", request.url));
  }
  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log("ata tumi janona", pathName);
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin-dashboard","/admin-dashboard/:path"],
};
