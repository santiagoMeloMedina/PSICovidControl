
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
                URL: "/documenttype"
            },
            CATEGORIES: {
                URL: "/category"
            },
            QUARANTINE: {
                URL: "/parameter/quarantine"
            }
        },
        POST: {
            CITY_DEPARTMENT: {
                URL: "/parameter/city"
            },
            NEIGHBORHOOD_CITY: {
                URL: "/neighborhood"
            },
            DEPARTMENT_CITY: {
                URL: "/parameter/department/city"
            },
            ADD: {
                CATEGORY: {
                    URL: "/category/add"
                },
                NEIGHBORHOOD: {
                    URL: "/neighborhood/add"
                },
                DOCUMENTTYPE: {
                    URL: "/documenttype/add"
                }
            }
        },
        DELETE: {
            CATEGORY: {
                URL: "/category/delete"
            },
            NEIGHBORHOOD: {
                URL: "/neighborhood/delete"
            },
            DOCUMENTTYPE: {
                URL: "/documenttype/delete"
            }
        }, 
        PUT: {
            QUARANTINE: {
                URL: "/parameter/quarantine"
            }
        }
    }
}