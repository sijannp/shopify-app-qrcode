import { redirect } from "@remix-run/react";
import { authenticate, BASIC_PLAN, PRO_PLAN } from "../shopify.server";

export const loader = async ({ request, params }) => {


    const { billing } = await authenticate.admin(request);

    if (params.plan === 'basic') {
        const billingCheck = await billing.require({
            plans: [BASIC_PLAN],
            onFailure: async () => billing.request({ plan: BASIC_PLAN }),
        });

        const subscription = billingCheck.appSubscriptions[0];
        const cancelledSubscription = await billing.cancel({
            subscriptionId: subscription.id,
            isTest: true,
            prorate: true,

        });
    }
    else {
        const billingCheck = await billing.require({
            plans: [PRO_PLAN],
            onFailure: async () => billing.request({ plan: PRO_PLAN }),
        });

        const subscription = billingCheck.appSubscriptions[0];
        const cancelledSubscription = await billing.cancel({
            subscriptionId: subscription.id,
            isTest: true,
            prorate: true,

        });
    }


    return redirect("/app/pricing");
};
