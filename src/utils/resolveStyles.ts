// Lightweight resolver: evaluate style factory values (functions) with a theme
export default function resolveStyles(styles: any, theme: any) {
    const resolved: any = {};
    Object.keys(styles).forEach((key) => {
        const val = styles[key];
        resolved[key] = (typeof val === 'function') ? val(theme) : val;
    });
    return resolved;
}
