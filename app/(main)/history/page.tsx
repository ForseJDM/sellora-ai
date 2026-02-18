import { ImagePlus, Clock, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">История генераций</h1>
        <p className="mt-1 text-muted-foreground">Все ваши сгенерированные изображения</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Поиск по генерациям..." className="pl-10" />
      </div>

      {/* Empty state */}
      <Card>
        <CardContent className="flex flex-col items-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Пока пусто</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Здесь появятся все ваши генерации. Перейдите в раздел «Генерация», чтобы создать первые визуалы.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
