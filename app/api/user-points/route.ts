import { NextRequest, NextResponse } from 'next/server';
import { getUserPoints, updateUserPoints } from '@/utils/db/actions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  const points = await getUserPoints(userId);
  return NextResponse.json({ points });
}

export async function POST(req: NextRequest) {
  const { userId, points } = await req.json();
  if (!userId || typeof points !== 'number') return NextResponse.json({ error: 'Missing userId or points' }, { status: 400 });
  const updated = await updateUserPoints(userId, points);
  return NextResponse.json({ updated });
}
