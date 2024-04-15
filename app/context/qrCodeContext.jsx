import { createContext, useState } from "react";

const QrCodeContext = createContext(null);

function QrCodeProvider({ children, initialData }) {
    const [colorsData, setColorsData] = useState(initialData.colors);
    const [designData, setDesignData] = useState(initialData.design);
    const [frameData, setFrameData] = useState(initialData.frame);

    return (
        <QrCodeContext.Provider value={{ colorsData, setColorsData, designData, setDesignData, frameData, setFrameData, initialData }}>
            {children}
        </QrCodeContext.Provider>
    );
}

export { QrCodeContext, QrCodeProvider };
