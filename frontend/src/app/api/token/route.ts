import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 쿠키 파싱 (Next.js는 req.headers.get으로 헤더 접근)
  const accessToken = req.cookies.get('accessToken');

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  return NextResponse.json(
    { accessToken: accessToken?.value },
    { status: 200 },
  );
}
