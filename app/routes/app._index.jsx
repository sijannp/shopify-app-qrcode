import { Page } from '@shopify/polaris'
import React from 'react'
import Empty from '../components/home/Empty'
import { json } from '@remix-run/node'

export async function loader() {
  return json({ success: true })
}

const Index = () => {
  return (
    <Page>
      <Empty />
    </Page>
  )
}

export default Index
