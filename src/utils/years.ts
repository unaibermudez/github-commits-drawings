
export function getFirstDayOfYear(year: number): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const firstDay = new Date(year, 0, 1); // Month 0 is January
    const dayOfWeekIndex = firstDay.getDay();
    return daysOfWeek[dayOfWeekIndex];
}

export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const getTotalDaysInYear = (year: number): number => {
    return isLeapYear(year) ? 366 : 365;
};


// utils.ts
export const getDateFromGridPosition = (year: number, col: number, row: number): string => {
 
    const firstDayOfYear = new Date(year, 0, 1);
    const shift = firstDayOfYear.getDay();
     
    const dayInYear = col * 7 + (row + 1) - shift;
    const date = new Date(year, 0, dayInYear);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }
    return `${formattedDate}${suffix}`;


  };