import { formatDisplayDate } from "@/lib/utils";
import { getAdminData } from "@/lib/site";

export default async function AdminSubmissionsPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Form Submissions</h1>
      <section className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Contact Messages</h2>
        <div className="mt-6 grid gap-4">
          {data.contactSubmissions.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.subject}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {item.name} • {item.email} • {formatDisplayDate(item.createdAt)}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.message}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Prayer Requests</h2>
        <div className="mt-6 grid gap-4">
          {data.prayerRequests.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {item.email || "No email"} • {item.phone || "No phone"} • {formatDisplayDate(item.createdAt)}
              </p>
              {item.isConfidential ? (
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Confidential</p>
              ) : null}
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.request}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
