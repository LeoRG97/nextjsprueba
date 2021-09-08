module.exports = {
  BASE_URL: 'https://api-everis.girasolo.mx/v1/',
  BUCKET_URL: 'https://ilovet-app.s3.us-east-2.amazonaws.com/',
  Roles: {
    User: 'user',
    Author: 'user-author',
    Reviewer: 'user-reviewer',
    Admin: 'admin',
  },
  ApiRoutes: {
    // rutas para SWR
    Articles: 'articulos',
    ArticlesUserPreference: 'articulos/preferencias/usuario',
  },
};
