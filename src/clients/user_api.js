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

}