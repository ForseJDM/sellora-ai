import Link from "next/link";
import {
  Sparkles,
  Zap,
  ImagePlus,
  BarChart3,
  ArrowRight,
  Check,
  Star,
  Users,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="h-6 w-6 text-primary" />
          Sellora AI
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#how-it-works" className="text-muted-foreground transition-colors hover:text-foreground">
            Как это работает
          </a>
          <a href="#pricing" className="text-muted-foreground transition-colors hover:text-foreground">
            Цены
          </a>
          <a href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
            Возможности
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Войти</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Начать бесплатно</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(262_83%_58%/0.15),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
          <Star className="mr-1.5 h-3.5 w-3.5 text-primary" />
          От 0.57 ₽/фото · Бонус +100% на первый депозит
        </Badge>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          AI-фабрика продающих визуалов для{" "}
          <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            WB / Ozon / YM
          </span>{" "}
          по суперценам
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Цифровой двойник товара, предиктор CTR, полная карточка за 1 клик.
          В 10–50 раз дешевле среднерыночных цен — от 0.57 ₽ за фото.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="xl" asChild>
            <Link href="/register">
              Начать бесплатно — 150 токенов
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#how-it-works">Как это работает?</a>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Без карты. 150 бесплатных генераций + 20 каждый день.
        </p>

        {/* Hero preview */}
        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-muted-foreground">sellora.ai/generate</span>
          </div>
          <div className="grid grid-cols-4 gap-3 p-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20"
              >
                <ImagePlus className="h-8 w-8 text-primary/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Загрузите 1–4 фото товара",
      description:
        "Сфотографируйте товар с разных сторон. AI создаст цифровой двойник за 3 минуты — товар будет 100% одинаковым во всех сценах.",
      icon: ImagePlus,
    },
    {
      step: "02",
      title: "AI создаёт продающие визуалы",
      description:
        "Flux.1.1 генерирует фото в красивых сценах. LLM пишет продающие промпты. Получаете 9–12 слайдов карточки за 1 клик.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Публикуйте и продавайте",
      description:
        "Скачайте готовую карточку в формате WB/Ozon. AI-предиктор покажет, какое фото даст +25–40% к продажам.",
      icon: BarChart3,
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Как это работает</Badge>
          <h2 className="text-3xl font-bold sm:text-4xl">3 шага до идеальной карточки</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Без дизайнеров, фотографов и студий. Только вы и AI.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.step} className="relative overflow-hidden border-2 transition-colors hover:border-primary/50">
              <div className="absolute right-4 top-4 text-6xl font-bold text-primary/10">
                {s.step}
              </div>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4 text-xl">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Zap, title: "Цифровой двойник", desc: "Товар 100% одинаковый во всех сценах" },
    { icon: ImagePlus, title: "Full Card Kit", desc: "9–12 слайдов карточки за 1 клик" },
    { icon: BarChart3, title: "Предиктор CTR", desc: "AI покажет, какое фото даст +35% продаж" },
    { icon: Users, title: "Реферальная программа", desc: "25% пожизненно от покупок друзей" },
    { icon: Shield, title: "Бренд-кит", desc: "Сохраняйте стиль для всех товаров" },
    { icon: Sparkles, title: "Видео 10 сек", desc: "AI-видео для премиум-карточек" },
  ];

  return (
    <section id="features" className="border-t py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Возможности</Badge>
          <h2 className="text-3xl font-bold sm:text-4xl">Всё, что нужно селлеру</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-lg border p-5 transition-colors hover:bg-accent/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Бесплатно",
      price: "0 ₽",
      tokens: "150 + 20/день",
      features: ["150 токенов при регистрации", "20 токенов ежедневно", "Базовая генерация", "Watermark"],
      cta: "Начать бесплатно",
      popular: false,
    },
    {
      name: "Старт",
      price: "490 ₽",
      tokens: "500",
      features: ["500 токенов", "0.98 ₽ за фото", "Без watermark", "Цифровой двойник"],
      cta: "Подключить",
      popular: false,
    },
    {
      name: "Креатор",
      price: "1 490 ₽",
      tokens: "2 000",
      features: ["2 000 токенов", "0.745 ₽ за фото", "1 бесплатное видео", "Full Card Kit", "Предиктор CTR"],
      cta: "Подключить",
      popular: true,
    },
    {
      name: "Бизнес",
      price: "3 990 ₽",
      tokens: "7 000",
      features: ["7 000 токенов", "0.57 ₽ за фото", "Неограниченное видео", "Bulk-загрузка", "Приоритет генераций", "API доступ"],
      cta: "Подключить",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="border-t py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">Цены</Badge>
          <h2 className="text-3xl font-bold sm:text-4xl">
            От <span className="text-primary">0.57 ₽</span> за фото
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Наши цены от 0.57 ₽/фото — в 10–50 раз дешевле среднерыночных.
            Бонус +100% токенов на первый депозит.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <p className="text-sm font-medium text-muted-foreground">{p.name}</p>
                <CardTitle className="text-3xl">{p.price}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.tokens} токенов</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={p.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/register">{p.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="border-t py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Готовы увеличить продажи?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Зарегистрируйтесь бесплатно и получите 150 токенов.
          Первый депозит — +100% бонус.
        </p>
        <Button size="xl" className="mt-8" asChild>
          <Link href="/register">
            Начать бесплатно
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  const legalLinks = [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Условия использования", href: "/terms" },
    { label: "Оферта", href: "/offer" },
  ];

  return (
    <footer className="border-t bg-card/40 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Sparkles className="h-5 w-5 text-primary" />
              Sellora AI
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              AI-фабрика продающих визуалов для маркетплейсов. От 0.57 ₽/фото.
            </p>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-3 text-sm font-semibold">Документы</p>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="mb-3 text-sm font-semibold">Поддержка</p>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a
                href="https://t.me/sellora_support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon className="h-4 w-4 text-[#0088cc]" />
                Поддержка в TG
              </a>
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              t.me/sellora_support или support@sellora.ai
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Sellora AI. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
