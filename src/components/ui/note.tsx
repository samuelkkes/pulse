"use client"

import * as React from "react"

import { IconCircleCheck, IconCircleInfo, IconTriangleInfo } from "justd-icons"
import { Text } from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

const noteStyles = tv({
  base: [
    "my-4 overflow-hidden rounded-lg border px-5 py-4 [&_.nd]:block [&_.nd]:text-sm [&_strong]:font-medium",
    "[&_[data-slot=icon]]:size-5 [&_[data-slot=icon]]:shrink-0"
  ],
  variants: {
    intent: {
      primary: [
        "border-primary-500/20 bg-primary-50/50 leading-4 text-primary-800 [&_[data-slot=icon]]:text-primary-600 [&_a]:text-primary-600",
        "dark:bg-primary-600/10 dark:text-primary-200 dark:[&_[data-slot=icon]]:text-primary-400 dark:[&_a]:text-primary-50"
      ],
      secondary: [
        "border-zinc-500/20 bg-zinc-50/50 leading-4 text-zinc-900 [&_[data-slot=icon]]:text-zinc-500 [&_a]:text-zinc-600",
        "dark:bg-zinc-500/10 dark:text-zinc-200 dark:[&_[data-slot=icon]]:text-zinc-50 dark:[&_a]:text-zinc-50"
      ],
      info: [
        "border-lime-500/20 bg-lime-50/50 leading-4 text-lime-800 [&_[data-slot=icon]]:text-lime-500 [&_a]:text-lime-600",
        "dark:bg-lime-500/10 dark:text-lime-200 dark:[&_[data-slot=icon]]:text-lime-400 dark:[&_a]:text-lime-50"
      ],
      warning: [
        "border-amber-500/20 bg-amber-50/50 leading-4 text-amber-800 [&_[data-slot=icon]]:text-amber-500 [&_a]:text-amber-600",
        "dark:bg-amber-500/10 dark:text-amber-200 dark:[&_[data-slot=icon]]:text-amber-400 dark:[&_a]:text-amber-50"
      ],
      danger: [
        "border-red-500/20 bg-red-50/50 leading-4 text-red-800 [&_[data-slot=icon]]:text-red-500 [&_a]:text-red-600",
        "dark:bg-red-500/10 dark:text-red-200 dark:[&_[data-slot=icon]]:text-red-400 dark:[&_a]:text-red-50"
      ],
      success: [
        "border-emerald-500/20 bg-emerald-50/50 leading-4 text-emerald-900 [&_[data-slot=icon]]:text-emerald-600 [&_a]:text-emerald-600",
        "dark:bg-emerald-500/10 dark:text-emerald-200 dark:[&_[data-slot=icon]]:text-emerald-400 dark:[&_a]:text-emerald-50"
      ]
    }
  },
  defaultVariants: {
    intent: "primary"
  }
})

interface NoteProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof noteStyles> {
  hideIndicator?: boolean
}

const Note = ({ hideIndicator = false, intent = "primary", className, ...props }: NoteProps) => {
  return (
    <div className={noteStyles({ intent, className })} {...props}>
      <div className="flex items-start gap-x-2.5">
        {!hideIndicator && (
          <div className="mt-px w-5 shrink-0">
            {["info", "primary", "secondary"].includes(intent) ? (
              <IconCircleInfo />
            ) : intent === "success" ? (
              <IconCircleCheck />
            ) : (
              <IconTriangleInfo />
            )}
          </div>
        )}
        <Text slot="description" {...props} className="nd">
          {props.children}
        </Text>
      </div>
    </div>
  )
}

export { Note, type NoteProps }
