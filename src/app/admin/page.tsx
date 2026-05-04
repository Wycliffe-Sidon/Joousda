import { getAdminData } from "@/lib/site";

export default async function AdminDashboardPage() {
  const data = await getAdminData();

  const stats = [
    ["Featured weekly items", data.events.filter((item) => item.featured).length],
    ["Homepage sections", data.homepageSections.length],
    ["Gallery images", data.galleryImages.length],
    ["Departments", data.departments.length],
    ["Music groups", data.musicGroups.length],
    ["Leadership profiles", data.leadership.length],
    ["Sermons", data.sermons.length],
    ["Resources", data.resources.length],
    ["Contact messages", data.contactSubmissions.length],
    ["Prayer requests", data.prayerRequests.length],
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Overview</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Content management dashboard
        </h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-[1.75rem] bg-white p-6 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
