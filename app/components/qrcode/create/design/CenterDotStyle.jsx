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
                variant='tertiary'
            >

                <InlineStack style={{ gap: '1000px' }} gap={400} blockAlign='center'>

                    <Card>
                        <Avatar source={selectedCenterDotStyle.icon} size='lg' />
                    </Card>
                    <TextField name='marker_in' value={selectedCenterDotStyle.value} readOnly autoSize align='right' />
                </InlineStack>
            </Button>
        </Card>
    );
    return (
        <>
            <BlockStack gap={400}>   <Text as='h2' variant='headingMd'>Center Dot Style</Text>
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
                <Divider borderWidth='050' />
            </BlockStack>
        </>

    )
}

export default CenterDotStyle
