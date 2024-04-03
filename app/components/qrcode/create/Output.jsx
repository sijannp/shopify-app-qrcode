import { Avatar, BlockStack, Box, Button, ButtonGroup, Card, Icon, InlineStack, Select, Text } from '@shopify/polaris'
import React, { useCallback, useRef, useState } from 'react'
import QRCExample from '../../../assets/img/QRCExample.svg'
import { useActionData } from '@remix-run/react';

const Output = () => {
    const [selected, setSelected] = useState('today');
    const [selectedSize, setSelectedSize] = useState('small');

    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );

    const handleSizeSelectChange = useCallback(
        (value) => setSelectedSize(value),
        [],
    );

    const sizeOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
    ]

    const options = [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'lastWeek' },
    ];

    const qrCode = useActionData()?.qrCode || null;

    const modalRef = useRef(null);

    const handleShowModal = () => {
        if (modalRef.current) {
            modalRef.current.show();
        }
    };

    const handleHideModal = () => {
        if (modalRef.current) {
            modalRef.current.hide();
        }
    };

    return (
        <Card>
            <BlockStack gap={600}>
                {qrCode ? <Avatar size="large" source={qrCode.image} /> :
                    <Avatar size="large" source={QRCExample} />
                }
                <BlockStack gap={300}>

                    <Select
                        label="Size"
                        options={sizeOptions}
                        onChange={handleSizeSelectChange}
                        value={selectedSize}

                    />
                    <Select
                        label="Date range"
                        options={options}
                        onChange={handleSelectChange}
                        value={selected}
                    />
                </BlockStack>


                <ui-modal ref={modalRef} id="my-modal" variant='base'>
                    <Box padding='400' >
                        <Text>Are you sure you want to delete this QR Code?</Text>
                        <Text> This action can not be undone.</Text>
                    </Box>
                    <ui-title-bar title="Are you sure?">
                        <button variant="primary" tone='critical'>Delete</button>
                        <button onClick={handleHideModal}>Cancel</button>
                    </ui-title-bar>
                </ui-modal>

                <ButtonGroup fullWidth>
                    <Button variant="primary" tone='success'>Download</Button>
                    <Button tone='critical' variant='primary' onClick={handleShowModal}>Delete</Button>
                </ButtonGroup>
            </BlockStack>

        </Card>
    )
}

export default Output
