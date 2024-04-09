import React, { useEffect } from 'react'
import { BlockStack, Card, Text } from '@shopify/polaris'

const ScansData = () => {
    useEffect(() => {
        const formData = new FormData();
        formData.append('backcolor', '#FFFFFF');
        formData.append('frontcolor', '#000000');
        formData.append('gradient_color', '#000000');
        formData.append('pattern', 'default');
        formData.append('marker', 'default');
        formData.append('marker_in', 'default');
        formData.append('marker_out_color', '#000000');
        formData.append('marker_in_color', '#000000');
        formData.append('marker_top_right_outline', '#000000');
        formData.append('marker_top_right_center', '#000000');
        formData.append('marker_bottom_left_outline', '#000000');
        formData.append('marker_bottom_left_center', '#000000');
        formData.append('optionlogo', 'none');
        formData.append('no_logo_bg', '');
        formData.append('outer_frame', 'none');
        formData.append('framelabel', 'SCAN ME');
        formData.append('label_font', 'Arial, Helvetica, sans-serif');
        formData.append('framecolor', '#000000');
        formData.append('size', 24);
        formData.append('level', 'M');
        formData.append('imagePreview', '');
        formData.append('link', 'http://');
        formData.append('section', '#link');
        formData.append('title', 'aa');
        formData.append('dynamic', true);
        formData.append('is_editing', false);
        const fetchData = async () => {
            try {
                const response = await fetch('https://app.qodevault.com/api/qrqode/create', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    console.log(response, 'response--------')
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Response data:', data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <Card >
            <BlockStack gap={400}>
                <BlockStack gap={400}>
                    <Text as='h2' variant='headingMd'>Scans</Text>

                </BlockStack>
            </BlockStack>

        </Card>
    )
}

export default ScansData
