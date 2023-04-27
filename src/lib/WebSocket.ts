import ioClient from "socket.io-client/dist/socket.io.js";

const Socket: any = ioClient("https://api.azidoazide.xyz/");

export const io = Socket;
