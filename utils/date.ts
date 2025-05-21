/**
 * Formats a date string into a localized time string in 24-hour format (HH:MM)
 * @param {string} dateString - The date string to be formatted (e.g. "2024-03-20T14:30:00")
 * @returns {string} A formatted time string in the format "HH:MM"
 * @example
 * formatTime("2024-03-20T14:30:00") // returns "14:30"
 */
export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
} 