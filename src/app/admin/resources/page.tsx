import { ResourceForm } from "@/components/admin/resource-form";
import { getAdminData } from "@/lib/site";

export default async function AdminResourcesPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Downloads and Resources</h1>
      {data.resources.map((item) => (
        <ResourceForm key={item.id} item={item} mode="edit" />
      ))}

      <ResourceForm mode="create" />
    </div>
  );
}
