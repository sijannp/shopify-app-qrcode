import qrcode from "qrcode";
import invariant from "tiny-invariant";
import db from "../db.server";

// [START get-qrcode]
export async function getQRCode(id, graphql) {
    const qrCode = await db.qRCode.findFirst({ where: { id } });

    if (!qrCode) {
        return null;
    }

    return supplementQRCode(qrCode, graphql);
}

export async function getQRCodes(shop, graphql) {
    const qrCodes = await db.qRCode.findMany({
        where: { shop },
        orderBy: { id: "desc" },
    });

    if (qrCodes.length === 0) return [];

    return Promise.all(
        qrCodes.map((qrCode) => supplementQRCode(qrCode, graphql))
    );
}
// [END get-qrcode]

// [START get-qrcode-image]
export function getQRCodeImage(id) {
    const url = new URL(`/qrcodes/${id}/scan`, process.env.SHOPIFY_APP_URL);
    return qrcode.toDataURL(url.href);
}
// [END get-qrcode-image]

// [START get-destination]
export function getDestinationUrl(qrCode) {
    switch (qrCode.type) {
        case 'product':
            return `https://${qrCode.shop}/products/${qrCode.target}`;
        case 'collection':
            return `https://${qrCode.shop}/collections/${qrCode.target}`;
        case 'page':
            return `https://${qrCode.shop}/pages/${qrCode.target}`;
        case 'homepage':
            return `https://${qrCode.shop}`;
    }
}
// [END get-destination]

// [START hydrate-qrcode]
async function supplementQRCode(qrCode, graphql) {
    const qrCodeImagePromise = getQRCodeImage(qrCode.id);

    // const response = await graphql(
    //     `
    //   query supplementQRCode($id: ID!) {
    //     product(id: $id) {
    //       title
    //       images(first: 1) {
    //         nodes {
    //           altText
    //           url
    //         }
    //       }
    //     }
    //   }
    // `,
    //     {
    //         variables: {
    //             id: qrCode.productId,
    //         },
    //     }
    // );

    // const {
    //     data: { product },
    // } = await response.json();

    return {
        // ...qrCode,
        // productDeleted: !product?.title,
        // productTitle: product?.title,
        // productImage: product?.images?.nodes[0]?.url,
        // productAlt: product?.images?.nodes[0]?.altText,
        // destinationUrl: getDestinationUrl(qrCode),
        image: await qrCodeImagePromise,
    };
}
// [END hydrate-qrcode]

// [START validate-qrcode]
export function validateQRCode(data) {
    const errors = {};

    if (!data.title) {
        errors.title = "Title is required";
    }

    if (!data.type) {
        errors.type = "Type is required";
    }

    if (!data.target) {
        errors.target = "Target is required";
    }

    if (Object.keys(errors).length) {
        return errors;
    }
}
// [END validate-qrcode]