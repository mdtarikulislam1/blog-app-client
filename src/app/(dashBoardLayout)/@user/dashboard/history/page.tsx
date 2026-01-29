import HistoryTable from "@/components/modules/user/history/historyTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaginationControls from "@/components/ui/PaginationControls";
import { blogService } from "@/services/blog.service";
import React from "react";

export default async function page({searchParams}:{searchParams:Promise<{page:string}>}) {
  const {page} = await searchParams
  const { data } = (await blogService.getBlogPosts({page})) || [];

const pagination = data?.pagination || {
  limit: 10,
  page:1,
  total:0,
  totalPage:1,
}

  console.log(data)

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Blog Post History</CardTitle>
          <CardDescription>
            View all your previously published blog posts along with their
            status, publication date, and quick access to edit or manage them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HistoryTable posts={data.data}/>
          <PaginationControls meta={pagination}/>
        </CardContent>
      </Card>
    </div>
  );
}
