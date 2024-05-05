export function Term(selector, settings) {
    const termSettings = {
        outputClass: "output",
        prompt: "name@medium $ ",
        promptClass: "prompt",
        promptInputClass: "active-input",
        promptInputId: "active-input-id"
    };

    if (settings) {
        if (settings.prompt) {
            termSettings.prompt = settings.prompt;
        }
        if (settings.promptClass) {
            termSettings.promptClass = settings.promptClass;
        }
        if (settings.promptInputClass) {
            termSettings.promptInputClass = settings.promptInputClass;
        }
        if (settings.outputClass) {
            termSettings.outputClass = settings.outputClass;
        }
        if (settings.promptInputId) {
            termSettings.promptInputId = settings.promptInputId;
        }
    }

    function addOutputContainer() {
        const id = "output";
        const output = document.createElement("span");
        output.id = id;
        output.classList.add(termSettings.outputClass);
        selector.appendChild(output);
        return output;
    }
    let mirrorFromId = undefined;
    let mirroredInput = undefined;

    function mirrorTextFromInput(elementId) {
        mirrorFromId = elementId;
        const element = document.getElementById(elementId);
        element.value = "";
        element.focus();
        element.addEventListener("keyup", function (event) {
            if (mirroredInput) {
                mirroredInput.innerText = `${event.target.value}`;
            }
        });
        document.addEventListener("click", (_) => {
            document.getElementById(mirrorFromId).focus();
        });
    }

    function addHiddenInput() {
        const id = "input";
        const input = document.createElement("input");
        input.id = id;
        input.style["opacity"] = 0;
        selector.appendChild(input);
        mirrorTextFromInput(id);
        return input;
    }

    const output = addOutputContainer();
    const input = addHiddenInput();

    function print(text, cssClass) {
        const printElement =  document.createElement("pre");
        printElement.innerText = text;
        if (cssClass) {
            printElement.classList.add(cssClass);
        }
        output.appendChild(printElement);
    }

    function createPromptElement() {
        const prompt = document.createElement("pre");
        prompt.innerText = termSettings.prompt;
        prompt.classList.add(termSettings.promptClass);

        return prompt;
    }

    function createPropmtInputSpan() {
        const span = document.createElement("span");
        span.id = termSettings.promptInputId;
        span.classList.add(termSettings.promptInputClass);

        return span;
    }

    function drawPrompt() {
        const lastInput = document.getElementById(termSettings.promptInputId);

        if (lastInput) {
            lastInput.id = null;
        }
        const prompt = createPromptElement();
        const inputSpan = createPropmtInputSpan();
        prompt.appendChild(inputSpan);
        output.appendChild(prompt);
        mirroredInput = inputSpan;
    }

    function registerInputCallback(callback) {
        input.addEventListener("keypress", (event) => {
            const text = input.value;
            const key = event.key;
            callback({ text: text, key: key });
        });
    }

    function clearInput() {
        input.value = "";
    }
    return {
        print: print,
        drawPrompt: drawPrompt,
        registerInputCallback: registerInputCallback,
        clearInput: clearInput
    };
}
