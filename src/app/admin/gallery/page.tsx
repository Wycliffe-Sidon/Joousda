import { deleteGalleryImage, saveGalleryImage } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

const targetOptions = [
  ["hero", "Hero"],
  ["gallery", "Gallery"],
  ["this-week", "This Week"],
  ["worship-schedule", "Worship Schedule"],
  ["mission", "Mission"],
  ["history", "History"],
  ["beliefs", "Beliefs"],
  ["leadership", "Leadership"],
  ["departments", "Departments"],
  ["music-choirs", "Music & Choirs"],
  ["chaplain-message", "Chaplain Message"],
  ["next-steps", "Next Steps"],
  ["resources", "Resources"],
  ["sermons", "Sermons"],
] as const;

export default async function AdminGalleryPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Homepage Media</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Church Gallery</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Add, edit, reorder, and connect gallery images to homepage sections. These cards appear in the ministry
          gallery and open in a lightbox on the public site.
        </p>
      </div>

      {data.galleryImages.map((item) => (
        <form key={item.id} action={saveGalleryImage} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <input
                name="title"
                defaultValue={item.title}
                placeholder="Gallery title"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <input
                name="caption"
                defaultValue={item.caption ?? ""}
                placeholder="Caption"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <select
                  name="targetId"
                  defaultValue={item.targetId ?? ""}
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value="">No section target</option>
                  {targetOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  name="displayOrder"
                  type="number"
                  defaultValue={item.displayOrder}
                  placeholder="Display order"
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
            </div>
            <UploadField
              name="imageUrl"
              label="Gallery image"
              folder="images"
              accept="image/*"
              defaultValue={item.imageUrl}
            />
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Gallery Image</SubmitButton>
            <button formAction={deleteGalleryImage} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveGalleryImage} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Gallery Image</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input
              name="title"
              placeholder="Gallery title"
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              name="caption"
              placeholder="Caption"
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <select
                name="targetId"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="">No section target</option>
                {targetOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                name="displayOrder"
                type="number"
                placeholder="Display order"
                className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
          </div>
          <UploadField name="imageUrl" label="Gallery image" folder="images" accept="image/*" />
        </div>
        <div className="mt-5">
          <SubmitButton>Create Gallery Image</SubmitButton>
        </div>
      </form>
    </div>
  );
}
