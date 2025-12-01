export const appName = 'UTE-FOOD';

export const storageKeys = {
    USER_ACCESS_TOKEN: `${appName}-user-access-token`,
    USER_REFRESH_TOKEN: `${appName}-user-refresh-token`,
    USER_KIND: `${appName}-user-kind`,
    CART: `${appName}-cart`,
};

export const accessRouteTypeEnum = {
    NOT_LOGIN: 'NOT_LOGIN',
    REQUIRE_LOGIN: 'REQUIRE_LOGIN'
};

export const navigateTypeEnum = {
    PUSH: 'PUSH',
    POP: 'POP',
    REPLACE: 'REPLACE',
};