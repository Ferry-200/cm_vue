import { getAudioStreamUrl } from "./jellyfin/stream"

const audioTag = new Audio()

audioTag.preload = "metadata"

/**
 * @type {{
 *      nowplaying: string | null,
 *      playlist: Array<string>,
 *      playlistIt: number,
 *      loop: "playlist" | "single" | "disabled"
 * }}
 */
const state = {
    playlist: [],
    playlistIt: -1,
    loop: "playlist"
}

function _setSource(audioId) {
    audioTag.src = getAudioStreamUrl(audioId)
    audioTag.load()
}

export const player = {
    setPlaylist: (newPlaylist, startFrom) => {
        state.playlist = Array.from(newPlaylist)
        if (state.playlist.length > 0 &&
            startFrom >= 0 &&
            startFrom < state.playlist.length) {
            state.playlistIt = startFrom
        }
        _setSource(state.playlist[startFrom])
    },
    getIsPaused: () => audioTag.paused,
    play: () => audioTag.play(),
    pause: () => audioTag.pause(),
    toggle: () => {
        if (audioTag.paused) {
            audioTag.play()
        } else {
            audioTag.pause()
        }
    },
    /**
     * @param {number} pos in secs 
     * @returns 
     */
    seek: (pos) => audioTag.currentTime = pos,
    playNext: () => {
        let hasNext = state.playlistIt < state.playlist.length - 1
        if (state.loop === "playlist") {
            state.playlistIt = hasNext ? state.playlistIt + 1 : 0
        } else if (state.loop === "disabled") {
            state.playlistIt = hasNext ? state.playlistIt + 1 : state.playlistIt
        }
        _setSource(state.playlist[state.playlistIt])
        audioTag.play()
    },
    playPrev: () => {
        let hasPrev = state.playlistIt > 0
        if (state.loop === "playlist") {
            state.playlistIt = hasPrev ? state.playlistIt - 1 : state.playlist.length - 1
        } else if (state.loop === "disabled") {
            state.playlistIt = hasPrev ? state.playlistIt - 1 : state.playlistIt
        }
        _setSource(state.playlist[state.playlistIt])
        audioTag.play()
    },
    nowPlayingId: () => state.playlist[state.playlistIt],
    /**
     * @param {Function} action 
     * @returns {() => void} unsubscribe
     */
    onNowPlayingChanged: (action) => {
        audioTag.addEventListener("loadedmetadata", action)
        return () => audioTag.removeEventListener("loadedmetadata", action)
    },
    getPosition: () => audioTag.currentTime,
    /**
     * @param {Function} action 
     * @returns {() => void} unsubscribe
     */
    onPositionChanged: (action) => {
        audioTag.addEventListener("timeupdate", action)
        return () => audioTag.removeEventListener("timeupdate", action)
    },
    getDuration: () => audioTag.duration,
    /**
     * @param {Function} action 
     * @returns {() => void} unsubscribe
     */
    onDurationChanged: (action) => {
        audioTag.addEventListener("durationchange", action)
        return () => audioTag.removeEventListener("durationchange", action)
    },
    /**
     * @param {Function} action 
     * @returns {() => void} unsubscribe
     */
    onPaused: (action) => {
        audioTag.addEventListener("pause", action)
        return () => audioTag.removeEventListener("pause", action)
    },
    /**
     * @param {Function} action 
     * @returns {() => void} unsubscribe
     */
    onPlayed: (action) => {
        audioTag.addEventListener("play", action)
        return () => audioTag.removeEventListener("play", action)
    },
}

audioTag.addEventListener("ended", player.playNext)