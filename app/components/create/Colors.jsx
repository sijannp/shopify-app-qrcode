import { BlockStack, Card, Checkbox, Collapsible, Grid, Icon, InlineStack, Text, hsbToHex } from '@shopify/polaris'
import React, { useCallback, useContext, useState } from 'react'
import {
    CaretDownIcon
} from '@shopify/polaris-icons';

import { ColorPickerComponent } from '../ColorPicker'
import { hexToHsb } from '../../utils/Helpers';
import { QrCodeContext } from '../../context/qrCodeContext';


const Colors = () => {

    const { colorsData, setColorsData } = useContext(QrCodeContext);

    const [open, setOpen] = useState(true);

    const handleToggle = useCallback(() => setOpen((open) => !open), []);

    return (
        <Card title='Colors'>
            <BlockStack gap={400}>
                <div style={{ cursor: 'pointer' }} >
                    <BlockStack onClick={handleToggle} >
                        <InlineStack align='space-between' blockAlign='center'>
                            <Text as='h2' variant='headingMd'>Colors</Text>
                            <div>
                                <Icon source={CaretDownIcon} color='inkLighter' />
                            </div>
                        </InlineStack>
                    </BlockStack>
                </div>

                <Collapsible
                    open={open}
                    id="basic-collapsible"
                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                    expandOnPrint
                >
                    <BlockStack gap={400}>
                        <Grid gap={400}>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                <ColorPickerComponent label='Foreground' inputName='frontcolor' defaultColor={hexToHsb(colorsData.frontcolor)} />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                <ColorPickerComponent label='Background' inputName='backcolor' defaultColor={hexToHsb(colorsData.backcolor)} />
                            </Grid.Cell>
                        </Grid>
                        <Grid gap={400}>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                <Checkbox name='transparent' label='Transparent Background' value={colorsData.transparent} checked={colorsData.transparent} onChange={() => setColorsData({ ...colorsData, transparent: !colorsData.transparent })} />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                <Checkbox name='gradient' label='Gradient' value={colorsData.gradient} checked={colorsData.gradient} onChange={() => setColorsData({ ...colorsData, gradient: !colorsData.gradient })} />
                            </Grid.Cell>
                        </Grid>


                        {colorsData.gradient && <GradientComponent colorsData={colorsData} setColorsData={setColorsData} />}
                    </BlockStack>

                </Collapsible>
            </BlockStack>
        </Card >
    )
}

export default Colors


const GradientComponent = ({ colorsData, setColorsData }) => {

    return (
        <Grid gap={400}>
            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Second Color' inputName='gradient_color' defaultColor={hexToHsb(colorsData.gradient_color)} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                <Checkbox name='radial' label='Radial Gradient' checked={colorsData.radial} onChange={() => setColorsData({ ...colorsData, radial: !colorsData.radial })} />
            </Grid.Cell>
        </Grid>
    )
}