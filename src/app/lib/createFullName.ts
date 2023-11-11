export default function createFullName(name: string, date: string) {
  return `${name ? name + ' ' : ''}${new Date(date).toLocaleDateString(
    'en-GB'
  )}`;
}
