├── app/
│ ├── (public)/ # 비로그인 접근 가능
│ │ ├── layout.tsx # 공통 레이아웃 (헤더, 푸터)
│ │ ├── page.tsx # 홈페이지
│ │ ├── login/
│ │ │ └── page.tsx # 로그인 페이지
│ │ ├── signup/
│ │ │ └── page.tsx # 회원가입 페이지
│ │ ├── stores/
│ │ │ ├── page.tsx # 매장 목록
│ │ │ └── [id]/
│ │ │ └── page.tsx # 매장 상세 (디자이너 목록)
│ │ └── news/
│ │ ├── page.tsx # 소식 목록
│ │ └── [id]/
│ │ └── page.tsx # 소식 상세
│ │
│ ├── (protected)/ # 로그인 필수
│ ├── layout.tsx # 인증 체크 레이아웃
│ ├── reservation/
│ │ ├── page.tsx # 예약 생성 - Step 1: 매장/디자이너 선택
│ │ ├── schedule/
│ │ │ └── page.tsx # Step 2: 날짜/시간 선택
│ │ └── confirm/
│ │ └── page.tsx # Step 3: 예약 확인
│ ├── my-reservations/
│ │ ├── page.tsx # 내 예약 목록
│ │ └── [id]/
│ │ ├── page.tsx # 예약 상세
│ │ └── edit/
│ │ └── page.tsx # 예약 변경
│ └── my-page/
└──── page.tsx # 마이페이지 (비밀번호 변경)
