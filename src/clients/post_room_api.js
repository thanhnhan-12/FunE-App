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
    getPosts: (payload) => {
        return instance.get(`/post/room/gets`, { params: payload })
    },
    getPostByID: (params) => {
        return instance.get(`/post/room/get`, {
            params: params
        });
    },
}