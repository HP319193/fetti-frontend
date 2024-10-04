export const formatDateToMonthDay = (inputDate: string) => {
    // YYYY-MM-DD FORMAT
    const dateObj = new Date(inputDate);
  
    const day = dateObj.getDate();
  
    const monthIndex = dateObj.getMonth();
    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const monthName = monthNames[monthIndex];
  
    return `${monthName} ${day}`;
}

export const convertTimestampToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  };
  return date.toLocaleString(undefined, options);
}
  