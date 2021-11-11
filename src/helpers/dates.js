export const dateFormatter = (value) => {
  const dateCreated = new Date(value.replace(/-/g, '/').replace(/T.+/, ''));
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const date = `${monthNames[dateCreated.getUTCMonth()]} ${dateCreated.getUTCDate()}, ${dateCreated.getUTCFullYear()}`;
  return date;
};
