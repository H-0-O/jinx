import { SpecialEvent, Trigger } from "../types";

// const TRIGGER_REGEX = /\b(once|changed|delay|throttle|from)\b|\b(load|revealed|intersect)\b|\b(delay|throttle|from):([a-zA-Z0-9]+)\b/g;

// export default function (el: Element): Trigger[] {
//     let tr = el.getAttribute("jm-trigger") || "";  // Getting the trigger attribute from the element
//     let triggers: Trigger[] = [];

//     // Split the string by commas to handle multiple triggers
//     const triggerStrings = tr.split(',').map(str => str.trim());

//     // Loop through each trigger using for...of for performance
//     for (const triggerStr of triggerStrings) {
//         let modifiers: Trigger["modifiers"] = [];
//         let filter: Trigger["filter"] = "load"; // Default filter
//         let modifierValue: string | undefined = undefined;
//         let eventName: string = ""; // Will be assigned later

//         // Perform regex matching to capture modifiers, filters, and modifier values
//         let match;

//         // Perform regex to find all matches for modifiers and filters
//         while ((match = TRIGGER_REGEX.exec(triggerStr)) !== null) {
//             console.log("THE MATHC" , match);

//             if (match[1]) { // Simple modifier (once, changed)
//                 modifiers.push(match[1] as any);
//             } else if (match[2]) { // Filter (load, revealed, intersect)
//                 filter = match[2] as Trigger["filter"];
//             } else if (match[3] && match[4]) { // Modifier with value (delay:2s, throttle:500ms)
//                 modifiers.push(match[3] as any);
//                 modifierValue = match[4]; // Store the value after ":"
//             }
//         }

//         // Extract the event name by removing the modifiers and filters
//         let remainingStr = triggerStr
//             .split(" ")
//             .filter(word => !modifiers.includes(word as any) && !word.includes(":") && !["load", "revealed", "intersect"].includes(word))
//             .join(" ");

//         eventName = remainingStr || "click"; // Default to "click" if no eventName

//         // Push the parsed trigger to the triggers array
//         triggers.push({ eventName, modifiers, filter, modifierValue });
//     }

//     return triggers;
// }

const MODIFIER_REGEX = /\b(delay|once|changed|throttle|from)(:[#.]?[A-Za-z0-9]+)?/gm;
const SPECIAL_EVENT_REGEX = /\b(load|revealed|intersect)(?:\s+(root:[#.]\w+))?(?:\s+(threshold:(?:0(?:\.\d+)?|1(?:\.0+)?)))?\b/;

export default function (el: Element): Trigger[] {
    const jmTriggerText = el.getAttribute("jm-trigger") || "";
    const triggers: Trigger[] = [];
    
    for (const input of jmTriggerText.split(",")) {
        let temp = input;
        let modifiers: Record<string, string> = {};
        let specialEvent: Trigger['specialEvent'] = ["load"];

        const modifierMatch = input.match(MODIFIER_REGEX) || [];
        for (const modifier of modifierMatch) {
            temp = temp.replace(modifier , "");
            const splitted = modifier.split(":");
            modifiers[splitted[0]] = splitted[1] ?? null;
        }

        const specialEventMatch = input.match(SPECIAL_EVENT_REGEX);
        
        if (specialEventMatch != null) {
            if (specialEventMatch[1] == "intersect") {
                temp = temp.replace("intersect" , "");
                specialEvent = [
                    "intersect",
                    {
                        root: "",
                        threshold: 0
                    }
                ]
                if (specialEventMatch[2]) {
                    temp = temp.replace(specialEventMatch[2] , "");
                    const sp = specialEventMatch[2].split(":");
                    if (sp[0] == "root") {
                        specialEvent[1].root = sp[1];
                    } else if (sp[0] == "threshold") {
                        specialEvent[1].threshold = parseFloat(sp[1]);
                    }
                }

                if (specialEventMatch[3]) {
                    temp = temp.replace(specialEventMatch[3] , "");
                    const sp = specialEventMatch[3].split(":");
                    if (sp[0] == "root") {
                        specialEvent[1].root = sp[1];
                    } else if (sp[0] == "threshold") {
                        specialEvent[1].threshold = parseFloat(sp[1]);
                    }
                }
            } else {
                temp = temp.replace(specialEventMatch[1] , "");
                specialEvent = [
                    specialEventMatch[1] as "load" | "revealed",
                ]
            }

        }
        
        triggers.push({
            eventName: temp.trim(),
            modifiers,
            specialEvent
        })


    }


    return triggers;
}

// Example usage
// const input = "delay:2s from:#ffee click[revealed], hover throttle:3s, change[intersect]";
// const triggers = parseTriggers(input);
// console.log(triggers);