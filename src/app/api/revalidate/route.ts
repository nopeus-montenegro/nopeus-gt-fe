import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const tag = searchParams.get('tag');
  const path = searchParams.get('path');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret token' },
      { status: 401 },
    );
  }

  if (tag) {
    revalidateTag(tag, 'default');
    return NextResponse.json({
      revalidated: true,
      type: 'tag',
      target: tag,
      now: Date.now(),
    });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      type: 'path',
      target: path,
      now: Date.now(),
    });
  }

  return NextResponse.json(
    { message: 'Missing "tag" or "path" query parameter' },
    { status: 400 },
  );
}
