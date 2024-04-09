import { BlockStack, Button, Card, ColorPicker, InlineGrid, InlineStack, LegacyCard, Modal, Popover, Text } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import Pattern from './design/Pattern';
import Marker from './design/Marker';
import CenterDotStyle from './design/CenterDotStyle';
import CustomMarker from './design/CustomMarker';

const Design = () => {
    return (
        <Card>

            <BlockStack gap={400}>
                <Text variant='headingMd'> Design</Text>
                <InlineGrid columns={2} gap={200} >
                    <Pattern />
                    <Marker />
                    <CenterDotStyle />
                </InlineGrid>
                <CustomMarker />

            </BlockStack>

        </Card>
    )
}

export default Design
