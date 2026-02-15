-- MindCare AI Database Setup Script
-- Run this script in MySQL to create the database and initial data

-- Create database
CREATE DATABASE IF NOT EXISTS mindcare_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE mindcare_db;

-- Users table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Mood check-ins table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assessments table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bookings table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  is_ai BOOLEAN DEFAULT TRUE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_timestamp (user_id, timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Forum posts table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Counsellor notes table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin logs table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Resources table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Follow-up reminders table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample admin user
INSERT IGNORE INTO users (id, name, email, role) VALUES 
('admin-001', 'Admin User', 'admin@mindcare.ai', 'admin');

-- Insert sample counsellor
INSERT IGNORE INTO users (id, name, email, role) VALUES 
('counsellor-001', 'Dr. Sarah Johnson', 'sarah@mindcare.ai', 'counsellor');

-- Insert sample student
INSERT IGNORE INTO users (id, name, email, role) VALUES 
('student-001', 'John Doe', 'john@mindcare.ai', 'student');

-- Insert sample resources
INSERT IGNORE INTO resources (id, title, description, category, url) VALUES 
('res-001', 'Meditation Guide', 'Basic meditation techniques for stress relief', 'Wellness', 'https://example.com/meditation'),
('res-002', 'Anxiety Management', 'Tips and techniques for managing anxiety', 'Mental Health', 'https://example.com/anxiety'),
('res-003', 'Sleep Hygiene', 'Better sleep habits for mental wellness', 'Lifestyle', 'https://example.com/sleep');

-- Create a view for user statistics
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
  u.id,
  u.name,
  u.email,
  u.role,
  u.created_at,
  u.last_login,
  COUNT(DISTINCT mc.id) as mood_checkins,
  COUNT(DISTINCT a.id) as assessments,
  COUNT(DISTINCT cm.id) as chat_messages,
  COUNT(DISTINCT b.id) as bookings,
  COALESCE(AVG(mc.mood_score), 0) as avg_mood_score
FROM users u
LEFT JOIN mood_checkins mc ON u.id = mc.user_id
LEFT JOIN assessments a ON u.id = a.user_id
LEFT JOIN chat_messages cm ON u.id = cm.user_id
LEFT JOIN bookings b ON u.id = b.user_id
GROUP BY u.id, u.name, u.email, u.role, u.created_at, u.last_login;
