import axiosClient from "./axiosClient";

const productApi = {
    getAll: params => {
        const url = '/products';
        return axiosClient.get(url, {
            params
        })
    },

    getInCat: (cat, params={}) => {
        const url = `products/category/${cat}`;
        return axiosClient.get(url, {
            params
        })
    },
}

export default productApi;