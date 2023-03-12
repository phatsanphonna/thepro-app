import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const student = await prisma.student.create({
    data: {
      firstname: 'ภัทร์สรรพ์พร',
      lastname: 'นครานุรักษ์',
      guardianTelephoneNumber: '0968936153',
      telephoneNumber: '0968936153',
      nickname: 'ซัน',
      userAuthId: 'a646fee7-af0a-448a-9a36-5d6f4de25f35'
    }
  })

  console.log(student);
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
