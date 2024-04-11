import React, { useState, useCallback } from 'react';
import { ColorPicker, Popover, Button, Text, BlockStack, InlineStack } from '@shopify/polaris';
import hsbToHex from '../utils/Helpers'


export const ColorPickerComponent = ({ label, inputName, defaultColor }) => {

    if (!defaultColor) defaultColor = { hue: 120, brightness: 0, saturation: 0 }

    const [color, setColor] = useState(defaultColor);
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );



    const activator = (
        <Button onClick={togglePopoverActive} variant='monochromePlain'   >
            <InlineStack blockAlign='center' gap={300}>
                <div style={{ backgroundColor: `${hsbToHex(color.hue, color.saturation, color.brightness)}`, border: '1px solid', width: '40px', height: '40px', borderRadius: '4px' }}></div>
                <BlockStack align='start' inlineAlign='start'>
                    <Text as='h2' variant='bodyMd'>{label}</Text>
                    <Text> {hsbToHex(color.hue, color.saturation, color.brightness)} </Text>
                </BlockStack>

            </InlineStack>

        </Button>
    );
    return (
        <>
            <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <ColorPicker onChange={setColor} color={color} />
            </Popover>
            {inputName && <input type='hidden' name={inputName} value={hsbToHex(color.hue, color.saturation, color.brightness)} />}
        </>
    )
}