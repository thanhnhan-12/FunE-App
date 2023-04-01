import instance from "./axios";
export const roomApi = {
    createRoom: async (data) => {
        return await instance.post('/room/create', data);
    },

}