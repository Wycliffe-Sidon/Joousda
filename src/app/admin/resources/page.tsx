import { deleteResource, saveResource } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

export default async function AdminResourcesPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Downloads and Resources</h1>
      {data.resources.map((item) => (
        <form key={item.id} action={saveResource} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <input name="title" defaultValue={item.title} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="category" defaultValue={item.category} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <textarea name="description" defaultValue={item.description} rows={5} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <UploadField name="fileUrl" label="PDF or file upload" folder="resources" accept=".pdf,image/*" defaultValue={item.fileUrl} />
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Resource</SubmitButton>
            <button formAction={deleteResource} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveResource} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Resource</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input name="title" placeholder="Title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="category" placeholder="Category" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <textarea name="description" rows={5} placeholder="Description" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
          </div>
          <UploadField name="fileUrl" label="PDF or file upload" folder="resources" accept=".pdf,image/*" />
        </div>
        <div className="mt-5">
          <SubmitButton>Create Resource</SubmitButton>
        </div>
      </form>
    </div>
  );
}
