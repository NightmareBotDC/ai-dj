import { io } from "socket.io-client";

const WS: any = io("wss://api.azidoazide.xyz");
export const Socket = WS;
