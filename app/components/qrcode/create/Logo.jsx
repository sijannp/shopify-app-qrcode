import React, { useState, useCallback } from 'react';
import { DropZone, Thumbnail, Text, Card, BlockStack } from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';

export default function Logo() {
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
                <Text as="h2" variant="headingMd"> Logo </Text>
                <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
                    {uploadedFile}
                    {fileUpload}
                </DropZone>
            </BlockStack>
            {base64String && (
                <input type="hidden" name="optionlogo" value={base64String} />
            )}
        </Card>
    );
}
