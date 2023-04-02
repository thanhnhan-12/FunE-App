import instance from "./axios";
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// instance.defaults.headers.
export const postApi = {
  createPost: async (payload) => {
    return await instance.post('/post/create', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getPosts: () => {
    return instance.get(`/post/gets`)
  },
  getPostByID: (params) => {
    return instance.get(`/post/get`, {
      params: params
    });
  },
}