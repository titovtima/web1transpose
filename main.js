const flat = '\u266D'
const sharp = '\u266F'
const doubleFlat = '\uD834\uDD2B'
const doubleSharp = '\uD834\uDD2A'

let chordInput = document.querySelector("#chord")
let origin = document.querySelector("#origin")
let target = document.querySelector("#target")
let result = document.querySelector("#result")

let chordsInputText = null
let originKey = null
let targetKey = null

function updateResult() {
    // chordsText = MusicTheoryJS.chordFromString(chordInput.value).first
    chordsInputText = chordInput.value
    originKey = MusicTheoryJS.keyFromString(origin.value).first
    targetKey = MusicTheoryJS.keyFromString(target.value).first
    // console.log(chord, originKey, targetKey);
    if (chordsInputText === null || chordsInputText === ""
        || originKey === null || targetKey === null || originKey.mode !== targetKey.mode)
        result.textContent = "Введите данные"
    else {
        try {
            let chordsText = MusicTheoryJS.chordsTextFromPlainText(chordsInputText)
            let saveSelection = chordInput.selectionStart
            chordInput.value = chordsText
            chordInput.selectionStart = saveSelection
            let resultChordsText = MusicTheoryJS.transposeChordsText(chordsText, originKey, targetKey)
            result.textContent = resultChordsText
        } catch (e) {
            // alert(e.message)
            console.log(e)
            result.textContent = "Ошибка"
        }
    }
    chordInput.style.height = "0"
    chordInput.style.height = chordInput.scrollHeight + "px"
    result.style.height = "0"
    result.style.height = result.scrollHeight + "px"
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
