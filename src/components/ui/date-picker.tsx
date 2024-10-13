"use client"

import * as React from "react"

import { IconCalendarDays } from "justd-icons"
import {
  DatePicker as DatePickerPrimitive,
  type DatePickerProps as DatePickerPrimitiveProps,
  type DateValue,
  type DialogProps,
  type PopoverProps,
  type ValidationResult
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { DateInput } from "./date-field"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { Popover } from "./popover"
import { ctr } from "./primitive"
import { RangeCalendar } from "./range-calendar"

const datePickerStyles = tv({
  slots: {
    base: "group flex flex-col gap-1",
    datePickerIcon:
      "group mr-1 h-7 w-8 rounded outline-offset-0 hover:bg-transparent pressed:bg-transparent [&>[data-slot=icon]]:text-muted-fg",
    calendarIcon: "size-4 text-muted-fg group-open:text-fg",
    datePickerInput: "w-full px-2 text-base uppercase lg:text-sm",
    dateRangePickerInputStart: "px-2 text-base uppercase lg:text-sm",
    dateRangePickerInputEnd: "flex-1 px-2 py-1.5 text-base uppercase lg:text-sm",
    dateRangePickerDash:
      "text-fg group-disabled:opacity-50 forced-colors:text-[ButtonText] group-disabled:forced-colors:text-[GrayText]"
  }
})

const { base, datePickerIcon, calendarIcon, datePickerInput } = datePickerStyles()

interface DatePickerOverlayProps
  extends Omit<DialogProps, "children" | "className" | "style">,
    Omit<PopoverProps, "children" | "className" | "style"> {
  className?: string | ((values: { defaultClassName?: string }) => string)
  children?: React.ReactNode
  closeButton?: boolean
  range?: boolean
}

const DatePickerOverlay = ({ closeButton = true, range, ...props }: DatePickerOverlayProps) => {
  return (
    <Popover.Content
      showArrow={false}
      className="flex justify-center p-4 sm:min-w-[17rem] sm:max-w-[17.2rem] sm:p-2 sm:pt-3"
      {...props}
    >
      {range ? <RangeCalendar /> : <Calendar />}
      {closeButton && (
        <div className="mx-auto flex w-full max-w-[inherit] justify-center py-2.5 sm:hidden">
          <Popover.Close shape="circle" className="w-full">
            Close
          </Popover.Close>
        </div>
      )}
    </Popover.Content>
  )
}

const DatePickerIcon = () => (
  <Button size="square-petite" appearance="plain" className={datePickerIcon()}>
    <IconCalendarDays aria-hidden className={calendarIcon()} />
  </Button>
)

interface DatePickerProps<T extends DateValue> extends DatePickerPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const DatePicker = <T extends DateValue>({
  label,
  className,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>) => {
  return (
    <DatePickerPrimitive {...props} className={ctr(className, base())}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="min-w-40">
        <DateInput className={datePickerInput()} />
        <DatePickerIcon />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <DatePickerOverlay />
    </DatePickerPrimitive>
  )
}

export {
  DatePicker,
  DatePickerIcon,
  DatePickerOverlay,
  type DatePickerProps,
  type DateValue,
  type ValidationResult
}