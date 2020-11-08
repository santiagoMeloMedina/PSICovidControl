
import { CONSTANTS as AUTH } from 'src/app/constant/authentication.constant';

export const CONSTANTS = {
    ACTIONS: [
        {
          id: "EXAM",
          roles: [
            AUTH.ROLES.ADMIN,
            AUTH.ROLES.ES
          ],
          name: "Examenes",
          description: "Revisa el historial de examenes tomados a los ciudadanos",
          image: "assets/icons/user.png",
          link: "exam"
        },
        {
          id: "ENTRY",
          roles: [
            AUTH.ROLES.ADMIN,
            AUTH.ROLES.CITIZEN,
            AUTH.ROLES.EP
          ],
          name: "Ingresos",
          description: "Revisa el historial de ingresos de ciudadanos a establecimientos publicos",
          image: "assets/icons/user.png",
          link: "entry"
        },
        {
          id: "C_ACCOUNT",
          roles: [
            AUTH.ROLES.ADMIN
          ],
          name: "Crear Cuentas",
          description: "Crea cuentas de administador",
          image: "assets/icons/user.png",
          link: "create-account"
        },
        {
          id: "ENABLE",
          roles: [
            AUTH.ROLES.ADMIN
          ],
          name: "Habilitar/Deshabilitar Cuentas",
          description: "Habilita o deshabilita otras cuentas",
          image: "assets/icons/user.png",
          link: "enable-disable"
        },
        {
          id: "AUTORIZE",
          roles: [
            AUTH.ROLES.ADMIN
          ],
          name: "Autorizar Cuentas",
          description: "Autoriza cuentas de Establecimientos publicos o Entidades de salud",
          image: "assets/icons/user.png",
          link: "authorize"
        },
        {
          id: "R_ENTRY",
          roles: [
            AUTH.ROLES.EP
          ],
          name: "Registrar ingreso",
          description: "Registra el ingreso de los ciudadanos que entrar en tu establecimiento",
          image: "assets/icons/user.png",
          link: "register-entry"
        },
        {
          id: "EDIT",
          roles: [
            AUTH.ROLES.ADMIN,
            AUTH.ROLES.CITIZEN,
            AUTH.ROLES.EP,
            AUTH.ROLES.ES
          ],
          name: "Editar información",
          description: "Cambia la información de tu perfil",
          image: "assets/icons/user.png",
          link: "edit-information"
        }
      ]
}