import { Card, EmptyState, Link, Text } from '@shopify/polaris'
import React from 'react';


const Empty = () => {
    return (
        <Card sectioned>
            <EmptyState
                heading="Create your first QR Code"

                action={{ content: 'Get Started', url: '/app/create' }}


                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
                <Text variant='bodyMd'>  Create free and unlimited QR codes with your style and logo.</Text>
            </EmptyState>
        </Card>
    )
}

export default Empty
