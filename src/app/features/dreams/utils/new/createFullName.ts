import stringDateFormatter from '../Shared/stringDateFormatter';

export default function createFullName(name: string, date: string) {
  return `${name ? name + ' ' : ''}${stringDateFormatter(date)}`;
}
