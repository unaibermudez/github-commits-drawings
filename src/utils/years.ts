type DaysOfWeekCount = {
    [key: string]: number;
};

export function getDaysOfWeekCount(year: number): DaysOfWeekCount {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const counts: DaysOfWeekCount = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
    };

    // Determine if the year is a leap year
    const isLeapYear = (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    // Total days in the year
    const totalDays = isLeapYear(year) ? 366 : 365;

    // Start iterating over all days of the year
    for (let day = 0; day < totalDays; day++) {
        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const date = new Date(year, 0, day + 1); // January 1st is day 0
        const dayOfWeek = date.getDay(); // 0 = Sunday
        const dayName = daysOfWeek[(dayOfWeek + 6) % 7]; // Adjust to 0 = Monday, ..., 6 = Sunday
        counts[dayName]++;
    }

    return counts;
}
export function getFirstDayOfYear(year: number): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Create a date object for January 1st of the given year
    const firstDay = new Date(year, 0, 1); // Month 0 is January

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeekIndex = firstDay.getDay();

    // Return the corresponding day name
    return daysOfWeek[dayOfWeekIndex];
}



export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };
  
  export const getTotalDaysInYear = (year: number): number => {
    return isLeapYear(year) ? 366 : 365;
  };
  