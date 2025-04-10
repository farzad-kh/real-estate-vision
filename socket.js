"use client";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected with ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Connection failed:", err.message);
});
