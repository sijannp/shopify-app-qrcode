import { Badge, Button, Card, InlineStack, Text } from '@shopify/polaris'
import React from 'react'

const Type = ({ type, setType }) => {
    return (
        <InlineStack blockAlign='center' align='space-between'>
            <Text variant='headingMd' as='span' > Selected Type : {' '}
                <Badge size='medium' tone='success'>
                    {type.name}
                </Badge></Text>
            <Button onClick={() => setType(null)}>Back</Button>

        </InlineStack>
    )
}

export default Type
