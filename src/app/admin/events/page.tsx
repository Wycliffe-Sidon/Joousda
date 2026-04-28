import { deleteEvent, saveEvent } from "@/app/admin/actions";
import { RichTextField } from "@/components/admin/rich-text-field";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

export default async function AdminEventsPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Events and This Week</h1>
      {data.events.map((item) => (
        <form key={item.id} action={saveEvent} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <input name="title" defaultValue={item.title} placeholder="Title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="slug" defaultValue={item.slug} placeholder="Slug" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="category" defaultValue={item.category} placeholder="Category" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="location" defaultValue={item.location ?? ""} placeholder="Location" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="startDate" type="date" defaultValue={item.startDate} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="endDate" type="date" defaultValue={item.endDate ?? ""} className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              </div>
              <textarea name="summary" defaultValue={item.summary} rows={4} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <label className="flex items-center gap-3 text-sm">
                <input name="featured" type="checkbox" defaultChecked={item.featured ?? false} />
                Show in “This Week at JOOUSDA”
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input name="published" type="checkbox" defaultChecked={item.published ?? true} />
                Published
              </label>
            </div>
            <div className="space-y-4">
              <UploadField name="imageUrl" label="Event image" folder="images" accept="image/*" defaultValue={item.imageUrl} />
              <RichTextField name="body" label="Event details" defaultValue={item.body} />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Event</SubmitButton>
            <button formAction={deleteEvent} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveEvent} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Event</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input name="title" placeholder="Title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="slug" placeholder="Slug" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="category" placeholder="Category" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="location" placeholder="Location" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="startDate" type="date" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="endDate" type="date" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <textarea name="summary" placeholder="Short summary" rows={4} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <label className="flex items-center gap-3 text-sm">
              <input name="featured" type="checkbox" />
              Show in “This Week at JOOUSDA”
            </label>
          </div>
          <div className="space-y-4">
            <UploadField name="imageUrl" label="Event image" folder="images" accept="image/*" />
            <RichTextField name="body" label="Event details" />
          </div>
        </div>
        <div className="mt-5">
          <SubmitButton>Create Event</SubmitButton>
        </div>
      </form>
    </div>
  );
}
