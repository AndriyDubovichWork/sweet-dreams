import stringDateFormater from './stringDateFormater';

export default function createFullName(name: string, date: string) {
  return `${name ? name + ' ' : ''}${stringDateFormater(date)}`;
}
