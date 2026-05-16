import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Personal' },
      update: {},
      create: {
        name: 'Personal',
        color: '#6366f1',
        icon: '👤',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Work' },
      update: {},
      create: {
        name: 'Work',
        color: '#8b5cf6',
        icon: '💼',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Ideas' },
      update: {},
      create: {
        name: 'Ideas',
        color: '#ec4899',
        icon: '💡',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Projects' },
      update: {},
      create: {
        name: 'Projects',
        color: '#10b981',
        icon: '🚀',
      },
    }),
  ])

  console.log('✅ Created categories:', categories.length)

  // Create default tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'important' },
      update: {},
      create: {
        name: 'important',
        color: '#ef4444',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'todo' },
      update: {},
      create: {
        name: 'todo',
        color: '#f59e0b',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'meeting' },
      update: {},
      create: {
        name: 'meeting',
        color: '#3b82f6',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'research' },
      update: {},
      create: {
        name: 'research',
        color: '#8b5cf6',
      },
    }),
  ])

  console.log('✅ Created tags:', tags.length)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
