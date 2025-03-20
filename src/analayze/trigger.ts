import { SpecialEvent, Trigger } from "../types";

const MODIFIER_REGEX = /\b(delay|once|changed|throttle|from)(:[#.]?[A-Za-z0-9]+)?/gm;
const SPECIAL_EVENT_REGEX = /\b(load|revealed|intersect)(?:\s+(root:[#.]\w+))?(?:\s+(threshold:(?:0(?:\.\d+)?|1(?:\.0+)?)))?\b/;

export default function (el: Element): Trigger[] {
    const jmTriggerText = el.getAttribute("jx-trigger");

    let triggers: Trigger[] = [];
    if (jmTriggerText) {
        const triggerInputs = jmTriggerText.split(",");
        // triggers = new Array(triggerInputs.length);

        for (let i = 0; i < triggerInputs.length; i++) {
            const input = triggerInputs[i].trim();
            let modifiers: Record<string, string> = {};
            let specialEvent: SpecialEvent = ["load"];

            // Extract modifiers
            const modifierMatches = input.match(MODIFIER_REGEX);
            if (modifierMatches) {
                modifiers = Object.create(null);
                for (const modifier of modifierMatches) {
                    const [key, value] = modifier.split(":");
                    modifiers[key] = value ?? "";
                }
            }

            // Extract special event
            const specialEventMatch = input.match(SPECIAL_EVENT_REGEX);
            if (specialEventMatch) {
                if (specialEventMatch[1] === "intersect") {
                    specialEvent = ["intersect", { root: "", threshold: 0 }];
                    if (specialEventMatch[2]) {
                        const [key, val] = specialEventMatch[2].split(":");
                        specialEvent[1][key as "root"] = val;
                    }
                    if (specialEventMatch[3]) {
                        const [key, val] = specialEventMatch[3].split(":");
                        specialEvent[1][key as "threshold"] = parseFloat(val);
                    }
                } else {
                    specialEvent = [specialEventMatch[1] as "load" | "revealed"];
                }
            }

            // Extract eventName without modifying `input`
            const usedWords = new Set([...modifierMatches ?? [], ...specialEventMatch ?? []]);
            const eventName = input
                .split(/\s+/)
                .filter(word => !usedWords.has(word))
                .join(" ")
                .trim();

            triggers[i] = { eventName, modifiers, specialEvent };
        }



    } else {
        if (el.nodeName == "FORM") {
            triggers.push({
                eventName: 'submit',
                specialEvent: ['load']
            })
        } else {
            triggers.push({
                eventName: 'click',
                specialEvent: ['load']
            })
        }
    }


    return triggers;
}



// Example usage
// const input = "delay:2s from:#ffee click[revealed], hover throttle:3s, change[intersect]";
// const triggers = parseTriggers(input);
// console.log(triggers);