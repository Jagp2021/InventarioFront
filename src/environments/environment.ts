export const environment = {
  production: false,
  userStorage: 'currentUser',
  tokenStorage: 'token',
  version: '1.0', //Version actual del aplicativo que se esta desarrollando
  titleApp: 'Inventario MetaTech', //Titulo que va a tener la aplicacion en los navegadores web
  homePage: '/home', //Pagina de Inicio
  showHeader: true, //Mostrar header
  showMenu: true, //Mostrar Menu
  showFooter: false, //Mostrar footer
  apiSecurity: location.protocol + '//jrromero23/',



  keyEncrypt: '8056483646328763' /** MHCP@2023-. */,
  apiBack: 'http://localhost:8084/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
