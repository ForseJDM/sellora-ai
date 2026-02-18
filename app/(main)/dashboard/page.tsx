import Link from "next/link";
import {
  ImagePlus,
  TrendingUp,
  Coins,
  Users,
  ArrowRight,
  Sparkles,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Токенов", value: "150", icon: Coins, color: "text-primary" },
  { label: "Генераций", value: "0", icon: ImagePlus, color: "text-blue-500" },
  { label: "Рефералов", value: "0", icon: Users, color: "text-green-500" },
  { label: "CTR прирост", value: "—", icon: TrendingUp, color: "text-orange-500" },
];

const quickActions = [
  {
    title: "Новая генерация",
    desc: "Загрузите фото и получите продающие визуалы",
    icon: Sparkles,
    href: "/generate",
  },
  {
    title: "Предиктор CTR",
    desc: "Узнайте, какое фото даст больше продаж",
    icon: BarChart3,
    href: "/generate",
  },
  {
    title: "История",
    desc: "Все ваши сгенерированные изображения",
    icon: Clock,
    href: "/history",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Добро пожаловать!</h1>
        <p className="mt-1 text-muted-foreground">
          Ваш дашборд Sellora AI. Начните генерацию продающих фото.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-accent ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Быстрые действия</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((a) => (
            <Link key={a.title} href={a.href}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <a.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Пригласите друга — получите токены</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              25% от каждой покупки друга — навсегда. Пожизненная реферальная программа.
            </p>
          </div>
          <Button asChild>
            <Link href="/referrals">
              Пригласить <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
