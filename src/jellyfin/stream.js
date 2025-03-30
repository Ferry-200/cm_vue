import { jellyfinApi } from "./api";

/**
 * 
 * @param {string} itemId 
 * @returns 
 */
export function getAudioStreamUrl(itemId) {
    const uri = jellyfinApi.axiosInstance.getUri({
        url: `/Audio/${itemId}/stream`,
        params: {
            "static": false,
            "audioCodec": "mp3"
        }
    });
    return jellyfinApi.basePath + uri;
}

/**
 * 
 * @param {string} itemId 
 * @returns 
 */
export function getImageStreamUrl(itemId, size) {
    const resolvedSize = Math.floor((size || 0) * window.devicePixelRatio)
    const uri = jellyfinApi.axiosInstance.getUri({
        url: `/Items/${itemId}/Images/Primary`,
        params: {
            "fillWidth": resolvedSize,
            "fillHeight": resolvedSize,
            "quality": 90
        }
    });
    return jellyfinApi.basePath + uri;
}