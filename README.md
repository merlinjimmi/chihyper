# HyperS - MT5 Trading Signal Platform

A comprehensive trading signal platform that connects signal providers with MT5 traders through secure, reliable signal distribution.

## Features

### User Features
- Secure signup/login with 2FA
- MT5 account integration via EA (Expert Advisor)
- Real-time signal reception and execution
- Performance tracking and analytics
- Risk management controls
- Dark/light mode theming

### Admin Features
- Signal creation and management
- User and subscription management
- Payment processing integration
- Platform monitoring and analytics
- Audit logging and compliance

### Platform Features
- Secure signal dispatch with HMAC signing
- Multi-payment provider support (Stripe, Paystack, crypto)
- Scalable microservices architecture
- Real-time WebSocket connections
- Comprehensive risk management

## Architecture

- **Frontend**: Next.js with React (SSR + SPA)
- **Backend API**: NestJS with TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Queue**: RabbitMQ
- **Payments**: Stripe, Paystack, Coinbase Commerce
- **Deployment**: Docker + Kubernetes

## Signal Format

Signals use a standardized JSON schema with HMAC signatures for security:

```json
{
  "signal_id": "sig_20250915_001",
  "version": 3,
  "name": "Breakout_XAUUSD",
  "symbols": ["XAUUSD", "XAUUSDm"],
  "timeframe": "H1",
  "entry_rules": [
    {"type": "price_break", "direction": "buy", "condition": "close>resistance1"}
  ],
  "exit_rules": [
    {"type": "take_profit", "value": "2.0*atr"},
    {"type": "stop_loss", "value": "1.0*atr"}
  ],
  "execution": {
    "order_type": "market",
    "risk_mode": "percent_balance",
    "risk_value": 1.5
  },
  "signature": "BASE64_HMAC_SHA256_SIGNATURE"
}
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/merlinjimmi/hypers.git
cd hypers
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run the development server
```bash
npm run dev
```

## Security

- All signals are HMAC signed for authenticity
- TLS 1.2+ encryption for all communications
- JWT tokens with refresh token rotation
- Role-based access control
- Comprehensive audit logging

## License

MIT License - see LICENSE file for details