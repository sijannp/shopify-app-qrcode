import { BlockStack, Card, Collapsible, Grid, Icon, InlineStack, Text } from '@shopify/polaris'
import React, { useCallback, useContext, useState } from 'react'
import Pattern from './design/Pattern';
import Marker from './design/Marker';
import CenterDotStyle from './design/CenterDotStyle';
import CustomMarker from './design/CustomMarker';
import { CaretDownIcon } from '@shopify/polaris-icons';
import TemplateComponent from './Template'
import { QrCodeContext } from '../../context/qrCodeContext';

const Design = () => {

    const { designData, setDesignData } = useContext(QrCodeContext);

    const [open, setOpen] = useState(true);

    const handleToggle = useCallback(() => setOpen((open) => !open), []);


    return (
        <Card>

            <BlockStack gap={600}>
                <div style={{ cursor: 'pointer' }} >
                    <BlockStack onClick={handleToggle} >
                        <InlineStack align='space-between' blockAlign='center'>
                            <Text as='h2' variant='headingMd'>Design</Text>
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
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 4 }}>
                                <TemplateComponent designData={designData} setDesignData={setDesignData} />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 4 }}>
                                <Pattern designData={designData} setDesignData={setDesignData} />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 4 }}>
                                <Marker designData={designData} setDesignData={setDesignData} />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 4 }}>
                                <CenterDotStyle designData={designData} setDesignData={setDesignData} />
                            </Grid.Cell>

                        </Grid>
                        <CustomMarker designData={designData} setDesignData={setDesignData} />
                    </BlockStack>
                </Collapsible>

            </BlockStack>

        </Card>
    )
}

export default Design
