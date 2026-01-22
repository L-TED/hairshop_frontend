# 프로젝트 총기획

### 프론트엔드 파일 구조

shop_front/
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
│ │ │ └── page.tsx # 매장 상세
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
│ └── page.tsx # 마이페이지 (비밀번호 변경)
│
├── components/ ⭕
│ ├── auth/
│ │ ├── LoginForm.tsx # 로그인 폼 (username, password input + 제출)
│ │ ├── SignupForm.tsx # 회원가입 폼
│ │ └── ProtectedRoute.tsx # 인증 체크 래퍼
│ │
│ ├── reservation/
│ │ ├── StaffSelector.tsx # 디자이너 선택 카드 리스트
│ │ ├── ServiceSelector.tsx # 시술 선택 드롭다운
│ │ ├── DatePicker.tsx # 날짜 선택 캘린더
│ │ ├── TimeSlotGrid.tsx # 30분 단위 시간 버튼 그리드
│ │ ├── ReservationCard.tsx # 예약 정보 카드
│ │ └── ReservationList.tsx # 예약 목록 테이블
│ │
│ ├── store/
│ │ └── StoreCard.tsx # 매장 카드 (지도 아이콘, 주소)
│ │
│ ├── news/
│ │ ├── NewsCard.tsx # 소식 썸네일 카드
│ │ └── NewsDetail.tsx # 소식 본문 뷰어
│ │
│ ├── layout/
│ │ ├── Header.tsx # 네비게이션 (로그인 상태별 메뉴)
│ │ ├── Footer.tsx # 푸터
│ │ └── Sidebar.tsx # 모바일 사이드바 메뉴
│ │
│ └── common/
│ ├── Button.tsx # 재사용 버튼
│ ├── Input.tsx # 재사용 인풋
│ ├── Modal.tsx # 모달 다이얼로그
│ ├── Loading.tsx # 로딩 스피너
│ └── ErrorBoundary.tsx # 에러 처리 ⭕
│
├── api/
│ └── services/
│ ├── authService.ts # 인증 관련 API 호출
│ ├── reservationService.ts # 예약 CRUD
│ ├── storeService.ts # 매장 조회
│ ├── staffService.ts # 디자이너 조회
│ ├── serviceService.ts # 시술 조회
│ └── newsService.ts # 소식 조회
│
├── lib/
│ ├── axios.ts # axios 인스턴스 (토큰 자동 주입)
│ ├── queryClient.ts # React Query 설정
│ └── constants.ts # 상수 (API_URL, 영업시간 등)
│
├── hooks/
│ ├── useAuth.ts # 로그인 상태, 로그아웃 훅
│ ├── useReservation.ts # 예약 생성/수정/삭제 훅
│ ├── useAvailability.ts # 예약 가능 시간 조회 훅
│ └── useRefreshToken.ts # 토큰 자동 갱신 훅
│
├── types/ ⭕
│ ├── auth.ts # Customer, LoginRequest, TokenResponse
│ ├── reservation.ts # Reservation, ReservationStatus
│ ├── store.ts # Store, Staff
│ ├── service.ts # Service
│ └── news.ts # NewsPost ⭕
│
├── utils/
│ ├── timeSlot.ts # 시간대 생성 (8:00-20:00, 12:00-13:00 제외)
│ ├── validation.ts # 폼 유효성 검사
│ └── date.ts # 날짜 포맷 변환 (ISO to KST)
│
├── styles/
│ └── globals.css # Tailwind + 전역 스타일
│
└── middleware.ts # Next.js 미들웨어 (인증 체크)

### Unavailable-functions(안할거임)

- 결제(필요X)
- 알림
- 실시간 웹소켓 서비스(필요X)
- 다국어
- 소셜 로그인
- 그 외 헤어숍 사이트에 비필수적인 기능들

### Reservation

- 헤어 디자이너 선택 => 예약 스케줄 카드 출력 => 30분 단위 시간 별로 버튼 존재 (네이버 예약처럼)
- 특정 담당자에게 n시 n분 예약 확정 => 해당 시간의 버튼 비활성화
- 영업, 점심 시간 고정 => 8시 - 20시 까지 점심 시간 12시 - 13시를 제외하고 30분 단위로 예약 가능
- 예약 취소, 변경 => 취소는 가능, 변경은 상태(status) 변경
- 임시 예약은 X

### Login/Signup (확정)

- 로그인과 회원가입은 아이디/비밀번호 항목 필요
- 아이디/비밀번호 찾기 기능은 시간상 일단 제외
- 방식은 쿠키 + JWT
- 비밀번호와 리프레시 토큰은 DB에 들어갈 때 hash&salt 처리(bcrypt)
- 인증 요구 => 기본적으로 모든 UI는 로그인 없이 공개.
  단, 예약과 관련된 기능들은 모두 로그인 필수(엑세스, 리프레시 토큰 필요)

### DB schemes

