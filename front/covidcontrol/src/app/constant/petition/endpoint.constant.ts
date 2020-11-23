
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
    },
    PARAMETER: {
        GET: {
            ALL_DEPARTMENT: {
                URL: "/parameter/department"
            },
            ALL_DOCUMENT_TYPE: {
                URL: "/parameter/documenttype"
            }
        },
        POST: {
            CITY_DEPARTMENT: {
                URL: "/parameter/city"
            },
            NEIGHBORHOOD_CITY: {
                URL: "/parameter/neighborhood"
            },
            DEPARTMENT_CITY: {
                URL: "/parameter/department/city"
            }
        }
    }
}