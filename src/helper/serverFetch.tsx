import { cookies } from "next/headers";
import { env } from "@/env";
import { redirect } from "next/navigation";
import { logout } from "./logout";
import { authClient } from "@/lib/auth-client";

export const serverFetch = async (
  path: string,
  options: {
    method?: string;
    body?: any;
    auth?: boolean;
    headers?: HeadersInit;
  } = {},
) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.auth && {
        Cookie: cookieStore.toString(),
      }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // 🔥 GLOBAL INTERCEPTOR
  if (res.status === 401 || res.status === 403) {
    await authClient.signOut();
    redirect("/login");
  }

  return res;
};
