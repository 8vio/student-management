// export function getFormattedDate(date:string) {
//   const dateFormat = new Date(date)

//   console.log(dateFormat)
//   let year = dateFormat.getFullYear();
//   let month = (1 + dateFormat.getMonth()).toString().padStart(2, '0');
//   let day = dateFormat.getDate().toString().padStart(2, '0');

//   console.log(day)
//   return month + '/' + day + '/' + year;
// }



export function getFormattedDate(inputDate:string){
  let date, month, year;
  const formatDate = new Date(inputDate)
  date = formatDate.getDate();
  console.log(date)
  month = formatDate.getMonth() + 1;
  year = formatDate.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  return `${date}/${month}/${year}`;
}
