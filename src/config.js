import { IP_CONFIG } from '@env';
console.log("IP_CONFIG", IP_CONFIG);
export const BASE_URL = `http://${IP_CONFIG}:3000/api`;
export const MEDIA_URL = `http://${IP_CONFIG}:3000/medias/`;
export const individuals_URL = `http://${IP_CONFIG}:3000/individuals/`;