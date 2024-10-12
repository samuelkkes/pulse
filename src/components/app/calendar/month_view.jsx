"use client";

import {useState} from 'react'
import {
    add,
    eachDayOfInterval,
    endOfMonth, endOfWeek,
    format,
    getDay,
    isSameDay,
    isSameMonth,
    parse, startOfMonth,
    startOfToday, startOfWeek
} from "date-fns";
import {IconChevronLeft, IconChevronRight} from "justd-icons";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";


let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

export default function MonthView() {
    let today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'));
    let firstDayCurrentMonth = startOfMonth(parse(currentMonth, 'MMMM yyyy', new Date()));

    let days = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth))
    })

    const todayMonth = () => {
        let currentDayMonth = startOfMonth(today)
        setCurrentMonth(format(currentDayMonth, 'MMMM yyyy'))
    }

    const previousMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
        setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
    }

    return (
        <div className="w-full rounded-xl ring-1 ring-border lg:flex lg:h-full lg:flex-col">
            <header  className="flex w-full items-center justify-between rounded-t-xl border-b border-border px-6 py-4 dark:bg-stone-950 lg:flex-none">
                <h1 className="text-base font-semibold leading-6">
                    <time dateTime={currentMonth}>{currentMonth}</time>
                </h1>
                <div className="flex items-center">
                    <div className="flex items-center md:items-stretch">
                        <Button
                            onPress={() => previousMonth()}
                            appearance="outline"
                            intent="secondary"
                            size="square-petite"
                            className="rounded-r-none"
                        >
                            <IconChevronLeft/>
                            <span className="sr-only">Previous month</span>
                        </Button>
                        <Button
                            onPress={() => todayMonth()}
                            appearance="outline"
                            size="small"
                            className="rounded-none"
                        >
                            Today
                        </Button>
                        <Button
                            onPress={() => nextMonth()}
                            appearance="outline"
                            intent="secondary"
                            size="square-petite"
                            className="rounded-l-none"
                        >
                            <IconChevronRight/>
                            <span className="sr-only">Next month</span>
                        </Button>
                    </div>
                </div>
            </header>
            <div className="lg:flex lg:flex-auto lg:flex-col">
                <div className="grid grid-cols-7 gap-px border-b border-border bg-border text-center text-xs font-semibold leading-6 text-fg lg:flex-none">
                    <div className="bg-bg py-2 dark:bg-stone-950">
                        S<span className="sr-only sm:not-sr-only">un</span>
                    </div>
                    <div className="bg-bg py-2 dark:bg-stone-950">
                        M<span className="sr-only sm:not-sr-only">on</span>
                    </div>
                    <div className="bg-bg py-2 dark:bg-stone-950">
                        T<span className="sr-only sm:not-sr-only">ue</span>
                    </div>
                    <div className="bg-bg py-2 dark:bg-stone-950">
                        W<span className="sr-only sm:not-sr-only">ed</span>
                    </div>
                    <div className="bg-bg py-2 dark:bg-stone-950">
                        T<span className="sr-only sm:not-sr-only">hu</span>
                    </div>
                    <div className="bg-bg py-2 dark:bg-stone-950">
                        F<span className="sr-only sm:not-sr-only">ri</span>
                    </div>
                    <div className="bg-bg py-2 dark:bg-stone-950">
                        S<span className="sr-only sm:not-sr-only">at</span>
                    </div>
                </div>
                <div className="flex rounded-b-xl bg-border text-xs leading-6 text-gray-700 lg:flex-auto">
                    <div className="grid w-full grid-cols-7 gap-px">
                        {days.map((day, dayIdx, {length}) => (
                            <div
                                onClick={()=>setSelectedDay(day)}
                                key={day.toDateString()}
                                className={cn(
                                    isSameMonth(day, firstDayCurrentMonth) ? 'bg-bg text-fg dark:bg-stone-950' : 'bg-neutral-100 dark:bg-neutral-950 text-gray-500',
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    length - 7 === dayIdx && "rounded-bl-xl",
                                    length - 1 === dayIdx && "rounded-br-xl",
                                    'relative px-3 py-2'
                                )}
                            >
                                <time className={
                                        isSameDay(day, selectedDay)
                                            ? 'flex size-6 items-center justify-center rounded-full bg-primary font-semibold text-white'
                                            : undefined
                                    }
                                >
                                    {format(day, 'd')}
                                </time>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}