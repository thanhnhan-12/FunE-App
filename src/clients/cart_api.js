import instance from "./axios";
export const cartApi = {
    create: async (data) => {
        return await instance.post('/cart/create', data);
    },
    increase: async (data) => {
        return await instance.post('/cart/increase', data);
    },
    decrease: async (data) => {
        return await instance.post('/cart/decrease', data);
    },
    gets: async (data) => {
        return await instance.get(`/cart/gets?id_user=${data.id_user}`);
    },
    deletes: async (data) => {
        return await instance.post(`/cart/deletes`, data);
    },
    deleteCart: async (data) => {
        return await instance.post(`/cart/delete/cart`, data);
    },
}