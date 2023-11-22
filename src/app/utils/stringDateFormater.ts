export default function stringDateFormater(date: string) {
  return new Date(date).toLocaleDateString('en-GB');
}
