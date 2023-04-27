import { io } from "socket.io-client";

const WS = io("wss://api.azidoazide.xyz");
export default WS;
