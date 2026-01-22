1. Layout 구조 설계
   app/layout.tsx (최상위 루트 레이아웃)
   역할: 전체 앱 래핑, Provider 설정
   사용할 것들:

- QueryClientProvider (React Query)
- useRefreshToken() 훅 호출
- <html>, <body> 태그
- globals.css import

포함 안 함:

- Header/Footer (하위 레이아웃에서 처리)

app/(public)/layout.tsx (공개 페이지 레이아웃)
역할: 비로그인 사용자용 레이아웃
포함할 컴포넌트:

- <Header /> (로그인/회원가입 버튼 보임)
- <Footer />
- {children}

사용할 훅:

- useAuth() - 로그인 상태 확인해서 Header에 전달

app/(protected)/layout.tsx (보호된 페이지 레이아웃)
역할: 로그인 필수 페이지, 인증 체크
포함할 컴포넌트:

- <Header /> (로그아웃 버튼, 내 예약 메뉴 보임)
- <Footer />
- {children}

사용할 훅:

- useAuth()
  → isAuthenticated가 false면 router.push('/login')
  → isLoading이면 <Loading /> 표시

로직:
useEffect(() => {
if (!isLoading && !isAuthenticated) {
router.push('/login');
}
}, [isLoading, isAuthenticated]);

2. Header 설계
   components/layout/Header.tsx
   Props:
   typescriptinterface HeaderProps {
   isAuthenticated: boolean;
   user?: Customer | null;
   onLogout: () => void;
   }

**표시할 메뉴:**

공통:

- 홈 (/)
- 매장 안내 (/stores)
- 소식 (/news-posts)

비로그인 시 (isAuthenticated === false):

- 로그인 버튼 → /login
- 회원가입 버튼 → /signup

로그인 시 (isAuthenticated === true):

- 예약하기 → /reservation
- 내 예약 → /my-reservations
- 로그아웃 버튼 (onLogout 호출)
- 환영 메시지: "{user.username}님"

**반응형:**

데스크톱 (>768px):

- 가로 메뉴바

모바일 (<768px):

- 햄버거 메뉴 → <Sidebar /> 토글
- 모바일에선 메뉴 숨김

---

## 3. Footer 설계

### components/layout/Footer.tsx

**Props:** 없음 (정적 콘텐츠)

**표시할 것:**

- 가게 정보 (주소, 전화번호)
- 영업 시간
- 저작권 표시
- 소셜 링크 (선택)

**반응형:**

데스크톱: 3단 컬럼
모바일: 1단 스택

4. Sidebar 설계 (모바일용)
   components/layout/Sidebar.tsx
   Props:
   typescriptinterface SidebarProps {
   isOpen: boolean;
   onClose: () => void;
   isAuthenticated: boolean;
   user?: Customer | null;
   onLogout: () => void;
   }

**동작:**

- isOpen이 true일 때만 표시 (슬라이드 애니메이션)
- Header와 동일한 메뉴 표시 (세로 나열)
- 오버레이 클릭 시 onClose() 호출

---

## 5. 페이지별 사용 함수/컴포넌트

### app/(public)/page.tsx (홈페이지)

**사용할 것:**

훅:

- useQuery({
  queryKey: ['news-posts'],
  queryFn: () => newsService.getAllNews()
  })
  // 최근 3개만 표시: data?.slice(0, 3)

컴포넌트:

- <NewsCard /> (최근 소식 3개)

표시할 섹션:

1. 히어로 섹션 (헤어샵 소개)
2. 최근 소식 미리보기 (최대 3개)
3. 매장 위치 (지도 또는 주소)
4. CTA: "예약하기" 버튼 → /reservation

---

### app/(public)/login/page.tsx

**사용할 것:**

컴포넌트:

- <LoginForm />

LoginForm 내부에서 사용:

- <Input /> (username, password)
- <Button />
- useAuth()의 login() 함수

로직:
const { login, isLoginLoading } = useAuth();

const handleSubmit = () => {
login({ username, password });
// 성공 시 useAuth가 자동으로 / 리다이렉트
// 백엔드가 쿠키에 accessToken, refreshToken 자동 설정
};

---

### app/(public)/signup/page.tsx

**사용할 것:**

컴포넌트:

- <SignupForm />

SignupForm 내부:

- <Input /> (username, password, password 확인)
- <Button />
- useAuth()의 signup() 함수
- validateUsername(), validatePassword() from utils

