import axios, { AxiosResponse } from "axios";
import { Component } from "../types";
import form from "./form";



export default function (components: Component[]) {

    for (const component of components) {
        for (const trigger of component.triggers) {
            component.$el.addEventListener(trigger.eventName, async function (event) {
                event.preventDefault();
                const req = async () => {
                    let response: AxiosResponse;
                    if (component.request.method == "get" || component.request.method == "delete") {
                        response = await axios[component.request.method](component.request.url);
                    } else {
                        const data = form(component.$el as HTMLFormElement);
                        console.log("THE DATA" , data);
                        
                        response = await axios[component.request.method](component.request.url, data);
                    }
                    for (const target of component.targets || []) {
                        for (const placeholder of target.placeholders) {
                            placeholder.$el.innerHTML = response.data[placeholder.bindName]
                        }
                    }
                }

                if (trigger.modifiers?.delay) {
                    const delay: string = trigger.modifiers?.delay;
                    let timeDel = 0;
                    if (delay[1] == 's') {
                        timeDel = parseFloat(delay[0]) * 1000;
                    } else {
                        timeDel = parseFloat(delay[0])
                    }
                    setTimeout(async () => await req(), timeDel);
                } else {
                    await req();
                }

            }, {
                once: trigger.modifiers?.once != undefined
            });
        }
    }
}



