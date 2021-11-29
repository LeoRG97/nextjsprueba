module.exports = {
  BASE_URL: process.env.BASE_URL, // production
  BUCKET_URL: process.env.BUCKET_URL, // production
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
    Users: 'users',
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
    Subscriptions: 'subscripciones/usuario',
    Forums: 'foros/',
    UserNotes: 'notas/usuario',
    Cursos: 'cursos',
    CursosUserPreference: 'cursos/preferencias/usuario',
    Diagnosticos: 'diagnosticos',
  },
};
