import axiosClient from "./axiosClient";

const productApi = {
    getAll: params => {
        const url = '/products';
        return axiosClient.get(url, {
            params
        })
    },

    getInCat: (cat, params = {}) => {
        const url = cat === "" ? "/products/" :
            `/products/category/${cat}`;
        return axiosClient.get(url, {
            params
        })
    },
    getProductDetail: (params = {}) => {
        const url =
            `/products/${params.id}`;
        return axiosClient.get(url, {
            params
        })
    },
}

export default productApi;