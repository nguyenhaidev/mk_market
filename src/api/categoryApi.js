import axiosClient from "./axiosClient";

const categoryApi = {
    getAll: param => {
        const url = `products/categories`;
        return axiosClient.get(url, {
            param
        })
    },
}

export default categoryApi;