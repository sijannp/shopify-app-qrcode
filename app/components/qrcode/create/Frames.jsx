import React, { useCallback, useState } from 'react'
import { Card, BlockStack, Text, Avatar, InlineStack, Button, Collapsible, Divider, TextField, Popover } from '@shopify/polaris'
import { frames } from '../../../constants/frames';


const Frames = () => {
    const [open, setOpen] = useState(false);

    const [selectedFrame, setSelectedFrame] = useState(frames[0])


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
                    <Avatar source={selectedFrame.icon} size='lg' />
                </Card>
                <TextField name='pattern' value={selectedFrame.value} readOnly autoSize align='right' />
            </InlineStack>
        </Button>
    );



    return (
        <Card>
            <BlockStack gap={400}>   <Text variant='headingMd'>Frame</Text>

                <Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node"
                    onClose={togglePopoverActive}
                >
                    <Card>
                        <InlineStack wrap={true} gap={600} align='center'>

                            {frames.map((frame) => (
                                <Button tone='success' variant={`${selectedFrame.value == frame.value ? 'plain' : 'monochromePlain'}`} key={frame.id} onClick={() => { setSelectedFrame(frame); setOpen(false) }}>
                                    <Card key={frame.id}>
                                        <BlockStack gap={400}>
                                            <img style={{ width: '40px', height: 'auto' }} src={frame.icon} />
                                        </BlockStack>
                                    </Card>
                                </Button>
                            ))
                            }
                        </InlineStack>
                    </Card>
                </Popover>
                <Divider borderWidth='050' />
            </BlockStack>
        </Card>

    )
}

export default Frames
