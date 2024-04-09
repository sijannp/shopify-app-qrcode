import { Checkbox, ColorPicker, Card, Text, Button, InlineStack, Popover, BlockStack, Grid } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import hsbToHex from '../../../../utils/Helpers'

const CustomMarker = () => {

    const [customMarkersColor, setCustomMarkersColor] = useState(false)

    return (
        <>
            <Checkbox name='markers_color' label='Custom markers color' checked={customMarkersColor} onChange={() => setCustomMarkersColor(!customMarkersColor)} />
            {customMarkersColor && <CustomMarkerOptions />}
        </>
    )
}

export default CustomMarker


const CustomMarkerOptions = () => {

    const [differentMarkerColor, setDifferentMarkerColor] = useState(false)

    return (
        <>
            <BlockStack gap={400}>
                <Grid gap={400}>
                    <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                        <ColorPickerComponent label='Marker Border' inputName={`${differentMarkerColor ? '' : 'marker_out_color'}`} />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                        <ColorPickerComponent label='Marker Center' inputName={`${differentMarkerColor ? '' : 'marker_in_color'}`} />
                    </Grid.Cell>
                </Grid>

                <Checkbox name='different_marker_color' label='Different marker color' checked={differentMarkerColor} onChange={() => setDifferentMarkerColor(!differentMarkerColor)} />
                {differentMarkerColor && <DifferentMarkerColor />}
            </BlockStack>
        </>
    )
}


const DifferentMarkerColor = () => {
    return (
        <Grid gap={400}>
            <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                <ColorPickerComponent label='Top Left Border' inputName='marker_out_color' />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                <ColorPickerComponent label='Top Left Center' inputName='marker_in_color' />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                <ColorPickerComponent label='Top Right Border' inputName='marker_top_right_outline' />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                <ColorPickerComponent label='Top Right Center' inputName='marker_top_right_center' />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                <ColorPickerComponent label='Bottom Left Border' inputName='marker_bottom_left_outline' />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'sm': 6, 'md': 4, 'lg': 6 }}>
                <ColorPickerComponent label='Bottom Left Center' inputName='marker_bottom_left_center' />
            </Grid.Cell>

        </Grid>


    )
}


const ColorPickerComponent = ({ label, inputName, defaultColor }) => {

    if (!defaultColor) defaultColor = { hue: 120, brightness: 0, saturation: 0 }

    const [color, setColor] = useState(defaultColor);
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );



    const activator = (
        <Button onClick={togglePopoverActive} variant='monochromePlain'   >
            <InlineStack blockAlign='center' gap={300}>
                <div style={{ backgroundColor: `hsl(${color.hue}, ${color.saturation * 100}%, ${color.brightness * 100}%)`, width: '40px', height: '40px', borderRadius: '4px' }}></div>
                <BlockStack align='start' inlineAlign='start'>
                    <Text as='h2' variant='bodyMd'>{label}</Text>
                    <Text> {hsbToHex(color.hue, color.saturation, color.brightness)} </Text>
                </BlockStack>

            </InlineStack>

        </Button>
    );
    return (
        <>
            <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <ColorPicker onChange={setColor} color={color} />

            </Popover>
            {inputName && <input type='hidden' name={inputName} value={hsbToHex(color.hue, color.saturation, color.brightness)} />}
        </>
    )
}