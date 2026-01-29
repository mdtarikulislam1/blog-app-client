"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  meta: {
    limit: number;
    page: number;
    totalData: number;
    totalPage: number;
  };
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
  const { limit: pageSize, page: currentPage, totalData, totalPage } = meta;
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalData);

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {start} to {end} of {totalData} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => navigateToPage(1)}
          variant="outline"
          size="icon"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => navigateToPage(currentPage - 1)}
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPage}
          </span>
        </div>

        <Button
          onClick={() => navigateToPage(currentPage + 1)}
          variant="outline"
          size="icon"
          disabled={currentPage === totalPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          disabled={currentPage === totalPage}
          onClick={() => navigateToPage(totalPage)}
          variant="outline"
          size="icon"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
