import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="h-6 w-6" />
          Sellora AI
        </Link>
        <div>
          <blockquote className="text-lg font-medium leading-relaxed">
            &laquo;За 3 месяца мы увеличили CTR карточек на 40% и сэкономили 50 000 ₽ на
            фотографе. Sellora окупилась за первую неделю.&raquo;
          </blockquote>
          <p className="mt-4 text-sm opacity-80">— Алексей, селлер WB (500+ SKU)</p>
        </div>
        <p className="text-xs opacity-60">&copy; {new Date().getFullYear()} Sellora AI</p>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
