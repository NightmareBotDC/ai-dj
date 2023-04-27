import ioClient from "socket-io.client";

const Socket = ioClient("https://api.azidoazide.xyz/");

export const io = Socket;