- **customers** { ⭕
  id(uuid pk/ 고객 id),
  username(varchar not null unique/ 로그인 시 사용하는 ID),
  hash_password(varchar not null/ 로그인 시 사용하는 PW, db에 넣을 때 hash화)
  }
- **staffs** { ⭕
  id(serial pk/ 직원(디자이너) id, 입사 순서대로),
  name(varchar not null/ 직원 이름)
  store_id (integer fk)
  }
- **stores** { ⭕
  id(serial pk/ 가맹점 id),
  name(varchar not null unique/ 가맹점 이름),
  address(varchar/ 가게 주소),
  latitude(decimal(n1, n2)/ 위도) - 제외
  longitude(decimal(m1, m2)/ 경도) - 제외
  }
- **services** { ⭕
  id(serial pk/ 시술 id),
  name(varchar not null unique/ 시술 이름),
  price(int not null/ 시술 가격)
  }
- **reservations** { ⭕
  id(uuid pk/ 예약 uuid),
  status(enum('confirmed', 'canceled') not null/ 예약 상태),
  start_at(timestamp not null/ 시술 시작 시간),
  service_id(int fk/ 시술 id),
  customer_id(varchar fk/ 고객 id)
  staff_id(int fk/ 직원 id)
  }
- **news_posts** { ⭕
  id(serial pk/ 포스트 id),
  title(varchar not null unique/ 포스트 제목),
  contents(text not null/ 포스트 본문),
  thumbnail_url(varchar null/ 포스트 사진, null 허용),
  created_at(datetime/ 업로드 날짜 및 시간)
  }
- **refresh_tokens** { ⭕
  id(serial pk/ 토큰 생성 id),
  hashed_token(varchar not null/ token 해시화),
  isRevoked(boolean not null default false/ 만료되었는지),
  expires_at(datetime not null/ 만료 시간),
  created_at(datetime not null/ 발급 시간),
  customer_id(uuid fk/ 고객 id)
  }

### API Endpoints

a) 계정 (필수, 기본 베이스)

- GET /auth/me ⭕
- POST /auth/signup ⭕
- POST /auth/login ⭕
- POST /auth/logout ⭕
- POST /auth/refresh (새로고침 시 엑세스 토큰 발급) ⭕
- PATCH /auth/password (비밀번호 변경)

b) 예약

- GET /services (예약 시 시술 선택) ⭕
- GET /availability?date=YYYY-MM-DD&staff_id=… ⭕
  (db의 예약 날짜와 시술 등이 정보를 프론트가 받고, 시간 버튼에 사용, 반환 예시: [{start_at: "2026-01-15T08:00:00+09:00", available: true}, ...])
- GET /reservations => 예약 목록 조회 ⭕
- GET /reservations/{id} => 예약 상세 조회 ⭕
- POST /reservations => 예약 등록(생성) ⭕
- PATCH /reservations/{id} => 예약 수정 ⭕
- DELETE /reservations/{id} => 예약 취소(reservations.status를 'canceled'로 변경, 7일 이후 삭제) ⭕

### Exception(400, 401, ... , 500) ⭕

- nest.js filter 사용
- {
  "success": false,
  "status": 409
  "path": "/reservations",
  "timestamp": "2026-01-16T...",
  "error": {
  "code": "ALREADY_RESERVED",
  "message": "해당 시간대는 이미 예약이 완료되었습니다."
  }
  }

### Success(200, 201)

- nest.js interceptor 사용
- {
  "success": true,
  "status": 201
  "path": "/reservations",
  "timestamp": "2026-01-16T...",
  "data": ...,
  }

### 비고

###### 예약

- Concurrency Exception (동시성): 예약 생성 직전 start_at과 staff_id로 중복 여부를 한 번 더 체크하는 로직을 넣고 실패 시 409 Conflict
- Past Date Exception: 과거 날짜나 영업시간 외 예약 시도 시 400 Bad Request

###### 인증

- Expired Token: Refresh Token 만료 시 401 Unauthorized를 명확히 주어 프론트에서 로그인 페이지로 리다이렉트하게 유도
- Hash 비교 실패: 로그인 시 비밀번호 불일치는 보안상 "아이디 또는 비밀번호가 틀렸습니다"로 에러 메시지를 통합

### client files definition details

- types: API 요청/응답 데이터 형식 정의
- hooks: 서버 데이터를 다루는 React Query 로직 캡슐화
- lib/axios: API 호출 설정(토큰, 에러 처리) 중앙화
- lib/queryClient: React Query 캐싱 정책 전역 설정
- lib/constants: 반복되는 상수를 한 곳에 모음
- components: 데이터를 받아 렌더링만 하는 UI 조각
- api/services: 백엔드 API 엔드포인트를 타입 안전하게 호출하는 함수들
- utils: 순수 함수(날짜 포맷, 유효성 검사 등)
- styles: 전역 CSS 설정
