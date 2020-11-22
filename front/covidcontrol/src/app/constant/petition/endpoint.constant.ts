
export const CONSTANTS = {
    AUTHENTICATE: {
        URL: "/user/authenticate"
    },
    REGISTER: {
        ALL: {
            URL: "/user/register"
        },
        ADMIN: {
            URL: "/user/register/admin"
        }
    },
    USER: {
        GET: {
            NOT_AUTHORIZED: {
                URL: (start: number, limit: number) => {return `/user/unauthorized/${start}/${limit}`}
            },
            ENABLE_DISABLE: {
                URL: (start: number, limit: number) => {return `/user/all/${start}/${limit}`}
            }
        },
        POST: {
            AUTHORIZED: {
                URL: "/user/authorize"
            },
            USER: {
                URL: "/user/user"
            }
        },
        PUT: {
            UPDATE: {
                URL: "/user/update"
            }
        }
    }
}