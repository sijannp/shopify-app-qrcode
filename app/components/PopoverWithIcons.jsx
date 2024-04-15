import React, { useCallback, useState } from 'react'
import { Card, BlockStack, Text, Avatar, InlineStack, Button, Popover } from '@shopify/polaris'


const CustomPopover = ({ types, title, inputName, selectedType, onChange }) => {


    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => {
            setPopoverActive((popoverActive) => !popoverActive)

        },
        [],
    );

    const activator = (
        <Card>
            <Button
                textAlign='start'
                fullWidth
                onClick={togglePopoverActive}
                ariaControls="basic-collapsible"
                variant='monochromePlain'
                disclosure
            >

                <InlineStack gap={400} blockAlign='center' wrap={false}>
                    <Avatar source={selectedType.icon} size='md' />
                    <Text variant='bodySm' as='p' alignment='right'>{selectedType.name}</Text>
                </InlineStack>
            </Button>
        </Card >
    );
    return (
        <>
            <BlockStack gap={400}>
                <Text variant='bodyMd'>{title}</Text>

                <Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                >

                    <Card>
                        <InlineStack wrap={true} gap={600} align='center'>

                            {types.map((type, index) => (
                                <Button tone='success' variant={`${selectedType.value == type.value ? 'plain' : 'monochromePlain'}`} key={index} onClick={() => { onChange(type.value); togglePopoverActive(false) }}>
                                    <Card key={type.id} background={`${selectedType.value == type.value ? 'bg-fill-success-secondary' : ''}`}>
                                        <BlockStack gap={400}>
                                            <Avatar source={type.icon} size='lg' />
                                        </BlockStack>
                                    </Card>
                                </Button>
                            ))}

                        </InlineStack>
                    </Card>
                </Popover>
                <input type="hidden" name={inputName} value={selectedType.value} />
            </BlockStack>
        </>

    )
}

export default CustomPopover
