import type { Item } from '@/pages/Items';

// WebSocket service for real-time updates
// Note: This is a simplified implementation. For full Socket.io support:
// Run: pnpm add socket.io-client @types/socket.io-client

class SocketService {
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private eventListeners: Map<string, ((data: unknown) => void)[]> = new Map();

  connect(url?: string): void {
    const socketUrl = url || import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws';
    
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    try {
      this.ws = new WebSocket(socketUrl);

      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
        this.isConnected = true;
      };

      this.ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
        this.isConnected = false;
      };

      this.ws.onerror = (error) => {
        console.warn('WebSocket connection error:', error);
        this.isConnected = false;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (err) {
          console.warn('Failed to parse WebSocket message:', err);
        }
      };
    } catch (error) {
      console.warn('Failed to initialize WebSocket connection:', error);
    }
  }

  private handleMessage(data: { type: string; payload: unknown }): void {
    const listeners = this.eventListeners.get(data.type);
    if (listeners) {
      listeners.forEach(callback => callback(data.payload));
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
    this.eventListeners.clear();
  }

  // Listen for item-related events
  onItemCreated(callback: (item: Item) => void): void {
    this.addEventListener('item:created', (data) => {
      callback(data as Item);
    });
  }

  onItemUpdated(callback: (item: Item) => void): void {
    this.addEventListener('item:updated', (data) => {
      callback(data as Item);
    });
  }

  onItemDeleted(callback: (itemId: string) => void): void {
    this.addEventListener('item:deleted', (data) => {
      callback(data as string);
    });
  }

  private addEventListener(event: string, callback: (data: unknown) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  // Emit events to server
  emitItemCreated(item: Item): void {
    this.send('item:create', item);
  }

  emitItemUpdated(item: Item): void {
    this.send('item:update', item);
  }

  emitItemDeleted(itemId: string): void {
    this.send('item:delete', { id: itemId });
  }

  private send(type: string, payload: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  // Remove event listeners
  removeAllListeners(): void {
    this.eventListeners.clear();
  }

  removeListener(event: string): void {
    this.eventListeners.delete(event);
  }

  // Get connection status
  get connected(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN;
  }

  // Authentication for protected WebSocket events
  authenticate(token: string): void {
    this.send('authenticate', { token });
  }
}

// Export singleton instance
export const socketService = new SocketService();

// Auto-connect when token is available
const token = localStorage.getItem('token');
if (token) {
  socketService.connect();
  socketService.authenticate(token);
}

export default socketService;