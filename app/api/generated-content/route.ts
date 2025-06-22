import { NextRequest, NextResponse } from 'next/server';
import { saveGeneratedContent, getGeneratedContentHistory } from '@/utils/db/actions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  const history = await getGeneratedContentHistory(userId);
  return NextResponse.json({ history });
}

export async function POST(req: NextRequest) {
  const { userId, content, prompt, contentType } = await req.json();
  if (!userId || !content || !prompt || !contentType) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const saved = await saveGeneratedContent(userId, content, prompt, contentType);
  return NextResponse.json({ saved });
}
