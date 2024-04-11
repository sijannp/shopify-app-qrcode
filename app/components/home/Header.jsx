import React, { useCallback, useState } from 'react'
import { ActionList, BlockStack, Button, Card, Divider, InlineStack, Popover, Text } from '@shopify/polaris'
import { useNavigation } from '@remix-run/react'
import { popularTypes } from '../../constants/qrCodeTypes'

const Header = () => {

    const navigate = useNavigation();

    const isLoading = navigate.state === 'loading';

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            Create New
        </Button>
    );

    return (
        <InlineStack align='space-between' blockAlign='center'>
            <Text as='h2' variant='headingLg'>QR Codes</Text>
            <Button url='/app/create' disabled={isLoading} variant='primary' tone='success' >
                Create New </Button>

            {/* <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <Card>


                    <BlockStack gap={300}>
                        <Text as='h2' variant='headingMd'>Popular Types</Text>
                        <Divider />
                        <BlockStack gap={100}>
                            {popularTypes.map((type, index) => (
                                <Button
                                    key={index}
                                    fullWidth
                                    onClick={() => navigate(`/qrcode/create?type=${type.value}`)}
                                    url='/app/qrcode/create'
                                    disabled={isLoading}
                                    variant='tertiary'
                                    textAlign='start'
                                    size='large'
                                >
                                    {type.label}
                                </Button>
                            ))
                            }
                        </BlockStack>


                    </BlockStack>

                </Card>
            </Popover> */}
        </InlineStack >
    )
}

export default Header
