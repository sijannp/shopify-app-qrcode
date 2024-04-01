import { BlockStack, Button, Card, Grid, Icon, InlineStack, Text } from '@shopify/polaris'
import React from 'react'

const Types = ({ category, setType }) => {
    const { title, options } = category
    return (
        <Card >
            <BlockStack gap={400}>
                <Text as='h2' variant='headingMd'>{title}</Text>
                <Grid>

                    {
                        options.map((option) => (
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                <Button onClick={() => setType(option.value)} fullWidth size='large' key={option.value}>
                                    <InlineStack blockAlign='center' gap={100}>
                                        {option.icon && <Icon source={option.icon} />}
                                        {option.label}
                                    </InlineStack>
                                </Button>
                            </Grid.Cell>
                        ))
                    }

                </Grid>
            </BlockStack>
        </Card>
    )
}

export default Types
