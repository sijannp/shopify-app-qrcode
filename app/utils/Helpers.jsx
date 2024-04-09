function hsbToHex(hue, saturation, brightness) {
    // Convert HSB to RGB
    let chroma = brightness * saturation;
    let huePrime = hue / 60;
    let x = chroma * (1 - Math.abs((huePrime % 2) - 1));
    let r1, g1, b1;

    if (huePrime >= 0 && huePrime <= 1) {
        [r1, g1, b1] = [chroma, x, 0];
    } else if (huePrime > 1 && huePrime <= 2) {
        [r1, g1, b1] = [x, chroma, 0];
    } else if (huePrime > 2 && huePrime <= 3) {
        [r1, g1, b1] = [0, chroma, x];
    } else if (huePrime > 3 && huePrime <= 4) {
        [r1, g1, b1] = [0, x, chroma];
    } else if (huePrime > 4 && huePrime <= 5) {
        [r1, g1, b1] = [x, 0, chroma];
    } else if (huePrime > 5 && huePrime <= 6) {
        [r1, g1, b1] = [chroma, 0, x];
    }

    let m = brightness - chroma;
    let [r, g, b] = [r1 + m, g1 + m, b1 + m];

    // Convert RGB to hexadecimal
    let rHex = Math.round(r * 255).toString(16).padStart(2, '0');
    let gHex = Math.round(g * 255).toString(16).padStart(2, '0');
    let bHex = Math.round(b * 255).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
}

export default hsbToHex;