import { prisma } from "@/lib/prisma";

// Read from the database at request time, not at build time. This keeps Vercel
// from trying to reach the database during the build and ensures fresh data.
export const dynamic = "force-dynamic";

export default async function Home() {
  const message = await prisma.message.findFirst({
    orderBy: { id: "asc" },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold tracking-tight">
        {message?.text ?? "No message found"}
      </h1>
    </main>
  );
}
