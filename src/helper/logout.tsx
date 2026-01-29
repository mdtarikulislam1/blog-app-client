import { authClient } from "@/lib/auth-client";


export const logout = async () => {
  await authClient.signOut();
};
