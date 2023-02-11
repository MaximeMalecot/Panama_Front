import { API_URL } from "../constants/urls";
import authHeader from "./auth.header";

class ProjectService {
    async createProject(payload) {
        try {
            const res = await fetch(`${API_URL}/payment/create_checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify(payload),
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async updateProject(id, payload) {
        try {
            const res = await fetch(`${API_URL}/projects/${id}`, {
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    ...authHeader(),
                },
                method: "PATCH",
                body: JSON.stringify(payload),
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async getProjects(queryParams = {}) {
        const { page, name, filters, minPrice, maxPrice, length } = queryParams;
        const keyValuesParams = { page, name, length };

        const params = [];
        Object.entries(keyValuesParams).forEach(([key, value]) => {
            if (value) {
                params.push(`${key}=${value}`);
            }
        });

        if (minPrice) {
            params.push(`minPrice[gte]=${minPrice}`);
        }
        if (maxPrice) {
            params.push(`maxPrice[lte]=${maxPrice}`);
        }
        if (filters && filters.length > 0) {
            // filters.forEach((filter) => {
            //     params.push(`filters[]=${filter.id}`);
            // });
            params.push(`filters.name[]=${filters}`);
        }

        try {
            const url = `${API_URL}/projects?status=ACTIVE&`;

            const res = await fetch(`${url}${params.join("&")}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async getProject(id) {
        try {
            const res = await fetch(`${API_URL}/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async getFreelancerProjects(userId) {
        try {
            const res = await fetch(`${API_URL}/projects/${userId}/own`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async getFreelancerActiveProjects(userId, status = []) {
        try {
            let url = `${API_URL}/projects`;
            if (status.length > 0) {
                url = `${url}?status[]=${status.join("&status=")}`;
            }
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async getUserProjects(userId) {
        try {
            const res = await fetch(`${API_URL}/users/${userId}/projects`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async getAdminProjects() {
        try {
            const res = await fetch(`${API_URL}/projects`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async getAdminProject(id) {
        try {
            const res = await fetch(`${API_URL}/projects/${id}/propositions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }

    async closeProject(id) {
        try {
            const res = await fetch(`${API_URL}/projects/${id}/close`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    ...authHeader(),
                },
                body: JSON.stringify({}),
            });
            if (res.status === 200) {
                return await res.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }
    
    async deleteProject(id) {
        try {
            const res = await fetch(`${API_URL}/projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (res.status === 204) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }
}

export default new ProjectService();
