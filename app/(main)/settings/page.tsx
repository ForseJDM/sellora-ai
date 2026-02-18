"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Bell, Shield, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [name, setName] = useState("Пользователь");
  const [email, setEmail] = useState("user@example.com");

  function handleSave() {
    toast.success("Настройки сохранены");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="mt-1 text-muted-foreground">Управляйте профилем и предпочтениями</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Профиль</CardTitle>
          </div>
          <CardDescription>Основная информация аккаунта</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Имя</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <Button onClick={handleSave}>Сохранить</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Уведомления</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email-уведомления</p>
              <p className="text-xs text-muted-foreground">Получать письма о завершении генераций</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Telegram-уведомления</p>
              <p className="text-xs text-muted-foreground">Уведомления в Telegram-бот</p>
            </div>
            <input type="checkbox" className="h-4 w-4 accent-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Legal & Support */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Документы и поддержка</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Политика конфиденциальности", href: "/privacy" },
            { label: "Условия использования", href: "/terms" },
            { label: "Публичная оферта", href: "/offer" },
          ].map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-accent"
            >
              <span>{doc.label}</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          ))}
          <Separator />
          <a
            href="https://t.me/sellora_support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-accent"
          >
            <span>Поддержка — @sellora_support</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-destructive" />
            <CardTitle className="text-lg text-destructive">Опасная зона</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Удалить аккаунт</p>
            <p className="text-xs text-muted-foreground">Это действие нельзя отменить</p>
          </div>
          <Button variant="destructive" size="sm">Удалить</Button>
        </CardContent>
      </Card>
    </div>
  );
}
