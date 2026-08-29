import { brand } from "@/data/brand";

export function buildWhatsappUrl(message?: string): string {
  const text = message ?? brand.whatsappDefaultMessage;
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
