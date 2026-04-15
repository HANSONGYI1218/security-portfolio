"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "tw-flex tw-flex-col tw-gap-4 has-[>[data-slot=checkbox-group]]:tw-gap-3 has-[>[data-slot=radio-group]]:tw-gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "tw-mb-1.5 tw-font-medium data-[variant=label]:tw-text-sm data-[variant=legend]:tw-text-base",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "tw-group/field-group tw-@container/field-group tw-flex tw-w-full tw-flex-col tw-gap-5 data-[slot=checkbox-group]:tw-gap-3 *:data-[slot=field-group]:tw-gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "tw-group/field tw-flex tw-w-full tw-gap-2 data-[invalid=true]:tw-text-destructive",
  {
    variants: {
      orientation: {
        vertical: "tw-flex-col *:tw-w-full [&>.sr-only]:tw-w-auto",
        horizontal:
          "tw-flex-row tw-items-center has-[>[data-slot=field-content]]:tw-items-start *:data-[slot=field-label]:tw-flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:tw-mt-px",
        responsive:
          "tw-flex-col *:tw-w-full @md/field-group:tw-flex-row @md/field-group:tw-items-center @md/field-group:*:tw-w-auto @md/field-group:has-[>[data-slot=field-content]]:tw-items-start @md/field-group:*:data-[slot=field-label]:tw-flex-auto [&>.sr-only]:tw-w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:tw-mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "tw-group/field-content tw-flex tw-flex-1 tw-flex-col tw-gap-0.5 tw-leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "tw-group/field-label tw-peer/field-label tw-flex tw-w-fit tw-gap-2 tw-leading-snug group-data-[disabled=true]/field:tw-opacity-50 has-data-checked:tw-border-primary/30 has-data-checked:tw-bg-primary/5 has-[>[data-slot=field]]:tw-rounded-lg has-[>[data-slot=field]]:tw-border *:data-[slot=field]:tw-p-2.5 dark:has-data-checked:tw-border-primary/20 dark:has-data-checked:tw-bg-primary/10",
        "has-[>[data-slot=field]]:tw-w-full has-[>[data-slot=field]]:tw-flex-col",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-leading-snug tw-font-medium group-data-[disabled=true]/field:tw-opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "tw-text-left tw-text-sm tw-leading-normal tw-font-normal tw-text-muted-foreground group-has-data-horizontal/field:tw-text-balance [[data-variant=legend]+&]:tw--mt-1.5",
        "last:tw-mt-0 nth-last-2:tw--mt-1",
        "[&>a]:tw-underline [&>a]:tw-underline-offset-4 [&>a:hover]:tw-text-primary",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "tw-relative tw--my-2 tw-h-5 tw-text-sm group-data-[variant=outline]/field-group:tw--mb-2",
        className
      )}
      {...props}
    >
      <Separator className="tw-absolute tw-inset-0 tw-top-1/2" />
      {children && (
        <span
          className="tw-relative tw-mx-auto tw-block tw-w-fit tw-bg-background tw-px-2 tw-text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="tw-ml-4 tw-flex tw-list-disc tw-flex-col tw-gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("tw-text-sm tw-font-normal tw-text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
