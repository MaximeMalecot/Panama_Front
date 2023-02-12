const routes = [
    {
        path: "payment",
        name: "payment-redirection",
        component: () => import("@/views/ApiRedirection/PaymentView.vue"),
    },
    {
        path: "subscription",
        name: "subscription-redirection",
        component: () => import("@/views/ApiRedirection/SubscriptionView.vue"),
    },
]

export default routes;