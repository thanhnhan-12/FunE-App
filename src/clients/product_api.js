import instance from "./axios";
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// instance.defaults.headers.
export const productApi = {
  createProduct: async (payload) => {
    return await instance.post('/product/create', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getProducts: () => {
    return instance.get(`/product/gets`)
  },
  getCategories: () => {
    return instance.get(`/category/gets`)
  },
  getProductByID: (params) => {
    return instance.get(`/product/get`, {
      params: params
    });
  },
}