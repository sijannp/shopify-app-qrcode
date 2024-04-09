import React, { useState } from 'react'
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
export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  return json({ shop: session.shop })
}


export async function action({ request, params }) {

  const { session, admin } = await authenticate.admin(request);

  const { shop } = session;

  const formData = await request.formData();

  console.log(formData, '---formData--------------')

  if (formData) {

    const response = await fetch('https://app.qodevault.com/api/qrqode/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return json({ data })
    } else {
      return json({ data: 'error' })
    }




  }

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

}

const Create = () => {

  const [selectedType, setSelectedType] = useState(null)

  const actionData = useActionData()

  console.log(actionData)

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "delete";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";


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
          <Form method='post' >
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
                    <Settings />
                    <Colors />
                    <Design />
                    <Frames />
                    {/* <Generate /> */}
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }} >
                  <Output type={selectedType} />
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
