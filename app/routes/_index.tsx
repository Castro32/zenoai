import { appPath } from "@agent-native/core/client/api-path";
import { useSession } from "@agent-native/core/client/hooks";
import { Link, Navigate } from "react-router";

import { APP_TITLE } from "@/lib/app-config";

const taskCategories = [
  "AI response evaluation",
  "Data annotation",
  "Image classification",
  "Search relevance",
  "Prompt evaluation",
  "Research and validation",
];

export function meta() {
  return [
    { title: `${APP_TITLE} | AI freelance tasks in Kenya` },
    {
      name: "description",
      content:
        "Build AI skills and discover flexible digital task opportunities with Zeno.",
    },
    { property: "og:title", content: "Zeno | AI freelance tasks in Kenya" },
    {
      property: "og:description",
      content:
        "Build AI skills and discover flexible digital task opportunities with Zeno.",
    },
  ];
}

export default function HomeRoute() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-background" aria-label="Loading account" />
    );
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-full bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="zeno-wordmark" aria-label="Zeno home">
            zeno<span>.</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex"
          >
            <a
              className="transition-colors hover:text-foreground"
              href="#how-it-works"
            >
              How it works
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#categories"
            >
              Tasks
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#trust"
            >
              Trust
            </a>
            <a className="transition-colors hover:text-foreground" href="#faq">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to={appPath("/dashboard")}
              className="hidden rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-primary sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              to={appPath("/dashboard/payments")}
              className="inline-flex min-h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-[opacity,transform] hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-primary">
              <span className="size-2 rounded-full bg-primary" />
              Built for Kenya’s digital talent
            </p>
            <h1 className="max-w-[12ch] text-[clamp(3.25rem,8vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.075em]">
              Earn by completing <span className="text-primary">AI tasks</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Build valuable AI skills and complete flexible digital tasks from
              anywhere.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={appPath("/dashboard/payments")}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-[opacity,transform] hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Explore task packages
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center rounded-full px-5 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See how it works{" "}
                <span className="ml-2" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Choose an access package after creating your account. Checkout is
              not connected yet.
            </p>
          </div>

          <div className="zeno-hero-visual relative mx-auto w-full max-w-[35rem] overflow-hidden rounded-[2rem] p-5 sm:p-7">
            <div className="zeno-visual-top flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/10 text-sm font-semibold text-primary-foreground">
                  Z
                </span>
                <span className="text-sm font-semibold text-primary-foreground">
                  Your task space
                </span>
              </div>
              <span className="rounded-full border border-primary-foreground/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary-foreground/75">
                Preview
              </span>
            </div>
            <div className="mt-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.07] p-5 sm:p-6">
              <p className="text-xs font-medium text-primary-foreground/65">
                A clear path to your next opportunity
              </p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-primary-foreground sm:text-3xl">
                    Skills first.
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-primary-foreground/65 sm:text-3xl">
                    Work that counts.
                  </p>
                </div>
                <span className="zeno-orbit-mark mb-1 flex size-14 shrink-0 items-center justify-center rounded-full border border-primary-foreground/25 text-lg text-primary-foreground">
                  Z
                </span>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {[
                  ["01", "Verify"],
                  ["02", "Qualify"],
                  ["03", "Work"],
                ].map(([number, label], index) => (
                  <div
                    key={number}
                    className="border-t border-primary-foreground/20 pt-3"
                  >
                    <span className="text-[10px] text-primary-foreground/45">
                      {number}
                    </span>
                    <p
                      className={`mt-1 text-xs font-medium ${index === 0 ? "text-primary-foreground" : "text-primary-foreground/55"}`}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-primary-foreground p-4 text-foreground sm:p-5">
              <div>
                <p className="text-sm font-semibold">Task access package</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Access activates only after payment confirmation
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-primary">
                KSh 700
              </p>
            </div>
            <span className="zeno-visual-ring" aria-hidden="true" />
          </div>
        </section>

        <div className="border-y border-border bg-card">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-5 text-xs font-medium text-muted-foreground sm:gap-x-14 sm:px-8">
            <span>Kenya-first</span>
            <span className="hidden size-1 rounded-full bg-primary/40 sm:block" />
            <span>Packages shown in KSh</span>
            <span className="hidden size-1 rounded-full bg-primary/40 sm:block" />
            <span>Flexible digital work</span>
          </div>
        </div>

        <section
          id="how-it-works"
          className="scroll-mt-8 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                A considered start
              </p>
              <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
                How Zeno works
              </h2>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {[
                [
                  "01",
                  "Create your account",
                  "Set up your profile and skills.",
                ],
                [
                  "02",
                  "Choose a task package",
                  "Review the one-time package price and payment status.",
                ],
                [
                  "03",
                  "Access eligible tasks",
                  "Task access follows provider-confirmed payment. Availability varies.",
                ],
              ].map(([number, title, detail]) => (
                <li
                  key={number}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:py-6"
                >
                  <span className="pt-1 text-xs font-medium text-primary">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-[-0.02em]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="categories"
          className="scroll-mt-8 border-y border-border bg-card"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Task categories
              </p>
              <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
                Practical work across the AI landscape
              </h2>
            </div>
            <ul className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {taskCategories.map((category) => (
                <li
                  key={category}
                  className="flex items-center justify-between gap-3 py-4 text-sm font-medium sm:px-5"
                >
                  {category}
                  <span className="text-primary" aria-hidden="true">
                    ↗
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="pricing"
          className="scroll-mt-8 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Clear terms
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
              Know what is paid, and when
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="text-sm font-semibold">Task access package</p>
              <p className="mt-5 text-4xl font-semibold tracking-[-0.06em]">
                KSh 700
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                One-time package intended to activate eligible task access after
                payment is confirmed by the provider.
              </p>
              <Link
                to={appPath("/dashboard/payments")}
                className="mt-5 inline-flex min-h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View package
              </Link>
            </article>
            <article className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground sm:p-8">
              <p className="text-sm font-semibold">Payment status</p>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.06em]">
                Provider confirmed
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/75">
                Task access activates only after a successful payment callback.
                Checkout is not connected yet, and tasks or earnings are not
                guaranteed.
              </p>
            </article>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            Payment timing and withdrawal options are shown before you commit to
            a task or request a payout.
          </p>
        </section>

        <section
          id="trust"
          className="scroll-mt-8 border-y border-border bg-card"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[0.55fr_1.45fr] md:items-start md:gap-16">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">
              Built on clear expectations
            </h2>
            <div className="grid gap-5 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              <p>
                Identity checks and task review help protect the quality of the
                marketplace.
              </p>
              <p>
                Task rewards are set before work begins and credited only after
                approval.
              </p>
              <p>
                The one-time task package is KSh 700. Payment confirmation is
                required before access can activate; work is not guaranteed.
              </p>
              <p>
                Never share an M-Pesa PIN with Zeno. Payment confirmation
                belongs to the payment provider.
              </p>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-8 mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20"
        >
          <h2 className="text-3xl font-semibold tracking-[-0.05em]">
            Frequently asked
          </h2>
          <div className="mt-7 divide-y divide-border border-y border-border">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Do I earn money just by signing up?
                <span
                  className="text-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                No. You earn only when you complete eligible task work and that
                submission is approved.
              </p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Does a package guarantee tasks or earnings?
                <span
                  className="text-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                No. A confirmed package payment is intended to activate eligible
                task access, but availability and earnings are not guaranteed.
              </p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                When does package access activate?
                <span
                  className="text-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Access can activate only after the payment provider confirms a
                successful transaction. Checkout is not available yet.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link to="/" className="zeno-wordmark" aria-label="Zeno home">
            zeno<span>.</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            AI Tasks. Real Skills. Flexible Work.
          </p>
          <Link
            to={appPath("/dashboard/payments")}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Explore task packages
          </Link>
        </div>
      </footer>
    </div>
  );
}
