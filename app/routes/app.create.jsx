import React, { useState } from 'react'
import SelectType from '../components/qrcode/types/SelectType'
import { BlockStack, Grid, Page } from '@shopify/polaris'
import { authenticate } from '../shopify.server';
import { json } from '@remix-run/node';
import { Form, redirect, useNavigation } from '@remix-run/react';
import Target from '../components/qrcode/create/Target';
import Settings from '../components/qrcode/create/Settings';
import Generate from '../components/qrcode/create/Generate';
import Output from '../components/qrcode/create/Output';
import Type from '../components/qrcode/create/Type';
import { getQRCode, validateQRCode } from '../models/QRCode.server';
import db from '../db.server'
import Design from '../components/qrcode/create/Design';

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  return json({ shop: session.shop })
}


export async function action({ request, params }) {
  console.log('Submitting...')

  const { session, admin } = await authenticate.admin(request);

  const { shop } = session;

  const data = {
    ...Object.fromEntries(await request.formData()),
    shop,
  };

  if (data.action === "delete") {
    await db.qRCode.delete({ where: { id: Number(params.id) } });
    return redirect("/app");
  }

  const errors = validateQRCode(data);

  if (errors) {
    return json({ errors }, { status: 422 });
  }

  // const qrCode =
  //   params.id === "new"
  //     ? await db.qRCode.create({ data })
  //     : await db.qRCode.update({ where: { id: Number(params.id) }, data });

  const qrCode = await db.qRCode.create({ data })


  console.log(qrCode.id, '---qrCode.id--------------')
  return json({ qrCode: await getQRCode(Number(qrCode.id), admin.graphql) });

}

const Create = () => {

  const [selectedType, setSelectedType] = useState(null)

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "delete";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";


  return (
    <Page>
      {selectedType ?
        <BlockStack gap={400}>
          <Type type={selectedType} setType={setSelectedType} />
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 7, xl: 7 }}>
              <Form method='post' >
                <BlockStack gap={400}>
                  <Target type={selectedType} />
                  <Settings />
                  <Design />
                  <Generate />
                </BlockStack>
              </Form>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 5, xl: 5 }} >
              <Output type={selectedType} />
            </Grid.Cell>
          </Grid>
        </BlockStack>


        : <SelectType setType={setSelectedType} />}
    </Page>
  )
}

export default Create
