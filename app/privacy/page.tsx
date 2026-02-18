import type { Metadata } from "next";
import {
  LegalLayout,
  LegalHeading,
  LegalSection,
} from "@/components/shared/legal-layout";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Sellora AI",
  description:
    "Политика обработки персональных данных сервиса Sellora AI. Узнайте, как мы собираем, используем и защищаем ваши данные.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout>
      <LegalHeading
        title="Политика конфиденциальности"
        date="17 февраля 2026 г."
      />

      <LegalSection number="1" title="Общие положения">
        <p>
          Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
          и защиты персональных данных пользователей сервиса Sellora AI (далее — «Сервис»),
          расположенного по адресу{" "}
          <a href="https://sellora.ai" className="text-primary hover:underline">sellora.ai</a>.
        </p>
        <p>
          Оператор персональных данных: ИП [ФИО], ИНН [ИНН], ОГРНИП [ОГРНИП]
          (далее — «Оператор»). Адрес: [Юридический адрес].
        </p>
        <p>
          Регистрируясь в Сервисе и/или используя его функциональность, Пользователь выражает
          согласие с условиями настоящей Политики.
        </p>
      </LegalSection>

      <LegalSection number="2" title="Данные, которые мы собираем">
        <p>При использовании Сервиса мы можем собирать следующие категории данных:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Регистрационные данные:</strong> имя, адрес электронной почты,
            идентификатор Telegram (при авторизации через Telegram).
          </li>
          <li>
            <strong className="text-foreground">Загруженные изображения:</strong> фотографии товаров, которые вы
            загружаете для генерации (хранятся в Supabase Storage).
          </li>
          <li>
            <strong className="text-foreground">Данные генераций:</strong> история промптов, сгенерированные изображения,
            параметры настроек.
          </li>
          <li>
            <strong className="text-foreground">Реферальные данные:</strong> связи между приглашающим и приглашённым
            пользователем, статистика реферальных начислений.
          </li>
          <li>
            <strong className="text-foreground">Платёжные данные:</strong> информация о транзакциях (сумма, дата, статус).
            Банковские реквизиты обрабатываются исключительно платёжным провайдером YooKassa
            и не хранятся на наших серверах.
          </li>
          <li>
            <strong className="text-foreground">Технические данные:</strong> IP-адрес, тип браузера, ОС, данные cookies
            и аналитики (PostHog).
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title="Цели обработки данных">
        <p>Мы обрабатываем персональные данные для следующих целей:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Предоставление доступа к функциональности Сервиса (генерация изображений и видео).</li>
          <li>Идентификация и авторизация пользователя.</li>
          <li>Начисление и списание токенов, обработка платежей.</li>
          <li>Работа реферальной программы.</li>
          <li>Отправка уведомлений о статусе генераций, балансе, промо-акциях (с возможностью отписки).</li>
          <li>Улучшение качества Сервиса и AI-моделей (только в агрегированном и обезличенном виде).</li>
          <li>Обеспечение технической поддержки.</li>
        </ul>
      </LegalSection>

      <LegalSection number="4" title="Третьи стороны и провайдеры">
        <p>
          Для оказания услуг мы привлекаем следующих технических провайдеров, которые могут
          обрабатывать данные в рамках своих политик конфиденциальности:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong className="text-foreground">Supabase</strong> (БД, Auth, Storage) — хранение данных, серверы ЕС.</li>
          <li><strong className="text-foreground">Vercel</strong> — хостинг фронтенда.</li>
          <li><strong className="text-foreground">fal.ai</strong> — генерация изображений (Flux.1.1) и видео (Kling 3.0).</li>
          <li><strong className="text-foreground">RunPod</strong> — вычисления GPU для обучения LoRA и ComfyUI.</li>
          <li><strong className="text-foreground">Anthropic (Claude)</strong> / <strong className="text-foreground">Groq (Llama)</strong> — LLM для усиления промптов.</li>
          <li><strong className="text-foreground">YooKassa</strong> — обработка платежей на территории РФ.</li>
          <li><strong className="text-foreground">PostHog</strong> — аналитика поведения пользователей (обезличенно).</li>
        </ul>
        <p>
          Мы не продаём и не передаём персональные данные третьим лицам в коммерческих целях.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Хранение и удаление данных">
        <p>
          Персональные данные хранятся на серверах Supabase (регион ЕС) и Vercel.
          Срок хранения:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Данные аккаунта — на период действия аккаунта + 30 дней после удаления.</li>
          <li>Загруженные фотографии товаров — 90 дней после последней генерации.</li>
          <li>Сгенерированные изображения — 180 дней (доступны в «Истории»).</li>
          <li>LoRA-модели (цифровые двойники) — 365 дней с момента создания.</li>
          <li>Платёжные транзакции — 3 года (требования законодательства РФ).</li>
        </ul>
      </LegalSection>

      <LegalSection number="6" title="Cookies и аналитика">
        <p>
          Сервис использует технические cookies для поддержания сессии авторизации и
          предпочтений темы (светлая/тёмная). Аналитические cookies (PostHog) собирают
          обезличенные данные о навигации для улучшения UX. Вы можете отключить cookies
          в настройках браузера.
        </p>
      </LegalSection>

      <LegalSection number="7" title="Права пользователя">
        <p>В соответствии с ФЗ-152 «О персональных данных» вы имеете право:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Получить информацию о ваших персональных данных, обрабатываемых Оператором.</li>
          <li>Потребовать уточнения, блокирования или уничтожения данных.</li>
          <li>Отозвать согласие на обработку персональных данных.</li>
          <li>Удалить аккаунт и все связанные данные (раздел «Настройки» → «Удалить аккаунт»).</li>
        </ul>
        <p>
          Для реализации прав обращайтесь в поддержку.
        </p>
        <p className="font-medium text-foreground">
          Поддержка:{" "}
          <a href="https://t.me/sellora_support" className="text-primary hover:underline">t.me/sellora_support</a>
          {" "}или{" "}
          <a href="mailto:support@sellora.ai" className="text-primary hover:underline">support@sellora.ai</a>.
        </p>
      </LegalSection>

      <LegalSection number="8" title="Безопасность">
        <p>
          Мы применяем стандартные меры защиты: шифрование данных при передаче (TLS 1.3),
          хэширование паролей, разграничение доступа (RLS-политики Supabase), регулярное
          резервное копирование. Доступ к панели управления ограничен двухфакторной
          аутентификацией.
        </p>
      </LegalSection>

      <LegalSection number="9" title="Изменения Политики">
        <p>
          Оператор вправе вносить изменения в настоящую Политику. Актуальная версия всегда
          доступна по адресу{" "}
          <a href="/privacy" className="text-primary hover:underline">sellora.ai/privacy</a>.
          При существенных изменениях мы уведомим вас по email.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Контакты">
        <p>
          Оператор: ИП [ФИО]<br />
          ИНН: [ИНН]<br />
          Сайт:{" "}
          <a href="https://sellora.ai" className="text-primary hover:underline">sellora.ai</a>
        </p>
        <p className="font-medium text-foreground">
          Поддержка:{" "}
          <a href="https://t.me/sellora_support" className="text-primary hover:underline">t.me/sellora_support</a>
          {" "}или{" "}
          <a href="mailto:support@sellora.ai" className="text-primary hover:underline">support@sellora.ai</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
