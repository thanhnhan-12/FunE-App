import instance from "./axios";
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// instance.defaults.headers.
export const postRoomApi = {
    createPost: async (payload) => {
        return await instance.post('/post/room/create', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    getPosts: () => {
        return instance.get(`/post/room/gets`)
    },
    getPostByID: (params) => {
        return instance.get(`/post/room/get`, {
            params: params
        });
    },
}