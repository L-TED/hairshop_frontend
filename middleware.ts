// 1. 인증/인가
// - /reservation, /my-reservations, /my-page 접근 시 쿠키 확인
// - 토큰 없으면 /login?redirect=/원래경로
// - 토큰 있으면 통과
// 2. 리다이렉트
// 3. 경로 재작성
// 4. 헤더 및 쿠키 수정
// 5. 매처 설정(Matcher Configuration)
/*
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. 인증 토큰 확인
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    // 2. 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. 헤더 수정 예시
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'hello')
  return response
}

// 4. 매처 설정 (로그인, 정적 파일 제외)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
*/
