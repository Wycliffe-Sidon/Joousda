import { deleteLeader, saveLeader } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { leadershipGroups } from "@/lib/constants";
import { getAdminData } from "@/lib/site";

export default async function AdminLeadershipPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Leadership Team</h1>
      {data.leadership.map((item) => (
        <form key={item.id} action={saveLeader} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input name="name" defaultValue={item.name} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="role" defaultValue={item.role} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <select name="group" defaultValue={item.group} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950">
                  {leadershipGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <input name="displayOrder" type="number" defaultValue={item.displayOrder} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="email" defaultValue={item.email ?? ""} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="phone" defaultValue={item.phone ?? ""} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              </div>
              <textarea name="bio" defaultValue={item.bio ?? ""} rows={5} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <UploadField name="imageUrl" label="Profile photo" folder="images" accept="image/*" defaultValue={item.imageUrl} />
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Leader</SubmitButton>
            <button formAction={deleteLeader} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveLeader} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Leader</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" placeholder="Name" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="role" placeholder="Role" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <select name="group" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950">
                {leadershipGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              <input name="displayOrder" type="number" placeholder="Display order" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="email" placeholder="Email" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="phone" placeholder="Phone" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <textarea name="bio" rows={5} placeholder="Bio" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
          </div>
          <UploadField name="imageUrl" label="Profile photo" folder="images" accept="image/*" />
        </div>
        <div className="mt-5">
          <SubmitButton>Create Leader</SubmitButton>
        </div>
      </form>
    </div>
  );
}
