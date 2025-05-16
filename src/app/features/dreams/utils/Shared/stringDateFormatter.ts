import { dateFormat } from '../types/utils/stringDateFormatter';

export default function stringDateFormatter(
  date: string,
  format: dateFormat = 'en-GB'
): string {
  if (format === 'yyyy-mm-dd' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date;
  }

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    switch (format) {
      case 'en-GB':
        return dateObj.toLocaleDateString('en-GB');

      case 'yyyy-mm-dd':
        const correctedDate = new Date(
          dateObj.getTime() - dateObj.getTimezoneOffset() * 60000
        );
        return correctedDate.toISOString().slice(0, 10);

      default:
        throw new Error('Unsupported date format');
    }
  } catch (error) {
    console.error('Date formatting error:', error);
    return date;
  }
}
