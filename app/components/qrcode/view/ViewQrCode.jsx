import { Avatar, BlockStack, Card, DataTable, Divider, Grid, InlineGrid, InlineStack, Page, Text } from '@shopify/polaris'
import React from 'react'

const ViewQrCode = ({ qrcode }) => {
    return (
        <Page>
            <BlockStack gap={400}>
                <InlineStack blockAlign='center' align='space-between'>
                    <Text as='span' variant='headingMd' >QR Code</Text>
                    <InlineStack>
                        {/* <Avatar size="small" name={qrcode.title} /> */}

                    </InlineStack>
                </InlineStack>
                <Divider />
                <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 4, lg: 8, xl: 8 }}>

                        <BlockStack gap={400}>
                            <Card> <BlockStack gap={400}>
                                <InlineGrid columns={['oneThird', 'twoThirds']} >
                                    <Text as='span' variant='headingMd' >Title</Text>
                                    <Text as='span' variant='bodyText' >{qrcode.title}</Text>
                                </InlineGrid>
                                <InlineGrid columns={['oneThird', 'twoThirds']} >
                                    <Text as='span' variant='headingMd' >Type</Text>
                                    <Text as='span' variant='bodyText' >{qrcode.type}</Text>
                                </InlineGrid>

                                <InlineGrid columns={['oneThird', 'twoThirds']} >
                                    <Text as='span' variant='headingMd' >Target</Text>
                                    <Text as='span' variant='bodyText' >{qrcode.target}</Text>
                                </InlineGrid>
                            </BlockStack>
                            </Card>
                            <Card>
                                <BlockStack gap={400}>
                                    <Text as='h2' variant='headingMd'>Scans</Text>
                                    <InlineGrid columns={3} gap={'400'}>
                                        <Text as='span' variant='bodyLg' >Total</Text>
                                        <Text as='span' variant='bodyLg' >Unique</Text>
                                        <Text as='span' variant='bodyLg' >Last Scan</Text>
                                        <Text as='span' variant='bodyLg' >{qrcode.scans.total}</Text>
                                        <Text as='span' variant='bodyLg' >{qrcode.scans.unique}</Text>
                                        <Text as='span' variant='bodyLg' >{new Date(qrcode.scans.lastScan).toLocaleString()}</Text>
                                    </InlineGrid>
                                </BlockStack>
                            </Card>
                        </BlockStack>




                    </Grid.Cell>

                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }} >
                        <Card>

                            <img style={{ width: '100%', height: 'auto' }} src={qrcode.image} alt={qrcode.title} />
                        </Card>
                    </Grid.Cell>

                </Grid>
                <Card>
                    <Text as='p' variant='bodyText'>Scans</Text>
                    <DataTable columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']} headings={['ID', 'IP Address', 'Location', 'Date', 'Browser', 'Platform']} rows={qrcode.scans.data.map(scan => {
                        return [scan.id, scan.ipAddress, scan.country, new Date(scan.createdAt).toLocaleString(), scan.browser, scan.platform]
                    }
                    )} />
                </Card>

            </BlockStack>

        </Page>
    )
}

export default ViewQrCode