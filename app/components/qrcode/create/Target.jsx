import { useLoaderData } from '@remix-run/react'
import { BlockStack, Button, Card, Icon, InlineStack, Link, Text, Thumbnail } from '@shopify/polaris'
import React, { useState } from 'react'

import {
    ExternalIcon
} from '@shopify/polaris-icons';

const Target = ({ type }) => {


    return (
        <Card>
            <BlockStack gap={400}>
                <Text as='span' variant='headingMd' >TARGET</Text>
                <ReturnTarget type={type} />
            </BlockStack>
        </Card>
    )
}

export default Target


const ReturnTarget = ({ type }) => {
    const { shop } = useLoaderData()
    const url = `https://${shop}`
    const [formState, setFormState] = useState(null);


    async function selectProduct() {
        const products = await window.shopify.resourcePicker({
            type: "product",
            action: "select", // customized action verb, either 'select' or 'add',
        });

        if (products) {
            const { images, id, variants, title, handle } = products[0];

            setFormState({
                ...formState,
                productId: id,
                productVariantId: variants[0].id,
                productTitle: title,
                productHandle: handle,
                productAlt: images[0]?.altText,
                productImage: images[0]?.originalSrc,
            });
        }
    }

    switch (type) {
        case 'homepage':
            return (

                <Link url={url} target='_blank' monochrome removeUnderline>
                    <InlineStack blockAlign='center' gap={100}>
                        <Text>{url}</Text>
                        <Icon source={ExternalIcon} />
                    </InlineStack>
                </Link>

            )
        case 'product':
            return (
                <BlockStack gap={200}>

                    {formState?.productId ? (
                        <InlineStack blockAlign="center" gap="500">
                            <Thumbnail
                                source={formState.productImage || ImageIcon}
                                alt={formState.productAlt}
                            />
                            <Text as="span" variant="headingMd" fontWeight="semibold">
                                {formState.productTitle}
                            </Text>
                        </InlineStack>
                    ) : (
                        <BlockStack gap="200">
                            <Button onClick={selectProduct} id="select-product">
                                Select product
                            </Button>

                        </BlockStack>
                    )}
                    {formState?.productId ? (
                        <Button variant="plain" onClick={selectProduct}>
                            Change product
                        </Button>
                    ) : null}
                </BlockStack>

            )
    }

}

// [START select-product]

// [END select-product]