import { prisma } from "@/lib/prisma";
import ConfettiName from "./confetti-name";

// Read from the database at request time, not at build time. This keeps Vercel
// from trying to reach the database during the build and ensures fresh data.
export const dynamic = "force-dynamic";

export default async function Home() {
  const message = await prisma.message.findFirst({
    orderBy: { id: "asc" },
  });

  const text = message?.text ?? "No message found";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ConfettiName text={text} />
    </main>
  );
}
