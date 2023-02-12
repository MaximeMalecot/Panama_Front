const routes = [
    {
        path: "payment",
        name: "payment-redirection",
        component: () => import("@/views/ApiRedirection/PaymentView.vue"),
    },
]

export default routes;