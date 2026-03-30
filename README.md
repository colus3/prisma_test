# Prisma ORM Study Project

NestJS + Prisma + MySQL 기반의 User CRUD API 스터디 프로젝트입니다.

## 기술 스택

- **Runtime**: Node.js
- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **ORM**: Prisma 5
- **Database**: MySQL 8.0 (Docker)
- **Validation**: class-validator / class-transformer

## 프로젝트 구조

```
prisma_test/
├── compose.yml               # MySQL Docker Compose 설정
├── .env                      # 환경 변수 (DATABASE_URL)
├── prisma/
│   ├── schema.prisma         # Prisma 스키마 (User 모델)
│   └── migrations/           # 마이그레이션 히스토리
└── src/
    ├── main.ts               # 앱 진입점 (port 3000)
    ├── app.module.ts         # 루트 모듈
    ├── prisma/
    │   ├── prisma.module.ts  # Global Prisma 모듈
    │   └── prisma.service.ts # PrismaClient 래퍼 서비스
    └── users/
        ├── users.module.ts
        ├── users.controller.ts
        ├── users.service.ts
        └── dto/
            ├── create-user.dto.ts
            └── update-user.dto.ts
```

## 시작하기

### 사전 요구사항

- Node.js 20+
- Docker / OrbStack

### 설치

```bash
npm install
```

### 환경 변수

`.env` 파일이 없다면 생성합니다.

```env
DATABASE_URL="mysql://prisma:prisma1234@localhost:3306/prisma_test"
```

### 데이터베이스 실행

```bash
docker compose up -d
```

### 마이그레이션 실행

```bash
npm run prisma:migrate
```

> 최초 실행 시 migration 이름을 입력하라는 프롬프트가 뜨면 `init` 등 원하는 이름을 입력합니다.

### 개발 서버 실행

```bash
npm run start:dev
```

서버가 시작되면 `http://localhost:3000` 에서 접근 가능합니다.

## API 명세

### User

| Method | Endpoint | 설명 | Body |
|--------|----------|------|------|
| `POST` | `/users` | 사용자 생성 | `{ email, name }` |
| `GET` | `/users` | 전체 사용자 조회 | - |
| `GET` | `/users/:id` | 단일 사용자 조회 | - |
| `PATCH` | `/users/:id` | 사용자 수정 | `{ email?, name? }` |
| `DELETE` | `/users/:id` | 사용자 삭제 | - |

### 예시 요청

```bash
# 사용자 생성
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","name":"Alice"}'

# 전체 조회
curl http://localhost:3000/users

# 단일 조회
curl http://localhost:3000/users/1

# 수정
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated"}'

# 삭제
curl -X DELETE http://localhost:3000/users/1
```

### 응답 예시

```json
{
  "id": 1,
  "email": "alice@example.com",
  "name": "Alice",
  "createdAt": "2026-03-30T08:38:31.343Z",
  "updatedAt": "2026-03-30T08:38:31.343Z"
}
```

## 유용한 스크립트

```bash
# 개발 서버 (hot reload)
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start:prod

# Prisma 마이그레이션
npm run prisma:migrate

# Prisma Client 재생성
npm run prisma:generate

# Prisma Studio (DB GUI)
npm run prisma:studio

# MySQL 컨테이너 중지
docker compose down

# MySQL 데이터까지 초기화
docker compose down -v
```

## User 모델

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```