로직:
const { signup, isSignupLoading } = useAuth();

const handleSubmit = () => {
const usernameCheck = validateUsername(username);
const passwordCheck = validatePassword(password);

if (!usernameCheck.valid) {
setError(usernameCheck.error);
return;
}

signup({ username, password });
// 성공 시 /login으로 리다이렉트
};

---

### app/(public)/stores/page.tsx (매장 목록)

**사용할 것:**

훅:

- useQuery({
  queryKey: ['stores'],
  queryFn: storeService.getAllStores
  })

컴포넌트:

- <StoreCard /> (각 매장마다)

표시:

- 로딩 중: <Loading />
- 매장 그리드 (2-3열)
- 각 카드에 매장 정보 표시 (이름, 주소)
- 카드 클릭 → 해당 매장의 직원 목록으로 필터링된 뷰 표시
  (또는 모달로 직원 목록 표시)

**참고:** 백엔드에 GET /stores/:id가 없으므로:

- 매장 상세 페이지 없음
- stores 페이지에서 직접 staffs 조회

---

### app/(public)/news-posts/page.tsx (소식 목록)

**사용할 것:**

훅:

- useQuery({
  queryKey: ['news-posts'],
  queryFn: newsService.getAllNews
  })

컴포넌트:

- <NewsCard />

표시:

- 그리드 레이아웃
- 썸네일, 제목, 날짜 표시
- 클릭 시 → /news-posts/[id]

---

### app/(public)/news-posts/[id]/page.tsx (소식 상세)

**사용할 것:**

훅:

- useQuery({
  queryKey: ['news-post', params.id],
  queryFn: () => newsService.getNewsById(params.id)
  })

컴포넌트:

- <NewsDetail /> (제목, 본문, 이미지)

표시:

- 제목
- 작성일 (formatRelativeTime() 사용)
- 썸네일
- 본문 (HTML 또는 마크다운)

---

### app/(protected)/reservation/page.tsx (예약 Step 1)

**사용할 것:**

훅:

- useQuery(['stores'], storeService.getAllStores)
- useQuery(['staffs', selectedStoreId],
  () => staffService.getStaffsByStoreId(selectedStoreId),
  { enabled: !!selectedStoreId }
  )
- useQuery(['services'], serviceService.getAllServices)

컴포넌트:

- <StoreCard /> (선택 기능 추가)
- <StaffSelector />
- <ServiceSelector />
- <Button />

로직:
const [selectedStoreId, setSelectedStoreId] = useState(null);
const [selectedStaffId, setSelectedStaffId] = useState(null);
const [selectedServiceId, setSelectedServiceId] = useState(null);

const handleNext = () => {
router.push(
`/reservation/schedule?staff_id=${selectedStaffId}&service_id=${selectedServiceId}`
);
};

표시 순서:

1. 매장 선택
2. selectedStoreId 있으면 → 디자이너 표시 (GET /staffs?store_id=...)
3. selectedStaffId 있으면 → 시술 선택 표시
4. 모두 선택 시 "다음" 버튼 활성화

---

### app/(protected)/reservation/schedule/page.tsx (Step 2)

**사용할 것:**

URL에서 가져오기:
const searchParams = useSearchParams();
const staffId = searchParams.get('staff_id');
const serviceId = searchParams.get('service_id');

훅:

- useAvailability(selectedDate, staffId)
  // GET /availability?date=YYYY-MM-DD&staff_id=...

컴포넌트:

- <DatePicker />
- <TimeSlotGrid />
- <Button />

로직:
const [selectedDate, setSelectedDate] = useState(null);
const [selectedTime, setSelectedTime] = useState(null);

const { data: slots } = useAvailability(selectedDate, staffId);

const handleNext = () => {
router.push(
`/reservation/confirm?staff_id=${staffId}&service_id=${serviceId}&time=${selectedTime}`
);
};

표시:

1. 날짜 선택 (캘린더)
2. selectedDate 있으면 → 시간 버튼 그리드 표시
3. slots 데이터로 available: false인 버튼 비활성화
4. 시간 선택 시 "다음" 활성화

---

### app/(protected)/reservation/confirm/page.tsx (Step 3)

**사용할 것:**

URL에서 가져오기:
const searchParams = useSearchParams();
const staffId = searchParams.get('staff_id');
const serviceId = searchParams.get('service_id');
const startAt = searchParams.get('time');

훅:

