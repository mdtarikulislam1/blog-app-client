import { blogService } from "@/services/blog.service";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock,
  User,
  ArrowLeft,
  MessageSquare,
  Send,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CommentType } from "@/types/comment.type";
import { BlogPost } from "@/types";

export const dynamicParams = false

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();
  return data?.data?.map((blog: BlogPost) => ({ id: blog?.id })).splice(0,3);
}


export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await blogService.getBlogById(id);
  const blog = data.result;


  return (
    <div className="min-h-screen bg-background pb-20">
      <article className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all blogs
        </Link>

        {/* Header Section */}
        <header className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize px-3 py-1">
              {blog.status.toLowerCase()}
            </Badge>
            {blog.isFeatured && (
              <Badge
                variant="default"
                className="bg-amber-500 hover:bg-amber-600 px-3 py-1 text-white"
              >
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-balance">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className="bg-primary/5">
                  <User className="h-5 w-5 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-foreground text-xs uppercase tracking-wider">
                  Author
                </span>
                <span className="text-[10px]">
                  {blog.authorId.slice(0, 12)}...
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {blog.views} views
            </div>
          </div>
        </header>

        <Separator className="my-10" />

        {/* Hero Image */}
        <div className="aspect-video mb-12 overflow-hidden rounded-2xl border bg-muted flex items-center justify-center shadow-inner">
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground/50 italic text-center px-4">
              <div className="h-12 w-12 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-2">
                <Clock className="h-6 w-6" />
              </div>
              No cover image uploaded
            </div>
          )}
        </div>

        {/* Blog Content Section */}
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {blog?.content}
          </p>
        </div>

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {blog?.tags?.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="my-16" />

        {/* --- Comments Section --- */}
        <section id="comments" className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Comments</h2>
              <Badge
                variant="secondary"
                className="ml-2 rounded-full h-6 min-w-6 flex items-center justify-center"
              >
                {blog?._count?.comments}
              </Badge>
            </div>
          </div>

          {/* Comment Input Box */}
          <div className="p-4 rounded-xl border bg-card/50 ring-1 ring-border shadow-sm">
            <textarea
              className="w-full min-h-[100px] bg-transparent rounded-lg p-2 text-sm focus:outline-none resize-none"
              placeholder="What's on your mind? Share your thoughts..."
            />
            <div className="flex justify-end pt-3 border-t mt-3">
              <Button size="sm" className="gap-2">
                <Send className="h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>

          {/* Comments List */}
          {blog.comments && blog.comments.length > 0 ? (
            <div className="space-y-4">
              {blog.comments.map((comment: CommentType) => (
                <Card
                  key={comment.id}
                  className="border bg-card shadow-sm overflow-hidden"
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      {/* <Avatar className="h-10 w-10 shrink-0 border">
                        <AvatarImage src={comment?.userImage} />
                        <AvatarFallback className="bg-muted text-xs uppercase font-bold">
                          {comment?.userName?.slice(0, 2) || "AN"}
                        </AvatarFallback>
                      </Avatar> */}
                      <div className="space-y-1">
                        {/* <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{comment?.userName || "User"}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">
                            {format(new Date(comment?.createdAt), "MMM dd")}
                          </span>
                        </div> */}
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {comment?.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
              <div className="bg-background h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MessageSquare className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <h3 className="text-sm font-medium">No comments yet</h3>
              <p className="text-xs text-muted-foreground mt-1 px-10">
                Start the conversation by being the first to comment on this
                article.
              </p>
            </div>
          )}
        </section>

        {/* Footer info */}
        <footer className="mt-20 pt-8 border-t">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-center">
            Last Updated: {format(new Date(blog.updatedAt), "PPP")}
          </p>
        </footer>
      </article>
    </div>
  );
}
