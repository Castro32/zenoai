# Chat

# Zeno

Zeno is a Kenya-first marketplace concept for legitimate AI-related digital task work. This implementation includes a public product page, built-in Agent-Native authentication, a Drizzle-backed task catalog, a protected client dashboard, and Premium and earnings pages. It does not yet process task submissions, earnings, M-Pesa payments, or withdrawals.

## Architecture

- React 19, React Router framework mode, TypeScript, Vite, Tailwind CSS, and Agent-Native Toolkit.
- Server-side Nitro runtime with validated `defineAction` operations as the shared UI/agent data path.
- Drizzle ORM with PostgreSQL-compatible schema helpers. Local development uses PGlite; production requires a persistent PostgreSQL database.
- Authentication is provided by the existing Agent-Native auth plugin; the marketing route is public and `/dashboard` plus its earnings and Premium routes are gated.
- `drizzle/schema.ts` defines the task catalog, `server/db.ts` configures the database and creator identity policy, and `actions/list-marketplace-tasks.ts` returns only published non-demo tasks with slots remaining.

MongoDB/Mongoose is not supported by this Agent-Native starter's managed data path. Do not add a parallel MongoDB store; use the framework's SQL/Drizzle contract for application data.

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

The project uses local PGlite in development unless a database URL is configured. Never use local PGlite as a production database.

## Database setup

1. Configure a persistent PostgreSQL `DATABASE_URL` for deployed environments.
2. Configure `DATABASE_URL_UNPOOLED` for migration generation/application if your provider supplies separate pooled and direct URLs.
3. Generate and apply the schema migration:

```bash
pnpm db:generate
pnpm db:migrate
```

4. Keep marketplace task records in the database. Demo records must remain clearly marked and excluded from paid-task listing queries.

The tasks table has a unique slug index and indexes for marketplace status/category/Premium filtering, deadline ordering, and demo exclusion. Financial and personal data models have not yet been implemented.

## Authentication and security

Authentication is enabled for protected routes via the built-in plugin. In local development, the framework can provide a local development sign-in. Production deployments need the framework's supported authentication secret and a persistent identity/session store. Keep secrets in deployment configuration, not source control.

Task list input currently accepts no arbitrary filters; its query uses explicit status, demo, and slot predicates. Any future search/filter action must validate and whitelist every filter and sort field. Dashboard balance and payment pages are intentionally non-operational until payment, review, and ledger workflows are implemented; Premium checkout and withdrawals are visibly disabled rather than simulated.

## External services

M-Pesa Daraja, KYC verification, transactional email, and private file storage are not wired yet. Do not simulate payment confirmations, identity verification, or payouts. Add provider configuration through the platform's approved runtime secrets flow before implementing those integrations.

## Verification

```bash
pnpm typecheck
pnpm test
pnpm agent-native:doctor
```

## Production checklist

- Use a persistent hosted PostgreSQL database and apply reviewed migrations.
- Configure the authentication provider and email verification/reset flows.
- Implement and test role authorization for reviewer and administrator operations.
- Add KYC using a real provider and private storage for permitted sensitive files.
- Add M-Pesa STK push, callback verification, reconciliation, and payout handling with idempotency.
- Add transaction-safe submissions, reviews, immutable ledger entries, wallets, and withdrawals.
- Add rate limiting, monitoring, backup/restore procedures, privacy/retention policy, legal review, and abuse reporting.
- Run the verification commands and complete browser checks before launch.

## Deployment

Deploy the React Router/Nitro build using the supported Agent-Native hosting workflow. Set deployment-level environment variables through the hosting provider; never commit credentials. Shared production state requires PostgreSQL and cannot use local PGlite storage.
