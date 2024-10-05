"use client";

import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";

function formatTime(value: number): string {
    return value.toString().padStart(2, '0');
}

const NavbarClock = () => {
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);

    useEffect(() => {

        const interval = setInterval(() => {
            const date = new Date();
            setHour(date.getHours());
            setMinute(date.getMinutes());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Button size="extra-small" appearance="plain"
                className="gap-x-0.5 font-mono text-xs font-normal text-muted-fg hover:bg-secondary/20 hover:text-fg">
            {formatTime(hour)}
            <span className="animate-caret-blink">:</span>
            {formatTime(minute)}
        </Button>
    )
}
export default NavbarClock
