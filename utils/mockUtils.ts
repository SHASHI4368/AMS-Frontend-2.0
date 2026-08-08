export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// A simple pub/sub event emitter to mock socket.io
type Listener = (...args: any[]) => void;

class MockSocketEmitter {
  private events: Record<string, Listener[]> = {};

  on(event: string, listener: Listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event: string, listenerToRemove: Listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listenerToRemove);
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
}

export const mockSocket = new MockSocketEmitter();
