"use client";

import { useState } from "react";
import { Copy, Users, Coins, TrendingUp, Gift, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://sellora.ai/register?ref=abc123";

  function handleCopy() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Ссылка скопирована!");
    setTimeout(() => setCopied(false), 2000);
  }

  const stats = [
    { label: "Приглашённых", value: "0", icon: Users },
    { label: "Заработано токенов", value: "0", icon: Coins },
    { label: "Активных друзей", value: "0", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Реферальная программа</h1>
        <p className="mt-1 text-muted-foreground">
          Приглашайте друзей — получайте 25% от их покупок навсегда
        </p>
      </div>

      {/* Referral link */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="text-lg">Ваша реферальная ссылка</CardTitle>
          <CardDescription>
            Друг получит +150 токенов, вы — +75. Плюс 25% от каждой покупки друга пожизненно.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="font-mono text-sm" />
            <Button onClick={handleCopy} variant="outline">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ambassador */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
            <Gift className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Статус Амбассадор</h3>
            <p className="text-sm text-muted-foreground">
              Пригласите 5 активных друзей → +15% токенов навсегда + приоритет генераций
            </p>
          </div>
          <Badge variant="secondary">0/5 друзей</Badge>
        </CardContent>
      </Card>

      {/* Empty friends list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Приглашённые друзья</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-8 text-center">
            <Users className="h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              Пока никого нет. Поделитесь ссылкой, чтобы начать зарабатывать!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
