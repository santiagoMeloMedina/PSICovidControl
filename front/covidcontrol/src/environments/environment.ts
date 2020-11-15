
import { CONSTANTS as PETITION } from 'src/app/constant/petition/petition.constants';
import { CONSTANTS as MENU } from 'src/app/constant/menu.constant';
import { CONSTANTS as FUNCTION } from 'src/app/constant/function.constant';
import { CONSTANTS as ACTION } from 'src/app/constant/action.constant';
import { CONSTANTS as AUTHENTICATION } from 'src/app/constant/authentication.constant';
import { CONSTANTS as ROUTING } from 'src/app/constant/routing.constant';
import { CONSTANTS as VALUE } from 'src/app/constant/value/value.constant';
import { CONSTANTS as TITLES } from 'src/app/constant/title.constant';
import { CONSTANTS as HTTP_CODES } from 'src/app/constant/http_code.constant';

export const environment = {
  production: false,
  PETITION: PETITION,
  MENU: MENU,
  FUNCTION: FUNCTION,
  ACTION: ACTION,
  AUTHENTICATION: AUTHENTICATION,
  ROUTING: ROUTING,
  VALUE: VALUE,
  TITLES: TITLES,
  HTTP_CODES: HTTP_CODES
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
