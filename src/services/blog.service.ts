import { env } from "@/env";

const api_url = env.API_URL;
export const blogService = {
  getBlogPosts: async function () {
    try {
      const res = await fetch(`${api_url}/posts`);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },
};
