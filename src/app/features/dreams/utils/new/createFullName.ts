import stringDateFormatter from '@/app/utils/stringDateFormatter';

export default function createFullName(name: string, date: string) {
  return `${name ? name + ' ' : ''}${stringDateFormatter(date)}`;
}
