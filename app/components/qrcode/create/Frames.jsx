import React, { useCallback, useState } from 'react'
import { Card, BlockStack, Text, Avatar, InlineStack, Button, Collapsible, Divider, TextField, Popover, Checkbox, Select } from '@shopify/polaris'
import { frames } from '../../../constants/frames';
import { ColorPickerComponent } from '../CustomColorPicker';


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
                <TextField name='outer_frame' value={selectedFrame.value} readOnly autoSize align='right' />
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

                {selectedFrame.value !== 'none' && <AdditionalFrameSettings />}
                <Divider borderWidth='050' />
            </BlockStack>
        </Card>

    )
}

export default Frames


const AdditionalFrameSettings = () => {

    const [customFrameColor, setCustomFrameColor] = useState(false)
    const [framelabel, setFrameLabel] = useState('Scan Me!')

    const [selectedFont, setSelectedFont] = useState('Arial, Helvetica, sans-serif');

    const handleSelectChange = useCallback(
        (value) => setSelectedFont(value),
        [],
    );

    const fontOptions = [
        { label: 'Sans Serif', value: 'Arial, Helvetica, sans-serif' },
        { label: 'Serif', value: '\'Times New Roman\', Times, serif' },
        { label: 'Monospace', value: 'value="\'Courier New\', Courier, monospace"' },
    ];


    return (
        <BlockStack gap={400}>
            <TextField name='framelabel' label='Frame Label' type='text' value={framelabel} onChange={(value) => setFrameLabel(value)} />

            <Select
                label="Label Font"
                options={fontOptions}
                onChange={handleSelectChange}
                value={selectedFont}
            />
            <Checkbox name='custom_frame_color' label='Custom Frame Color' checked={customFrameColor} value={customFrameColor} onChange={() => setCustomFrameColor(!customFrameColor)} />
            {customFrameColor &&

                <ColorPickerComponent label='Frame Color' inputName='framecolor' />
            }


        </BlockStack>
    )
}
