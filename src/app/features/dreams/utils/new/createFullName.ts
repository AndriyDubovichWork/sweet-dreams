import stringDateFormatter from '../Shared/stringDateFormatter';

export default function createFullName(
  name: string,
  date: string,
  isPrivate: boolean
) {
  const fullName = isPrivate ? name + '/private/' : name;
  return `${fullName ? fullName + ' ' : ''}${stringDateFormatter(date)}`;
}
