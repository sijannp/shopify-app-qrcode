import React, { useCallback, useState } from 'react'
import { borderTypes } from '../../../../constants/border-types'
import { Card, BlockStack, Text, Avatar, InlineStack, Button, Collapsible, Divider, TextField, Popover } from '@shopify/polaris'
import CustomMarker from './CustomMarker';

const Marker = () => {
    const [open, setOpen] = useState(false);

    const [selectedBorderType, setSelectedBorderType] = useState(borderTypes[0])

    const handleToggle = useCallback(() => setOpen((open) => !open), []);

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => { setPopoverActive((popoverActive) => !popoverActive) },
        [],
    );

    const activator = (
        <Button
            textAlign='start'
            fullWidth
            onClick={togglePopoverActive}
            ariaExpanded={open}
            ariaControls="basic-collapsible"
            variant='tertiary'
        >

            <InlineStack gap={400} blockAlign='center'>

                <Card>
                    <Avatar source={selectedBorderType.icon} size='lg' />
                </Card>
                <TextField name='marker' value={selectedBorderType.value} readOnly autoSize align='right' />
            </InlineStack>
        </Button>
    );
    return (
        <>
            <BlockStack gap={400}>
                <Text variant='bodyMd'>Border type</Text>

                <Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                >

                    <Card>
                        <InlineStack wrap={true} gap={600} align='center'>

                            {borderTypes.map((borderType) => (
                                <Button tone='success' variant={`${selectedBorderType.value == borderType.value ? 'plain' : 'monochromePlain'}`} key={borderType.id} onClick={() => { setSelectedBorderType(borderType); setOpen(false) }}>
                                    <Card key={borderType.id}>
                                        <BlockStack gap={400}>
                                            <Avatar source={borderType.icon} size='lg' />
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

export default Marker
