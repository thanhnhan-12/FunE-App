import instance from "./axios";
export const commentRoomApi = {
    createComment: async (data) => {
        return await instance.post('/comment/room/create', data);
    },
    getsComment: async (data) => {
        return await instance.get(`/comment/room/gets?idPost=${data.idPost}`);
    },

}