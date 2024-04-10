import { BlockStack, Card, Checkbox, Grid, Text } from '@shopify/polaris'
import React, { useState } from 'react'
import { ColorPickerComponent } from '../CustomColorPicker'


const Colors = () => {
    const [transparent, setTransparent] = useState(false)
    const [gradient, setGradient] = useState(false)

    return (
        <Card title='Colors'>
            <BlockStack gap={400}>
                <Text as='h2' variant='headingMd'>Colors</Text>
                <Grid>
                    <Grid.Cell columnSpan={{ 'sm': 6, 'md': 3, 'lg': 6 }}>
                        <ColorPickerComponent label='Foreground' inputName='frontcolor' defaultColor={{ hue: 0, brightness: 0, saturation: 0 }} />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ 'sm': 6, 'md': 3, 'lg': 6 }}>
                        <ColorPickerComponent label='Background' inputName='backcolor' defaultColor={{ hue: 120, brightness: 1, saturation: 0 }} />
                    </Grid.Cell>
                </Grid>
                <Grid>
                    <Grid.Cell columnSpan={{ 'sm': 6, 'md': 3, 'lg': 6 }}>
                        <Checkbox name='transparent' label='Transparent Background' value={transparent} checked={transparent} onChange={() => setTransparent(!transparent)} />
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ 'sm': 6, 'md': 3, 'lg': 6 }}>
                        <Checkbox name='gradient' label='Gradient Background' value={gradient} checked={gradient} onChange={() => setGradient(!gradient)} />
                    </Grid.Cell>
                </Grid>

                {gradient && <GradientComponent />}
            </BlockStack>
        </Card>
    )
}

export default Colors


const GradientComponent = () => {
    const [radial, setRadial] = useState(false)

    return (
        <>
            <ColorPickerComponent label='Second Color' inputName='gradient_color' />
            <Checkbox name='radial' label='Radial Gradient' checked={radial} onChange={() => setRadial(!radial)} />

        </>
    )
}