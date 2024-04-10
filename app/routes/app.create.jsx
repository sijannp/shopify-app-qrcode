import React, { useRef, useState } from 'react'
import SelectType from '../components/qrcode/types/SelectType'
import { BlockStack, Button, Divider, Grid, InlineStack, Page, Text } from '@shopify/polaris'
import { authenticate } from '../shopify.server';
import { json } from '@remix-run/node';
import { Form, redirect, useActionData, useNavigation } from '@remix-run/react';
import Target from '../components/qrcode/create/Target';
import Settings from '../components/qrcode/create/Settings';
import Output from '../components/qrcode/create/Output';
import Type from '../components/qrcode/create/Type';
import Design from '../components/qrcode/create/Design';
import Colors from '../components/qrcode/create/Colors';
import Frames from '../components/qrcode/create/Frames';
import outputStyles from '../styles/output.css?url'
import Logo from '../components/qrcode/create/Logo';
export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  return json({ shop: session.shop })
}


// export async function action({ request, params }) {

//   const { session, admin } = await authenticate.admin(request);

//   const { shop } = session;

//   const formData = await request.formData();

//   console.log(formData, '---formData--------------')

//   if (formData) {

//     const response = await fetch('https://app.qodevault.com/api/qrqode/create/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return json({ data })
//     } else {
//       return json({ data: 'error' })
//     }




//   }

// if (data.action === "delete") {
//   await db.qRCode.delete({ where: { id: Number(params.id) } });
//   return redirect("/app");
// }
//
// const errors = validateQRCode(data);
//
// if (errors) {
//   return json({ errors }, { status: 422 });
// }
//
// // const qrCode =
// //   params.id === "new"
// //     ? await db.qRCode.create({ data })
// //     : await db.qRCode.update({ where: { id: Number(params.id) }, data });
//
// const qrCode = await db.qRCode.create({ data })
//
//
// console.log(qrCode.id, '---qrCode.id--------------')
// return json({ qrCode: await getQRCode(Number(qrCode.id), admin.graphql) });

// }

const Create = () => {

  const [selectedType, setSelectedType] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [result, setResult] = useState(null)
  const formRef = useRef(null);


  // Start Form Validation
  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.get("title") || formData.get("title").trim() === "") {
      newErrors.name = "Title is required";
    }


    if (!formData.get("link") || formData.get("link").trim() === "") {
      newErrors.link = "Link is required";
    }

    setErrors(newErrors);
    console.log(errors, '---errors--------------')
    return Object.keys(newErrors).length === 0;
  };
  // End Form Validation




  // Start the form submission process
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    const formData = new FormData(formRef.current);

    if (validateForm(formData)) {

      if (formData.get("gradient") === 'true') {
        formData.append('gradient', true)
      }
      if (formData.get("transparent") === 'true') {
        formData.append('transparent', true)
      }

      if (formData.get("radial") === 'true') {
        formData.append('radial', true)
      }

      if (formData.get('markers_color') === 'true') {
        formData.append('markers_color', true)
      }

      if (formData.get('different_marker_color') === 'true') {
        formData.append('different_marker_color', true)
      }

      if (formData.get('custom_frame_color') === 'true') {
        formData.append('custom_frame_color', true)
      }




      const defaultFormData = {
        "backcolor": "#FFFFFF",
        "frontcolor": "#000000",
        "gradient_color": "#000000",
        "pattern": "special-circle",
        "marker": "default",
        "marker_in": "default",
        "marker_out_color": "#000000",
        "marker_in_color": "#000000",
        "marker_top_right_outline": "#000000",
        "marker_top_right_center": "#000000",
        "marker_bottom_left_outline": "#000000",
        "marker_bottom_left_center": "#000000",
        "optionlogo": "none",
        "no_logo_bg": "",
        "outer_frame": "none",
        "framelabel": "SCAN ME",
        "label_font": "Arial, Helvetica, sans-serif",
        "framecolor": "#000000",
        "size": 24,
        "level": "M",
        "imagePreview": "",
        "link": "http://",
        "section": "#link",
        "title": "aa",
        "dynamic": true,
        "is_editing": false
      }


      for (const key in defaultFormData) {
        if (!formData.has(key)) {
          formData.append(key, defaultFormData[key]);
        }
      }


      // Use formData for further processing or sending to the server
      const response = await fetch("https://app.qodevault.com/api/qrqode/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data)
      }



    } else {



    }
    setIsSaving(false);


  };



  return (
    <Page>
      <BlockStack gap={400}>
        <InlineStack align='space-between' blockAlign='center'>
          <Text as='h2' variant='headingLg'>Home {'>'} Create</Text>
          <Button size='large' url='/app' loading={isSaving} disabled={isSaving} > Back </Button>
        </InlineStack>
        <Divider borderWidth='050' />
      </BlockStack>
      {
        selectedType ?
          <Form method='post' ref={formRef} onSubmit={handleSubmit} >
            <BlockStack gap={400}>
              <Button size='large' tone='critical' variant='monochromePlain'>
                <InlineStack align='center' blockAlign='center'>

                </InlineStack>
              </Button>
              <Type type={selectedType} setType={setSelectedType} />
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 4, lg: 8, xl: 8 }}>

                  <BlockStack gap={400}>
                    <Target type={selectedType} />
                    <Settings errors={errors} />
                    <Colors />
                    <Design />
                    <Frames />
                    <Logo />
                    {/* <Generate /> */}
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }} >
                  <Output type={selectedType} result={result} isSaving={isSaving} errors={errors} />
                </Grid.Cell>
              </Grid>
            </BlockStack>
          </Form>


          : <SelectType setType={setSelectedType} />
      }
    </Page >
  )
}

export default Create


export const links = () => {
  return [
    { rel: "stylesheet", href: outputStyles },
  ];
}