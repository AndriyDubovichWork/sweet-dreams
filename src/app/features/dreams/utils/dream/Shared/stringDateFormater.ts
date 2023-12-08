import { dateFormat } from '@/app/types/utils/dream/Shared/stringDateFormater';

export default function stringDateFormater(
  date: string,
  format: dateFormat = 'en-GB'
) {
  switch (format) {
    case 'en-GB':
      return new Date(date).toLocaleDateString(format);
    case 'yyyy-mm-dd':
      const parts = date.split('/');
      const formattedDate = new Date(+parts[2], +parts[0] - 1, +parts[1]);

      const localDate = new Date(
        formattedDate.getTime() - formattedDate.getTimezoneOffset() * 60000
      );

      return localDate.toISOString().slice(0, 10);
  }
}
