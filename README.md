# 🚀 Redis Real-Time Chat Application

Gerçek zamanlı chat uygulaması - Redis, WebSocket, BullMQ teknolojilerini derinlemesine öğrenmek için geliştirilmiş kapsamlı proje.

## 🎯 Proje Amacı

Bu proje, modern backend teknolojilerini öğrenmek ve uygulamak için tasarlanmıştır:
- **Redis** ekosisteminin tüm özelliklerini keşfetmek
- **WebSocket** ile gerçek zamanlı iletişim
- **BullMQ** ile asenkron işlem yönetimi
- **NestJS** ile scalable backend mimarisi

## 🛠️ Teknoloji Stack

### Backend
- **Node.js** - Runtime environment
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Socket.IO** - Real-time bidirectional communication
- **Redis** - In-memory data structure store
- **BullMQ** - Job queue system
- **PostgreSQL** - Primary database
- **Prisma** - Database ORM
- **JWT** - Authentication tokens

### Gelecek Planları
- **Docker** - Containerization
- **Frontend** (React/Vue) - User interface

## ✨ Proje Özellikleri

### 🔐 Authentication & Security
- Kullanıcı kayıt/giriş sistemi
- JWT token yönetimi ve refresh
- Email doğrulama sistemi
- Session yönetimi (Redis)
- Multi-device support
- Rate limiting (spam protection)
- Message encryption
- Role-based access control
- XSS/CSRF protection
- IP-based restrictions

### 💬 Chat Functionality
- Gerçek zamanlı mesajlaşma
- Online kullanıcı takibi
- Okundu/okunmadı bilgisi
- Mesaj geçmişi ve pagination
- Typing indicators
- Mesaj arama functionality
- Message reactions (emoji)
- Message forwarding
- Message editing/deletion
- Voice message support

### 👥 Group Features
- Group chat oluşturma
- Admin/moderator rolleri
- Group member management
- Group settings

### 📁 File Sharing
- Image upload ve sharing
- Document sharing
- File preview system
- File size ve type restrictions

### 👤 User Management
- Kullanıcı profil yönetimi
- Avatar upload
- User status (available, busy, away)
- Block/unblock users
- Friend system

### 🔄 Background Processing
- Email gönderimi kuyruğu
- Notification processing
- Job retry logic
- Job prioritization

### 📱 Notifications
- Push notifications
- Email notifications
- Desktop notifications
- Notification preferences

### 📊 Monitoring & Analytics
- Real-time metrics dashboard
- User activity tracking
- Message analytics
- Performance monitoring
- Error tracking ve logging

### 🏗️ Infrastructure
- Redis cluster setup
- Load balancing
- Horizontal scaling
- Database sharding
- CDN integration

## 📋 Development Roadmap

### 🏗️ Faz 1: Temel Altyapı
1. **Proje Kurulumu**
   - NestJS project initialization
   - TypeScript configuration
   - ESLint ve Prettier setup
   
2. **Database Setup**
   - PostgreSQL connection
   - Prisma ORM configuration
   - Database schema design
   - Migration setup

3. **Redis Integration**
   - Redis connection setup
   - Basic Redis operations
   - Redis modules configuration

4. **Authentication System**
   - User registration/login
   - JWT token management
   - Password hashing (bcrypt)
   - Input validation

### 🔄 Faz 2: Mesajlaşma Çekirdeği
5. **BullMQ Setup**
   - Queue configuration
   - Email verification queue
   - Job processing workers
   - Retry logic implementation

6. **WebSocket Integration**
   - Socket.IO setup
   - Connection management
   - Event handling architecture
   - Room management

7. **Basic Chat System**
   - Message sending/receiving
   - Real-time message delivery
   - Basic error handling

### 🎯 Faz 3: Gelişmiş Özellikler
8. **Online Presence System**
   - User online/offline tracking
   - Redis Sets for presence
   - Connection state management

