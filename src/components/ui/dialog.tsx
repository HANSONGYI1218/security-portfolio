"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconX } from "@tabler/icons-react"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "tw-fixed tw-inset-0 tw-isolate tw-z-50 tw-bg-black/10 tw-duration-100 supports-backdrop-filter:tw-backdrop-blur-xs data-open:tw-animate-in data-open:tw-fade-in-0 data-closed:tw-animate-out data-closed:tw-fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "tw-fixed tw-top-1/2 tw-left-1/2 tw-z-50 tw-grid tw-w-full tw-max-w-[calc(100%-2rem)] tw--translate-x-1/2 tw--translate-y-1/2 tw-gap-4 tw-rounded-xl tw-bg-popover tw-p-4 tw-text-sm tw-text-popover-foreground tw-ring-1 tw-ring-foreground/10 tw-duration-100 tw-outline-none sm:tw-max-w-sm data-open:tw-animate-in data-open:tw-fade-in-0 data-open:tw-zoom-in-95 data-closed:tw-animate-out data-closed:tw-fade-out-0 data-closed:tw-zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="tw-absolute tw-top-2 tw-right-2"
              size="icon-sm"
            >
              <IconX
              />
              <span className="tw-sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("tw-flex tw-flex-col tw-gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "tw--mx-4 tw--mb-4 tw-flex tw-flex-col-reverse tw-gap-2 tw-rounded-b-xl tw-border-t tw-bg-muted/50 tw-p-4 sm:tw-flex-row sm:tw-justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "tw-font-heading tw-text-base tw-leading-none tw-font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "tw-text-sm tw-text-muted-foreground *:[a]:tw-underline *:[a]:tw-underline-offset-3 *:[a]:hover:tw-text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
