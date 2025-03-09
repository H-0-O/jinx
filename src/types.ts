
export type MethodMap = "get" | "post" | "put" | "patch" | "delete"

export interface Component {
    $el: Element
    request: Request,
    triggers: Trigger[],
    targets?: Target[]
}
export interface Request {
    method: MethodMap,
    url: string
}

export interface Trigger {
    eventName: string
    filter?: string // Only one filter per trigger
    modifiers?: Record<("once" | "changed" | "delay" | "throttle" | "from"), string>
    specialEvent: SpecialEvent
}

export type SpecialEvent =
    | ["load"]
    | ["revealed"]
    | ["intersect", { root: string; threshold: number }];


export interface Target {
    $el: Element
    placeholders:  {
        bindName: string
        $el: Element
    }[]
}



