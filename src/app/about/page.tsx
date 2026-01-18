import React from "react";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

 throw new Error("sdfsdf")
  return <div>Page</div>;
}
