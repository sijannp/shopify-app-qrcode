import { Avatar, BlockStack, Box, Button, ButtonGroup, Card, Icon, InlineStack, Select, Text } from '@shopify/polaris'
import {
    ArrowDownIcon, MagicIcon
} from '@shopify/polaris-icons';
import React, { useCallback, useRef, useState } from 'react'
import QRCExample from '../../../assets/img/QRCExample.svg'
import { useActionData, useNavigation } from '@remix-run/react';

const Output = () => {
    const [selected, setSelected] = useState('today');
    const [selectedSize, setSelectedSize] = useState('small');


    const nav = useNavigation();
    const isSaving =
        nav.state === "submitting";

    const errors = useActionData()?.errors || {};

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

    const typeOptions = [
        { label: 'PNG', value: 'png' },
        { label: 'SVG', value: 'svg' },
        { label: 'JPG', value: 'jpg' },
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
                        label="Type"
                        options={typeOptions}
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
                    <Button variant="primary" tone='success' icon={MagicIcon} size='large' submit={true} disabled={isSaving}>
                        {isSaving ? 'Generating...' : 'Generate'}
                    </Button>
                    <Button icon={ArrowDownIcon} size='large' disabled={!qrCode}>Download</Button>
                    {/* <Button tone='critical' variant='primary' onClick={handleShowModal} icon={DeleteIcon} size='large'>Delete</Button> */}
                </ButtonGroup>
            </BlockStack>

        </Card>
    )
}

export default Output
