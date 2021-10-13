function convertDate(date) {
  const dateFormat = new Date(date);

  let formattedDate = Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(dateFormat);
  formattedDate = formattedDate.toString();
  formattedDate = formattedDate.replace('January', 'Enero');
  formattedDate = formattedDate.replace('February', 'Febrero');
  formattedDate = formattedDate.replace('March', 'Marzo');
  formattedDate = formattedDate.replace('April', 'Abril');
  formattedDate = formattedDate.replace('May', 'Mayo');
  formattedDate = formattedDate.replace('June', 'Junio');
  formattedDate = formattedDate.replace('July', 'Julio');
  formattedDate = formattedDate.replace('August', 'Agosto');
  formattedDate = formattedDate.replace('September', 'Septiembre');
  formattedDate = formattedDate.replace('October', 'Octubre');
  formattedDate = formattedDate.replace('November', 'Noviembre');
  formattedDate = formattedDate.replace('December', 'Diciembre');
  return formattedDate;
}

export default convertDate;
