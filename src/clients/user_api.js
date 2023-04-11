import instance from "./axios";
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// instance.defaults.headers.
export const userApi = {
    updateUser: async (payload) => {
        return await instance.post('/update/infor', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getUserByID: async (id) => {
        return await instance.post(`/get-users`, {
            id: id,
        });
    },
    createAddress: async (data) => {
        return await instance.post(`/address/create`, data);
    },
    getsAddress: async (data) => {
        return await instance.get(`/address/gets?id_user=${data.id_user}`);
    },
    getsAddressByUser: async (data) => {
        return await instance.get(`/address/gets/byuser?address=${data.id_address}`);
    },
    updateAddress: async (data) => {
        return await instance.post(`/address/update`, data);
    },

}