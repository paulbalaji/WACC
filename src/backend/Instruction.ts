
export function Label(labelName) {
    var label: any = {};
    label.labelName = labelName;
    return label;
}

export function Ldr(dst, src) {
    var ldr: any = {};
    ldr.dst = dst;
    ldr.src = src;
    return ldr;
}