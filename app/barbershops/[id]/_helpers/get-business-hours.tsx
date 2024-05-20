import { generateDayTimeList } from "./hours";

export const getBusinessHours = (day: string) => {
    const daysClosed = ["Segunda-feira", "Domingo"];
    if (daysClosed.includes(day)) return { close: "Fechado" };

    const date = new Date();
    const allTimes = generateDayTimeList(date);
    return { open: allTimes[0], close: allTimes[allTimes.length - 1] };
};
