// =====================================
// CipherShield JavaScript
// Caesar Cipher Tool
// =====================================

// Elements

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");

const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const shiftRange = document.getElementById("shiftRange");
const shiftValue = document.getElementById("shiftValue");

const charCount = document.getElementById("charCount");

const statusText = document.getElementById("status");

const historyList = document.getElementById("historyList");

// =====================================
// Character Counter
// =====================================

inputText.addEventListener("input", () => {

    charCount.textContent =
        inputText.value.length + " Characters";

});

// =====================================
// Slider Value
// =====================================

shiftRange.addEventListener("input", () => {

    shiftValue.textContent = shiftRange.value;

});

// =====================================
// Caesar Encrypt
// =====================================

function encrypt(text, shift) {

    let result = "";

    shift = Number(shift);

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        if (char >= "A" && char <= "Z") {

            result += String.fromCharCode(

                ((char.charCodeAt(0) - 65 + shift) % 26) + 65

            );

        }

        else if (char >= "a" && char <= "z") {

            result += String.fromCharCode(

                ((char.charCodeAt(0) - 97 + shift) % 26) + 97

            );

        }

        else {

            result += char;

        }

    }

    return result;

}

// =====================================
// Caesar Decrypt
// =====================================

function decrypt(text, shift) {

    return encrypt(text, 26 - shift);

}
// =====================================
// Encrypt Button
// =====================================

encryptBtn.addEventListener("click", () => {

    const message = inputText.value.trim();

    if (message === "") {

        statusText.textContent = "Please enter a message.";

        return;

    }

    const shift = Number(shiftRange.value);

    const encrypted = encrypt(message, shift);

    outputText.value = encrypted;

    statusText.textContent = "Encryption Successful ✔";

    addHistory("🔒 Encrypted", message, encrypted);

});

// =====================================
// Decrypt Button
// =====================================

decryptBtn.addEventListener("click", () => {

    const message = inputText.value.trim();

    if (message === "") {

        statusText.textContent = "Please enter a message.";

        return;

    }

    const shift = Number(shiftRange.value);

    const decrypted = decrypt(message, shift);

    outputText.value = decrypted;

    statusText.textContent = "Decryption Successful ✔";

    addHistory("🔓 Decrypted", message, decrypted);

});

// =====================================
// History
// =====================================

function addHistory(type, input, output) {

    if (historyList.children.length === 1 &&
        historyList.children[0].textContent === "No activity yet.") {

        historyList.innerHTML = "";

    }

    const item = document.createElement("li");

    item.innerHTML = `

        <strong>${type}</strong><br><br>

        <b>Input :</b> ${input}<br>

        <b>Output :</b> ${output}

    `;

    historyList.prepend(item);

    while (historyList.children.length > 5) {

        historyList.removeChild(historyList.lastChild);

    }

}
// =====================================
// Copy Button
// =====================================

copyBtn.addEventListener("click", () => {

    if (outputText.value === "") {

        statusText.textContent = "Nothing to copy.";

        return;

    }

    navigator.clipboard.writeText(outputText.value);

    statusText.textContent = "Copied to Clipboard ✔";

});

// =====================================
// Clear Button
// =====================================

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.value = "";

    shiftRange.value = 3;

    shiftValue.textContent = "3";

    charCount.textContent = "0 Characters";

    statusText.textContent = "Everything Cleared";

});

// =====================================
// Press Ctrl + Enter to Encrypt
// =====================================

inputText.addEventListener("keydown", (event) => {

    if (event.ctrlKey && event.key === "Enter") {

        encryptBtn.click();

    }

});

// =====================================
// Auto Focus
// =====================================

window.onload = () => {

    inputText.focus();

};

// =====================================
// Welcome Message
// =====================================

statusText.textContent = "Ready to Encrypt 🔐";
