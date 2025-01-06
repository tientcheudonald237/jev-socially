import { prisma } from "@/lib/prisma";

export default async function Home() {
  // await prisma.p
  return (
    <div className='m-4'>
      <h1>Home page</h1>
    </div>
  );
}
