import { useActionData, useLoaderData } from '@remix-run/react'
import { BlockStack, Button, Card, InlineError, InlineStack, Link, Text, TextField, Thumbnail } from '@shopify/polaris'
import React, { useState } from 'react'
import { ImageIcon } from "@shopify/polaris-icons";

const Target = ({ type }) => {

    const errors = useActionData()?.errors || {};


    return (
        <Card>
            <BlockStack gap={400}>
                <InlineStack blockAlign='center' align='space-between'>
                    <Text as='span' variant='headingMd' >Target</Text>
                    <InlineStack>
                        <TextField name='type' value={type.value} type='text' readOnly autoSize />
                    </InlineStack>
                </InlineStack>
                <ReturnTarget type={type} />


                {errors.target ? (
                    <InlineError
                        message={errors.target}
                        fieldID="myFieldID"
                    />
                ) : null}
            </BlockStack>
        </Card>
    )
}

export default Target


const ReturnTarget = ({ type }) => {
    const { shop } = useLoaderData()
    const url = `https://${shop}`
    const [formState, setFormState] = useState(null);
    const [collection, setCollection] = useState(null);

    async function selectCollection() {
        const collections = await window.shopify.resourcePicker({
            type: "collection",
            action: "select",
            // customized action verb, either 'select' or 'add',
        });

        console.log(collections);

        if (collections) {
            console.log(collections[0])
            const { id, title, handle, image } = collections[0];

            setCollection({
                ...collection,
                collectionId: id,
                collectionTitle: title,
                collectionHandle: handle,
                collectionImage: image
            });
        }
    }


    async function selectProduct() {
        const products = await window.shopify.resourcePicker({
            type: "product",
            action: "select",
            multiple: false
            // customized action verb, either 'select' or 'add',
        });

        if (products) {
            console.log(products[0])
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

    switch (type.value) {
        case 'homepage':
            return (

                <Link url={url} target='_blank' monochrome removeUnderline>
                    <BlockStack blockAlign='center' gap={100}>
                        {/* <Text>{url}</Text> */}
                        <input type='hidden' name='section' value='#link' />
                        <TextField name='link' value={url} type='text' readOnly />
                        {/* <Icon source={ExternalIcon} /> */}
                    </BlockStack>
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
                            <Button onClick={selectProduct} id="select-product" size='large'>
                                Select product
                            </Button>

                        </BlockStack>
                    )}
                    {formState?.productId ? (
                        <Button variant="plain" onClick={selectProduct}>
                            Change product
                        </Button>
                    ) : null}
                    {formState?.productHandle &&
                        <TextField name='link' value={`${url}/products/${formState?.productHandle}`} type='text' readOnly />
                    }
                </BlockStack>

            )
        case 'collection':
            return (
                <BlockStack gap={200}>

                    {collection?.collectionId ? (
                        <InlineStack blockAlign="center" gap="500">
                            <Thumbnail
                                source={collection.collectionImage || ImageIcon}

                            />
                            <Text as="span" variant="headingMd" fontWeight="semibold">
                                {collection.collectionTitle}
                            </Text>
                        </InlineStack>
                    ) : (
                        <BlockStack gap="200">
                            <Button onClick={selectCollection} id="select-collection">
                                Select collection
                            </Button>

                        </BlockStack>
                    )}
                    {collection?.collectionId ? (
                        <>
                            <Button variant="plain" onClick={selectCollection}>
                                Change Collection
                            </Button>
                            <Link url={`${url}/collections/${collection?.collectionHandle}`} target='_blank' monochrome removeUnderline >
                                <TextField name='link' value={`${url}/collections/${collection?.collectionHandle}`} type='text' readOnly />
                            </Link>
                            <input type='hidden' name='link' value={`${url}/collections/${collection?.collectionHandle}`} />
                        </>
                    ) : null}

                </BlockStack>

            )
    }

}

// [START select-product]

// [END select-product]