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
    Experts: 'users/expertos',
    UserRatedArticles: 'users/likes',
    UserSavedArticles: '/guardados',
    Articles: 'articulos',
    ArticlesUserPreference: 'articulos/preferencias/usuario',
    ArticlesUserAuthor: 'articulos/autor',
  },
};
