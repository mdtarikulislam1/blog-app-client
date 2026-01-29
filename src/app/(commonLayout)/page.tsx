import BlogCard from "@/components/modules/homePage/blogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data } = await blogService.getBlogPosts(
    { isFeatured: false },
    { cache: "no-store" },
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  px-4 gap-6 my-7 max-w-[1700px] mx-auto">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
