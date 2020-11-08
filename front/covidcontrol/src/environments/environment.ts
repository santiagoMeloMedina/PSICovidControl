
import { CONSTANTS as MENU } from 'src/app/constant/menu.constant';
import { CONSTANTS as FUNCTION } from 'src/app/constant/function.constant';
import { CONSTANTS as ACTION } from 'src/app/constant/action.constant';
import { CONSTANTS as AUTHENTICATION } from 'src/app/constant/authentication.constant';
import { CONSTANTS as ROUTING } from 'src/app/constant/routing.constant';

export const environment = {
  production: false,
  MENU: MENU,
  FUNCTION: FUNCTION,
  ACTION: ACTION,
  AUTHENTICATION: AUTHENTICATION,
  ROUTING: ROUTING
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
