import React from 'react'
import { BlockStack, Button, Card, EmptyState, InlineStack, Page, Text } from '@shopify/polaris'

const Templates = () => {
    const [formData, setFormData] = React.useState({
        backcolor: "#FFFFFF",
        frontcolor: "#000000",
        gradient_color: "#000000",
        pattern: "special-circle",
        marker: "default",
        marker_in: "default",
        marker_out_color: "#000000",
        marker_in_color: "#000000",
        marker_top_right_outline: "#000000",
        marker_top_right_center: "#000000",
        marker_bottom_left_outline: "#000000",
        marker_bottom_left_center: "#000000",
        optionlogo: "none",
        no_logo_bg: "",
        outer_frame: "none",
        framelabel: "SCAN ME",
        label_font: "Arial, Helvetica, sans-serif",
        framecolor: "#000000",
        size: 24,
        level: "M",
        imagePreview: "",
        link: "http://app.qodevault.com",
        section: "#link",
        title: "Test QR Code",
        dynamic: true,
        is_editing: false
    })



    return (
        <Page>
            <BlockStack gap={600}>
                <InlineStack align='space-between'>
                    <Text as='h1'>Templates</Text>
                    <Button primary>Create Template</Button>
                </InlineStack>
                <Card>
                    <EmptyState
                        heading="Create custom template"

                        action={{ content: 'Get Started', url: '/app/template/new' }}


                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                        <Text variant='bodyMd'>  Create a template of your choice and use it to generate QR codes.</Text>
                    </EmptyState>
                </Card>
            </BlockStack>



        </Page>
    )
}

export default Templates
