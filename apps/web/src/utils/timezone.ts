export const formatWithTimezone = (
  date: string,
  timezone: string
) => {
  return new Date(date).toLocaleString(
    "en-IN",
    {
      timeZone: timezone,
    }
  );
};