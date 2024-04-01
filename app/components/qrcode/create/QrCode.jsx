import { BlockStack, Card, Grid } from '@shopify/polaris'
import React from 'react'
import Type from './Type'
import Target from './Target'
import Settings from './Settings'
import Design from './Design'
import Output from './Output'

const QrCode = ({ type, setType }) => {
    return (
        <BlockStack gap={400}>
            <Type type={type} setType={setType} />
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <BlockStack gap={400}>
                        <Target type={type} />
                        <Settings />
                        <Design />
                    </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }} >
                    <Output type={type} />
                </Grid.Cell>
            </Grid>
        </BlockStack>
    )
}

export default QrCode
