"use client"

import * as React from "react"

import { IconHamburger } from "justd-icons"
import {
  Collection,
  Header,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  type ListBoxProps,
  Section,
  type SectionProps
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Button } from "./button"
import { cr, useMediaQuery } from "./primitive"
import { Sheet } from "./sheet"
import { TouchTarget } from "./touch-target"

const aside = tv({
  slots: {
    root: "fixed inset-y-0 left-0 w-[17rem] bg-tertiary max-lg:hidden",
    content: "flex h-full min-h-0 flex-col",
    body: "flex flex-col overflow-y-auto p-4 [&>section+section]:mt-8",
    section: "flex flex-col gap-y-0.5",
    header: "flex flex-col border-b p-4 [&>section+section]:mt-2.5",
    footer: "mt-auto flex flex-col border-t p-4 [&>section+section]:mt-2.5",
    responsive: "flex gap-x-0.5"
  }
})

const { root, body, content, section, header, footer, responsive } = aside()

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
  aside: React.ReactNode
  navbar: React.ReactNode
  side?: "left" | "right"
  isStack?: boolean
  closeButton?: boolean
  isBlurred?: boolean
  "aria-label"?: string
}

const Layout = ({
  isStack = true,
  side = "left",
  isBlurred = false,
  closeButton = true,
  aside,
  navbar,
  children,
  ...props
}: LayoutProps) => {
  const [openAside, setOpenAside] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  return (
    <div className="relative isolate flex min-h-svh w-full max-lg:flex-col">
      <Aside>{aside}</Aside>
      {!isDesktop && (
        <Sheet.Content
          aria-label={props["aria-label"] ?? "Main navigation"}
          {...{ closeButton, isStack, side, isBlurred }}
          isOpen={openAside}
          onOpenChange={() => setOpenAside(false)}
          classNames={{ content: "[&_[role=dialog]]:p-0" }}
        >
          {aside}
        </Sheet.Content>
      )}

      <header className="fixed z-10 flex w-full items-center justify-between border-b bg-tertiary/80 px-4 py-2 shadow-sm backdrop-blur sm:px-6 lg:hidden lg:px-10">
        <div>
          <Button
            appearance="plain"
            size="square-petite"
            className="-ml-3"
            onPress={() => setOpenAside(true)}
            aria-label="Open navigation"
          >
            <IconHamburger />
          </Button>
        </div>
        <div>{navbar}</div>
      </header>

      <main className="flex flex-1 flex-col pt-12 lg:min-w-0 lg:pl-[17rem] lg:pt-0">
        <div className="relative grow p-4 sm:p-6 lg:p-10 lg:ring-1 lg:ring-border">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  )
}

interface AsideProps extends Omit<React.HTMLProps<HTMLDivElement>, "className"> {
  children: React.ReactNode
  classNames?: {
    content?: string
    root?: string
  }
}

const Aside = ({ classNames, ...props }: AsideProps) => (
  <div {...props} className={root({ className: classNames?.root })} {...props}>
    <div className={content({ className: classNames?.content })}>{props.children}</div>
  </div>
)

const Content = <T extends object>({ children, className, ...props }: ListBoxProps<T>) => (
  <ListBox aria-label="Main navigation" {...props} className={cr(className, body)}>
    {children}
  </ListBox>
)

interface AsideSectionProps<T> extends SectionProps<T> {
  title?: string
}

const AsideSection = <T extends object>({ className, ...props }: AsideSectionProps<T>) => {
  return (
    <Section className={section({ className })}>
      {props.title && (
        <Header slot="title" className="px-3 text-sm text-muted-fg">
          {props.title}
        </Header>
      )}
      <Collection items={props.items}>{props.children}</Collection>
    </Section>
  )
}

const itemStyles = tv({
  base: "relative flex items-center gap-x-4 rounded-lg px-3 py-2 leading-6 lg:text-sm [&_[data-slot=icon]]:-mx-0.5 [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:text-muted-fg",
  variants: {
    isFocused: {
      true: "outline-none"
    },
    isFocusVisible: {
      true: "bg-secondary text-secondary-fg [&:focus-visible_[slot=description]]:text-accent-fg/70 [&:focus-visible_[slot=label]]:text-accent-fg"
    },
    isHovered: {
      true: "bg-secondary text-secondary-fg [&:focus-visible_[slot=description]]:text-accent-fg/70 [&:focus-visible_[slot=label]]:text-accent-fg [&_.text-muted-fg]:text-secondary-fg/80"
    },
    isCurrent: {
      true: [
        "bg-accent text-accent-fg [&_.text-muted-fg]:text-accent-fg/80 [&_[data-slot=icon]]:text-accent-fg [&_[data-slot=label]]:text-accent-fg",
        "[&_.bdx]:bg-accent-fg/20 [&_.bdx]:ring-accent-fg/30"
      ]
    },
    isDisabled: {
      true: "cursor-default text-muted-fg opacity-70"
    }
  }
})

interface ItemProps<T> extends ListBoxItemProps<T> {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  badge?: string | number | undefined
  isCurrent?: boolean
}

const Item = <T extends object>({
  isCurrent,
  children,
  className,
  icon: Icon,
  ...props
}: ItemProps<T>) => {
  const textValue = typeof children === "string" ? children : undefined

  return (
    <ListBoxItem
      textValue={textValue}
      className={cr(className, (className, renderProps) =>
        itemStyles({
          ...renderProps,
          isCurrent,
          className
        })
      )}
      {...props}
    >
      {(values) => (
        <div className="flex items-center gap-2">
          <>
            {Icon && <Icon className="size-4 shrink-0" />}
            <TouchTarget>
              {typeof children === "function" ? children(values) : children}
            </TouchTarget>
            {props.badge && (
              <div className="bdx absolute inset-y-1/2 right-1.5 grid h-[1.30rem] w-auto -translate-y-1/2 place-content-center rounded-md bg-fg/[0.02] px-1 text-xs font-medium text-muted-fg ring-1 ring-fg/20 dark:bg-fg/10">
                {props.badge}
              </div>
            )}
          </>
        </div>
      )}
    </ListBoxItem>
  )
}

const AsideHeader = ({ className, ...props }: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={header({ className })} {...props} />
)
const Footer = ({ className, ...props }: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={footer({ className })} {...props} />
)

const Responsive = ({ className, ...props }: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={responsive({ className })} {...props} />
)

Aside.Responsive = Responsive
Aside.Footer = Footer
Aside.Header = AsideHeader
Aside.Content = Content
Aside.Section = AsideSection
Aside.Item = Item
Aside.Layout = Layout

export { Aside }
