import { useActionData } from '@remix-run/react'
import { BlockStack, Button, Card, Checkbox, DatePicker, FormLayout, InlineError, InlineStack, Popover, Text, TextField } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'

const Settings = ({ title = '' }) => {
    const [email, setEmail] = React.useState(title)
    const handleEmailChange = (value) => setEmail(value)
    const errors = useActionData()?.errors || {};

    const today = new Date();
    console.log(today)

    const [month, setMonth] = useState(today.getMonth()); // Month (1-indexed)
    const [year, setYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateString, setSelectedDateString] = useState(null);


    const handleMonthChange = useCallback(
        (month, year) => {
            setMonth(month);
            setYear(year);
        },
        [],
    );

    const HandleSelectedDate = (date) => {
        setSelectedDate(date)
        console.log(date, '---date--------------')
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        setSelectedDateString({ month: months[date.getMonth()], year: date.getFullYear(), day: date.getDate() })
    }

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            {selectedDate ? `${selectedDateString.month} ${selectedDateString.day}, ${selectedDateString.year} ` : 'Never'}
        </Button>
    );
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
                    <input type='hidden' name='dynamic' value={true} />
                    <input type='hidden' name='is_editing' value={true} />
                    <InlineStack align='space-between' blockAlign='center'>
                        <Text> Expiry Date </Text>
                        {selectedDate && <Button tone='critical' variant='plain' onClick={() => { setSelectedDate(null) }} > Reset</Button>}
                    </InlineStack>



                    <Popover
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

                    </Popover>
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
