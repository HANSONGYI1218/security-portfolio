import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      autoComplete="off"
      className={cn(
        "tw-h-8 tw-w-full tw-min-w-0 tw-rounded-lg tw-border tw-border-input tw-bg-transparent tw-px-2.5 tw-py-1 tw-text-base tw-transition-colors tw-outline-none focus:tw-outline-none focus:tw-ring-0 focus:tw-border-gray-400",
        className
      )}
      {...props}
    />
  );
}

export { Input };
