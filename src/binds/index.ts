import axios from "axios";
import { Component } from "../types";



export default function (components: Component[]) {

    for (const component of components) {
        console.log(component);
        
        for (const trigger of component.triggers) {
            component.$el.addEventListener(trigger.eventName , async function(){
                const response = await axios[component.request.method](component.request.url);
                for(const target of component.targets || []){
                    for(const placeholder of target.placeholders){
                        placeholder.$el.innerHTML = response.data[placeholder.bindName]
                    }
                }
            });
        }
    }
}