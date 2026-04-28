"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { ensureDatabase } from "@/db/init";
import { contactSubmissions, prayerRequests } from "@/db/schema";
import { contactSchema, prayerSchema } from "@/lib/validations";

export async function submitContactForm(formData: FormData) {
  await ensureDatabase();

  const data = contactSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  await db.insert(contactSubmissions).values(data);
  revalidatePath("/contact");
  revalidatePath("/admin/submissions");
}

export async function submitPrayerRequest(formData: FormData) {
  await ensureDatabase();

  const data = prayerSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    request: formData.get("request"),
    isConfidential: formData.get("isConfidential") === "on",
  });

  await db.insert(prayerRequests).values(data);
  revalidatePath("/contact");
  revalidatePath("/admin/submissions");
}
