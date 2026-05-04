import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/app/admin/actions";

const links = [
  ["Overview", "/admin"],
  ["Settings", "/admin/settings"],
  ["Homepage", "/admin/homepage"],
  ["Streaming & Year", "/admin/streaming"],
  ["Gallery", "/admin/gallery"],
  ["Events", "/admin/events"],
  ["Departments", "/admin/departments"],
  ["Music", "/admin/music"],
  ["Leadership", "/admin/leadership"],
  ["Sermons", "/admin/sermons"],
  ["Resources", "/admin/resources"],
  ["Submissions", "/admin/submissions"],
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">Admin Dashboard</p>
          <h2 className="mt-3 text-2xl font-semibold">JOOUSDA CMS</h2>
          <p className="mt-2 text-sm text-slate-300">{session?.user?.email}</p>
          <nav className="mt-8 grid gap-2">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-8">
            <button className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">
              Sign Out
            </button>
          </form>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
