const flat = '\u266D'
const sharp = '\u266F'
const doubleFlat = '\uD834\uDD2B'
const doubleSharp = '\uD834\uDD2A'

let chordInput = document.querySelector("#chord")
let origin = document.querySelector("#origin")
let target = document.querySelector("#target")
let result = document.querySelector("#result")

let chord = null
let originKey = null
let targetKey = null

function updateResult() {
    chord = MusicTheoryJS.chordFromString(chordInput.value).first
    originKey = MusicTheoryJS.keyFromString(origin.value).first
    targetKey = MusicTheoryJS.keyFromString(target.value).first
    // console.log(chord, originKey, targetKey);
    if (chord === null || originKey === null || targetKey === null || originKey.mode !== targetKey.mode)
        result.textContent = "Введите данные"
    else {
        // try {
            let transposed = MusicTheoryJS.transposeChord(chord, originKey, targetKey)
            result.textContent = transposed.name
        // } catch (e) {
        //     alert(e.message)
        //     result.textContent = "Ошибка"
        // }
    }
}

updateResult()

let chordRead = document.querySelector("#chordRead")
let originRead = document.querySelector("#originRead")
let targetRead = document.querySelector("#targetRead")

chordInput.oninput = function () {
    updateResult()
    if (chord === null)
        chordRead.textContent = ""
    else
        chordRead.textContent = chord.name
}
origin.oninput = function () {
    updateResult()
    if (originKey === null)
        originRead.textContent = ""
    else
        originRead.textContent = originKey.name
}
target.oninput = function () {
    updateResult()
    if (targetKey === null)
        targetRead.textContent = ""
    else
        targetRead.textContent = targetKey.name
}

let sharpButton = document.querySelector("#sharp")
let flatButton = document.querySelector("#flat")

let lastActive = null

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
        lastActive.value += sharp
        lastActive.oninput()
        lastActive.focus()
    }
}

flatButton.onclick = function () {
    if (lastActive !== null) {
        lastActive.value += flat
        lastActive.oninput()
        lastActive.focus()
    }
}