- useReservation()의 createReservation()
- useQuery(['staff', staffId],
  () => staffService.getStaffById(staffId)
  ) // 디자이너 이름 표시용
- useQuery(['services'], serviceService.getAllServices)
  // 전체 목록에서 serviceId로 필터링

컴포넌트:

- <ReservationCard /> (확인용, 취소 버튼 없음)
- <Button />

로직:
const { createReservation, isCreating } = useReservation();

const handleConfirm = () => {
createReservation({
staff_id: Number(staffId),
service_id: Number(serviceId),
start_at: startAt
});
// POST /reservations
// 성공 시 useReservation이 자동으로 /my-reservations 리다이렉트
};

표시:

- 선택한 정보 요약 (디자이너, 시술, 날짜, 시간)
- "예약 확정" 버튼
- "뒤로가기" 버튼

---

### app/(protected)/my-reservations/page.tsx (예약 목록)

**사용할 것:**

훅:

- useQuery({
  queryKey: ['reservations'],
  queryFn: reservationService.getMyReservations
  })
  // GET /reservations (쿠키 accessToken 필요)

컴포넌트:

- <ReservationList />

표시:

- 로딩: <Loading />
- 예약 없으면: "예약 내역이 없습니다" + "예약하기" 버튼
- 예약 있으면: 테이블 또는 카드 리스트
- 각 항목 클릭 → /my-reservations/[id]

정렬:

- 최신 예약이 위로 (start_at 기준)

---

### app/(protected)/my-reservations/[id]/page.tsx (예약 상세)

**사용할 것:**

훅:

- useQuery({
  queryKey: ['reservation', params.id],
  queryFn: () => reservationService.getReservationById(params.id)
  })
  // GET /reservations/:id
- useReservation()의 cancelReservation()
  // DELETE /reservations/:id

컴포넌트:

- <ReservationCard /> (상세 정보 표시)
- <Button />
- <Modal /> (취소 확인용)

로직:
const { cancelReservation, isCanceling } = useReservation();
const [showCancelModal, setShowCancelModal] = useState(false);

const handleCancel = () => {
cancelReservation(params.id);
// 성공 시 자동으로 목록 refetch
};

const canCancel =
reservation.status === 'confirmed' &&
!isPast(reservation.start_at);

표시:

- 예약 상세 정보
- status === 'canceled'면 "취소된 예약" 표시
- canCancel이면 "예약 취소" 버튼 표시
- "목록으로" 버튼

6. api/services 수정 사항
   api/services/newsService.ts
   typescript// URL 변경: /news → /news-posts
   export const newsService = {
   async getAllNews(): Promise<NewsPost[]> {
   const response = await apiClient.get('/news-posts');
   return response.data;
   },

async getNewsById(id: number): Promise<NewsPost> {
const response = await apiClient.get(`/news-posts/${id}`);
return response.data;
},

// getRecentNews 삭제 - 백엔드에 없음
// 대신 getAllNews()로 받아서 프론트에서 slice(0, 3) 사용
};
api/services/storeService.ts
typescriptexport const storeService = {
async getAllStores(): Promise<Store[]> {
const response = await apiClient.get('/stores');
return response.data;
},

// getStoreById 삭제 - 백엔드에 없음
};
api/services/staffService.ts
typescriptexport const staffService = {
async getStaffsByStoreId(storeId: number): Promise<Staff[]> {
const response = await apiClient.get('/staffs', {
params: { store_id: storeId }
});
return response.data;
},

async getStaffById(id: number): Promise<Staff> {
const response = await apiClient.get(`/staffs/${id}`);
return response.data;
},
};
api/services/reservationService.ts
typescriptexport const reservationService = {
async getMyReservations(): Promise<Reservation[]> {
const response = await apiClient.get('/reservations');
return response.data;
},

async getReservationById(id: string): Promise<Reservation> {
const response = await apiClient.get(`/reservations/${id}`);
return response.data;
},

async createReservation(data: CreateReservationRequest): Promise<Reservation> {
const response = await apiClient.post('/reservations', data);
return response.data;
},

async cancelReservation(id: string): Promise<void> {
await apiClient.delete(`/reservations/${id}`);
},

// updateReservation은 백엔드에 PATCH 있지만 프론트에서 사용 안 함

async getAvailability(date: string, staffId: number): Promise<AvailabilitySlot[]> {
const response = await apiClient.get('/availability', {
params: { date, staff_id: staffId }
});
return response.data;
},
};

