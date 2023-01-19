import { defineStore } from 'pinia'

export const useOffersStore = defineStore('counter', {
    state: () => ({
        count: 0,
        offers: [],
        offer: {},
    }),
    actions: {
        async getOffers(queryParams) {
            try {
                const res = await fetch('https://mocki.io/v1/c1b731da-b4cd-43ac-9ab7-cd1f5589eb89');
                const json = await res.json();
                this.offers = json;
                this.count = json.length
            } catch (e) {
                console.error(e);
            }
    },
    },
})