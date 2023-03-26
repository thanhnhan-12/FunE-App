import instance from "./axios";
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// instance.defaults.headers.
export const userApi = {
    updateUser: async (payload) => {
        return await instance.post('/update/update', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
}