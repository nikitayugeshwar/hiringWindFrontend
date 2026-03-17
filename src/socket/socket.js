import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SITE_URL, {
  transports: ["websocket", "polling"],
});

export default socket;
