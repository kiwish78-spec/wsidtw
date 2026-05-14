import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'wsidtw-super-secret-key-change-in-production'
)

export const ADMIN_COOKIE = 'wsidtw_admin_token'

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET)
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export function checkAdminCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME || 'admin'
  const adminPass = process.env.ADMIN_PASSWORD || 'wsidtw2026'
  return username === adminUser && password === adminPass
}

export async function getAdminFromCookies(): Promise<boolean> {
  const cookieStore = cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  if (!token) return false
  return verifyAdminToken(token)
}
