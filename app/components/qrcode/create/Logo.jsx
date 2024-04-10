import React, { useState, useCallback } from 'react';
import { DropZone, Thumbnail, Text, Card, BlockStack, InlineStack, Icon, Collapsible } from '@shopify/polaris';
import { NoteIcon, CaretDownIcon } from '@shopify/polaris-icons';

export default function Logo() {
    const [open, setOpen] = useState(false);
    const handleToggle = useCallback(() => setOpen((open) => !open), []);

    const [file, setFile] = useState();
    const [base64String, setBase64String] = useState();

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {
            const selectedFile = acceptedFiles[0];
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;
                    setFile({
                        name: selectedFile.name,
                        size: selectedFile.size,
                        type: selectedFile.type
                    });
                    setBase64String(base64);
                };
                reader.readAsDataURL(selectedFile);
            }
        },
        [],
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !file && <DropZone.FileUpload />;
    const uploadedFile = file && (
        <BlockStack align='center' inlineAlign='center' gap={200}>
            <Thumbnail
                size="small"
                alt={file.name}
                source={
                    validImageTypes.includes(file.type)
                        ? base64String // Use base64 data
                        : NoteIcon
                }
            />
            <div>
                {file.name}{' '}
                <Text variant="bodySm" as="p" alignment='center'>
                    {file.size} bytes
                </Text>
            </div>
        </BlockStack>
    );

    return (
        <Card>
            <BlockStack gap={400}>

                <div style={{ cursor: 'pointer' }} >
                    <BlockStack onClick={handleToggle} >
                        <InlineStack align='space-between' blockAlign='center'>
                            <Text as='h2' variant='headingMd'>Logo</Text>
                            <div>
                                <Icon source={CaretDownIcon} color='inkLighter' />
                            </div>
                        </InlineStack>
                    </BlockStack>
                </div>
                <Collapsible
                    open={open}
                    id="basic-collapsible"
                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                    expandOnPrint
                >
                    <BlockStack gap={400}>
                        <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
                            {uploadedFile}
                            {fileUpload}
                        </DropZone>
                        {base64String && (
                            <input type="hidden" name="optionlogo" value={base64String} />
                        )}
                    </BlockStack>

                </Collapsible>

            </BlockStack>

        </Card>
    );
}
