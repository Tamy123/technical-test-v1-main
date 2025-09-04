import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
export const AUTH_COOKIE_NAME = "auth-token";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  karma: number;
}

export interface SessionData {
  user: User;
  iat: number;
  exp: number;
}

export function createToken(user: User): string {
  return jwt.sign(
    { user },
    JWT_SECRET,
    { expiresIn: "7d" } // Token expires in 7 days
  );
}

export function verifyToken(token: string): SessionData | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionData;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function setAuthCookie(user: User) {
  const token = createToken(user);
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function getSessionUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const sessionData = verifyToken(token);
    return sessionData?.user || null;
  } catch (error) {
    console.error("Error getting session user:", error);
    return null;
  }
}
