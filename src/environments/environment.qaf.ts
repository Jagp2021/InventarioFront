export const environment = {
    production: true,
    userStorage: 'currentUser',
    tokenStorage: 'token',
    version: '1.0', //Version actual del aplicativo que se esta desarrollando
    titleApp: 'ADM', //Titulo que va a tener la aplicacion en los navegadores web
    homePage: '/home', //Pagina de Inicio
    showHeader: true, //Mostrar header
    showMenu: true, //Mostrar Menu
    showFooter: true, //Mostrar footer
    apiSecurity: location.protocol + '//jrromero23/',
    apiAdmProcesos: location.protocol + "//localhost/ADM.Procesos/api",
    apiAdmDominio: location.protocol + '//localhost/ADM.Dominios/api',
    apiSegProcesos: location.protocol + '//localhost/SEG.Procesos/api',
    apiTransFiltros: location.protocol + '//localhost/Filtros/api',

    keyEncrypt: 'MHCP@2023-.',
  };