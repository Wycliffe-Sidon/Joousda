"use client";

import { useState } from "react";
import { saveResource, deleteResource } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";

type ResourceItem = {
  id?: number;
  title?: string;
  category?: string;
  description?: string;
  fileUrl?: string | null;
};

export function ResourceForm({
  item,
  mode,
}: {
  item?: ResourceItem;
  mode: "create" | "edit";
}) {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(item?.fileUrl ?? "");

  return (
    <form
      action={saveResource}
      className={
        mode === "edit"
          ? "rounded-[2rem] bg-white p-6 dark:bg-slate-900"
          : "rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
      }
    >
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      {mode === "create" ? <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Resource</h2> : null}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <input
            name="title"
            defaultValue={item?.title ?? ""}
            placeholder="Title"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            name="category"
            defaultValue={item?.category ?? ""}
            placeholder="Category"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <textarea
            name="description"
            defaultValue={item?.description ?? ""}
            rows={5}
            placeholder="Description"
            className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            name="fileUrl"
            value={fileUrl}
            onChange={(event) => setFileUrl(event.target.value)}
            placeholder="Uploaded file URL appears here"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          <p className="text-xs text-slate-500">You can upload a file below or paste a direct file URL manually.</p>
        </div>
        <UploadField
          name="resourceUpload"
          label="PDF or file upload"
          folder="resources"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*"
          defaultValue={item?.fileUrl}
          onUploadStateChange={setUploading}
          onValueChange={setFileUrl}
        />
      </div>
      <div className="mt-5 flex gap-3">
        <SubmitButton className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
          {uploading ? "Upload in progress..." : mode === "edit" ? "Save Resource" : "Create Resource"}
        </SubmitButton>
        {mode === "edit" && item?.id ? (
          <button
            formAction={deleteResource}
            disabled={uploading}
            className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600 disabled:opacity-60"
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
