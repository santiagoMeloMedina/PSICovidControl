
export const CONSTANTS = {
    ACTIONS: [
        {
          roles: ["ES", "Admin"],
          name: "Examenes",
          description: "Revisa el historial de examenes tomados a los ciudadanos",
          image: "assets/icons/user.png",
          link: "exam"
        },
        {
          roles: ["Admin", "EP", "Citizen"],
          name: "Ingresos",
          description: "Revisa el historial de ingresos de ciudadanos a establecimientos publicos",
          image: "assets/icons/user.png",
          link: "entry"
        },
        {
          roles: ["Admin"],
          name: "Crear Cuentas",
          description: "Crea cuentas de administador",
          image: "assets/icons/user.png",
          link: "create-account"
        },
        {
          roles: ["Admin"],
          name: "Habilitar/Deshabilitar Cuentas",
          description: "Habilita o deshabilita otras cuentas",
          image: "assets/icons/user.png",
          link: "enable-disable"
        },
        {
          roles: ["Admin"],
          name: "Autorizar Cuentas",
          description: "Autoriza cuentas de EP o ES",
          image: "assets/icons/user.png",
          link: "authorize"
        }
      ]
}