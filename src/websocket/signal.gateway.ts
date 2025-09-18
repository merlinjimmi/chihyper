import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class SignalGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SignalGateway');
  private connectedClients = new Map<string, any>();

  handleConnection(client: Socket) {
    this.logger.log(`MT5 EA connected: ${client.id}`);
    this.connectedClients.set(client.id, {
      id: client.id,
      connectedAt: new Date(),
      authenticated: false,
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`MT5 EA disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('authenticate')
  handleAuthentication(client: Socket, payload: { apiKey: string; userId: string }) {
    // TODO: Verify API key and user
    this.logger.log(`Authentication attempt from ${client.id}`);
    
    const clientInfo = this.connectedClients.get(client.id);
    if (clientInfo) {
      clientInfo.authenticated = true;
      clientInfo.userId = payload.userId;
      clientInfo.apiKey = payload.apiKey;
      this.connectedClients.set(client.id, clientInfo);
    }

    client.emit('authenticated', { success: true });
  }

  @SubscribeMessage('signal_ack')
  handleSignalAck(client: Socket, payload: { signalId: string; status: string }) {
    this.logger.log(`Signal acknowledgment from ${client.id}: ${payload.signalId}`);
    // TODO: Update signal delivery status in database
  }

  @SubscribeMessage('trade_execution')
  handleTradeExecution(client: Socket, payload: any) {
    this.logger.log(`Trade execution report from ${client.id}:`, payload);
    // TODO: Store trade execution data
  }

  // Method to send signals to authenticated clients
  broadcastSignal(signal: any, targetUsers?: string[]) {
    const signalData = {
      type: 'new_signal',
      data: signal,
      timestamp: new Date().toISOString(),
    };

    if (targetUsers) {
      // Send to specific users
      this.connectedClients.forEach((client, socketId) => {
        if (client.authenticated && targetUsers.includes(client.userId)) {
          this.server.to(socketId).emit('signal', signalData);
          this.logger.log(`Signal sent to user ${client.userId} via ${socketId}`);
        }
      });
    } else {
      // Broadcast to all authenticated clients
      this.connectedClients.forEach((client, socketId) => {
        if (client.authenticated) {
          this.server.to(socketId).emit('signal', signalData);
        }
      });
    }
  }

  getConnectedClients() {
    return Array.from(this.connectedClients.values());
  }
}