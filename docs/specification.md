# 🛍️ Next.js 쇼핑몰 클라이언트 기획서

## 1. 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx (상품목록 페이지)
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx (상품상세 페이지)
│   ├── cart/
│   │   └── page.tsx (장바구니 페이지)
│   └── checkout/
│       └── page.tsx (결제 페이지)
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductList.tsx
│       └── ProductDetail.tsx
└── lib/
    ├── types/
    │   └── product.ts
    └── api/
        └── products.ts
```

## 2. 페이지별 기능 명세

### 2.1 상품목록 페이지 (메인 페이지)

- **경로**: `/`
- **주요 기능**:
  - 상품 그리드 형태로 표시
  - 상품 필터링 (카테고리별)
  - 상품 정렬 (가격순, 인기순)
  - 페이지네이션
- **표시 정보**:
  - 상품 썸네일 이미지
  - 상품명
  - 가격
  - 간단한 설명

### 2.2 상품상세 페이지

- **경로**: `/products/[id]`
- **주요 기능**:
  - 상품 상세 정보 표시
  - 수량 선택
  - 장바구니 담기
  - 바로 구매하기
- **표시 정보**:
  - 상품 대표 이미지 및 추가 이미지
  - 상품명
  - 가격
  - 상세 설명
  - 배송 정보
  - 리뷰 섹션

### 2.3 장바구니 페이지

- **경로**: `/cart`
- **주요 기능**:
  - 장바구니 상품 목록 표시
  - 수량 수정
  - 상품 삭제
  - 선택 상품 주문
  - 전체 상품 주문
- **표시 정보**:
  - 상품 썸네일
  - 상품명
  - 수량
  - 개별 가격
  - 총 주문 금액

### 2.4 결제 페이지

- **경로**: `/checkout`
- **주요 기능**:
  - 배송지 정보 입력
  - 결제 수단 선택
  - 주문 정보 확인
  - 결제 진행
- **표시 정보**:
  - 주문 상품 요약
  - 배송지 정보 폼
  - 결제 수단 선택 옵션
  - 최종 결제 금액

## 3. 기술 스택

- **프레임워크**: Next.js 14
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태관리**: React Query + Context API
- **결제 연동**: 포트원 (구 아임포트)

## 4. 데이터 구조

### 4.1 상품 데이터

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}
```

### 4.2 장바구니 아이템

```typescript
interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}
```

### 4.3 주문 데이터

```typescript
interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    zipCode: string;
  };
  paymentMethod: string;
  status: "pending" | "paid" | "shipped" | "delivered";
  createdAt: string;
}
```

## 5. API 엔드포인트

- GET `/api/products` - 상품 목록 조회
- GET `/api/products/{id}` - 상품 상세 조회
- POST `/api/cart` - 장바구니 담기
- GET `/api/cart` - 장바구니 조회
- PUT `/api/cart/{id}` - 장바구니 수정
- DELETE `/api/cart/{id}` - 장바구니 삭제
- POST `/api/orders` - 주문 생성
- GET `/api/orders/{id}` - 주문 조회

## 6. 추가 고려사항

1. **반응형 디자인**

   - 모바일, 태블릿, 데스크톱 지원
   - 모바일 우선 디자인

2. **성능 최적화**

   - 이미지 최적화
   - SSR/ISR 적절히 활용
   - Code Splitting

3. **사용자 경험**

   - 로딩 상태 표시
   - 에러 처리
   - 토스트 메시지

4. **보안**
   - XSS 방지
   - CSRF 토큰 적용
   - API 요청 인증

타입 정의를 위한 별도의 파일도 생성하겠습니다:

```typescript:doc/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    zipCode: string;
  };
  paymentMethod: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
}
```
