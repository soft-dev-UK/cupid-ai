"use client";

import { useState, useEffect } from "react";

const MAX_DAILY_USAGE = 10;
const STORAGE_KEY = "cupid_usage";

export function useUsageLimit() {
    const [count, setCount] = useState(0);
    const [isLimitReached, setIsLimitReached] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            const { date, count } = JSON.parse(stored);
            if (date === today) {
                setCount(count);
                if (count >= MAX_DAILY_USAGE) {
                    setIsLimitReached(true);
                }
            } else {
                // Reset for new day
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ date: today, count: 0 })
                );
                setCount(0);
            }
        } else {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ date: today, count: 0 })
            );
        }
    }, []);

    const incrementUsage = () => {
        const today = new Date().toDateString();
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ date: today, count: newCount })
        );
        if (newCount >= MAX_DAILY_USAGE) {
            setIsLimitReached(true);
        }
    };

    return { count, max: MAX_DAILY_USAGE, isLimitReached, incrementUsage };
}
