module.exports = {
  BASE_URL: 'https://api-everis.girasolo.mx/v1/',
  BASE_URL_PROYECT: 'https://master.d3fkb5bt3ddr18.amplifyapp.com/',
  BUCKET_URL: 'https://ilovet-app.s3.us-east-2.amazonaws.com/',
  Roles: {
    User: 'user',
    Author: 'user-author',
    Reviewer: 'user-reviewer',
    Admin: 'admin',
    Premium: 'user-premium',
  },
  ApiRoutes: {
    // rutas para SWR
    Tools: 'herramientas',
    ToolsCategories: 'categorias-herramientas',
    Experts: 'users/expertos',
    UserRatedArticles: 'users/likes',
    UserSavedArticles: '/guardados',
    UserTotals: 'users/totales',
    Articles: 'articulos',
    ArticlesUserPreference: 'articulos/preferencias/usuario',
    Invitation: 'invitaciones',
    ArticlesUserAuthor: 'articulos/autor',
    Forums: 'foros/',
  },
};
