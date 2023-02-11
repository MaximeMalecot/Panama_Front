const routes = [
    {
        path: "filters",
        name: "admin-filters",
        component: () => import("../views/Admin/Filters/FiltersView.vue"),
    },
    {
        path: "filters/:id",
        name: "admin-filter-edit",
        component: () => import("../views/Admin/FilterEdit/FilterEditView.vue"),
    },
    {
        path: "projects",
        name: "admin-projects",
        component: () => import("../views/Admin/Projects/ProjectsView.vue"),
    },
    {
        path: "projects/:id",
        name: "admin-project",
        component: () => import("../views/Admin/Project/ProjectView.vue"),
    },
    {
        path: "projects/:id/edit",
        name: "admin-project-edit",
        component: () => import("../views/Admin/ProjectEdit/ProjectEditView.vue"),
    },
    {
        path: "subscription-plans",
        name: "admin-subscription-plans",
        component: () => import("../views/Admin/SubscriptionPlans/SubscriptionPlansView.vue"),
    },
    {
        path: "subscription-plans/create",
        name: "admin-subscription-plan-create",
        component: () => import("../views/Admin/SubscriptionPlanCreate/SubscriptionPlanCreateView.vue"),
    },
    {
        path: "subscription-plans/:id",
        name: "admin-subscription-plan",
        component: () => import("../views/Admin/SubscriptionPlan/SubscriptionPlanView.vue"),
    },
    {
        path: "subscription-plans/:id/edit",
        name: "admin-subscription-plan-edit",
        component: () => import("../views/Admin/SubscriptionPlanEdit/SubscriptionPlanEditView.vue"),
    },
    {
        path: "users",
        name: "admin-users",
        component: () => import("../views/Admin/Users/UsersView.vue"),
    },
    {
        path: "users/:id",
        name: "admin-user",
        component: () => import("../views/Admin/User/UserView.vue"),
    },
    {
        path: "users/:id/edit",
        name: "admin-user-edit",
        component: () => import("../views/Admin/UserEdit/UserEditView.vue"),
    },
]

export default routes;