import instance from "./axios";
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// instance.defaults.headers.
export const livestreamApi = {
    createLive: async (payload) => {
        return await instance.post('/livestream/create', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getsLive: async (data) => {
        return await instance.get(`/livestream/gets?id_user=${data.id_user}`);
    },
}