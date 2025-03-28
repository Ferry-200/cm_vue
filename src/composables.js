import { onMounted, onUnmounted, ref } from "vue";
import { player } from "./audio_player";

/**
 * @returns now playing id, may be undefined
 */
export function useNowPlayingId() {
    const nowPlayingId = ref(undefined)
    const update = () => {
        nowPlayingId.value = player.nowPlayingId()
    }
    let unsubscribe;
    onMounted(() => {
        unsubscribe = player.onNowPlayingChanged(update)
    })
    onUnmounted(() => {
        unsubscribe()
    })

    return nowPlayingId
}

/**
 * @returns position in secs
 */
export function usePlayerPositon() {
    const pos = ref(0)
    const update = () => {
        pos.value = player.getPosition()
    }
    let unsubscribe;
    onMounted(() => {
        unsubscribe = player.onPositionChanged(update)
    })
    onUnmounted(() => {
        unsubscribe()
    })

    return pos
}

/**
 * @returns duration in secs
 */
export function usePlayerDuration() {
    const duration = ref(0)
    const update = () => {
        duration.value = player.getDuration()
    }
    let unsubscribe;
    onMounted(() => {
        unsubscribe = player.onDurationChanged(update)
    })
    onUnmounted(() => {
        unsubscribe()
    })

    return duration
}

/**
 * @returns is playing
 */
export function usePlayerState() {
    const isPlaying = ref(false)
    const _onPaused = () => {
        isPlaying.value = false
    }
    const _onPlayed = () => {
        isPlaying.value = true
    }

    let unsubscribeOnPaused;
    let unsubscribeOnPlayed;

    onMounted(() => {
        unsubscribeOnPaused = player.onPaused(_onPaused)
        unsubscribeOnPlayed = player.onPlayed(_onPlayed)
    })
    onUnmounted(() => {
        unsubscribeOnPaused()
        unsubscribeOnPlayed()
    })

    return isPlaying
}