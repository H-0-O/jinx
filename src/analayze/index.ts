import { Component } from "../types";
import request from "./request";
import target from "./target";
import trigger from "./trigger";


export default function (elements: Element[]): Component[] {
    const components: Component[] = [];

    for (const el of elements) {


        components.push({
            $el: el,
            request: request(el),
            triggers: trigger(el),
            targets: target(el)
        })
    }

    return components;
}