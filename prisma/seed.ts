import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Idempotent: only seed when the table is empty so re-runs don't duplicate.
  const count = await prisma.message.count();
  if (count > 0) {
    console.log(`Skipped seeding; ${count} message(s) already exist.`);
    return;
  }

  const message = await prisma.message.create({
    data: { text: "Lionel Messi" },
  });
  console.log(`Seeded message: "${message.text}"`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
