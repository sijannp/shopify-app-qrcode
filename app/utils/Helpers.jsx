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


export function hexToHsb(hex) {

    hex = hex.replace(/^#/, '');

    if (hex.length !== 3 && hex.length !== 6) {
        throw new Error('Invalid hex string');
    }

    const rgb = hex.match(/.{1,2}/g).map(x => parseInt(x, 16));
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;
    if (delta === 0) {
        hue = 0; // No color
    } else if (max === r) {
        hue = ((g - b) / delta) % 6;
    } else if (max === g) {
        hue = (b - r) / delta + 2;
    } else {
        hue = (r - g) / delta + 4;
    }

    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;

    const saturation = delta === 0 ? 0 : delta / max;
    const brightness = max;

    return { hue, saturation, brightness };
}


export const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.get("title") || formData.get("title").trim() === "") {
        newErrors.name = "Title is required";
    }


    if (!formData.get("section") || formData.get("section").trim() === "") {
        newErrors.link = "Section is required";
    }


    return Object.keys(newErrors).length === 0;
};


export const addMissingFields = (formData) => {
    const defaultFormData = {
        backcolor: "#FFFFFF",
        frontcolor: "#000000",
        gradient_color: "#000000",
        pattern: "special-circle",
        marker: "default",
        marker_in: "default",
        marker_out_color: "#000000",
        marker_in_color: "#000000",
        marker_top_right_outline: "#000000",
        marker_top_right_center: "#000000",
        marker_bottom_left_outline: "#000000",
        marker_bottom_left_center: "#000000",
        optionlogo: "none",
        no_logo_bg: "",
        outer_frame: "none",
        framelabel: "SCAN ME",
        label_font: "Arial, Helvetica, sans-serif",
        framecolor: "#000000",
        size: 24,
        level: "M",
        imagePreview: "",
        link: "http://app.qodevault.com",
        section: "#link",
        title: "Test QR Code",
        dynamic: true,
        is_editing: false
    }

    for (const key in defaultFormData) {
        if (!formData.has(key)) {

            formData.append(key, defaultFormData[key]);
        }
    }

    return formData;


}