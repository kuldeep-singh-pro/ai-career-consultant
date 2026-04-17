export const formatWithTimezone = (date, timezone) => {
    return new Date(date).toLocaleString("en-IN", {
        timeZone: timezone,
    });
};
