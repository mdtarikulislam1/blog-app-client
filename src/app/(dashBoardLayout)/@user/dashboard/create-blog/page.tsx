import { CreateBlogFormClient } from "@/components/modules/user/createBlog/createBlogFormClient";
import CreateBlogFormServer from "@/components/modules/user/createBlog/createBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import React from "react";

export default async function Page() {
  const { data } = await blogService.getBlogPosts({}, {});

  return (
    <div>
      {/* <CreateBlogFormServer /> */}
      <CreateBlogFormClient/>
      {data?.data?.map((item: BlogPost, index: number) => (
        <p key={index}>{item?.title}</p>
      ))}
    </div>
  );
}
