import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The single message the app displays. Change this value to change the page.
const DESIRED_TEXT = "Lamine Yamal";

async function main() {
  const first = await prisma.message.findFirst({ orderBy: { id: "asc" } });

  if (!first) {
    const created = await prisma.message.create({ data: { text: DESIRED_TEXT } });
    console.log(`Seeded message: "${created.text}"`);
  } else if (first.text !== DESIRED_TEXT) {
    const updated = await prisma.message.update({
      where: { id: first.id },
      data: { text: DESIRED_TEXT },
    });
    console.log(`Updated message ${updated.id} to "${updated.text}"`);
  } else {
    console.log(`Message already "${DESIRED_TEXT}"; nothing to do.`);
  }
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
