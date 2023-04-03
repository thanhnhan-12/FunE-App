import instance from "./axios";
export const roomApi = {
    createRoom: async (data) => {
        return await instance.post('/room/create', data);
    },
    getRoomCreate: async (data) => {
        return await instance.get(`/room/get/create?id=${data.id_user}`);
    },
    getRoomNotJoin: async (data) => {
        return await instance.get(`/room/get/not-joined?id=${data.id_user}`);
    }
}