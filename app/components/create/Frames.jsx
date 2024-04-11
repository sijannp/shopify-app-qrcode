import React, { useCallback, useState } from 'react'
import { Card, BlockStack, Text, InlineStack, Button, Collapsible, TextField, Popover, Checkbox, Select, Icon } from '@shopify/polaris'
import { CaretDownIcon } from '@shopify/polaris-icons';
import { frames } from '../../constants/frames';
import { ColorPickerComponent } from '../ColorPicker';


const Frames = () => {
    const [open, setOpen] = useState(true);

    const [selectedFrame, setSelectedFrame] = useState(frames[0])


    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => { setPopoverActive((popoverActive) => !popoverActive) },
        [],
    );

    const [openCollapsible, setOpenCollapsible] = useState(false);

    const handleToggle = useCallback(() => setOpenCollapsible((open) => !open), []);

    const activator = (
        <Card>
            <Button
                textAlign='start'
                fullWidth

                onClick={togglePopoverActive}
                ariaExpanded={open}
                ariaControls="basic-collapsible"
                variant='monochromePlain'
            >

                <InlineStack gap={400} blockAlign='center' wrap={false}>

                    <img style={{ width: '40px', height: 'auto' }} src={selectedFrame.icon} />
                    <Text as='p' variant='bodyMd'>{selectedFrame.name}</Text>
                </InlineStack>
            </Button>
        </Card>
    );



    return (
        <Card>
            <BlockStack gap={600}>
                <div style={{ cursor: 'pointer' }} >
                    <BlockStack onClick={handleToggle} >
                        <InlineStack align='space-between' blockAlign='center'>
                            <Text as='h2' variant='headingMd'>Frame</Text>
                            <div>
                                <Icon source={CaretDownIcon} color='inkLighter' />
                            </div>
                        </InlineStack>
                    </BlockStack>
                </div>

                <Collapsible
                    open={openCollapsible}
                    id="basic-collapsible"
                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                    expandOnPrint
                >
                    <BlockStack gap={400}>

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
                    </BlockStack>
                </Collapsible>
                <input type='hidden' name='outer_frame' value={selectedFrame.value} />
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
