import analyze  from "./analayze";
import binds from "./binds";




// export interface Component {
//     element: Element,
//     action: Action
//     placeholders?: [],
//     children?: Component
// }

// export interface Action {
//     url: string,
//     method: string,
//     trigger: Trigger,
// }


// const components: Component[] = [];

export function initJML() {
    mountJML().catch((e) => {
        console.error("JML Initialization Error:", e);
    });
}

async function mountJML() {
    let elements: Element[] = document.querySelectorAll("[jx-get],[jx-post],[jx-put],[jx-patch],[jx-delete]") as any;

    const components  = analyze(elements);
    binds(components)
    console.log(components);
    
    return;
    // for (const el of elements) {




    //     let method = null;
    //     let url = null;
    //     if (el.getAttribute('jm-get')) {
    //         method = 'get';
    //         url = el.getAttribute('jm-get');
    //     }

    //     if (el.getAttribute("jm-post")) {
    //         method = 'post'
    //         url = el.getAttribute('jm-post');
    //     }

    //     if (method == null || url == null) {
    //         throw "FF";
    //     }


    //     const trigger = findTrigger(el);

    //     const component: Component = {
    //         element: el,
    //         action: {
    //             method,
    //             url,
    //             trigger
    //         }

    //     }
    //     components.push(component)
    // }


    // // console.log(components);

    // process(components);

    // for (const el of elements) {
    //     const src = el.getAttribute('src');
    //     if (src) {
    //         try {
    //             const response = await fetch(src);
    //             const data = await response.json();
    //             processJML(el, data);
    //         } catch (error) {
    //             console.error(`Failed to load JSON from ${src}`, error);
    //         }
    //     }
    // }
}

// function findTrigger(el: Element): Trigger {


//     const triggerEl = el.getAttribute("jm-trigger") != null ? el : el.querySelector("[jm-trigger]");
//     if (triggerEl == null) {
//         throw "dfijdf";
//     }

//     const event = triggerEl.getAttribute('jm-trigger') ?? "";
//     return {
//         el: triggerEl,
//         event
//     }

// }

// interface Trigger {
//     el: Element
//     event: string
// }

// function processJML(element, data) {
//     // Example: Replace x-json bindings
//     element.querySelectorAll('[x-json]').forEach(child => {
//         const key = child.getAttribute('x-json');
//         if (data[key] !== undefined) {
//             child.textContent = data[key];
//         }
//     });
// }
