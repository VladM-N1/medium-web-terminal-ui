export function Term(selector, settings) {
    const termSettings = {
        outputClass: "output",
    }
    if (settings) {

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
    let mirroredInput = document.createElement("span");
    selector.appendChild(mirroredInput);

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
    addHiddenInput();
    const output = addOutputContainer();
    function print(text, cssClass) {
        const printElement =  document.createElement("pre");
        printElement.innerText = text;
        if (cssClass) {
            printElement.classList.add(cssClass);
        }
        output.appendChild(printElement);
    }

    return {
        print: print,
    };
}
