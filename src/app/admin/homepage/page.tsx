import { deleteHomepageSection, saveHomepageSection } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

export default async function AdminHomepagePage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Homepage Structure</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Homepage Sections</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Reorder the homepage, switch sections on or off, and create custom sections with their own content and
          artwork. Core sections keep their dedicated content editors while this page controls layout and custom blocks.
        </p>
      </div>

      {data.homepageSections.map((item) => (
        <form key={item.id} action={saveHomepageSection} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="key"
                  defaultValue={item.key}
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
                />
                <input
                  name="displayOrder"
                  type="number"
                  defaultValue={item.displayOrder}
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
              <input
                name="title"
                defaultValue={item.title ?? ""}
                placeholder="Section title"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <input
                name="subtitle"
                defaultValue={item.subtitle ?? ""}
                placeholder="Section eyebrow or subtitle"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <textarea
                name="body"
                defaultValue={item.body ?? ""}
                rows={5}
                placeholder="Optional section description"
                className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="ctaLabel"
                  defaultValue={item.ctaLabel ?? ""}
                  placeholder="CTA label"
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
                />
                <input
                  name="ctaHref"
                  defaultValue={item.ctaHref ?? ""}
                  placeholder="CTA href"
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-slate-700 dark:text-slate-300">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="enabled" defaultChecked={item.enabled} className="h-4 w-4 rounded border-slate-300" />
                  Enabled
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="isCustom" defaultChecked={item.isCustom} className="h-4 w-4 rounded border-slate-300" />
                  Custom section
                </label>
              </div>
            </div>
            <UploadField
              name="imageUrl"
              label="Optional section image"
              folder="images"
              accept="image/*"
              defaultValue={item.imageUrl}
            />
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Section Layout</SubmitButton>
            <button formAction={deleteHomepageSection} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveHomepageSection} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Custom Section</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="key"
                placeholder="section-key"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <input
                name="displayOrder"
                type="number"
                placeholder="Display order"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
            <input
              name="title"
              placeholder="Section title"
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              name="subtitle"
              placeholder="Section subtitle"
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
            <textarea
              name="body"
              rows={5}
              placeholder="Section description"
              className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="ctaLabel"
                placeholder="CTA label"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <input
                name="ctaHref"
                placeholder="CTA href"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" name="enabled" defaultChecked className="h-4 w-4 rounded border-slate-300" />
              Enabled on homepage
            </label>
            <input type="hidden" name="isCustom" value="on" />
          </div>
          <UploadField name="imageUrl" label="Section image" folder="images" accept="image/*" />
        </div>
        <div className="mt-5">
          <SubmitButton>Create Custom Section</SubmitButton>
        </div>
      </form>
    </div>
  );
}
