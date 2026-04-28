"use client";

import Image from "next/image";
import { useState } from "react";

type UploadFieldProps = {
  name: string;
  folder: string;
  accept: string;
  label: string;
  defaultValue?: string | null;
};

export function UploadField({
  name,
  folder,
  accept,
  label,
  defaultValue,
}: UploadFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch(`/api/upload?folder=${folder}`, {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (payload.url) {
        setValue(payload.url);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={value} readOnly />
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleUpload(file);
          }
        }}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:font-semibold file:text-sky-700 dark:text-slate-300 dark:file:bg-sky-950/50 dark:file:text-sky-100"
      />
      {loading ? <p className="text-xs text-slate-500">Uploading...</p> : null}
      {value ? (
        value.endsWith(".pdf") ? (
          <a href={value} target="_blank" className="text-sm text-sky-600">
            Current file: {value}
          </a>
        ) : (
          <div className="relative h-32 w-48 overflow-hidden rounded-2xl">
            <Image src={value} alt="Upload preview" fill className="object-cover" />
          </div>
        )
      ) : null}
    </div>
  );
}
