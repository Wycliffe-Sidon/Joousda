import { saveContentBlock, saveServiceTime, deleteServiceTime } from "@/app/admin/actions";
import { RichTextField } from "@/components/admin/rich-text-field";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

export default async function AdminSettingsPage() {
  const data = await getAdminData();
  const blocks = ["hero", "mission", "chaplain-message", "beliefs-intro"] as const;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Homepage Settings</h1>

      {blocks.map((key) => {
        const item = data.content[key];
        return (
          <form key={key} action={saveContentBlock} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
            <input type="hidden" name="key" value={key} />
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-4">
                <input name="title" defaultValue={item?.title ?? ""} placeholder="Title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="subtitle" defaultValue={item?.subtitle ?? ""} placeholder="Subtitle" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="ctaLabel" defaultValue={item?.ctaLabel ?? ""} placeholder="Primary CTA label" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="ctaHref" defaultValue={item?.ctaHref ?? ""} placeholder="Primary CTA href" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="secondaryCtaLabel" defaultValue={item?.secondaryCtaLabel ?? ""} placeholder="Secondary CTA label" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="secondaryCtaHref" defaultValue={item?.secondaryCtaHref ?? ""} placeholder="Secondary CTA href" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <textarea name="metadata" defaultValue={item?.metadata ?? ""} rows={5} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder='JSON metadata, e.g. {"eyebrow":"Campus Worship"}' />
              </div>
              <div className="space-y-4">
                <UploadField
                  name="imageUrl"
                  label="Banner image"
                  folder="images"
                  accept="image/*"
                  defaultValue={item?.imageUrl}
                />
                <RichTextField name="body" label="Body content" defaultValue={item?.body} rows={10} />
              </div>
            </div>
            <div className="mt-5">
              <SubmitButton>Save Section</SubmitButton>
            </div>
          </form>
        );
      })}

      <div className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Service Times</h2>
        <div className="mt-6 grid gap-4">
          {data.serviceTimes.map((item) => (
            <form key={item.id} action={saveServiceTime} className="grid gap-3 rounded-[1.5rem] border border-slate-200 p-4 dark:border-slate-800">
              <input type="hidden" name="id" value={item.id} />
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                <input name="title" defaultValue={item.title} className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="day" defaultValue={item.day} className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="startTime" defaultValue={item.startTime} className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="endTime" defaultValue={item.endTime} className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <input name="displayOrder" defaultValue={item.displayOrder} type="number" className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              </div>
              <textarea name="description" defaultValue={item.description ?? ""} rows={3} className="w-full rounded-[1.25rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <div className="flex gap-3">
                <SubmitButton>Update</SubmitButton>
                <button formAction={deleteServiceTime} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
                  Delete
                </button>
              </div>
            </form>
          ))}

          <form action={saveServiceTime} className="grid gap-3 rounded-[1.5rem] border border-dashed border-slate-300 p-4 dark:border-slate-700">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <input name="title" placeholder="Title" className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="day" placeholder="Day" className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="startTime" placeholder="Start" className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="endTime" placeholder="End" className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="displayOrder" type="number" placeholder="Order" className="h-11 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <textarea name="description" placeholder="Description" rows={3} className="w-full rounded-[1.25rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <SubmitButton>Add Service Time</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
