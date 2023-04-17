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
  getPosts: (payload) => {
    return instance.get(`/post/gets`, { params: payload })
  },
  getCommentsByPostID: (params) => {
    return instance.get(`/post/comment/gets`, {
      params: params
    });
  },
  createPostComment: async (payload) => {
    return await instance.post('/post/comment/create', payload);
  },
  getPostByID: (params) => {
    return instance.get(`/post/get`, {
      params: params
    });
  },
  lovePost: async (payload) => {
    return await instance.post('/post/love', payload);
  },
}