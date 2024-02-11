import { COLORS } from './constants';

export const isDateWithinLastYear = (dateString: string): boolean => {
    const inputDate = new Date(dateString);

    const currentDate = new Date();

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    return inputDate >= oneYearAgo && inputDate <= currentDate;
};

export const countDatesByWeeks = (dateArray: Date[]): number[] => {
    const currentDate = new Date();

    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const counts: number[] = Array(52).fill(0);

    for (const date of dateArray) {
        // Check if the date is within the last year
        if (date >= oneYearAgo && date <= currentDate) {
            // Calculate the difference in weeks between the current date and the date in the loop
            const weekDifference = Math.floor(
                (currentDate.getTime() - date.getTime()) /
                    (7 * 24 * 60 * 60 * 1000),
            );
            counts[weekDifference]++;
        }
    }

    return counts;
};

export const getTimeAgo = (targetDate: Date): string => {
    const now = new Date();
    const timeDifference = now.getTime() - targetDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
};

export const getColor = (key: number) => {
    return COLORS[key % COLORS.length];
};
