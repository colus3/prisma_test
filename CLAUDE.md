# CLAUDE.md

Claude Code가 이 프로젝트를 수정할 때 참고하는 가이드입니다.

## 프로젝트 개요

NestJS + Prisma + MySQL 기반의 User CRUD API 스터디 프로젝트.
ORM 학습 목적이므로 코드는 간결하고 명확하게 유지한다.

## 기술 스택

- NestJS 10 / TypeScript 5 / Prisma 5 / MySQL 8.0

## 아키텍처 규칙

### 모듈 구조
- 기능 단위로 모듈을 분리한다: `src/<feature>/<feature>.module.ts`
- `PrismaModule`은 `@Global()`로 선언되어 있으므로 각 기능 모듈에서 별도 import 불필요
- 새 기능 추가 시 `app.module.ts`의 `imports`에 해당 모듈을 등록한다

### 레이어 역할
- **Controller**: 요청/응답 처리, DTO 바인딩, 라우팅만 담당
- **Service**: 비즈니스 로직 및 Prisma 쿼리 담당
- **DTO**: `class-validator` 데코레이터로 입력값 검증

### DB / Prisma
- 스키마 변경은 `prisma/schema.prisma`만 수정한다
- 스키마 변경 후 반드시 `npm run prisma:migrate`로 마이그레이션을 생성한다
- 마이그레이션 없이 `prisma generate`만 실행하지 않는다
- 테이블명은 `@@map("snake_case_plural")`로 매핑한다

### DTO 규칙
- Create DTO: 필수 필드에 `@IsNotEmpty()` 사용
- Update DTO: 모든 필드를 `@IsOptional()`로 선언 (부분 업데이트)
- `class-validator` 데코레이터를 활용한 유효성 검증 필수

### 에러 처리
- 리소스 미존재 시 `NotFoundException` 사용
- Service에서 예외를 던지고, Controller는 예외를 따로 처리하지 않는다

## 환경 변수

| 변수 | 설명 |
|------|------|
| `DATABASE_URL` | Prisma MySQL 연결 문자열 |

`.env` 파일은 git에 커밋하지 않는다 (`.gitignore` 포함).

## 로컬 개발 환경

```bash
# DB 시작
docker compose up -d

# 개발 서버 (hot reload)
npm run start:dev

# 마이그레이션
npm run prisma:migrate
```

## 새 기능 추가 시 체크리스트

1. `prisma/schema.prisma`에 모델 추가
2. `npm run prisma:migrate` 실행
3. `src/<feature>/` 디렉토리 생성
4. `dto/create-<feature>.dto.ts`, `dto/update-<feature>.dto.ts` 작성
5. `<feature>.service.ts` 작성 (Prisma 쿼리)
6. `<feature>.controller.ts` 작성 (REST 엔드포인트)
7. `<feature>.module.ts` 작성
8. `app.module.ts`의 `imports`에 등록