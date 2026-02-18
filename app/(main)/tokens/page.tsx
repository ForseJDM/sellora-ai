import Link from "next/link";
import { Coins, Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Старт",
    price: 490,
    tokens: 500,
    perPhoto: "0.98 ₽",
    icon: Zap,
    features: ["500 токенов", "Без watermark", "Цифровой двойник"],
    popular: false,
  },
  {
    name: "Креатор",
    price: 1490,
    tokens: 2000,
    perPhoto: "0.745 ₽",
    icon: Star,
    features: ["2 000 токенов", "1 бесплатное видео", "Full Card Kit", "Предиктор CTR"],
    popular: true,
  },
  {
    name: "Бизнес",
    price: 3990,
    tokens: 7000,
    perPhoto: "0.57 ₽",
    icon: Crown,
    features: ["7 000 токенов", "Безлимитное видео", "Bulk-загрузка", "API доступ", "Приоритет"],
    popular: false,
  },
];

export default function TokensPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Токены и тарифы</h1>
        <p className="mt-1 text-muted-foreground">
          Пополните баланс. Бонус +100% токенов на первый депозит!
        </p>
      </div>

      {/* Current balance */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Coins className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Текущий баланс</p>
            <p className="text-3xl font-bold">150 <span className="text-lg font-normal text-muted-foreground">токенов</span></p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            +20 токенов/день
          </Badge>
        </CardContent>
      </Card>

      {/* First deposit bonus */}
      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Star className="h-5 w-5 text-yellow-500" />
          <p className="text-sm font-medium">
            Первый депозит — <span className="text-yellow-500">+100% токенов бонусом!</span> Купите 500 — получите 1 000.
          </p>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card
            key={p.name}
            className={`relative flex flex-col ${p.popular ? "border-primary shadow-lg shadow-primary/10" : ""}`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>Популярный</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <p.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{p.name}</CardTitle>
              <CardDescription>{p.perPhoto} за фото</CardDescription>
              <p className="text-3xl font-bold">{p.price.toLocaleString("ru-RU")} ₽</p>
              <p className="text-sm text-muted-foreground">{p.tokens.toLocaleString("ru-RU")} токенов</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <ul className="flex-1 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={p.popular ? "default" : "outline"}>
                Купить
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video pack */}
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <h3 className="font-semibold">Видео-пак</h3>
            <p className="text-sm text-muted-foreground">10 видео по 10 сек — 990 ₽</p>
          </div>
          <Button variant="outline">Купить</Button>
        </CardContent>
      </Card>
    </div>
  );
}
