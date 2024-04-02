import { useActionData } from '@remix-run/react'
import { BlockStack, Button, Card, Checkbox, FormLayout, InlineError, Text, TextField } from '@shopify/polaris'
import React from 'react'

const Settings = ({ title = '' }) => {
    const [email, setEmail] = React.useState(title)
    const handleEmailChange = (value) => setEmail(value)
    const errors = useActionData()?.errors || {};
    return (
        <Card>
            <BlockStack gap={400}>
                <Text variant='headingMd'> SETTINGS</Text>
                <FormLayout>


                    <TextField
                        value={email}
                        onChange={handleEmailChange}
                        label="Title"
                        type="text"
                        name='title'
                        requiredIndicator

                    />
                    {errors.title ? (
                        <InlineError
                            message={errors.title}
                            fieldID="myFieldID"
                        />
                    ) : null}


                </FormLayout>
            </BlockStack>
        </Card>
    )
}

export default Settings
