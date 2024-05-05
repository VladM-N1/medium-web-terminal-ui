export function Term(selector, settings) {
    const termSettings = {
        outputClass: "output",
        prompt: "name@medium $ ",
    };
    if (settings) {
        if (settings.prompt) {
            termSettings.prompt = settings.prompt;
        }

        if (settings.outputClass) {
            termSettings.outputClass = settings.outputClass;
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

        return prompt;
    }

    function createPropmtInputSpan() {
        const span = document.createElement("span");
        span.id = termSettings.promptInputId;

        return span;
    }

    function drawPrompt() {
        const prompt = createPromptElement();
        const inputSpan = createPropmtInputSpan();
        prompt.appendChild(inputSpan);
        output.appendChild(prompt);
        mirroredInput = inputSpan;
    }

    return {
        print: print,
        drawPrompt: drawPrompt,
    };
}
