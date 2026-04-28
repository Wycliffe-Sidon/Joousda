import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { loginAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/forms/submit-button";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Admin Portal</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Sign in to JOOUSDA CMS</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          Use your church admin email and password to manage the website.
        </p>
        <form action={loginAction} className="mt-8 space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <SubmitButton className="w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white">
            Sign In
          </SubmitButton>
        </form>
      </div>
    </section>
  );
}
