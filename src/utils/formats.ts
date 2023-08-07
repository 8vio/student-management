export function getFormattedDate(inputDate: string) {
  const formatDate = new Date(inputDate);
  const date = formatDate.getUTCDate().toString().padStart(2, '0');
  const month = (formatDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = formatDate.getUTCFullYear().toString();
  return `${month}/${date}/${year}`;
}
