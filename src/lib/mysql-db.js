// MySQL Database Service for MindCare AI
// Replaces localStorage with real MySQL database

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class MySQLDatabase {
  constructor() {
    this.token = localStorage.getItem('mindcare_token');
    this.user = JSON.parse(localStorage.getItem('mindcare_current_user') || 'null');
  }

  // Helper method for API calls
  async apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password, role) {
    try {
      const response = await this.apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });

      // Store token and user
      localStorage.setItem('mindcare_token', response.token);
      localStorage.setItem('mindcare_current_user', JSON.stringify(response.user));
      
      this.token = response.token;
      this.user = response.user;

      return response.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('mindcare_token');
    localStorage.removeItem('mindcare_current_user');
    this.token = null;
    this.user = null;
  }

  // Users methods
  async createUser(userData) {
    return this.apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getAllUsers() {
    return this.apiCall('/users');
  }

  async updateUser(id, updates) {
    return this.apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Mood check-ins methods
  async createMoodCheckin(moodData) {
    return this.apiCall('/moods', {
      method: 'POST',
      body: JSON.stringify(moodData),
    });
  }

  async getMoodCheckins(userId) {
    return this.apiCall(`/moods/${userId}`);
  }

  // Assessments methods
  async createAssessment(assessmentData) {
    return this.apiCall('/assessments', {
      method: 'POST',
      body: JSON.stringify(assessmentData),
    });
  }

  async getAssessments(userId) {
    return this.apiCall(`/assessments/${userId}`);
  }

  // Chat messages methods
  async createChatMessage(messageData) {
    return this.apiCall('/chat', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async getChatHistory(userId) {
    return this.apiCall(`/chat/${userId}`);
  }

  // Forum posts methods
  async createForumPost(postData) {
    return this.apiCall('/forum/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async getForumPosts() {
    return this.apiCall('/forum/posts');
  }

  // Bookings methods
  async createBooking(bookingData) {
    return this.apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings() {
    return this.apiCall('/bookings');
  }

  // Admin analytics
  async getAnalytics() {
    return this.apiCall('/admin/analytics');
  }

  // Health check
  async healthCheck() {
    return this.apiCall('/health');
  }

  // Legacy compatibility - maintain same interface as localStorage db
  users = {
    create: async (user) => {
      const db = new MySQLDatabase();
      return db.createUser(user);
    },
    getById: async (id) => {
      const db = new MySQLDatabase();
      const users = await db.getAllUsers();
      return users.find(u => u.id === id);
    },
    getAll: async () => {
      const db = new MySQLDatabase();
      return db.getAllUsers();
    },
    update: async (id, updates) => {
      const db = new MySQLDatabase();
      return db.updateUser(id, updates);
    },
  };

  moods = {
    create: async (entry) => {
      const db = new MySQLDatabase();
      return db.createMoodCheckin(entry);
    },
    getByUserId: async (userId) => {
      const db = new MySQLDatabase();
      return db.getMoodCheckins(userId);
    },
    getAll: async () => {
      // This would need an admin endpoint
      console.warn('getAll moods not implemented for security reasons');
      return [];
    },
  };

  assessments = {
    create: async (entry) => {
      const db = new MySQLDatabase();
      return db.createAssessment(entry);
    },
    getByUserId: async (userId) => {
      const db = new MySQLDatabase();
      return db.getAssessments(userId);
    },
    getAll: async () => {
      console.warn('getAll assessments not implemented for security reasons');
      return [];
    },
  };

  chats = {
    create: async (entry) => {
      const db = new MySQLDatabase();
      return db.createChatMessage(entry);
    },
    getByUserId: async (userId) => {
      const db = new MySQLDatabase();
      return db.getChatHistory(userId);
    },
  };

  posts = {
    create: async (entry) => {
      const db = new MySQLDatabase();
      return db.createForumPost(entry);
    },
    getAll: async () => {
      const db = new MySQLDatabase();
      return db.getForumPosts();
    },
    update: async (id, updates) => {
      // This would need an endpoint for updating posts
      console.warn('Post update not implemented yet');
      return null;
    },
  };

  bookings = {
    create: async (entry) => {
      const db = new MySQLDatabase();
      return db.createBooking(entry);
    },
    getAll: async () => {
      const db = new MySQLDatabase();
      return db.getBookings();
    },
    getByUserId: async (userId) => {
      const db = new MySQLDatabase();
      const bookings = await db.getBookings();
      return bookings.filter(b => b.user_id === userId);
    },
  };

  logs = {
    create: async (entry) => {
      // Logs are created automatically on the server
      console.log('Log entry:', entry);
    },
    getAll: async () => {
      console.warn('getAll logs not implemented for security reasons');
      return [];
    },
  };

  notes = {
    create: async (entry) => {
      // This would need a notes endpoint
      console.warn('Notes creation not implemented yet');
      return entry;
    },
    getByStudentId: async (studentId) => {
      console.warn('Get notes by student ID not implemented yet');
      return [];
    },
    delete: async (id) => {
      console.warn('Note deletion not implemented yet');
    },
  };

  reminders = {
    create: async (entry) => {
      // This would need a reminders endpoint
      console.warn('Reminders not implemented yet');
      return entry;
    },
    getAll: async () => {
      console.warn('Get all reminders not implemented yet');
      return [];
    },
    update: async (id, updates) => {
      console.warn('Reminder update not implemented yet');
      return null;
    },
  };

  sentResources = {
    create: async (entry) => {
      console.warn('Sent resources not implemented yet');
      return entry;
    },
  };
}

// Create and export the database instance
export const db = new MySQLDatabase();
export default db;
