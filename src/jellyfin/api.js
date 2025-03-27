import { Jellyfin } from "@jellyfin/sdk";
import router from "../router";

const jellyfin = new Jellyfin({
    clientInfo: {
        name: 'Coriander Music',
        version: '1.0.0'
    },
    deviceInfo: {
        name: window.navigator.userAgent,
        id: window.navigator.userAgent
    }
});

export const jellyfinApi = jellyfin.createApi(
    "http://localhost:8096/",
    window.localStorage.getItem("token")
)

// Add a response interceptor
jellyfinApi
    .axiosInstance
    .interceptors
    .response
    .use((response) => response, (error) => {
        router.replace({ path: "/login", })
        return Promise.reject(error);
    });

export function isAuthencated() {
    let token = jellyfinApi.accessToken
    if (!token) return false

    return token.length !== 0;
}

export function saveAccessToken(token) {
    window.localStorage.setItem("token", token)
}