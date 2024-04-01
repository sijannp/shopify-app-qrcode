import { Badge, Button, Card, InlineStack, Text } from '@shopify/polaris'
import React from 'react'

const Type = ({ type, setType }) => {
    return (
        <Card>
            <InlineStack blockAlign='center' align='space-between'>
                <Text variant='headingMd' as='span' > SELECTED TYPE : {' '}
                    <Badge size='medium' tone='success'>
                        {type}
                    </Badge></Text>
                <Button variant='primary' tone='critical' onClick={() => setType(null)}>Reset</Button>

            </InlineStack>
        </Card>
    )
}

export default Type
