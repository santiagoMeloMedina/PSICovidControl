
export const CONSTANTS = {
    AUTHENTICATE: {
        URL: "/user/authenticate"
    },
    REGISTER: {
        URL: "/user/register"
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
            }
        }
    }
}