"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  X,
  Sparkles,
  ImagePlus,
  Film,
  LayoutGrid,
  Wand2,
  Loader2,
  Download,
  RotateCcw,
  ZoomIn,
  Coins,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* —————————————————————————— Constants —————————————————————————— */

const MAX_FILES = 4;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const categories = [
  "Электроника",
  "Одежда и обувь",
  "Дом и сад",
  "Красота и здоровье",
  "Продукты питания",
  "Детские товары",
  "Спорт и отдых",
  "Авто и мото",
  "Другое",
];

const modes = [
  {
    id: "photo",
    label: "Фото",
    desc: "4 варианта в разных сценах",
    icon: ImagePlus,
    tokens: 4,
    count: 4,
  },
  {
    id: "card",
    label: "Полная карточка",
    desc: "9–12 слайдов + инфографика",
    icon: LayoutGrid,
    tokens: 9,
    count: 9,
  },
  {
    id: "video",
    label: "Видео",
    desc: "10-сек промо-ролик",
    icon: Film,
    tokens: 15,
    count: 1,
    premium: true,
  },
] as const;

const aiIdeas = [
  "Товар на мраморной столешнице, мягкий дневной свет из окна слева, минималистичный бежевый фон, вид сверху под углом 45°, премиальная атмосфера, лёгкие тени",
  "Lifestyle сцена: товар в руках молодой женщины, уютный интерьер на фоне, тёплые тона, естественное боке, стиль журнала Kinfolk",
  "Товар на белом фоне с яркими цветными акцентами, студийный свет, отражение на глянцевой поверхности, стиль Apple product photo",
  "Flat lay композиция: товар в центре, вокруг тематические аксессуары, вид сверху, Instagram-эстетика, пастельные тона",
  "Товар в природном окружении, зелёные растения, деревянные текстуры, утренний золотистый свет, экологичный стиль",
];

/* ——————————————————————— File type ————————————————————————— */

interface UploadedFile {
  file: File;
  preview: string;
  name: string;
}

/* ————————————————————————— Step indicator ————————————————————————— */

function StepIndicator({
  step,
  current,
  label,
}: {
  step: number;
  current: number;
  label: string;
}) {
  const done = current > step;
  const active = current === step;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all",
          done && "bg-primary text-primary-foreground",
          active && "bg-primary text-primary-foreground ring-4 ring-primary/20",
          !done && !active && "bg-muted text-muted-foreground"
        )}
      >
        {done ? <CheckCircle2 className="h-4 w-4" /> : step}
      </div>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

/* ———————————————————————— Progress bar —————————————————————— */

