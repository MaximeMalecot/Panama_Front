const routes = [
    {
        path: "filters",
        name: "admin-filters",
        component: () => import("../views/Admin/Filters/FiltersView.vue"),
    },
    {
        path: "filters/:id",
        name: "admin-filter-edit",
        component: () => import("../views/Admin/FiltersEdit/FiltersEditView.vue"),
    },
    {
        path: "projects",
        name: "admin-projects",
        component: () => import("../views/Admin/Projects/ProjectsView.vue"),
    },
    {
        path: "reviews",
        name: "admin-reviews",
        component: () => import("../views/Admin/Reviews/ReviewsView.vue"),
    },
    {
        path: "subscription-plans",
        name: "admin-subscription-plans",
        component: () => import("../views/Admin/SubscriptionPlans/SubscriptionPlansView.vue"),
    },
    {
        path: "users",
        name: "admin-users",
        component: () => import("../views/Admin/Users/UsersView.vue"),
    },
]

export default routes;