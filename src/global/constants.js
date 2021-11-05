module.exports = {
  BASE_URL: 'https://api-everis.girasolo.mx/v1/', // development
  // BASE_URL: 'https://api.caleidoscopiocx.com/v1/', // production
  BUCKET_URL: 'https://ilovet-app.s3.us-east-2.amazonaws.com/', // development
  // BUCKET_URL: 'https://everis-resources.s3.us-east-2.amazonaws.com/'  // production
  BASE_URL_PROYECT: 'https://www.caleidoscopiocx.com/',
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
    ArticlesComments: 'comentarios/articulo',
    ArticleReplies: 'comentarios/respuesta',
    CoursesAuthor: 'cursos/autor',
    CoursesComments: 'comentarios-curso/curso',
    CoursesReplies: 'comentarios-curso/respuesta',
    Forums: 'foros/',
    UserNotes: 'notas/usuario',
    Cursos: 'cursos',
    CursosUserPreference: 'cursos/preferencias/usuario',
  },
};
