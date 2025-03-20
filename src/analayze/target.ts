import { Target } from "../types";

export default function (el: Element): Target[] {
    const targetText = el.getAttribute("jx-target");
    if (!targetText) return [];

    const targets = document.querySelectorAll(targetText);
    const final: Target[] = new Array(targets.length);

    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        const placeholdersList = target.querySelectorAll("[jx-p]");
        const placeholders = new Array(placeholdersList.length);

        for (let j = 0; j < placeholdersList.length; j++) {
            const placeholder = placeholdersList[j];
            const bindName = placeholder.getAttribute("jx-p");
            placeholders[j] = { bindName, $el: placeholder };
        }

        final[i] = { $el: target, placeholders };
    }

    return final;
}
