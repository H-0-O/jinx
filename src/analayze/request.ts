import { MethodMap, Request } from "../types";

const METHOD_MAP: Record<string, MethodMap> = {
    "jx-get": "get",
    "jx-post": "post",
    "jx-put": "put",
    "jx-patch": "patch",
    "jx-delete": "delete",
};

export default function (el: Element): Request {
    for (const [attr, method] of Object.entries(METHOD_MAP)) {
        const url = el.getAttribute(attr);
        if (url != null) {
            return {
                url,
                method: method,
            };
        }
    }
    return { url: "/" , method: "get" }; // Explicitly return null if no attribute is found

}