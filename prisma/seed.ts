import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const data = await prisma.file.create({
    data: {
      name: 'Sample Video',
      type: 'VIDEO',
      location: 'videos/sample_video.mp4'
    }
  })

  console.log(data);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
