import { deleteSermon, saveSermon } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

export default async function AdminSermonsPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Sermons and Media</h1>
      {data.sermons.map((item) => (
        <form key={item.id} action={saveSermon} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <input name="title" defaultValue={item.title} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="preacher" defaultValue={item.preacher} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="preachedAt" type="date" defaultValue={item.preachedAt} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="videoUrl" defaultValue={item.videoUrl} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="tags" defaultValue={item.tags ?? ""} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <textarea name="summary" defaultValue={item.summary ?? ""} rows={5} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <label className="flex items-center gap-3 text-sm">
                <input name="featured" type="checkbox" defaultChecked={item.featured ?? false} />
                Feature on homepage
              </label>
            </div>
            <UploadField name="thumbnailUrl" label="Thumbnail image" folder="images" accept="image/*" defaultValue={item.thumbnailUrl} />
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Sermon</SubmitButton>
            <button formAction={deleteSermon} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveSermon} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Sermon</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input name="title" placeholder="Title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="preacher" placeholder="Preacher" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="preachedAt" type="date" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="videoUrl" placeholder="YouTube URL" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="tags" placeholder="Faith, Mission, Youth" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <textarea name="summary" rows={5} placeholder="Summary" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <label className="flex items-center gap-3 text-sm">
              <input name="featured" type="checkbox" />
              Feature on homepage
            </label>
          </div>
          <UploadField name="thumbnailUrl" label="Thumbnail image" folder="images" accept="image/*" />
        </div>
        <div className="mt-5">
          <SubmitButton>Create Sermon</SubmitButton>
        </div>
      </form>
    </div>
  );
}
