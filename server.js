const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mindcare_db',
  charset: 'utf8mb4'
};

let db;

async function initializeDatabase() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL database');
    
    // Create database if not exists
    await db.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await db.execute(`USE ${dbConfig.database}`);
    
    // Create tables
    await createTables();
    console.log('✅ Database tables created/verified');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

async function createTables() {
  // Users table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255),
      role ENUM('student', 'counsellor', 'admin') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL,
      INDEX idx_role (role),
      INDEX idx_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Mood check-ins table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS mood_checkins (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      mood_score INT NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
      mood_type VARCHAR(50),
      notes TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_timestamp (user_id, timestamp),
      INDEX idx_mood_score (mood_score)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Assessments table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS assessments (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      assessment_type VARCHAR(100) NOT NULL,
      score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
      responses JSON,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_timestamp (user_id, timestamp),
      INDEX idx_assessment_type (assessment_type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Bookings table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      counsellor_id VARCHAR(36),
      booking_date DATE NOT NULL,
      booking_time TIME NOT NULL,
      status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
      notes TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (counsellor_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_user_status (user_id, status),
      INDEX idx_date_time (booking_date, booking_time)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Chat messages table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      message TEXT NOT NULL,
      response TEXT,
      is_ai BOOLEAN DEFAULT TRUE,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_timestamp (user_id, timestamp)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Forum posts table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS forum_posts (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      category VARCHAR(100),
      upvotes INT DEFAULT 0,
      is_anonymous BOOLEAN DEFAULT FALSE,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_category (category),
      INDEX idx_timestamp (timestamp),
      INDEX idx_upvotes (upvotes)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Counsellor notes table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS counsellor_notes (
      id VARCHAR(36) PRIMARY KEY,
      counsellor_id VARCHAR(36) NOT NULL,
      student_id VARCHAR(36) NOT NULL,
      note TEXT NOT NULL,
      is_private BOOLEAN DEFAULT TRUE,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (counsellor_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_counsellor_student (counsellor_id, student_id),
      INDEX idx_timestamp (timestamp)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Admin logs table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_logs (
      id VARCHAR(36) PRIMARY KEY,
      admin_id VARCHAR(36) NOT NULL,
      action VARCHAR(100) NOT NULL,
      metric_type VARCHAR(50),
      value INT,
      details JSON,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_action (action),
      INDEX idx_timestamp (timestamp)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Resources table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS resources (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100),
      url VARCHAR(500),
      file_path VARCHAR(500),
      is_active BOOLEAN DEFAULT TRUE,
      created_by VARCHAR(36),
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_category (category),
      INDEX idx_active (is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Follow-up reminders table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS follow_up_reminders (
      id VARCHAR(36) PRIMARY KEY,
      counsellor_id VARCHAR(36) NOT NULL,
      student_id VARCHAR(36) NOT NULL,
      reminder_date DATE NOT NULL,
      reminder_time TIME NOT NULL,
      message TEXT NOT NULL,
      is_completed BOOLEAN DEFAULT FALSE,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (counsellor_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_date_completed (reminder_date, is_completed),
      INDEX idx_counsellor_student (counsellor_id, student_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

// JWT Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// API Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // For demo purposes, allow role-based login without password
    if (role && !password) {
      const user = {
        id: require('uuid').v4(),
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        email: email || `${role}@mindcare.ai`,
        role: role
      };
      
      const token = jwt.sign(user, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
      
      // Insert user if not exists
      await db.execute(
        'INSERT IGNORE INTO users (id, name, email, role) VALUES (?, ?, ?, ?)',
        [user.id, user.name, user.email, user.role]
      );
      
      // Update last login
      await db.execute(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [user.id]
      );
      
      return res.json({ user, token });
    }
    
    // Regular email/password login
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    // Update last login
    await db.execute(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );
    
    res.json({ user, token });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Users routes
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, name, email, role, created_at, last_login FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Mood check-ins routes
app.post('/api/moods', authenticateToken, async (req, res) => {
  try {
    const { mood_score, mood_type, notes } = req.body;
    const id = require('uuid').v4();
    
    await db.execute(
      'INSERT INTO mood_checkins (id, user_id, mood_score, mood_type, notes) VALUES (?, ?, ?, ?, ?)',
      [id, req.user.id, mood_score, mood_type, notes]
    );
    
    // Log activity
    await db.execute(
      'INSERT INTO admin_logs (id, admin_id, action, metric_type, value) VALUES (?, ?, ?, ?, ?)',
      [require('uuid').v4(), req.user.id, 'mood_checkin', 'engagement', 1]
    );
    
    res.json({ id, mood_score, mood_type, notes, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save mood check-in' });
  }
});

app.get('/api/moods/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.execute(
      'SELECT * FROM mood_checkins WHERE user_id = ? ORDER BY timestamp DESC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mood data' });
  }
});

// Assessments routes
app.post('/api/assessments', authenticateToken, async (req, res) => {
  try {
    const { assessment_type, score, responses } = req.body;
    const id = require('uuid').v4();
    
    await db.execute(
      'INSERT INTO assessments (id, user_id, assessment_type, score, responses) VALUES (?, ?, ?, ?, ?)',
      [id, req.user.id, assessment_type, score, JSON.stringify(responses)]
    );
    
    // Log activity
    await db.execute(
      'INSERT INTO admin_logs (id, admin_id, action, metric_type, value) VALUES (?, ?, ?, ?, ?)',
      [require('uuid').v4(), req.user.id, 'assessment_complete', 'health', score]
    );
    
    res.json({ id, assessment_type, score, responses, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save assessment' });
  }
});

// Chat messages routes
app.post('/api/chat', authenticateToken, async (req, res) => {
  try {
    const { message, response, is_ai = true } = req.body;
    const id = require('uuid').v4();
    
    await db.execute(
      'INSERT INTO chat_messages (id, user_id, message, response, is_ai) VALUES (?, ?, ?, ?, ?)',
      [id, req.user.id, message, response, is_ai]
    );
    
    res.json({ id, message, response, is_ai, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save chat message' });
  }
});

app.get('/api/chat/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.execute(
      'SELECT * FROM chat_messages WHERE user_id = ? ORDER BY timestamp ASC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Forum posts routes
app.post('/api/forum/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, category, is_anonymous = false } = req.body;
    const id = require('uuid').v4();
    
    await db.execute(
      'INSERT INTO forum_posts (id, user_id, title, content, category, is_anonymous) VALUES (?, ?, ?, ?, ?, ?)',
      [id, req.user.id, title, content, category, is_anonymous]
    );
    
    res.json({ id, title, content, category, is_anonymous, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create forum post' });
  }
});

app.get('/api/forum/posts', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT fp.*, u.name as author_name, u.role as author_role
      FROM forum_posts fp
      JOIN users u ON fp.user_id = u.id
      ORDER BY fp.timestamp DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forum posts' });
  }
});

// Bookings routes
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { counsellor_id, booking_date, booking_time, notes } = req.body;
    const id = require('uuid').v4();
    
    await db.execute(
      'INSERT INTO bookings (id, user_id, counsellor_id, booking_date, booking_time, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [id, req.user.id, counsellor_id, booking_date, booking_time, notes]
    );
    
    res.json({ id, booking_date, booking_time, notes, status: 'pending', timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    let query = 'SELECT * FROM bookings';
    const params = [];
    
    if (req.user.role === 'student') {
      query += ' WHERE user_id = ?';
      params.push(req.user.id);
    } else if (req.user.role === 'counsellor') {
      query += ' WHERE counsellor_id = ?';
      params.push(req.user.id);
    }
    
    query += ' ORDER BY booking_date, booking_time';
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Admin analytics route
app.get('/api/admin/analytics', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const [userStats] = await db.execute(`
      SELECT role, COUNT(*) as count 
      FROM users 
      GROUP BY role
    `);
    
    const [moodStats] = await db.execute(`
      SELECT AVG(mood_score) as avg_mood, COUNT(*) as total_checkins 
      FROM mood_checkins 
      WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    
    const [activityStats] = await db.execute(`
      SELECT action, COUNT(*) as count 
      FROM admin_logs 
      WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY action
    `);
    
    res.json({
      users: userStats,
      moods: moodStats[0],
      activity: activityStats
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', database: db ? 'Connected' : 'Disconnected' });
});

// Start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: MySQL`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
});
