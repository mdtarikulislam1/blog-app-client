"use server"

import { blogService } from "@/services/blog.service"
import { BlogPost } from "@/types";
import { updateTag } from "next/cache";

export const getBlogs = async ()=>{
    return await blogService.getBlogPosts();
}

export const createBlogPost = async (data:BlogPost)=>{
    const res = await blogService.createBlogPost(data)
    updateTag("blogPosts")
    return  res
}

