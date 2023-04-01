import instance from "./axios";
export const sellerApi = {
    createSeller: async (data) => {
        return await instance.post('/seller/create/seller', data);
    },

}