import stringDateFormater from '../Shared/stringDateFormater';

export default function createFullName(name: string, date: string) {
  return `${name ? name + ' ' : ''}${stringDateFormater(date)}`;
}
