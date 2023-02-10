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
    }
]

export default routes;