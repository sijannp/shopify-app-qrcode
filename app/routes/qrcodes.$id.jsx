import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

import db from "../db.server";
import { getQRCodeImage } from "../models/QRCode.server";
import { Card, Page, Text } from "@shopify/polaris";

// [START loader]
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
// [END loader]

// [START component]
export default function QRCode() {
    const { image, title } = useLoaderData();

    return (
        <Page>
            <Card>
                <h1>{title}</h1>
                <Text as="h2" variant="headingLg" >{title}</Text>
                <img

                    src={image} alt={`QR Code for product`} />
            </Card>
        </Page>
    );
}
// [START component]