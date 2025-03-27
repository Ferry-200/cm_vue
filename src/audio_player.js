const audioTag = new Audio()

export const audioPlayer = {
    setSourceUrl: (url) => {
        audioTag.src = url
    },
    play: () => {
        audioTag.play()
    }
}