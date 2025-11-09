// JS

function getLinesNumber(element) {
    let textLines = element.value.split("\n");
    let currentLinesNumber = textLines.length;
    return currentLinesNumber;
}

let lineBox = document.querySelector(".line-box");
let textArea = document.querySelector(".code-text");
textArea.addEventListener("keydown", (e) => {
    // #region TAB AND SHIFT TAB
    if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const lineStart = textArea.value.lastIndexOf("\n", start -1) + 1;
        let lineEnd = textArea.value.indexOf("\n", end);
        if (lineEnd === -1){
            lineEnd = textArea.value.length;
        }
        let selectedLines = textArea.value.slice(lineStart, lineEnd);
        const newBlock = selectedLines.split("\n").map(line => line.replace(/^(\t| {1,4})/, "")).join("\n");
        textArea.value = textArea.value.slice(0, lineStart) + newBlock + textArea.value.slice(lineEnd);

        textArea.selectionStart = lineStart;
        textArea.selectionEnd = lineStart + newBlock.length;

        console.log(textArea.cols);
        console.log(textArea.rows);
        return;
        
    }
    else if (e.key === "Tab") {
        e.preventDefault();
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        if (start === end && !textArea.value.slice(start, end).includes("\n")) {
            textArea.value = textArea.value.slice(0, start) + "\t" + textArea.value.slice(end);
            textArea.selectionStart = textArea.selectionEnd = start + 1;
        } else {
            const lineStart = textArea.value.lastIndexOf("\n", start - 1) +1;
            let lineEnd = textArea.value.indexOf("\n", end);
            if (lineEnd === -1) {
                lineEnd = textArea.value.length;
            }

            const selectedLines = textArea.value.slice(lineStart, lineEnd);
            const newBlock = selectedLines.split("\n").map(line => "\t" + line).join("\n");

            textArea.value = textArea.value.slice(0, lineStart) + newBlock + textArea.value.slice(lineEnd);

            textArea.selectionStart = lineStart;
            textArea.selectionEnd = lineStart + newBlock.length;
        }   
    }
    // #endregion
    if (e.key === "s" && e.ctrlKey) {
        e.preventDefault();
       alert("saving is not complete");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    let span = document.createElement("span");
    span.innerHTML = "1";
    lineBox.append(span);
});
textArea.addEventListener("input", (e) => {
    let linesNumber = getLinesNumber(textArea);
    console.log(linesNumber);
    let allLines = lineBox.querySelectorAll("span");
    allLines.forEach(element => {
        element.remove();
    });
    for (let index = 1; index <= linesNumber; index++) {
        let span = document.createElement("span");
        span.innerHTML = index;
        lineBox.append(span);
    }
});

/*
    TO DO
    LINE NUMBERS ## DONE
    FULL HEADER ## DONE
    COLLAPSING
    UNDO REDO
    EXPORT IMPORT
    SYNTAX HIGHLIGHTING
*/