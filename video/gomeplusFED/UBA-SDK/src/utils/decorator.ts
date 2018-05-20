
export function permit(isOK) {
    return function(constructor: any) {
        constructor.enable = isOK;
    };
}

export function before(loadFunc) {
    return function(constructor: any) {
        constructor.load = loadFunc;
    };
}
