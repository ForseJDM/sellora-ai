"use client";

import { motion } from "framer-motion";

const telegramPath =
  "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.203-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.95l-.565-.861z";

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      whileHover={{ rotate: 5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <path d={telegramPath} />
    </motion.svg>
  );
}
