

export default function getFormData($el: HTMLFormElement) {
    const data: Record<string, any> = Object.create(null);
    const elements = Array.from($el.elements) as HTMLInputElement[];

    for (const element of elements) {
        const { name, type, value } = element;
        if (!name || type === "submit") continue;

        setNestedValue(data, name, value);
    }

    return data;
}

function setNestedValue(obj: any, path: string, value: any) {
    const keys = path.match(/([^[\]]+)/g) || [];
    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const isLast = i === keys.length - 1;

        if (isLast) {
            if (Array.isArray(current[key])) {
                current[key].push(value);
            } else if (key in current) {
                current[key] = [current[key], value].flat();
            } else {
                current[key] = value;
            }
        } else {
            if (!(key in current)) {
                //TODO fix this later
                current[key] = keys[i + 1] === '' || !isNaN(Number(keys[i + 1])) ? [] : {};
            }
            current = current[key];
        }
    }
}
