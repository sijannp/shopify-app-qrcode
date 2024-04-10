import { authenticate, BASIC_PLAN, PRO_PLAN } from "../shopify.server";

export const loader = async ({ request, params }) => {
    const { billing, session } = await authenticate.admin(request);
    const { shop } = session

    const shopName = shop.replace('.myshopify.com', '')

    const plan = params.plan;
    if (plan === 'basic') {
        await billing.require({
            plans: [BASIC_PLAN],
            isTest: true,
            onFailure: async () => billing.request({
                plan: BASIC_PLAN,
                isTest: true,
                returnUrl: `https://admin.shopify.com/store/${shopName}/apps/${process.env.APP_HANDLE}/app`,
            }),
        });

    } else {
        await billing.require({
            plans: [PRO_PLAN],
            isTest: true,
            onFailure: async () => billing.request({
                plan: PRO_PLAN,
                isTest: true,
                returnUrl: `https://admin.shopify.com/store/${shopName}/apps/${process.env.APP_HANDLE}/app`,
            }),
        });
    }






};
