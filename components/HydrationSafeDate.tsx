"use client";

import { useEffect, useState } from "react";

// Date component with hydration safety
export default function HydrationSafeDate({ date }: { date: Date }) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    setFormatted(date.toLocaleString());
  }, [date]);

  return <span title={formatted}>{formatted}</span>;
}
