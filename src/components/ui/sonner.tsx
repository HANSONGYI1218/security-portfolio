"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { IconCircleCheck, IconInfoCircle, IconAlertTriangle, IconAlertOctagon, IconLoader } from "@tabler/icons-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="tw-toaster tw-group"
      icons={{
        success: (
          <IconCircleCheck className="tw-size-4" />
        ),
        info: (
          <IconInfoCircle className="tw-size-4" />
        ),
        warning: (
          <IconAlertTriangle className="tw-size-4" />
        ),
        error: (
          <IconAlertOctagon className="tw-size-4" />
        ),
        loading: (
          <IconLoader className="tw-size-4 tw-animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
