import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

const api_url = env.API_URL
export default function CreateBlogFormServer() {

  const createBlog = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const thumbnail = formData.get("thumbnail") as string
    const tags = formData.get("tags") as string
    const blogData = {
        title,
        content,
        thumbnail,
        tags:tags.split(",").map(item =>item.trim()).filter(item => item !== "")
    }
    const cookieStore = await cookies()
    const res = await fetch(`${api_url}/posts`,{
        method:"Post",
        headers:{
            "Content-type":"application/json",
            Cookie:cookieStore.toString()
        },
        body:JSON.stringify(blogData)
    })
     if(res.ok){
      revalidateTag("blogPosts","max")
     }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
          <CardDescription>You can write your blog here</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createBlog} id="blog-form">
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input type="text" name="title"  placeholder="Blog title"/>
              </Field>
              <Field>
                <FieldLabel>Thumbnail (image url)</FieldLabel>
                <Input type="url" name="thumbnail"  placeholder="Blog image url" />
              </Field>
              <Field>
                <FieldLabel>Tags (comma separated)</FieldLabel>
                <Input type="text" name="tags" placeholder="js, react, next js" />
              </Field>
              <Field>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  id="content"
                  placeholder="Write something..."
                  name="content"
                  required
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end items-end w-full">
          <Button form="blog-form" type="submit">
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
