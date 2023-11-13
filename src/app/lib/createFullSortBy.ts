export default function createFullSortBy(
  sortBy: string,
  isSortByReversed: boolean
) {
  return isSortByReversed ? sortBy + ' desc' : sortBy;
}
