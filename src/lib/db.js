import { v4 as uuidv4 } from "uuid";

// Simulation of Supabase tables using localStorage
const TABLES = {
  USERS: "mindcare_users",
  MOOD_CHECKINS: "mindcare_mood_checkins",
  ASSESSMENTS: "mindcare_assessments",
  BOOKINGS: "mindcare_bookings",
  INSIGHTS: "mindcare_insights",
  LOGS: "mindcare_admin_logs",
  CHATS: "mindcare_chats",
  FORUM_POSTS: "mindcare_forum_posts",
  RESOURCES: "mindcare_resources",
  NOTES: "mindcare_counsellor_notes",
  REMINDERS: "mindcare_followup_reminders",
  SENT_RESOURCES: "mindcare_sent_resources",
};

const getTable = (tableName) => {
  const data = localStorage.getItem(tableName);
  return data ? JSON.parse(data) : [];
};

const setTable = (tableName, data) => {
  localStorage.setItem(tableName, JSON.stringify(data));
};

export const db = {
  users: {
    create: (user) => {
      const users = getTable(TABLES.USERS);
      const newUser = {
        ...user,
        id: user.id || uuidv4(),
        created_at: new Date().toISOString(),
      };
      users.push(newUser);
      setTable(TABLES.USERS, users);
      return newUser;
    },
    getById: (id) => getTable(TABLES.USERS).find((u) => u.id === id),
    getAll: () => getTable(TABLES.USERS),
    update: (id, updates) => {
      const users = getTable(TABLES.USERS);
      const index = users.findIndex((u) => u.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        setTable(TABLES.USERS, users);
        return users[index];
      }
      return null;
    },
  },
  moods: {
    create: (entry) => {
      const moods = getTable(TABLES.MOOD_CHECKINS);
      const newMood = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };
      moods.push(newMood);
      setTable(TABLES.MOOD_CHECKINS, moods);
      db.logs.create({
        action: "mood_checkin",
        metric_type: "engagement",
        value: 1,
      });
      return newMood;
    },
    getByUserId: (userId) =>
      getTable(TABLES.MOOD_CHECKINS).filter((m) => m.user_id === userId),
    getAll: () => getTable(TABLES.MOOD_CHECKINS),
  },
  assessments: {
    create: (entry) => {
      const assessments = getTable(TABLES.ASSESSMENTS);
      const newAssessment = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };
      assessments.push(newAssessment);
      setTable(TABLES.ASSESSMENTS, assessments);
      db.logs.create({
        action: "assessment_complete",
        metric_type: "health",
        value: entry.score,
      });
      return newAssessment;
    },
    getByUserId: (userId) =>
      getTable(TABLES.ASSESSMENTS).filter((a) => a.user_id === userId),
    getAll: () => getTable(TABLES.ASSESSMENTS),
  },
  chats: {
    create: (entry) => {
      const chats = getTable(TABLES.CHATS);
      const newChat = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };
      chats.push(newChat);
      setTable(TABLES.CHATS, chats);
      return newChat;
    },
    getByUserId: (userId) =>
      getTable(TABLES.CHATS).filter((c) => c.user_id === userId),
  },
  posts: {
    create: (entry) => {
      const posts = getTable(TABLES.FORUM_POSTS);
      const newPost = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        upvotes: 0,
        replies: [],
      };
      posts.push(newPost);
      setTable(TABLES.FORUM_POSTS, posts);
      return newPost;
    },
    getAll: () => getTable(TABLES.FORUM_POSTS),
    update: (id, updates) => {
      const posts = getTable(TABLES.FORUM_POSTS);
      const index = posts.findIndex((p) => p.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], ...updates };
        setTable(TABLES.FORUM_POSTS, posts);
        return posts[index];
      }
      return null;
    },
  },
  bookings: {
    create: (entry) => {
      const bookings = getTable(TABLES.BOOKINGS);
      const newBooking = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        status: "confirmed",
      };
      bookings.push(newBooking);
      setTable(TABLES.BOOKINGS, bookings);
      return newBooking;
    },
    getAll: () => getTable(TABLES.BOOKINGS),
    getByUserId: (userId) =>
      getTable(TABLES.BOOKINGS).filter((b) => b.user_id === userId),
  },
  logs: {
    create: (entry) => {
      const logs = getTable(TABLES.LOGS);
      const newLog = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };
      logs.push(newLog);
      setTable(TABLES.LOGS, logs);
      return newLog;
    },
    getAll: () => getTable(TABLES.LOGS),
  },
  notes: {
    create: (entry) => {
      const notes = getTable(TABLES.NOTES);
      const newNote = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };
      notes.push(newNote);
      setTable(TABLES.NOTES, notes);
      return newNote;
    },
    getByStudentId: (studentId) =>
      getTable(TABLES.NOTES).filter((n) => n.student_id === studentId),
    delete: (id) => {
      const notes = getTable(TABLES.NOTES).filter((n) => n.id !== id);
      setTable(TABLES.NOTES, notes);
    },
  },
  reminders: {
    create: (entry) => {
      const reminders = getTable(TABLES.REMINDERS);
      const newReminder = {
        ...entry,
        id: uuidv4(),
        created_at: new Date().toISOString(),
        completed: false,
      };
      reminders.push(newReminder);
      setTable(TABLES.REMINDERS, reminders);
      return newReminder;
    },
    getAll: () => getTable(TABLES.REMINDERS),
    update: (id, updates) => {
      const reminders = getTable(TABLES.REMINDERS);
      const index = reminders.findIndex((r) => r.id === id);
      if (index !== -1) {
        reminders[index] = { ...reminders[index], ...updates };
        setTable(TABLES.REMINDERS, reminders);
        return reminders[index];
      }
      return null;
    },
  },
  sentResources: {
    create: (entry) => {
      const sent = getTable(TABLES.SENT_RESOURCES);
      const newEntry = {
        ...entry,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };
      sent.push(newEntry);
      setTable(TABLES.SENT_RESOURCES, sent);
      return newEntry;
    },
  },
};

// Initialize tables if empty
Object.values(TABLES).forEach((table) => {
  if (!localStorage.getItem(table))
    localStorage.setItem(table, JSON.stringify([]));
});
