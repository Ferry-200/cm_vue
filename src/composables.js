import { onMounted, onUnmounted, ref } from "vue";
import { player } from "./audio_player";

/**
 * @returns now playing id, may be undefined
 */
export function useNowPlayingId() {
    const nowPlayingId = ref(player.nowPlayingId())
    const update = () => {
        nowPlayingId.value = player.nowPlayingId()
    }
    let unsubscribe;
    onMounted(() => {
        unsubscribe = player.onNowPlayingChanged(update)
    })
    onUnmounted(() => {
        unsubscribe && unsubscribe()
    })

    return nowPlayingId
}

/**
 * @returns position in secs
 */
export function usePlayerPositon() {
    const pos = ref(player.getPosition())
    const update = () => {
        pos.value = player.getPosition()
    }
    let unsubscribe;
    onMounted(() => {
        unsubscribe = player.onPositionChanged(update)
    })
    onUnmounted(() => {
        unsubscribe && unsubscribe()
    })

    return pos
}

/**
 * @returns duration in secs
 */
export function usePlayerDuration() {
    const duration = ref(player.getDuration())
    const update = () => {
        duration.value = player.getDuration()
    }
    let unsubscribe;
    onMounted(() => {
        unsubscribe = player.onDurationChanged(update)
    })
    onUnmounted(() => {
        unsubscribe && unsubscribe()
    })

    return duration
}

/**
 * @returns is playing
 */
export function usePlayerState() {
    const isPaused = ref(player.getIsPaused())
    const update = () => {
        isPaused.value = player.getIsPaused()
    }

    let unsubscribeOnPaused;
    let unsubscribeOnPlayed;

    onMounted(() => {
        unsubscribeOnPaused = player.onPaused(update)
        unsubscribeOnPlayed = player.onPlayed(update)
    })
    onUnmounted(() => {
        unsubscribeOnPaused && unsubscribeOnPaused()
        unsubscribeOnPlayed && unsubscribeOnPlayed()
    })

    return isPaused
}