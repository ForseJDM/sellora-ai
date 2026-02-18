"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  ImagePlus,
  History,
  Users,
  Coins,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TelegramIcon } from "@/components/ui/telegram-icon";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/generate", label: "Генерация", icon: ImagePlus },
  { href: "/history", label: "История", icon: History },
  { href: "/referrals", label: "Рефералы", icon: Users },
  { href: "/tokens", label: "Токены", icon: Coins },
  { href: "/settings", label: "Настройки", icon: Settings },
];

function Sidebar({ className, onClose }: { className?: string; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex h-full w-64 flex-col border-r bg-card", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold">
          <Sparkles className="h-5 w-5 text-primary" />
          Sellora AI
        </Link>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Separator />

      {/* Token balance */}
      <div className="p-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-lg bg-primary/10 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Баланс</span>
            <Badge variant="secondary" className="text-xs">+20/день</Badge>
          </div>
          <p className="mt-1 text-2xl font-bold">150</p>
          <p className="text-xs text-muted-foreground">токенов</p>
          <Button size="sm" className="mt-2 w-full" asChild>
            <Link href="/tokens">Пополнить</Link>
          </Button>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <motion.span
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.18 },
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex shrink-0"
                >
                  <item.icon className="h-4 w-4" />
                </motion.span>
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <Separator />

      {/* Support TG */}
      <div className="px-3 py-2">
        <a
          href="https://t.me/sellora_support"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <TelegramIcon className="h-4 w-4 shrink-0 text-[#0088cc]" />
          Поддержка в TG
        </a>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.18 }}
          className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
        </motion.button>
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 h-full"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex h-16 items-center justify-between border-b px-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            Sellora AI
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Coins className="h-4 w-4 text-primary" />
            150
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
