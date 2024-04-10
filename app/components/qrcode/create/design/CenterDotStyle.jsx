import React, { useCallback, useState } from 'react'
import { centerDotStyles } from '../../../../constants/center-dot-styles';
import { Card, BlockStack, Text, Avatar, InlineStack, Button, Divider, TextField, Popover, Box } from '@shopify/polaris'

const CenterDotStyle = () => {
    const [open, setOpen] = useState(false);

    const [selectedCenterDotStyle, setSelectedCenterDotStyle] = useState(centerDotStyles[0])
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => { setPopoverActive((popoverActive) => !popoverActive) },
        [],
    );

    const activator = (
        <Card>
            <Button
                textAlign='start'
                fullWidth
                onClick={togglePopoverActive}
                ariaExpanded={open}
                ariaControls="basic-collapsible"
                variant='monochromePlain'
                disclosure
            >

                <InlineStack gap={400} blockAlign='center'>

                    <Avatar source={selectedCenterDotStyle.icon} size='md' />
                    <Text variant='bodyMd' as='p'>{selectedCenterDotStyle.name}</Text>
                </InlineStack>
            </Button>
        </Card>
    );
    return (
        <>
            <BlockStack gap={400}>
                <Text variant='bodyMd'>Center Dot Style</Text>
                <Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                >
                    <Card>
                        <InlineStack wrap={true} gap={600} align='center'>

                            {centerDotStyles.map((centerDotStyle) => (
                                <Button tone='success' variant={`${selectedCenterDotStyle.value == centerDotStyle.value ? 'plain' : 'monochromePlain'}`} key={centerDotStyle.id} onClick={() => { setSelectedCenterDotStyle(centerDotStyle); setOpen(false) }}>
                                    <Card key={centerDotStyle.id}>
                                        <BlockStack gap={400}>
                                            <Avatar source={centerDotStyle.icon} size='xs' />
                                        </BlockStack>
                                    </Card>
                                </Button>
                            ))}

                        </InlineStack>
                    </Card>
                </Popover>
                <input type='hidden' name='marker_in' value={selectedCenterDotStyle.value} />
            </BlockStack>
        </>

    )
}

export default CenterDotStyle
