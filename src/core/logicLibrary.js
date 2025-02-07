function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
function scalePercent(start, end) {
    return Math.max(0, Math.min(1, (scrollPercent - start) / (end - start)));
}
export {lerp,scalePercent};