import React from 'react'
import { BASIC_PLAN, PRO_PLAN, authenticate } from '../shopify.server';
import { Badge, BlockStack, Button, Card, Divider, Grid, InlineGrid, InlineStack, List, Page, Text } from '@shopify/polaris';
import { useLoaderData, useNavigation } from '@remix-run/react';


export const loader = async ({ request }) => {
    const { billing } = await authenticate.admin(request);
    const { hasActivePayment, appSubscriptions } = await billing.check({
        plans: [BASIC_PLAN, PRO_PLAN],
        isTest: true,
    });


    return { hasActivePayment, appSubscriptions };
};

const Pricing = () => {
    const { hasActivePayment, appSubscriptions } = useLoaderData();



    const plans = [
        {
            name: 'Basic',
            price: '$9.99',
            features: [
                'Unlimited QR Codes',
                'Unlimited Scans',
                'Unlimited Designs',
                'Unlimited Frames',
                'Unlimited Colors',
                'Unlimited Downloads',
                'Unlimited Updates',
            ],
            upgradeUrl: '/app/upgrade/basic',
            cancelUrl: '/app/plans/cancel/basic',
            hasUpgraded: appSubscriptions.some(subscription => subscription.name === 'Basic Plan'),
        },
        {
            name: 'Pro',
            price: '$19.99',
            features: [
                'Unlimited QR Codes',
                'Unlimited Scans',
                'Unlimited Designs',
                'Unlimited Frames',
                'Unlimited Colors',
                'Unlimited Downloads',
                'Unlimited Updates',
            ],
            upgradeUrl: '/app/upgrade/pro',
            cancelUrl: '/app/plans/cancel/pro',
            hasUpgraded: appSubscriptions.some(subscription => subscription.name === 'Pro Plan'),
        }

    ]



    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';





    return (

        <Page>

            <Card>
                <BlockStack gap={600}>
                    <BlockStack gap={400} align='center' inlineAlign='center'>

                        <InlineStack gap={"200"}>
                            <Text as="h2" variant="headingMd">
                                Pricing
                            </Text>
                        </InlineStack>
                        <Text>
                            Choose a plan that fits your needs. You can always upgrade or downgrade your plan.
                        </Text>
                    </BlockStack>
                    <InlineStack gap={400} blockAlign='center' align='center'>

                        {plans.map((plan, index) => {
                            return (
                                <Grid.Cell columnSpan={{ 'xs': 6, 'sm': 6, 'md': 3, 'lg': 6 }}>
                                    <Card key={index} background={`${plan.hasUpgraded ? 'bg-fill-success-secondary' : ''}`}>

                                        <BlockStack gap={500}>
                                            <BlockStack gap={300} inlineAlign='center'>
                                                <InlineStack gap={200}>
                                                    <Text as="h3" alignment='center' variant="headingLg">
                                                        {plan.name}
                                                    </Text>

                                                </InlineStack>
                                                <Badge tone='success' size='large'> 7-DAY FREE TRIAL </Badge>
                                                <Text as='h3' variant='headingMd' tone='magic' alignment='center'>
                                                    {plan.price} per month <br />

                                                </Text>
                                            </BlockStack>
                                            <Divider borderWidth='050' />
                                            <List>
                                                {plan.features.map((feature, index) => {
                                                    return (
                                                        <List.Item key={index}>
                                                            <Text variant='bodyMd'>{feature}</Text>
                                                        </List.Item>
                                                    )
                                                })}
                                            </List>
                                            <Button variant='primary' disabled={isLoading} tone={`${plan.hasUpgraded ? 'critical' : 'success'}`} url={`${plan.hasUpgraded ? plan.cancelUrl : plan.upgradeUrl}`}>
                                                {plan.hasUpgraded ? 'Cancel' : 'Upgrade'}
                                            </Button>
                                        </BlockStack>
                                    </Card>
                                </Grid.Cell>
                            )
                        })}
                    </InlineStack>

                </BlockStack>
            </Card>

        </Page>
    )
}

export default Pricing