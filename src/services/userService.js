import { storageKeys } from "@constants";
import { getData, removeItem, setData } from "@utils/localStorage";

const { USER_ACCESS_TOKEN, USER_KIND} = storageKeys;

export const getCacheAccessToken = () => getData(USER_ACCESS_TOKEN);

export const setCacheAccessToken = (accessToken) => setData(USER_ACCESS_TOKEN, accessToken);

export const setUserKind = (userKind) => setData(USER_KIND, userKind);

export const setCacheToken = (accessToken) => {
    setCacheAccessToken(accessToken);
};

export const removeCacheAccessToken = () => removeItem(USER_ACCESS_TOKEN);
export const removeUserKind = () => removeItem(USER_KIND);

export const removeCacheToken = () => {
    removeCacheAccessToken();
    removeUserKind();
};
