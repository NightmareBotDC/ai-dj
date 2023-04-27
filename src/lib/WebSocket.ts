import ioClient from "socket-io.client";

const Socket: any = ioClient("https://api.azidoazide.xyz/");

export const io = Socket;
