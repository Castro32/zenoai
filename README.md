# Chat

# Zeno

Zeno is a Kenya-first marketplace concept for legitimate AI-related digital task work. This implementation includes a public product page, built-in Agent-Native authentication, a PostgreSQL-backed task feed and freelancer profiles, a protected client dashboard, and package-payment and earnings pages. It does not yet process task submissions, earnings, M-Pesa payments, or withdrawals.

## Architecture

- React 19, React Router framework mode, TypeScript, Vite, Tailwind CSS, and Agent-Native Toolkit.
- Server-side Nitro runtime with validated `defineAction` operations as the shared UI/agent data path.
- Drizzle/PostgreSQL is the source of truth for framework state, authentication, marketplace tasks, and freelancer profiles. Local development uses PGlite; deployments need the framework's persistent PostgreSQL database.
- Authentication is provided by the existing Agent-Native auth plugin; the marketing route is public, and `/dashboard` plus its earnings and package-payment routes are gated. Successful authentication returns users to their requested protected route or `/dashboard`; authenticated visits to sign-in routes return to `/dashboard`.
- `actions/list-marketplace-tasks.ts` queries PostgreSQL for published, non-demo tasks with remaining slots, seeds baseline listings when no live tasks exist, and returns only fields used by the dashboard.
- `actions/get-user-profile.ts` and `actions/save-user-profile.ts` read and persist the signed-in user's profile and package selection in PostgreSQL.

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

The project uses local PGlite in development unless a database URL is configured. Never use local PGlite as a production database. Baseline marketplace tasks are inserted into the local database the first time the task list is requested.

## Database setup

1. Configure a persistent PostgreSQL `DATABASE_URL` for deployed environments.
2. Configure `DATABASE_URL_UNPOOLED` for migration generation/application if your provider supplies separate pooled and direct URLs.
3. Generate and apply the schema migration:

```bash
pnpm db:generate
pnpm db:migrate
```

4. Baseline task listings are seeded automatically when the database has no published non-demo tasks. Additional task listings can be stored in the `tasks` table with `status: "PUBLISHED"`, `isDemo: false`, and `remainingSlots > 0`.

The legacy Drizzle tasks table and its indexes are retained but are no longer read by the dashboard task-feed action. Financial and personal data models have not yet been implemented.

## Authentication and security

Authentication is enabled for protected routes via the built-in plugin. In local development, the framework can provide a local development sign-in. Production deployments need the framework's supported authentication secret and a persistent identity/session store. Keep secrets in deployment configuration, not source control.

Task list input currently accepts no arbitrary filters; its query uses explicit status, demo, and slot predicates. Any future search/filter action must validate and whitelist every filter and sort field. Dashboard balance and payment pages are intentionally non-operational until payment, review, and ledger workflows are implemented; package checkout and withdrawals are visibly disabled rather than simulated.

## External services

M-Pesa Daraja, KYC verification, transactional email, and private file storage are not wired yet. Do not simulate payment confirmations, identity verification, or payouts. Add provider configuration through the platform's approved runtime secrets flow before implementing those integrations.

## Verification

```bash
pnpm typecheck
pnpm test
pnpm agent-native:doctor
```

## Production checklist

- Use a persistent hosted PostgreSQL database for Agent-Native state, marketplace tasks, and freelancer profiles.
- Configure the authentication provider and email verification/reset flows.
- Implement and test role authorization for reviewer and administrator operations.
- Add KYC using a real provider and private storage for permitted sensitive files.
- Add M-Pesa STK push, callback verification, reconciliation, and payout handling with idempotency.
- Add transaction-safe submissions, reviews, immutable ledger entries, wallets, and withdrawals.
- Add rate limiting, monitoring, backup/restore procedures, privacy/retention policy, legal review, and abuse reporting.
- Run the verification commands and complete browser checks before launch.

## Deployment

Deploy the React Router/Nitro build using the supported Agent-Native hosting workflow. Set deployment-level environment variables through the hosting provider; never commit credentials. Shared production state requires PostgreSQL and cannot use local PGlite storage.
