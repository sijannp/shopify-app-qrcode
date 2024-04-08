import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

import db from "../db.server";
import { getQRCodeImage } from "../models/QRCode.server";
import { Avatar, Button, Card, InlineStack, Page, Text } from "@shopify/polaris";


export const loader = async ({ params }) => {
    invariant(params.id, "Could not find QR code destination");

    const id = Number(params.id);
    const qrCode = await db.qRCode.findFirst({ where: { id } });

    invariant(qrCode, "Could not find QR code destination");

    return json({
        title: qrCode.title,

        image: await getQRCodeImage(id),
    });
};

export default function QRCode() {
    const { image, title } = useLoaderData();

    return (
        <Page>
            <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingLg">QR Code</Text>
                <Button variant="primary" tone="success" size="large" url="/app/create"> Create New </Button>


            </InlineStack>
            <Card>
                <Text as="h1" variant="display">QR Code</Text>
                <Text as="h2" variant="headingLg" >{title}</Text>
                s                <img src={image} alt={title} />
            </Card>
        </Page>
    );
}
