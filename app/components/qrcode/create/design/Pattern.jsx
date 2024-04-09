import React, { useCallback, useState } from 'react'
import { Card, BlockStack, Text, Avatar, InlineStack, Button, Collapsible, Divider, TextField, Popover } from '@shopify/polaris'

import { patterns } from '../../../../constants/patterns'

const Pattern = () => {
    const [open, setOpen] = useState(false);

    const [selectedPattern, setSelectedPattern] = useState(patterns[0])

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
                    <Avatar source={selectedPattern.icon} size='lg' />
                </Card>
                <TextField name='pattern' value={selectedPattern.value} readOnly autoSize align='right' />
            </InlineStack>
        </Button>
    );



    return (
        <>
            <BlockStack gap={400}>   <Text variant='bodyMd'>Pattern</Text>


                <Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                >
                    <Card>
                        <InlineStack wrap={true} gap={600} align='center'>

                            {patterns.map((pattern) => (
                                <Button tone='success' variant={`${selectedPattern.value == pattern.value ? 'plain' : 'monochromePlain'}`} key={pattern.id} onClick={() => { setSelectedPattern(pattern); setOpen(false) }}>
                                    <Card key={pattern.id}>
                                        <BlockStack gap={400}>
                                            <Avatar source={pattern.icon} size='lg' />
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

export default Pattern
