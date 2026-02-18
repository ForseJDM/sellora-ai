import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <p className="text-8xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Страница не найдена</h1>
      <p className="mt-2 text-muted-foreground">Такой страницы не существует или она была удалена.</p>
      <Button className="mt-8" asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          На главную
        </Link>
      </Button>
    </div>
  );
}
