import { Target } from "../types";

export default function (el: Element): Target[] {
    const targetText = el.getAttribute("jm-target");
    if (!targetText) return [];

    // const targets = document.querySelectorAll(targetText) as unknown as Element[];
    // const final: Target[] = [];
    return Array.from(document.querySelectorAll(targetText)).map(target => ({
        $el: target,
        placeholders: Array.from(target.querySelectorAll("[jm-p]"))
            .map(placeholder => {
                const bindName = placeholder.getAttribute("jm-p");
                return bindName ? { bindName, $el: placeholder } : null;
            })
            .filter(Boolean) as Target["placeholders"]
    }));

}