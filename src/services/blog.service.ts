import { env } from "@/env";
import { BlogPost } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?:string;
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["blogPosts"] };

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      // This is an example
      //   if(data.success) {
      //     return
      //   }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();
      return { data: data, err: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  createBlogPost: async (blogData: BlogPost) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/posts`, {
        method: "Post",
        headers: {
          "Content-type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: data.error || "Post created faild" },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong", details: err },
      };
    }
  },
};
