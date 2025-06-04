import { getServerSession } from 'next-auth'

export async function getCurrentUser() {
  const session = await getServerSession()
  return session?.user ?? null
}

export async function getCurrentUserId() {
  const user = await getCurrentUser()
  return user?.email ?? null
}
