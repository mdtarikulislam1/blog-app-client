

export const dynamic = "force-dynamic"

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return <div>Page</div>;
}