9. **Message Status System**
   - Delivered/read receipts
   - Message status tracking
   - Bulk status updates

10. **Message History**
    - Message persistence
    - Pagination implementation
    - Message search basics

11. **Session Management**
    - Redis session store
    - Multi-device support
    - Session invalidation

### 🔧 Faz 4: Optimizasyon ve Polish
12. **Performance Optimization**
    - Redis caching strategies
    - Database query optimization
    - Connection pooling

13. **Error Handling**
    - Global exception filters
    - Graceful error recovery
    - Logging system

14. **Documentation**
    - API documentation
    - Code comments
    - Deployment guide

## 🧠 Redis Öğrenme Alanları

### 📦 Data Structures
- **Strings**: User sessions, tokens
- **Hashes**: User profiles, message metadata
- **Lists**: Message queues, chat history
- **Sets**: Online users, room members
- **Sorted Sets**: Message timestamps, leaderboards
- **Streams**: Event sourcing, audit logs

### ⚡ Advanced Features
- **Pub/Sub**: Real-time notifications
- **Lua Scripts**: Atomic operations
- **Transactions**: Multi-command operations
- **Pipelining**: Batch operations
- **Expiration**: TTL management
- **Persistence**: RDB vs AOF

### 🔧 Configuration
- **Memory optimization**
- **Connection pooling**
- **Cluster setup**
- **Monitoring ve metrics**

## 🌊 WebSocket/Socket.IO Öğrenme

### 🔌 Connection Management
- Connection authentication
- Reconnection handling
- Connection state tracking
- Graceful disconnection

### 🏠 Room Management
- Dynamic room creation
- User join/leave events
- Room-based messaging
- Private messaging

### 📡 Event Architecture
- Custom event definitions
- Event middleware
- Error handling
- Event acknowledgments

## 🔄 BullMQ Deep Dive

### 📋 Job Management
- Job creation ve scheduling
- Job prioritization
- Delayed jobs
- Recurring jobs

### 🔄 Processing
- Worker configuration
- Concurrency handling
- Job retry strategies
- Failed job handling

### 📊 Monitoring
- Job progress tracking
- Queue metrics
- Performance monitoring
- Dashboard integration

## 🏃‍♂️ Getting Started

```bash
# Repository clone
git clone <repo-url>
cd redisIRLChat

# Dependencies
npm install

# Environment setup
cp .env.example .env
# .env dosyasını düzenle

# Database setup
npx prisma migrate dev
npx prisma generate

# Redis start (Docker)
docker run -d -p 6379:6379 redis:alpine

# Development server
npm run start:dev
```

## 🎓 Öğrenme Kaynakları

### Redis
- [Redis Official Documentation](https://redis.io/docs/)
- [Redis University](https://university.redis.com/)
- [Redis Patterns](https://redis.io/docs/manual/patterns/)

### Socket.IO
- [Socket.IO Documentation](https://socket.io/docs/)
- [Real-time Applications with Socket.IO](https://socket.io/get-started/)

### BullMQ
- [BullMQ Documentation](https://docs.bullmq.io/)
- [Job Queue Patterns](https://docs.bullmq.io/patterns/)

### NestJS
- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)

## 📝 Development Notes

Bu proje boyunca her teknolojinin detaylarını öğrenmek için:
1. Her feature için Redis'in farklı data structure'larını kullan
2. WebSocket event'lerini detaylı logla ve analiz et
3. BullMQ job'larını monitor et ve optimize et
4. Performance bottleneck'leri belirle ve çöz

## 🤝 Contributing

Bu bir öğrenme projesi olduğu için her türlü geri bildirim ve öneri değerlidir!

---

**Not**: Bu roadmap, Redis, WebSocket ve BullMQ teknolojilerini derinlemesine öğrenmek için tasarlanmıştır. Her aşamada pratik yaparak teorik bilgileri pekiştirmeyi hedefler.
