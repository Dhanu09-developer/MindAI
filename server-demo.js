const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Demo data storage (in-memory for demo)
let demoUsers = [
  {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@mindcare.ai',
    role: 'admin',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString()
  },
  {
    id: 'counsellor-001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@mindcare.ai',
    role: 'counsellor',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString()
  },
  {
    id: 'student-001',
    name: 'John Doe',
    email: 'john@mindcare.ai',
    role: 'student',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString()
  }
];

let demoMoods = [];
let demoAssessments = [];
let demoChats = [];
let demoPosts = [];
let demoBookings = [];

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
      let user = demoUsers.find(u => u.role === role);
      
      if (!user) {
        // Create new user for this role
        user = {
          id: require('uuid').v4(),
          name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
          email: email || `${role}@mindcare.ai`,
          role: role,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        };
        demoUsers.push(user);
      }
      
      const token = jwt.sign(user, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
      return res.json({ user, token });
    }
    
    // Regular email/password login
    const user = demoUsers.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    user.last_login = new Date().toISOString();
    
    res.json({ user, token });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Users routes
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const users = demoUsers.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      created_at: u.created_at,
      last_login: u.last_login
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Mood check-ins routes
app.post('/api/moods', authenticateToken, async (req, res) => {
  try {
    const { mood_score, mood_type, notes } = req.body;
    const id = require('uuid').v4();
    
    const newMood = {
      id,
      user_id: req.user.id,
      mood_score,
      mood_type,
      notes,
      timestamp: new Date().toISOString()
    };
    
    demoMoods.push(newMood);
    res.json(newMood);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save mood check-in' });
  }
});

app.get('/api/moods/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userMoods = demoMoods.filter(m => m.user_id === userId);
    res.json(userMoods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mood data' });
  }
});

// Assessments routes
app.post('/api/assessments', authenticateToken, async (req, res) => {
  try {
    const { assessment_type, score, responses } = req.body;
    const id = require('uuid').v4();
    
    const newAssessment = {
      id,
      user_id: req.user.id,
      assessment_type,
      score,
      responses,
      timestamp: new Date().toISOString()
    };
    
    demoAssessments.push(newAssessment);
    res.json(newAssessment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save assessment' });
  }
});

// Chat messages routes
app.post('/api/chat', authenticateToken, async (req, res) => {
  try {
    const { message, response, is_ai = true } = req.body;
    const id = require('uuid').v4();
    
    const newChat = {
      id,
      user_id: req.user.id,
      message,
      response,
      is_ai,
      timestamp: new Date().toISOString()
    };
    
    demoChats.push(newChat);
    res.json(newChat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save chat message' });
  }
});

app.get('/api/chat/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userChats = demoChats.filter(c => c.user_id === userId);
    res.json(userChats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Forum posts routes
app.post('/api/forum/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, category, is_anonymous = false } = req.body;
    const id = require('uuid').v4();
    
    const newPost = {
      id,
      user_id: req.user.id,
      title,
      content,
      category,
      is_anonymous,
      upvotes: 0,
      timestamp: new Date().toISOString()
    };
    
    demoPosts.push(newPost);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create forum post' });
  }
});

app.get('/api/forum/posts', async (req, res) => {
  try {
    const posts = demoPosts.map(post => {
      const user = demoUsers.find(u => u.id === post.user_id);
      return {
        ...post,
        author_name: post.is_anonymous ? 'Anonymous' : user?.name || 'Unknown',
        author_role: post.is_anonymous ? null : user?.role || null
      };
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forum posts' });
  }
});

// Bookings routes
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { counsellor_id, booking_date, booking_time, notes } = req.body;
    const id = require('uuid').v4();
    
    const newBooking = {
      id,
      user_id: req.user.id,
      counsellor_id,
      booking_date,
      booking_time,
      notes,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    demoBookings.push(newBooking);
    res.json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    let bookings = demoBookings;
    
    if (req.user.role === 'student') {
      bookings = bookings.filter(b => b.user_id === req.user.id);
    } else if (req.user.role === 'counsellor') {
      bookings = bookings.filter(b => b.counsellor_id === req.user.id);
    }
    
    res.json(bookings);
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
    
    const userStats = demoUsers.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    
    const moodStats = {
      avg_mood: demoMoods.length > 0 
        ? demoMoods.reduce((sum, m) => sum + m.mood_score, 0) / demoMoods.length 
        : 0,
      total_checkins: demoMoods.length
    };
    
    const activityStats = {
      mood_checkins: demoMoods.length,
      assessments: demoAssessments.length,
      chats: demoChats.length,
      posts: demoPosts.length,
      bookings: demoBookings.length
    };
    
    res.json({
      users: Object.entries(userStats).map(([role, count]) => ({ role, count })),
      moods: moodStats,
      activity: Object.entries(activityStats).map(([action, count]) => ({ action, count }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: 'Demo Mode (In-Memory)',
    users: demoUsers.length,
    moods: demoMoods.length,
    assessments: demoAssessments.length,
    chats: demoChats.length,
    posts: demoPosts.length,
    bookings: demoBookings.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Demo Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: Demo Mode (In-Memory)`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`⚠️  To use MySQL, set up your database and run 'npm run server'`);
});
