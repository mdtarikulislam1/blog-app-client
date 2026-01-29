import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTimeAgo } from "@/helper/ui/getTimeAgo";
import { BlogPost } from "@/types";

export default function HistoryTable({ posts }: { posts: BlogPost[] }) {
  console.log("table", posts);
  return (
    <div className="border rounded-sm">
      <Table className="w-full overflow-auto ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Total views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                {item?.createdAt.split("T")[0]} {getTimeAgo(item?.createdAt)}
              </TableCell>
              <TableCell>{item?.title}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.tags && item.tags.length > 0 ? (
                    item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No tags
                    </span>
                  )}
                </div>
              </TableCell>

              <TableCell>{item?.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