function GenerationProgress({ progress }: { progress: number }) {
  const stages = [
    "Анализируем товар...",
    "Создаём цифровой двойник...",
    "AI усиливает промпт...",
    "Генерируем варианты...",
    "Пост-обработка...",
    "Финальные штрихи...",
  ];
  const stageIdx = Math.min(
    Math.floor((progress / 100) * stages.length),
    stages.length - 1
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{stages[stageIdx]}</span>
        <span className="font-medium tabular-nums">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/* ——————————————————————— Skeleton card ————————————————————— */

function ResultSkeleton() {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border bg-muted">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted-foreground/5 to-muted" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="relative">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        </div>
        <div className="h-2 w-16 animate-pulse rounded-full bg-muted-foreground/20" />
      </div>
    </div>
  );
}

/* —————————————————————— Result card —————————————————————— */

function ResultCard({ index }: { index: number }) {
  return (
    <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 via-background to-purple-500/5 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className="flex h-full flex-col items-center justify-center p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <ImagePlus className="h-7 w-7 text-primary/60" />
        </div>
        <p className="mt-3 text-sm font-medium">Вариант {index + 1}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">900 × 1200px</p>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" className="h-8 text-xs">
            <ZoomIn className="mr-1 h-3 w-3" />
            Просмотр
          </Button>
          <Button size="sm" className="h-8 text-xs">
            <Download className="mr-1 h-3 w-3" />
            Скачать
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ——————————————————————— Main page —————————————————————— */

export default function GeneratePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<string>("photo");
  const [category, setCategory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiIdeaLoading, setAiIdeaLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<number[]>([]);

  const currentMode = modes.find((m) => m.id === mode)!;
  const currentStep = results.length > 0 || generating ? 3 : files.length > 0 ? 2 : 1;

  /* —— File handling —— */

  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      const valid = Array.from(incoming).filter((f) => {
        if (!ACCEPTED_TYPES.includes(f.type)) {
          toast.error(`${f.name}: неподдерживаемый формат`);
          return false;
        }
        if (f.size > 10 * 1024 * 1024) {
          toast.error(`${f.name}: файл больше 10 МБ`);
          return false;
        }
        return true;
      });

      const remaining = MAX_FILES - files.length;
      if (remaining <= 0) {
        toast.error("Максимум 4 фото");
        return;
      }
      const toAdd = valid.slice(0, remaining).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      }));

      setFiles((prev) => [...prev, ...toAdd]);
      if (toAdd.length > 0) {
        toast.success(`Загружено ${toAdd.length} фото`);
      }
    },
    [files.length]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) processFiles(e.target.files);
    e.target.value = "";
  }

  function removeFile(idx: number) {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  }

  /* —— AI idea —— */

  async function handleAiIdea() {
    setAiIdeaLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const idea = aiIdeas[Math.floor(Math.random() * aiIdeas.length)];
    setPrompt(idea);
    setAiIdeaLoading(false);
    toast.success("AI предложил идею!");
  }

  /* —— Generate —— */

  async function handleGenerate() {
    if (files.length === 0) {
      toast.error("Загрузите хотя бы 1 фото");
      return;
    }
    setGenerating(true);
    setResults([]);
    setProgress(0);

    const duration = 5000;
    const interval = 80;
    let elapsed = 0;

    await new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        elapsed += interval;
        const p = Math.min((elapsed / duration) * 100, 99);
        setProgress(p);
        if (elapsed >= duration) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });

    setProgress(100);
    await new Promise((r) => setTimeout(r, 400));

    const count = currentMode.count;
    setResults(Array.from({ length: count }, (_, i) => i));
    setGenerating(false);
    toast.success(
      `Готово! ${count === 1 ? "Видео создано" : `${count} вариантов сгенерировано`}`
    );
  }

  function handleReset() {
    setResults([]);
    setProgress(0);
  }

  /* —— Cleanup previews ——— */
  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* —————————————————————— Render —————————————————————— */

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Генерация</h1>
          <p className="mt-1 text-muted-foreground">
            Загрузите фото товара — AI создаст продающие визуалы
          </p>
        </div>
        <Badge variant="outline" className="hidden gap-1.5 sm:flex">
          <Coins className="h-3.5 w-3.5 text-primary" />
          150 токенов
        </Badge>
      </div>

      {/* Step indicator bar */}
      <div className="flex items-center gap-6 overflow-x-auto pb-1">
        <StepIndicator step={1} current={currentStep} label="Загрузка фото" />
        <Separator className="w-8 shrink-0" />
        <StepIndicator step={2} current={currentStep} label="Настройки" />
        <Separator className="w-8 shrink-0" />
        <StepIndicator step={3} current={currentStep} label="Результат" />
      </div>

      {/* ——— STEP 1: Upload photos ——— */}
      <Card
        className={cn(
          "transition-all",
          currentStep === 1 && "ring-2 ring-primary/20"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </div>
            <CardTitle className="text-lg">Загрузите фото товара</CardTitle>
          </div>
          <CardDescription>
            До 4 фото с разных ракурсов. AI создаст цифровой двойник для 100%
            консистентности.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-muted-foreground/20 hover:border-primary/40 hover:bg-accent/30"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
                isDragging ? "bg-primary/20" : "bg-muted"
              )}
            >
              <Upload
                className={cn(
                  "h-7 w-7 transition-colors",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )}
              />
            </div>
            <p className="mt-4 text-sm font-medium">
              {isDragging ? "Отпустите для загрузки" : "Перетащите фото сюда"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              или нажмите для выбора &middot; JPG, PNG, WebP &middot; до 10 МБ
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: MAX_FILES }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 w-6 rounded-full transition-colors",
                    i < files.length ? "bg-primary" : "bg-muted-foreground/20"
                  )}
                />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">
                {files.length}/{MAX_FILES}
              </span>
            </div>
          </div>

          {/* Photo previews */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {files.map((f, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border bg-muted">
                  <img
                    src={f.preview}
                    alt={f.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="mr-0.5 inline h-2.5 w-2.5" />
                    Ракурс {i + 1}
                  </div>
                </div>
              ))}

              {/* Add more placeholder */}
              {files.length < MAX_FILES && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-muted-foreground/20 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs">Ещё фото</span>
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ——— STEP 2: Settings ——— */}
      <Card
        className={cn(
          "transition-all",
          currentStep === 2 && "ring-2 ring-primary/20",
          files.length === 0 && "opacity-50 pointer-events-none"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                files.length > 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              2
            </div>
            <CardTitle className="text-lg">Настройка генерации</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode selector */}
          <div>
            <label className="mb-2.5 block text-sm font-medium">
              Тип генерации
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                    mode === m.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-transparent bg-accent/50 hover:bg-accent"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                      mode === m.id ? "bg-primary/15" : "bg-muted"
                    )}
                  >
                    <m.icon
                      className={cn(
                        "h-5 w-5",
                        mode === m.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{m.label}</span>
                      {"premium" in m && m.premium && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          PRO
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {m.desc}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-bold text-primary">
                      {m.tokens}
                    </span>
                    <p className="text-[10px] text-muted-foreground">токенов</p>
                  </div>
                  {mode === m.id && (
                    <div className="absolute -right-px -top-px h-3 w-3 rounded-bl-md rounded-tr-xl bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Category dropdown */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Категория товара
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-lg border bg-background px-4 py-2.5 pr-10 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Выберите категорию</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Prompt / wishes */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">
                Пожелания{" "}
                <span className="font-normal text-muted-foreground">
                  (необязательно)
                </span>
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAiIdea}
                disabled={aiIdeaLoading}
                className="h-7 gap-1 text-xs text-primary hover:text-primary"
              >
                {aiIdeaLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Wand2 className="h-3 w-3" />
                )}
                AI-идея
              </Button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="Опишите желаемую сцену, стиль, фон, освещение, настроение..."
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm leading-relaxed placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
            />
            <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>AI автоматически усилит промпт для максимальных продаж</span>
              <span className="tabular-nums">{prompt.length}/2 000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ————————————— Generate button ————————————— */}
      <Button
        size="xl"
        className="w-full gap-2 text-base"
        onClick={handleGenerate}
        disabled={generating || files.length === 0}
      >
        {generating ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Генерируем...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Сгенерировать {currentMode.count === 1 ? "видео" : `${currentMode.count} вариантов`}
            <Badge variant="secondary" className="ml-1 text-xs">
              {currentMode.tokens} токенов
            </Badge>
          </>
        )}
      </Button>

      {/* ——— STEP 3: Results ——— */}
      {(generating || results.length > 0) && (
        <Card
          className={cn(
            "transition-all",
            currentStep === 3 && "ring-2 ring-primary/20"
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  3
                </div>
                <CardTitle className="text-lg">Результаты</CardTitle>
                {results.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {results.length} шт
                  </Badge>
                )}
              </div>
              {results.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 gap-1.5 text-xs">
                    <RotateCcw className="h-3 w-3" />
                    Заново
                  </Button>
                  <Button size="sm" className="h-8 gap-1.5 text-xs">
                    <Download className="h-3 w-3" />
                    Скачать ZIP
                  </Button>
                </div>
              )}
            </div>
            {results.length > 0 && (
              <CardDescription>
                Нажмите на изображение для просмотра или скачайте все одним архивом
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress bar */}
            {generating && <GenerationProgress progress={progress} />}

            {/* Grid */}
            <div
              className={cn(
                "grid gap-3",
                currentMode.count <= 4
                  ? "grid-cols-2 md:grid-cols-4"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              )}
            >
              {generating
                ? Array.from({ length: currentMode.count }).map((_, i) => (
                    <ResultSkeleton key={i} />
                  ))
                : results.map((_, i) => <ResultCard key={i} index={i} />)}
            </div>

            {/* Post-generation tip */}
            {results.length > 0 && (
              <div className="flex items-center gap-2.5 rounded-lg bg-primary/5 p-3 text-sm">
                <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">Совет:</span>{" "}
                  AI-предскатор оценивает вариант #1 как лучший для CTR (+32% к продажам)
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}


