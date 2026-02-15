# MindCare AI - MySQL Database Integration

## 🗄️ Database Setup Instructions

### Prerequisites
1. **MySQL Server** installed and running
2. **Node.js** (v16 or higher)
3. **npm** or **yarn**

### Step 1: Database Setup

#### Option A: Using MySQL Command Line
```bash
# Login to MySQL
mysql -u root -p

# Run the setup script
source database-setup.sql;
```

#### Option B: Using MySQL Workbench/phpMyAdmin
1. Open your MySQL management tool
2. Create a new database named `mindcare_db`
3. Import the `database-setup.sql` file

### Step 2: Environment Configuration

1. **Copy the environment file:**
```bash
cp .env.example .env
```

2. **Edit `.env` file with your MySQL credentials:**
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=mindcare_db

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

### Step 3: Install Dependencies

```bash
# Install all dependencies (including backend packages)
npm install
```

### Step 4: Start the Application

#### Option A: Start Frontend and Backend Separately
```bash
# Terminal 1 - Start Backend Server
npm run server

# Terminal 2 - Start Frontend Development Server
npm run dev
```

#### Option B: Start Both Simultaneously
```bash
npm start
```

### Step 5: Access the Application

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 📊 Database Features

### Tables Created:
1. **users** - User accounts and authentication
2. **mood_checkins** - Daily mood tracking
3. **assessments** - Mental health assessments
4. **bookings** - Counsellor appointments
5. **chat_messages** - AI chat history
6. **forum_posts** - Peer support forum
7. **counsellor_notes** - Private counsellor notes
8. **admin_logs** - System activity logs
9. **resources** - Wellness resources
10. **follow_up_reminders** - Appointment reminders

### API Endpoints:

#### Authentication
- `POST /api/auth/login` - User login

#### Users
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create new user

#### Mood Tracking
- `POST /api/moods` - Create mood check-in
- `GET /api/moods/:userId` - Get user's mood history

#### Assessments
- `POST /api/assessments` - Create assessment
- `GET /api/assessments/:userId` - Get user's assessments

#### Chat
- `POST /api/chat` - Save chat message
- `GET /api/chat/:userId` - Get chat history

#### Forum
- `POST /api/forum/posts` - Create forum post
- `GET /api/forum/posts` - Get all forum posts

#### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings

#### Admin
- `GET /api/admin/analytics` - Get platform analytics

## 🔧 Features Added

### ✅ Real Database Storage
- All data now persists in MySQL
- No more localStorage limitations
- Real-time data synchronization

### ✅ User Authentication
- JWT-based authentication
- Secure session management
- Role-based access control

### ✅ Data Relationships
- Proper foreign key constraints
- Data integrity enforcement
- Efficient queries with indexes

### ✅ Analytics & Reporting
- User activity tracking
- Mood trend analysis
- Platform usage statistics

### ✅ Security Features
- Password hashing with bcrypt
- SQL injection prevention
- CORS protection
- Input validation

## 🚀 Production Deployment

### Environment Variables for Production:
```env
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=mindcare_production_db
JWT_SECRET=your-production-jwt-secret
PORT=5000
FRONTEND_URL=https://your-domain.com
```

### Security Considerations:
1. Change JWT_SECRET in production
2. Use strong database passwords
3. Enable SSL for database connections
4. Set up proper database user permissions
5. Regular database backups

## 🐛 Troubleshooting

### Common Issues:

#### Database Connection Failed
```bash
# Check MySQL service status
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Start MySQL service
sudo systemctl start mysql  # Linux
brew services start mysql  # macOS
```

#### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

#### CORS Errors
- Ensure FRONTEND_URL in .env matches your frontend URL
- Check that API calls use the correct base URL

#### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET is set correctly
- Verify database user permissions

## 📈 Performance Optimization

### Database Indexes
All tables include optimized indexes for:
- User lookups
- Timestamp-based queries
- Foreign key relationships

### Query Optimization
- Prepared statements prevent SQL injection
- Efficient JOIN operations
- Proper data types for storage

## 🔄 Migration from LocalStorage

The application maintains backward compatibility:
- Existing localStorage data will be migrated automatically
- Users can continue using the app during transition
- No data loss during migration

## 📞 Support

For issues with MySQL integration:
1. Check the console logs for detailed error messages
2. Verify database connection settings
3. Ensure all tables are created properly
4. Test API endpoints individually

---

**🎉 Your MindCare AI application now has full MySQL database integration!**
