import { Checkbox, ColorPicker, Text, Button, InlineStack, Popover, BlockStack, Grid } from '@shopify/polaris'
import React, { useCallback, useContext, useState } from 'react'
import hsbToHex, { hexToHsb } from '../../../utils/Helpers'
import { ColorPickerComponent } from '../../ColorPicker'
import { QrCodeContext } from '../../../context/qrCodeContext'

const CustomMarker = () => {

    const { designData, setDesignData } = useContext(QrCodeContext)

    console.log(designData, 'designData')

    return (
        <BlockStack gap={400}>
            <Checkbox name='markers_color' label='Custom markers color' checked={designData.markers_color} onChange={() => setDesignData({ ...designData, markers_color: !designData.markers_color })} />
            {designData.markers_color && <CustomMarkerOptions designData={designData} setDesignData={setDesignData} />}
        </BlockStack>
    )
}

export default CustomMarker


const CustomMarkerOptions = ({ designData, setDesignData }) => {


    return (
        <>
            <BlockStack gap={400}>
                <Grid gap={400}>
                    <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                        <ColorPickerComponent label='Marker Border' inputName={`${designData.different_marker_color ? '' : 'marker_out_color'}`} defaultColor={designData.marker_out_color} onChange={(color) => setDesignData({ ...designData, marker_out_color: color })} />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                        <ColorPickerComponent label='Marker Center' inputName={`${designData.different_marker_color ? '' : 'marker_in_color'}`} defaultColor={designData.marker_in_color} onChange={(color) => setDesignData({ ...designData, marker_in_color: color })} />
                    </Grid.Cell>
                </Grid>


                <BlockStack gap={400}>
                    <Checkbox name='different_marker_color' label='Different marker color' checked={designData.different_marker_color} onChange={() => setDesignData({ ...designData, different_marker_color: !designData.different_marker_color })} />
                    {designData.different_marker_color && <DifferentMarkerColor designData={designData} setDesignData={setDesignData} />}
                </BlockStack>
            </BlockStack>
        </>
    )
}


const DifferentMarkerColor = ({ designData, setDesignData }) => {
    return (
        <Grid gap={400}>
            <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Top Left Border' inputName='marker_out_color' defaultColor={designData.marker_out_color} onChange={(color) => setDesignData({ ...designData, marker_out_color: color })} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Top Left Center' inputName='marker_in_color' defaultColor={designData.marker_in_color} onChange={(color) => setDesignData({ ...designData, marker_in_color: color })} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Top Right Border' inputName='marker_top_right_outline' defaultColor={designData.marker_top_right_outline} onChange={(color) => setDesignData({ ...designData, marker_top_right_outline: color })} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Top Right Center' inputName='marker_top_right_center' defaultColor={designData.marker_top_right_center} onChange={(color) => setDesignData({ ...designData, marker_top_right_center: color })} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Bottom Left Border' inputName='marker_bottom_left_outline' defaultColor={designData.marker_bottom_left_outline} onChange={(color) => setDesignData({ ...designData, marker_bottom_left_outline: color })} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'xs': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Bottom Left Center' inputName='marker_bottom_left_center' defaultColor={designData.marker_bottom_left_center} onChange={(color) => setDesignData({ ...designData, marker_bottom_left_center: color })} />
            </Grid.Cell>
        </Grid>
    )
}


// const ColorPickerComponent = ({ label, inputName, defaultColor }) => {

//     if (!defaultColor) defaultColor = { hue: 120, brightness: 0, saturation: 0 }

//     const [color, setColor] = useState(defaultColor);
//     const [popoverActive, setPopoverActive] = useState(false);

//     const togglePopoverActive = useCallback(
//         () => setPopoverActive((popoverActive) => !popoverActive),
//         [],
//     );



//     const activator = (
//         <Button onClick={togglePopoverActive} variant='monochromePlain'   >
//             <InlineStack blockAlign='center' gap={300}>
//                 <div style={{ backgroundColor: hsbToHex(color.hue, color.saturation, color.brightness), width: '40px', height: '40px', borderRadius: '4px' }}></div>
//                 <BlockStack align='start' inlineAlign='start'>
//                     <Text as='h2' variant='bodyMd'>{label}</Text>
//                     <Text> {hsbToHex(color.hue, color.saturation, color.brightness)} </Text>
//                 </BlockStack>

//             </InlineStack>

//         </Button>
//     );
//     return (
//         <>
//             <Popover
//                 active={popoverActive}
//                 activator={activator}
//                 autofocusTarget="first-node"
//                 onClose={togglePopoverActive}
//             >
//                 <ColorPicker onChange={setColor} color={color} />

//             </Popover>
//             {inputName && <input type='hidden' name={inputName} value={hsbToHex(color.hue, color.saturation, color.brightness)} />}
//         </>
//     )
// }