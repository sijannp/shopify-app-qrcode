import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import db from "../db.server";

import { getDestinationUrl } from "../models/QRCode.server";

export const loader = async ({ params }) => {
    // [START validate]

    invariant(params.id, "Could not find QR code destination");

    const id = Number(params.id);
    const qrCode = await db.qRCode.findFirst({ where: { id } });

    console.log(qrCode, '---qrCode--------------')

    // invariant(qrCode, "Could not find QR code destination");
    // [END validate]
    // return json({ success: true });

    // [START increment]
    await db.qRCode.update({
        where: { id },
        data: { scans: { increment: 1 } },
    });
    // [END increment]

    // [START redirect]
    return redirect(getDestinationUrl(qrCode));
    // [END redirect]
};
