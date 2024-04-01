import React, { useState } from 'react'
import SelectType from '../components/qrcode/types/SelectType'
import { Page } from '@shopify/polaris'
import QrCode from '../components/qrcode/create/QrCode'
import { authenticate } from '../shopify.server';
import { json } from '@remix-run/node';

export async function loader({ request }) {

  const { admin, session } = await authenticate.admin(request);
  return json({ shop: session.shop })

}

const Create = () => {

  const [selectedType, setSelectedType] = useState(null)
  return (
    <Page>
      {selectedType ? <QrCode type={selectedType} setType={setSelectedType} /> : <SelectType setType={setSelectedType} />}
    </Page>
  )
}

export default Create
