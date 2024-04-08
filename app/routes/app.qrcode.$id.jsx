import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

import db from "../db.server";
import { getQRCodeImage } from "../models/QRCode.server";
import { Avatar, Button, Card, InlineStack, Page, Text } from "@shopify/polaris";
import ViewQrCode from "../components/qrcode/view/ViewQrCode";


export const loader = async ({ params }) => {
    invariant(params.id, "Could not find QR code destination");

    const id = Number(params.id);
    const qrCode = await db.qRCode.findFirst({ where: { id } });


    const scansData = await db.scans.findMany({
        where: {
            qrcodeId: id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });



    invariant(qrCode, "Could not find QR code destination");

    return json({
        qrCode: {
            title: qrCode.title,
            type: qrCode.type,
            settings: qrCode.settings,
            target: qrCode.target,
            scans: {
                total: qrCode.scans,
                unique: null,
                lastScan: scansData[0]?.createdAt,
                data: scansData

            },
            image: await getQRCodeImage(id),
        }
    });
};

export default function QRCode() {
    const { qrCode } = useLoaderData();

    return (
        <Page>
            <ViewQrCode qrcode={qrCode} />
        </Page>
    );
}
