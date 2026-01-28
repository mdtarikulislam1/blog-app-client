"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<{message:string} | null>(null);

  useEffect(() => {
    (async () => {
      const {data,error} = await getBlogs()
      setData(data)
      setError(error)
    })();
  }, []);
  console.log(data)
  return <div>Page</div>;
}
