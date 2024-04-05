import { BlockStack, Button, Card, ColorPicker, InlineStack, LegacyCard, Modal, Popover, Text } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'

const Design = () => {

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const [color, setColor] = useState({
        hue: 120,
        brightness: 0,
        saturation: 0,
    });


    const activator = (
        <Button onClick={togglePopoverActive} variant='monochromePlain'   >
            <InlineStack blockAlign='center' gap={300}>
                <div style={{ backgroundColor: `hsl(${color.hue}, ${color.saturation * 100}%, ${color.brightness * 100}%)`, width: '40px', height: '40px', borderRadius: '4px' }}></div>
                <Text as='h2' variant='headingMd'>Color</Text>
            </InlineStack>

        </Button>
    );






    return (
        <Card>
            <Modal>
                <Modal.Section>
                    <Text>Modal</Text>
                </Modal.Section>
            </Modal>


            <BlockStack gap={400}>
                <Text variant='headingMd'> DESIGN</Text>
                <Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                >
                    <ColorPicker onChange={setColor} color={color} /></Popover>
            </BlockStack>

        </Card>
    )
}

export default Design
