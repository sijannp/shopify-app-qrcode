import React, { useRef, useState } from 'react'
import SelectType from '../components/create/types/SelectType'
import { BlockStack, Button, Divider, Grid, InlineStack, Page, Text } from '@shopify/polaris'
import { authenticate } from '../shopify.server';
import { json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import Target from '../components/create/Target';
import Settings from '../components/create/Settings';
import Output from '../components/create/Output';
import Type from '../components/create/Type';
import Design from '../components/create/Design';
import Colors from '../components/create/Colors';
import Frames from '../components/create/Frames';
import outputStyles from '../styles/output.css?url'
import Logo from '../components/create/Logo';
import { QrCodeProvider } from '../context/qrCodeContext';


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
  const [qrCodeInfo, setQrCodeInfo] = useState(null)
  const formRef = useRef(null);


  // Start Form Validation
  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.get("title") || formData.get("title").trim() === "") {
      newErrors.name = "Title is required";
    }


    if (!formData.get("section") || formData.get("section").trim() === "") {
      newErrors.link = "Section is required";
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
        "link": "http://app.qodevault.com",
        "section": "#link",
        "title": "Test QR Code",
        "dynamic": true,
        "is_editing": false
      }


      for (const key in defaultFormData) {
        if (!formData.has(key)) {

          console.log('Missing key', key, defaultFormData[key])
          formData.append(key, defaultFormData[key]);
        }
      }

      const objectFormData = Object.fromEntries(formData.entries());


      const response = await fetch("https://app.qodevault.com/api/qrqode/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.result?.content) {
          setResult(data)
          setQrCodeInfo(objectFormData)
        } else {
          setErrors({ general: 'Something went wrong' })
        }
      }
    } else {
    }
    setIsSaving(false);
  };


  const initialData = {
    colors: {
      backcolor: "#FFFFFF",
      frontcolor: "#000000",
      transparent: false,
      gradient: false,
      radial: false,
      gradient_color: "#000000",
    },
    design: {
      pattern: "circle",
      marker: "circle",
      template: 'circle',
      marker_in: "circle",
      markers_color: false,
      different_marker_color: false,
      marker_out_color: "#000000",
      marker_in_color: "#000000",
      marker_top_right_outline: "#000000",
      marker_top_right_center: "#000000",
      marker_bottom_left_outline: "#000000",
      marker_bottom_left_center: "#000000",
    },
    frame: {
      outer_frame: 'none',
      framelabel: 'Scan Me!',
      custom_frame_color: false,
      custom_frame_color: false,
      framecolor: '#000000',
      frame_font: 'Arial, Helvetica, sans-serif'
    }
  }



  return (
    <Page>
      <BlockStack gap={400}>
        <InlineStack align='space-between' blockAlign='center'>
          <Text as='h2' variant='headingLg'> Create</Text>
          <Button size='large' url='/app' loading={isSaving} disabled={isSaving} > Back </Button>
        </InlineStack>
      </BlockStack>
      {
        selectedType ?
          <QrCodeProvider initialData={initialData}>
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
                      <Settings errors={errors} />
                      <Target type={selectedType} errors={errors} />
                      <Colors />
                      <Design />
                      <Frames />
                      <Logo />
                      {/* <Generate /> */}
                    </BlockStack>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }} >
                    <Output type={selectedType} qrCodeInfo={qrCodeInfo} result={result} isSaving={isSaving} errors={errors} />
                  </Grid.Cell>
                </Grid>
              </BlockStack>
            </Form>
          </QrCodeProvider>


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