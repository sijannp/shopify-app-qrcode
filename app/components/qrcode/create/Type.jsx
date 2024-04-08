import { Badge, Button, Card, InlineStack, Text } from '@shopify/polaris'
import React from 'react'

const Type = ({ type, setType }) => {
    return (
        <Card>
            <InlineStack blockAlign='center' align='space-between'>
                <Text variant='headingMd' as='span' > Selected Type : {' '}
                    <Badge size='medium' tone='success'>
                        {type.name}
                    </Badge></Text>
                <Button tone='critical' variant='plain' onClick={() => setType(null)}>Reset</Button>

            </InlineStack>
        </Card>
    )
}

export default Type
