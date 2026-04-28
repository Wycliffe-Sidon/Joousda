import { deleteMusicGroup, saveMusicGroup } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

export default async function AdminMusicPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Choirs and Music Groups</h1>
      {data.musicGroups.map((item) => (
        <form key={item.id} action={saveMusicGroup} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <input name="name" defaultValue={item.name} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="memberCount" type="number" defaultValue={item.memberCount} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <textarea name="description" defaultValue={item.description} rows={6} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <UploadField name="imageUrl" label="Group photo" folder="images" accept="image/*" defaultValue={item.imageUrl} />
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Music Group</SubmitButton>
            <button formAction={deleteMusicGroup} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveMusicGroup} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Music Group</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input name="name" placeholder="Group name" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="memberCount" type="number" placeholder="Member count" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <textarea name="description" rows={6} placeholder="Description" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
          </div>
          <UploadField name="imageUrl" label="Group photo" folder="images" accept="image/*" />
        </div>
        <div className="mt-5">
          <SubmitButton>Create Music Group</SubmitButton>
        </div>
      </form>
    </div>
  );
}
