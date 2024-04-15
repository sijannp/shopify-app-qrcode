import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import db from "../db.server";

import { getDestinationUrl } from "../models/QRCode.server";

export const loader = async ({ params, request }) => {


    // [START validate]

    invariant(params.id, "Could not find QR code destination");

    const id = Number(params.id);
    const qrCode = await db.qRCode.findFirst({ where: { id } });


    // invariant(qrCode, "Could not find QR code destination");
    // [END validate]
    // return json({ success: true });

    // [START increment]
    await db.qRCode.update({
        where: { id },
        data: { scans: { increment: 1 } },
    });
    // [END increment]


    let browser = request.headers.get('sec-ch-ua')

    browser = browser ? browser.split(';')[0]?.replace(/"/g, "") : 'Unknown';

    const platform = request.headers.get('sec-ch-ua-platform')?.replace(/"/g, "") || 'Unknown';

    const ipAddress = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || request.connection.remoteAddress || 'Unknown';
    const country = request.headers.get('cf-ipcountry') || 'Unknown';


    const scanData = {
        qrcodeId: id,
        browser,
        ipAddress,
        country,
        platform
    };

    // Save scan data to Scans table
    await db.scans.create({
        data: scanData,
    });



    // [START redirect]
    return redirect(getDestinationUrl(qrCode));
    // [END redirect]
};