---

## 7. 반응형 설계 가이드

### Breakpoint

모바일: < 768px
태블릿: 768px ~ 1024px
데스크톱: > 1024px

### 주요 반응형 포인트

**Header:**

데스크톱: 가로 메뉴
모바일: 햄버거 → Sidebar

**Grid 레이아웃:**

// 매장 목록, 소식 목록
데스크톱: grid-cols-3
태블릿: grid-cols-2
모바일: grid-cols-1

**TimeSlotGrid (시간 선택):**

데스크톱: grid-cols-6 (한 줄에 6개)
태블릿: grid-cols-4
모바일: grid-cols-3

**Form (로그인, 회원가입):**

데스크톱: max-w-md (중앙 정렬)
모바일: 전체 너비 (좌우 padding만)

---

## 8. 공통 로딩/에러 처리 패턴

### 모든 데이터 조회 페이지에서

const { data, isLoading, error } = useQuery(...);

if (isLoading) return <Loading />;
if (error) return <div>오류가 발생했습니다</div>;
if (!data) return <div>데이터가 없습니다</div>;

return <실제 컨텐츠 />;

### 모든 폼에서

const { mutate, isPending } = useMutation(...);

<Button
onClick={handleSubmit}
disabled={isPending}

> {isPending ? '처리 중...' : '확인'}
> </Button>

---

## 체크리스트

레이아웃:
□ app/layout.tsx - Provider 설정
□ app/(public)/layout.tsx - Header/Footer (비로그인)
□ app/(protected)/layout.tsx - Header/Footer + 인증 체크

공개 페이지:
□ app/(public)/page.tsx - 홈 (최근 소식 3개)
□ app/(public)/login/page.tsx - LoginForm
□ app/(public)/signup/page.tsx - SignupForm
□ app/(public)/stores/page.tsx - 매장 목록 (직원도 함께 표시)
□ app/(public)/news-posts/page.tsx - 소식 목록
□ app/(public)/news-posts/[id]/page.tsx - 소식 상세

보호된 페이지:
□ app/(protected)/reservation/page.tsx - Step 1 (매장→직원→시술 선택)
□ app/(protected)/reservation/schedule/page.tsx - Step 2 (날짜→시간 선택)
□ app/(protected)/reservation/confirm/page.tsx - Step 3 (확인)
□ app/(protected)/my-reservations/page.tsx - 목록
□ app/(protected)/my-reservations/[id]/page.tsx - 상세

API Services 수정:
□ newsService - URL을 /news-posts로 변경, getRecentNews 삭제
□ storeService - getStoreById 삭제
□ reservationService - URL을 /availability로 변경

### 백엔드 엔드포인트 정리

GET / — AppController.getHello() (app.controller.ts)
Auth (@Controller('auth')) (auth.controller.ts)
GET /auth/me — 내 정보 (쿠키 accessToken 필요)
POST /auth/signup — 회원가입 (SignupDto)
POST /auth/login — 로그인 (LoginDto), 쿠키 accessToken/refreshToken 설정, { accessToken, access } 반환
POST /auth/validToken — 토큰 검증 ({ token: string })
POST /auth/refresh — 리프레시로 액세스 재발급 (쿠키 refreshToken 필요), 새 accessToken 쿠키 설정
POST /auth/logout — 로그아웃 (쿠키 refreshToken 필요), auth 쿠키 삭제
News Posts (@Controller('news-posts')) (news_posts.controller.ts)
GET /news-posts — 전체 조회
GET /news-posts/:id — 단건 조회 (id)
Reservations (@Controller('reservations')) (reservations.controller.ts)
POST /reservations — 생성 (CreateReservationDto)
GET /reservations — 전체 조회
GET /reservations/:id — 단건 조회
PATCH /reservations/:id — 수정 (UpdateReservationDto)
DELETE /reservations/:id — 취소/삭제 (cancel)
Availability (@Controller() 루트 컨트롤러) (reservations.controller.ts)
GET /availability?date=YYYY-MM-DD&staff_id=... — 예약 가능 시간 조회 (staff_id는 ParseIntPipe)
Services (@Controller('services')) (services.controller.ts)
GET /services — 전체 조회
Stores (@Controller('stores')) (stores.controller.ts)
GET /stores — 전체 조회
Staffs (@Controller('staffs')) (staffs.controller.ts)
GET /staffs?store_id=... — 전체 조회
GET /staffs/:id — 단일 조회
