import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateUser } from '@/utils/db/actions';

export async function POST(req: NextRequest) {
  const { clerkUserId, email, name } = await req.json();
  if (!clerkUserId || !email || !name) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const updated = await createOrUpdateUser(clerkUserId, email, name);
  return NextResponse.json({ updated });
}
