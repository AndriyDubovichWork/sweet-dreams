import stringDateFormatter from '../../../common/utils/stringDateFormatter';

export default function createFullName(name: string, date: string) {
  return `${name ? name + ' ' : ''}${stringDateFormatter(date)}`;
}
