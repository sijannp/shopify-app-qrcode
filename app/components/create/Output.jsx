import { Avatar, BlockStack, Box, Button, ButtonGroup, Card, Icon, InlineStack, Link, Select, Text } from '@shopify/polaris'
import {
    ArrowDownIcon, MagicIcon, ClipboardIcon
} from '@shopify/polaris-icons';
import React, { useCallback, useRef, useState } from 'react'
import QRCExample from '../../assets/img/QRCExample.svg'

const Output = ({ result, isSaving, errors, qrCodeInfo }) => {
    const [selectedSize, setSelectedSize] = useState('12');
    const [copiedUrl, setCopiedUrl] = useState(false);

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(true);
        setTimeout(() => {
            setCopiedUrl(false);
        }, 3000);

    }

    const handleSizeSelectChange = useCallback(
        (value) => setSelectedSize(value),
        [],
    );

    const sizeOptions = [
        { label: 'Small', value: '12' },
        { label: 'Medium', value: '24' },
        { label: 'Large', value: '32' },
    ]

    const typeOptions = [
        { label: 'PNG', value: 'png' },
        { label: 'SVG', value: 'svg' },
        { label: 'JPG', value: 'jpg' },
    ];

    // const qrCode = useActionData()?.qrCode || null;

    const qrCode = result?.result || null;


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


    const handleQrCodeSave = async () => {

        // if (qrCode && qrCode.content) {
        //     const response = await fetch(`http://192.168.1.18:8090/api/qrqode/save`, {
        //         method: 'POST',
        //         body: JSON.stringify({ qrcode: qrCode, qrcode_info: qrCodeInfo }),
        //     });


        // }

    }




    return (
        <BlockStack gap={400}>
            <Card>
                <BlockStack gap={600}>
                    {qrCode ? <SvgComponent parentClassName='qv-output' svgContent={qrCode.content} /> :
                        <Avatar size="large" source={QRCExample} />
                    }
                    <BlockStack gap={300}>

                        <Select
                            label="Size"
                            name='size'
                            options={sizeOptions}
                            onChange={handleSizeSelectChange}
                            value={selectedSize}
                        />
                        <input type='hidden' name='level' value="M" />
                        {/* <Select
                        label="Type"
                        options={typeOptions}
                        onChange={handleSelectChange}
                        value={selected}
                    /> */}
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
                        <Button icon={ArrowDownIcon} size='large' disabled={!qrCode} onClick={handleQrCodeSave}>Download</Button>
                        {/* <Button tone='critical' variant='primary' onClick={handleShowModal} icon={DeleteIcon} size='large'>Delete</Button> */}
                    </ButtonGroup>
                </BlockStack>
            </Card>
            {qrCode &&
                <Card>
                    <BlockStack gap={300}>
                        <InlineStack align='space-between' blockAlign='center'>
                            <Text as='h2' variant='headingMd'>Public URL</Text>
                            <Button variant='tertiary' onClick={() => copyUrl(`http://app.qodevault.com/${qrCode?.unique_code}`)} >
                                <Icon source={ClipboardIcon} />
                            </Button>
                        </InlineStack>
                        <Link url={`http://app.qodevault.com/${qrCode?.unique_code}`} target='_blank' monochrome removeUnderline >
                            <Text>http://app.qodevault.com/{qrCode?.unique_code}</Text>
                        </Link>

                        {copiedUrl && <Text variant='bodyMd' tone='success' alignment='center'>Copied to clipboard.</Text>}
                    </BlockStack>
                </Card>
            }
        </BlockStack>
    )
}

export default Output



function SvgComponent({ parentClassName, svgContent }) {
    return (
        <div className={parentClassName} dangerouslySetInnerHTML={{ __html: svgContent, }} />
    );
}

