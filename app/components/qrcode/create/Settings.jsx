import { BlockStack, Card, FormLayout, InlineError, Text, TextField } from '@shopify/polaris'
import React from 'react'

const Settings = ({ title = '', errors }) => {
    const [email, setEmail] = React.useState(title)
    const handleEmailChange = (value) => setEmail(value)


    return (
        <Card>
            <BlockStack gap={400}>
                <Text variant='headingMd'> Settings</Text>
                <FormLayout>


                    <TextField
                        value={email}
                        onChange={handleEmailChange}
                        label="Title"
                        type="text"
                        name='title'
                        requiredIndicator

                    />

                    {/* <InlineStack align='space-between' blockAlign='center'>
                        <Text> Expiry Date </Text>
                        {selectedDate && <Button tone='critical' variant='plain' onClick={() => { setSelectedDate(null) }} > Reset</Button>}
                    </InlineStack> */}



                    {/* <Popover
                        active={popoverActive}
                        activator={activator}
                        autofocusTarget="first-node"
                        onClose={togglePopoverActive}
                    >
                        <Card>

                            <DatePicker
                                month={month}
                                year={year}
                                onChange={({ start }) => HandleSelectedDate(start)}
                                onMonthChange={handleMonthChange}
                                selected={selectedDate}
                                // Disable past dates including today
                                disableDatesBefore={today}
                            />
                        </Card>

                    </Popover> */}
                    {errors.name ? (
                        <InlineError
                            message={errors.name}
                            fieldID="myFieldID"
                        />
                    ) : null}


                </FormLayout>
            </BlockStack>
        </Card>
    )
}

export default Settings
