import React, { useCallback, useContext, useState } from 'react'
import { Card, BlockStack, Text, InlineStack, Button, Collapsible, TextField, Popover, Checkbox, Select, Icon } from '@shopify/polaris'
import { CaretDownIcon } from '@shopify/polaris-icons';
import { frames } from '../../constants/frames';
import { ColorPickerComponent } from '../ColorPicker';
import { hexToHsb } from '../../utils/Helpers';
import { QrCodeContext } from '../../context/qrCodeContext';


const Frames = () => {

    const { frameData, setFrameData } = useContext(QrCodeContext);


    const selectedFrame = frames.find(frame => frame.value === frameData.outer_frame) || frames[0];

    const [open, setOpen] = useState(true);



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

                                    {frames.map((frame, index) => (
                                        <Button tone='success' variant={`${selectedFrame.value == frame.value ? 'plain' : 'monochromePlain'}`} key={index} onClick={() => { setFrameData({ ...frameData, outer_frame: frame.value }); togglePopoverActive(false) }}>
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

                        {selectedFrame.value !== 'none' && <AdditionalFrameSettings frameData={frameData} setFrameData={setFrameData} />}
                    </BlockStack>
                </Collapsible>
                <input type='hidden' name='outer_frame' value={selectedFrame.value} />
            </BlockStack>
        </Card>

    )
}

export default Frames


const AdditionalFrameSettings = ({ frameData, setFrameData }) => {



    const handleSelectChange = useCallback(
        (value) => {
            setFrameData({ ...frameData, frame_font: value });
        },
        [],
    );

    const fontOptions = [
        { label: 'Sans Serif', value: 'Arial, Helvetica, sans-serif' },
        { label: 'Serif', value: '\'Times New Roman\', Times, serif' },
        { label: 'Monospace', value: 'value="\'Courier New\', Courier, monospace"' },
    ];


    return (
        <BlockStack gap={400}>
            <TextField name='framelabel' label='Frame Label' type='text' value={frameData.framelabel} onChange={(value) => setFrameData({ ...frameData, framelabel: value })} />

            <Select
                label="Label Font"
                options={fontOptions}
                onChange={handleSelectChange}
                value={frameData.frame_font}
            />
            <Checkbox name='custom_frame_color' label='Custom Frame Color' value={frameData.custom_frame_color} checked={frameData.custom_frame_color} onChange={(value) => setFrameData({ ...frameData, custom_frame_color: value })} />
            {frameData.custom_frame_color &&

                <ColorPickerComponent label='Frame Color' inputName='framecolor' defaultColor={hexToHsb(frameData.framecolor)} />
            }


        </BlockStack>
    )
}
