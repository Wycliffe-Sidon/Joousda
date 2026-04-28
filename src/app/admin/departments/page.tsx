import { deleteDepartment, saveDepartment } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

export default async function AdminDepartmentsPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Departments</h1>
      {data.departments.map((item) => (
        <form key={item.id} action={saveDepartment} className="rounded-[2rem] bg-white p-6 dark:bg-slate-900">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <input name="name" defaultValue={item.name} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <input name="ctaLabel" defaultValue={item.ctaLabel ?? ""} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
              <textarea name="description" defaultValue={item.description} rows={6} className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
            </div>
            <UploadField name="imageUrl" label="Department image" folder="images" accept="image/*" defaultValue={item.imageUrl} />
          </div>
          <div className="mt-5 flex gap-3">
            <SubmitButton>Save Department</SubmitButton>
            <button formAction={deleteDepartment} className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600">
              Delete
            </button>
          </div>
        </form>
      ))}

      <form action={saveDepartment} className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Department</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input name="name" placeholder="Department name" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <input name="ctaLabel" placeholder="CTA label" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950" />
            <textarea name="description" rows={6} placeholder="Description" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" />
          </div>
          <UploadField name="imageUrl" label="Department image" folder="images" accept="image/*" />
        </div>
        <div className="mt-5">
          <SubmitButton>Create Department</SubmitButton>
        </div>
      </form>
    </div>
  );
}
