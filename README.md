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
│ └── page.tsx # 마이페이지 (비밀번호 변경)
│
├── components/
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
│ └── ErrorBoundary.tsx # 에러 처리
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
├── types/
│ ├── auth.ts # Customer, LoginRequest, TokenResponse
│ ├── reservation.ts # Reservation, ReservationStatus
│ ├── store.ts # Store, Staff
│ ├── service.ts # Service
│ └── news.ts # NewsPost
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

### 백엔드 파일 구조

shop_back/
├── common/
│ ├── filter/
│ │ ├── all-exception.filter.ts # 전역 예외 필터
│ │ └── normalize.ts # 응답 정규화 유틸
│ ├── guard/
│ │ └── auth.guard.ts # 인증 가드
│ └── interceptor/
│ └── response-format.interceptor.ts # 응답 포맷 인터셉터
├── configs/
│ ├── cors.config.ts # CORS 설정
│ ├── typeorm.config.ts # TypeORM 설정
│ └── validation.config.ts # ValidationPipe 설정
├── src/
│ ├── app.controller.ts # 기본 컨트롤러
│ ├── app.module.ts # 루트 모듈
│ ├── app.service.ts # 기본 서비스
│ ├── main.ts # 애플리케이션 엔트리
│ ├── auth/
│ │ ├── auth.controller.ts # 인증 API
│ │ ├── auth.module.ts # 인증 모듈
│ │ ├── auth.service.ts # 인증 서비스
│ │ ├── cookie-options.ts # 쿠키 옵션
│ │ ├── tokens.service.ts # 토큰 발급/검증
│ │ ├── dto/
│ │ │ ├── login.dto.ts # 로그인 DTO
│ │ │ └── signup.dto.ts # 회원가입 DTO
│ │ └── entities/
│ │ └── refreshToken.entity.ts # 리프레시 토큰 엔티티
│ ├── database/
│ │ ├── data-source.ts # 데이터 소스
│ │ └── migrations/
│ │ └── 20260121104500-SetCustomersIdDefault.ts # 마이그레이션
│ ├── news_posts/
│ │ ├── news_posts.controller.ts # 소식 API
│ │ ├── news_posts.module.ts # 소식 모듈
│ │ ├── news_posts.service.ts # 소식 서비스
│ │ └── entities/
│ │ └── news_post.entity.ts # 소식 엔티티
│ ├── reservations/
│ │ ├── reservations.cleanup.service.ts # 예약 정리 배치
│ │ ├── reservations.controller.ts # 예약 API
│ │ ├── reservations.module.ts # 예약 모듈
│ │ ├── reservations.service.ts # 예약 서비스
│ │ ├── dto/
│ │ │ ├── create-reservation.dto.ts # 예약 생성 DTO
│ │ │ └── update-reservation.dto.ts # 예약 수정 DTO
│ │ └── entities/
│ │ ├── customer.entity.ts # 고객 엔티티
│ │ └── reservation.entity.ts # 예약 엔티티
│ ├── seeds/
│ │ └── seed.ts # 시드 데이터
│ ├── services/
│ │ ├── services.controller.ts # 시술 API
│ │ ├── services.module.ts # 시술 모듈
│ │ ├── services.service.ts # 시술 서비스
│ │ └── entities/
│ │ └── service.entity.ts # 시술 엔티티
│ ├── staffs/
│ │ ├── staffs.controller.ts # 직원 API
│ │ ├── staffs.module.ts # 직원 모듈
│ │ ├── staffs.service.ts # 직원 서비스
│ │ └── entities/
│ │ └── staff.entity.ts # 직원 엔티티
│ └── stores/
│ ├── stores.controller.ts # 매장 API
│ ├── stores.module.ts # 매장 모듈
│ ├── stores.service.ts # 매장 서비스
│ └── entities/
│ └── store.entity.ts # 매장 엔티티
├── eslint.config.mjs # ESLint 설정
├── nest-cli.json # Nest CLI 설정
├── package.json # 패키지 설정
├── tsconfig.build.json # 빌드 TS 설정
├── tsconfig.json # TS 설정
└── README.md # 프로젝트 문서

