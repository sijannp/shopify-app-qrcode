import { BlockStack, Button, Card, DataTable, Grid, InlineStack, Page, Text, TextField } from '@shopify/polaris'
import React from 'react'
import Empty from '../components/home/Empty'
import { json } from '@remix-run/node'
import { authenticate } from '../shopify.server';
import db from "../db.server";
import { useActionData, useLoaderData } from '@remix-run/react';
import { getQRCode } from '../models/QRCode.server';
import QrCodeTable from '../components/home/QrCodeTable';
import Header from '../components/home/Header';
import ScansData from '../components/home/ScansData';

export async function loader({ request }) {

  const { session, admin } = await authenticate.admin(request);
  const shop = session.shop

  const qrCodes = await db.qRCode.findMany({
    where: {
      shop
    },

    orderBy: {
      createdAt: 'desc'
    }
  });


  if (qrCodes.length === 0) return [];

  const responseQrCodes = await Promise.all(
    qrCodes.map(async (qrCode) => {

      let lastScannedAt = null;

      if (qrCode.scans > 0) {
        const lastScannedAtData = await db.scans.findFirst({
          where: {
            qrcodeId: qrCode.id
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        lastScannedAtData && (lastScannedAt = lastScannedAtData.createdAt)

        lastScannedAt = new Date(lastScannedAt).toLocaleString()

      }

      return { ...qrCode, lastScannedAt, image: await getQRCode(qrCode.id, admin.grap) }
    }
    )
  );




  return json({ qrCodes: responseQrCodes });
}

const Index = () => {

  const qrCodes = useLoaderData()?.qrCodes || [];


  return (
    <Page>
      {qrCodes.length === 0 ? <Empty /> :
        <BlockStack gap={600}>
          <Header />

          <QrCodeTable qrCodes={qrCodes} />
          <ScansData />
        </BlockStack>

      }


    </Page>
  )
}

export default Index
