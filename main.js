const flat = '\u266D'
const sharp = '\u266F'
const doubleFlat = '\uD834\uDD2B'
const doubleSharp = '\uD834\uDD2A'

let chordInput = document.querySelector("#chord")
let origin = document.querySelector("#origin")
let target = document.querySelector("#target")
let result = document.querySelector("#result")

let originKey = null
let targetKey = null

function updateResult() {
    let chordsInputText = chordInput.value
    let originMusicText = MusicTheoryJS.musicTextFromPlainText(origin.value)
    originKey = MusicTheoryJS.keyFromString(originMusicText).first
    origin.value = originMusicText
    let targetMusicText = MusicTheoryJS.musicTextFromPlainText(target.value)
    targetKey = MusicTheoryJS.keyFromString(targetMusicText).first
    target.value = targetMusicText

    let saveSelection = chordInput.selectionStart
    let chords = MusicTheoryJS.chordsTextFromPlainText(chordsInputText)
    chordInput.value = chords.toString()
    chordInput.selectionStart = saveSelection
    chordInput.selectionEnd = saveSelection

    // if (originKey !== null)
    //     origin.value = originKey.name
    // if (targetKey !== null)
    //     target.value = targetKey.name

    if (chordsInputText === "" || originKey === null || targetKey === null || originKey.mode !== targetKey.mode)
        result.textContent = "Введите данные"
    else {
        try {
            result.textContent = MusicTheoryJS.transposeChordsText(chords, originKey, targetKey)
        } catch (e) {
            // alert(e.message)
            console.log(e)
            result.textContent = "Ошибка"
        }
    }
    chordInput.style.height = "0"
    chordInput.style.height = chordInput.scrollHeight + 5 + "px"
    result.style.height = "0"
    result.style.height = result.scrollHeight + 5 + "px"
}

updateResult()

chordInput.oninput = function () {
    updateResult()
}
origin.oninput = function () {
    updateResult()
}
target.oninput = function () {
    updateResult()
}

let sharpButton = document.querySelector("#sharp")
let flatButton = document.querySelector("#flat")

let lastActive = null
let position = null

document.onselectionchange = function () {
    let active = document.activeElement;
    if (active !== chordInput && active !== origin && active !== target &&
        active !== sharpButton && active !== flatButton) {
        lastActive = null;
    }

}

function focusInput(textInput) {
    return function () { lastActive = textInput }
}

chordInput.onfocus = focusInput(chordInput)
origin.onfocus = focusInput(origin)
target.onfocus = focusInput(target)

sharpButton.onclick = function () {
    if (lastActive !== null) {
        // lastActive.value += sharp
        lastActive.setRangeText(sharp)
        lastActive.selectionEnd = lastActive.selectionStart + 1
        lastActive.selectionStart = lastActive.selectionEnd
        lastActive.oninput()
        lastActive.focus()
    }
}

flatButton.onclick = function () {
    if (lastActive !== null) {
        // lastActive.value += flat
        lastActive.setRangeText(flat)
        lastActive.selectionEnd = lastActive.selectionStart + 1
        lastActive.selectionStart = lastActive.selectionEnd
        lastActive.oninput()
        lastActive.focus()
    }
}
