import { useLoaderData } from '@remix-run/react'
import { BlockStack, Button, Card, InlineError, InlineStack, Link, Text, TextField, Thumbnail } from '@shopify/polaris'
import React, { useState } from 'react'
import { ImageIcon } from "@shopify/polaris-icons";

const Target = ({ type, errors }) => {
    return (
        <Card>
            <BlockStack gap={400}>
                <InlineStack blockAlign='center' align='space-between'>
                    <Text as='span' variant='headingMd' >Target</Text>
                    <InlineStack>
                        <input type='hidden' name='type' value={type.value} />
                    </InlineStack>
                </InlineStack>
                <ReturnTarget type={type} />
                <ReturnType type={type} />


                {errors.link ? (
                    <InlineError
                        message={errors.link}
                        fieldID="myFieldID"
                    />
                ) : null}
            </BlockStack>
        </Card>
    )
}

export default Target


const ReturnType = ({ type }) => {
    switch (type.value) {
        case 'homepage':
        case 'product':
        case 'collection':
        case 'link':
            return <input type='hidden' name='section' value='#link' />
        case 'text':
            return <input type='hidden' name='section' value='#text' />
        case 'email':
            return <input type='hidden' name='section' value='#email' />
    }
}


const ReturnTarget = ({ type }) => {
    const { shop } = useLoaderData()
    const url = `https://${shop}`
    const [formState, setFormState] = useState(null);
    const [collection, setCollection] = useState(null);

    async function selectCollection() {
        const collections = await window.shopify.resourcePicker({
            type: "collection",
            action: "select",
        });


        if (collections) {
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

    switch (type.value) {
        case 'homepage':
            return (

                <Link url={url} target='_blank' monochrome removeUnderline>
                    <BlockStack blockAlign='center' gap={100}>
                        <Text as='span' variant='bodyMd'> {url} </Text>
                        <input type='hidden' name='link' value={url} />
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

        case 'link':
            const validateLink = (link) => {
                if (link.startsWith('http://') || link.startsWith('https://')) {
                    return true
                } else {
                    return false
                }
            }
            const [link, setLink] = useState('')
            const [validLink, setValidLink] = useState(false)

            const handleLinkChange = (value) => {
                setLink(value)
                setValidLink(validateLink(value))
            }

            return (
                <BlockStack gap={200}>
                    <TextField label='Link' name='link' type='text' value={link} onChange={handleLinkChange} />
                    {link && !validLink && <InlineError message='Please enter a valid link' fieldID="myFieldID" />}
                </BlockStack>
            )

        case 'text':
            const [text, setText] = useState('')
            const [validText, setValidText] = useState(false)

            const handleTextChange = (value) => {
                setText(value)
                setValidText(value.length > 0)
            }

            return (
                <BlockStack gap={200}>
                    <TextField label='Text' name='data' type='text' value={text} onChange={handleTextChange} />
                    {text && !validText && <InlineError message='Please enter a text' fieldID="myFieldID" />}
                </BlockStack>
            )


        case 'email':
            const [email, setEmail] = useState('')
            const [subject, setSubject] = useState('')
            const [message, setMessage] = useState('')

            const validateEmail = (email) => {
                if (email.includes('@') && email.includes('.')) {
                    return true
                } else {
                    return false
                }
            }


            return (
                <BlockStack gap={200}>
                    <TextField label='Email' name='mailto' type='email' value={email} onChange={(value) => setEmail(value)} />
                    {email && !validateEmail(email) && <InlineError message='Please enter a valid email' fieldID="myFieldID" />}
                    <TextField label='Subject' name='subject' type='text' value={subject} onChange={(value) => setSubject(value)} />
                    <TextField label='Message' name='body' type='text' value={message} onChange={(value) => setMessage(value)} />
                </BlockStack>
            )
    }

}

// [START select-product]

// [END select-product]