import React from 'react'
import { BlockStack, Frame, Grid, Page } from '@shopify/polaris'
import { json, useLoaderData, Form } from "@remix-run/react";
import { authenticate } from '../shopify.server';
import Colors from '../components/create/Colors';
import Design from '../components/create/Design';
import Frames from '../components/create/Frames';
import Logo from '../components/create/Logo';
import Output from '../components/create/Output';
import { addMissingFields, validateForm } from '../utils/Helpers';


export async function loader({ request, params }) {
    const { session } = await authenticate.admin(request);

    if (params.id === 'new') {
        return json({ shop: session.shop, new: true })
    }

    return json({ shop: session.shop })
}


const Template = () => {
    const defaultFormData = {
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
    }



    const { new: isNew } = useLoaderData()

    const [formData, setFormData] = React.useState(isNew ? defaultFormData : {})

    const colorsData = {
        backcolor: "#aeaeae",
        frontcolor: "#ff0000",
        transparent: false,
        gradient: true,
        radial: false,
        gradient_color: "#000000",
    }

    const designData = {
        pattern: "special-circle",
        marker: "default",
        marker_in: "default",
        marker_out_color: "#000000",
        marker_in_color: "#000000",
        marker_top_right_outline: "#000000",
        marker_top_right_center: "#000000",
        marker_bottom_left_outline: "#000000",
        marker_bottom_left_center: "#000000",
    }

    const framesData = {
        outer_frame: 'none',
        framelabel: 'Scan Me!',
        custom_frame_color: false,
        custom_frame_color: false,
        framecolor: '#000000',
        frame_font: 'Arial, Helvetica, sans-serif'
    }

    const [result, setResult] = React.useState({})
    const [isSaving, setIsSaving] = React.useState(false)
    const [errors, setErrors] = React.useState({})

    const formRef = React.useRef(null)

    const handleSubmit = async (e) => {
        setIsSaving(true)
        e.preventDefault()
        const formData = new FormData(formRef.current)

        if (validateForm(formData)) {

            const newFormData = addMissingFields(formData)

            const response = await fetch("https://app.qodevault.com/api/qrqode/create", {
                method: "POST",
                body: newFormData,
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.result?.content) {
                    setResult(data)
                } else {
                    setErrors({ general: 'Something went wrong' })
                }
            }
            setIsSaving(false)
        }
    }






    return (
        <Page>
            <Form method='post' ref={formRef} onSubmit={handleSubmit} >

                <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 4, lg: 8, xl: 8 }}>
                        <DefaultInputFields />
                        <BlockStack gap={400}>
                            <Colors values={colorsData} />
                            <Design values={designData} />
                            <Frames values={framesData} />
                            <Logo />
                        </BlockStack>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }} >
                        <Output result={result} isSaving={isSaving} errors={errors} template={true} />
                    </Grid.Cell>
                </Grid>

            </Form>
        </Page>
    )
}

export default Template



const DefaultInputFields = () => {
    return (
        <>
            <input type='hidden' name='section' value='#text' />
            <input type='hidden' name='title' value='Test QR Code' />
            <input type='hidden' name='dynamic' value='true' />
            <input type='hidden' name='is_editing' value='false' />
        </>
    )
}
