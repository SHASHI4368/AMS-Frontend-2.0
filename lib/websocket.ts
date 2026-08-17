import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

export interface WebSocketEvent {
    type: string;
    payload?: any;
}

export function connectWebSocket(
    onEvent: (event: WebSocketEvent) => void
) {

    if (stompClient?.active) {
        return;
    }

    // Defaulting to http://localhost:8080 if NEXT_PUBLIC_API_BASE_URL is not set
    // Note: SockJS requires the HTTP url, not ws://
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL 
        ? process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api/v1', '') 
        : 'http://localhost:8080';

    stompClient = new Client({
        webSocketFactory: () => new SockJS(`${baseUrl}/ws`),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("WebSocket connected");
            stompClient?.subscribe(
              "/user/queue/events",
              (message) => {
                console.log("MESSAGE RECEIVED:", message.body);

                try {
                  const event: WebSocketEvent = JSON.parse(message.body);
                  onEvent(event);
                } catch (e) {
                  console.error("Failed to parse websocket message", e);
                }
              },
              {
                id: "notification-events",
              },
            );

            console.log("Subscribed to /user/queue/events");
        },
        onDisconnect: () => {
            console.log("WebSocket disconnected");
        },
        onStompError: (frame) => {
            console.error("STOMP error:", frame.headers["message"]);
        },
        onWebSocketError: (error) => {
            console.error("WebSocket error:", error);
        }
    });

    stompClient.activate();
}

export function disconnectWebSocket() {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
    }
}
