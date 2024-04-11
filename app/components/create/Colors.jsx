import { BlockStack, Button, Card, Checkbox, Collapsible, Grid, Icon, InlineStack, Text } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import {
    CaretDownIcon
} from '@shopify/polaris-icons';
import { ColorPickerComponent } from '../ColorPicker'


const Colors = () => {
    const [transparent, setTransparent] = useState(false)
    const [gradient, setGradient] = useState(false)

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
                                <ColorPickerComponent label='Foreground' inputName='frontcolor' defaultColor={{ hue: 0, brightness: 0, saturation: 0 }} />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                <ColorPickerComponent label='Background' inputName='backcolor' defaultColor={{ hue: 120, brightness: 1, saturation: 0 }} />
                            </Grid.Cell>
                        </Grid>
                        <Grid gap={400}>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                <Checkbox name='transparent' label='Transparent Background' value={transparent} checked={transparent} onChange={() => setTransparent(!transparent)} />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                <Checkbox name='gradient' label='Gradient' value={gradient} checked={gradient} onChange={() => setGradient(!gradient)} />
                            </Grid.Cell>
                        </Grid>


                        {gradient && <GradientComponent />}
                    </BlockStack>

                </Collapsible>
            </BlockStack>
        </Card >
    )
}

export default Colors


const GradientComponent = () => {
    const [radial, setRadial] = useState(false)

    return (
        <Grid gap={400}>
            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                <ColorPickerComponent label='Second Color' inputName='gradient_color' />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                <Checkbox name='radial' label='Radial Gradient' checked={radial} onChange={() => setRadial(!radial)} />
            </Grid.Cell>
        </Grid>
    )
}