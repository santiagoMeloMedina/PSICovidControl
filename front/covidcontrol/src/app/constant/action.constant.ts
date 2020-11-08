
export const CONSTANTS = {
    ACTIONS: [
        {
          id: "EXAM",
          roles: ["ES", "Admin"],
          name: "Examenes",
          description: "Revisa el historial de examenes tomados a los ciudadanos",
          image: "assets/icons/user.png",
          link: "exam"
        },
        {
          id: "ENTRY",
          roles: ["Admin", "EP", "Citizen"],
          name: "Ingresos",
          description: "Revisa el historial de ingresos de ciudadanos a establecimientos publicos",
          image: "assets/icons/user.png",
          link: "entry"
        },
        {
          id: "C_ACCOUNT",
          roles: ["Admin"],
          name: "Crear Cuentas",
          description: "Crea cuentas de administador",
          image: "assets/icons/user.png",
          link: "create-account"
        },
        {
          id: "ENABLE",
          roles: ["Admin"],
          name: "Habilitar/Deshabilitar Cuentas",
          description: "Habilita o deshabilita otras cuentas",
          image: "assets/icons/user.png",
          link: "enable-disable"
        },
        {
          id: "AUTORIZE",
          roles: ["Admin"],
          name: "Autorizar Cuentas",
          description: "Autoriza cuentas de Establecimientos publicos o Entidades de salud",
          image: "assets/icons/user.png",
          link: "authorize"
        }
      ]
}