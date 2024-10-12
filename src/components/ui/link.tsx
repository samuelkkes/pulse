"use client"

import * as React from "react"

import { Link as LinkPrimitive, type LinkProps as LinkPrimitiveProps } from "react-aria-components"
import { tv } from "tailwind-variants"

import { cr } from "./primitive"
import { TouchTarget } from "./touch-target"

const linkStyles = tv({
  base: "relative rounded border-transparent outline outline-0 outline-offset-2 outline-primary transition-colors focus-visible:outline-2 disabled:cursor-default disabled:opacity-60 disabled:focus-visible:outline-0 forced-colors:outline-[Highlight] forced-colors:disabled:text-[GrayText]",
  variants: {
    intent: {
      unstyled: "text-current",
      primary: "text-primary hover:text-primary/80 forced-colors:disabled:text-[GrayText]",
      danger: "text-danger hover:text-danger/80 forced-colors:disabled:text-[GrayText]",
      "lad/primary":
        "text-fg hover:text-primary dark:hover:text-primary/80 forced-colors:disabled:text-[GrayText]",
      secondary: "text-secondary-fg hover:text-secondary-fg/80"
    }
  },
  defaultVariants: {
    intent: "unstyled"
  }
})

interface LinkProps extends LinkPrimitiveProps {
  intent?: "primary" | "secondary" | "danger" | "lad/primary" | "unstyled"
}

const Link = ({ className, ...props }: LinkProps) => {
  return (
    <LinkPrimitive
      {...props}
      className={cr(className, (className, ...renderProps) =>
        linkStyles({ ...renderProps, intent: props.intent, className })
      )}
    >
      {(values) => (
        <TouchTarget>
          {typeof props.children === "function" ? props.children(values) : props.children}
        </TouchTarget>
      )}
    </LinkPrimitive>
  )
}

export { Link, LinkPrimitive, type LinkPrimitiveProps, type LinkProps }