### Unavailable-functions

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

### Login/Signup

- 로그인과 회원가입은 아이디/비밀번호 항목 필요
- 아이디/비밀번호 찾기 기능은 시간상 일단 제외
- 방식은 쿠키 + JWT
- 비밀번호와 리프레시 토큰은 DB에 들어갈 때 hash&salt 처리(bcrypt)
- 인증 요구 => 기본적으로 모든 UI는 로그인 없이 공개.
  단, 예약과 관련된 기능들은 모두 로그인 필수(엑세스, 리프레시 토큰 필요)

### Env (중요)

- `TOKEN_SECRET` (필수): JWT 서명/검증에 사용되는 시크릿 키
  - Render에서 누락되면 로그인 시 `secretOrPrivateKey must have a value`로 500이 발생할 수 있음
  - 호환 키: `JWT_SECRET`

### DB schemes

- **customers** {
  id(uuid pk/ 고객 id),
  username(varchar not null unique/ 로그인 시 사용하는 ID),
  hash_password(varchar not null/ 로그인 시 사용하는 PW, db에 넣을 때 hash화)
  }
- **staffs** {
  id(serial pk/ 직원(디자이너) id, 입사 순서대로),
  name(varchar not null/ 직원 이름)
  store_id (integer fk)
  }
- **stores** {
  id(serial pk/ 가맹점 id),
  name(varchar not null unique/ 가맹점 이름),
  address(varchar/ 가게 주소),
  latitude(decimal(n1, n2)/ 위도) - 제외
  longitude(decimal(m1, m2)/ 경도) - 제외
  }
- **services** {
  id(serial pk/ 시술 id),
  name(varchar not null unique/ 시술 이름),
  price(int not null/ 시술 가격)
  }
- **reservations** {
  id(uuid pk/ 예약 uuid),
  status(enum('confirmed', 'canceled') not null/ 예약 상태),
  start_at(timestamp not null/ 시술 시작 시간),
  service_id(int fk/ 시술 id),
  customer_id(varchar fk/ 고객 id)
  staff_id(int fk/ 직원 id)
  }
- **news_posts** {
  id(serial pk/ 포스트 id),
  title(varchar not null unique/ 포스트 제목),
  contents(text not null/ 포스트 본문),
  thumbnail_url(varchar null/ 포스트 사진, null 허용),
  created_at(datetime/ 업로드 날짜 및 시간)
  }
- **refresh_tokens** {
  id(serial pk/ 토큰 생성 id),
  hashed_token(varchar not null/ token 해시화),
  isRevoked(boolean not null default false/ 만료되었는지),
  expires_at(datetime not null/ 만료 시간),
  created_at(datetime not null/ 발급 시간),
  customer_id(uuid fk/ 고객 id)
  }

### API Endpoints

a) 계정 (필수, 기본 베이스)

- GET /auth/me
- POST /auth/signup
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh (새로고침 시 엑세스 토큰 발급)
- PATCH /auth/password (비밀번호 변경)

b) 예약

- GET /services (예약 시 시술 선택)
- GET /availability?date=YYYY-MM-DD&staff_id=…
  (db의 예약 날짜와 시술 등이 정보를 프론트가 받고, 시간 버튼에 사용, 반환 예시: [{start_at: "2026-01-15T08:00:00+09:00", available: true}, ...])
- GET /reservations => 예약 목록 조회
- GET /reservations/{id} => 예약 상세 조회
- POST /reservations => 예약 등록(생성)
- PATCH /reservations/{id} => 예약 수정
- DELETE /reservations/{id} => 예약 취소(reservations.status를 'canceled'로 변경, 7일 이후 삭제)

### Exception(400, 401, ... , 500)

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
