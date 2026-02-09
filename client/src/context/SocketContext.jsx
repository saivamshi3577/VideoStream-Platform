import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

const socket = io("https://videostream-platform.onrender.com");

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
