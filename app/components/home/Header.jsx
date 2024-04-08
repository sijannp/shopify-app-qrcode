import React from 'react'
import { Button, Card, InlineStack, Text } from '@shopify/polaris'
import { useNavigation } from '@remix-run/react'

const Header = () => {

    const navigate = useNavigation();

    const isLoading = navigate.state === 'loading';

    return (
        <InlineStack align='space-between' blockAlign='center'>
            <Text as='h2' variant='headingLg'>QR Codes</Text>

            <Button variant='primary' tone='success' size='large' url='/app/create' loading={isLoading} disabled={isLoading} > Create New </Button>

        </InlineStack>
    )
}

export default Header
