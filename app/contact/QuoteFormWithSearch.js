"use client";
import { useSearchParams } from "next/navigation";
import QuoteForm from "@/components/QuoteForm";
import { services } from "@/lib/content";

export default function QuoteFormWithSearch() {
  const params = useSearchParams();
  const raw = params.get("service") || "";
  const match = services.find((s) => s.slug === raw || s.name === raw);
  return <QuoteForm defaultService={match ? match.name : ""} />;
}
