import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Plus,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const CATEGORIES = [
  "All",
  "Academic Stress",
  "Relationships",
  "Career",
  "General Wellness",
  "Sleep Issues",
  "Anxiety",
];

const PeerForum = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState({
    title: "",
    content: "",
    category: "General Wellness",
  });

  useEffect(() => {
    // Load mock posts or posts from db
    const loadedPosts = db.posts.getAll();
    if (loadedPosts.length === 0) {
      // Seed some data if empty
      const seeds = [
        {
          id: "1",
          title: "Feeling overwhelmed with finals",
          content: "I have 5 exams next week and I cannot sleep. Any tips?",
          category: "Academic Stress",
          upvotes: 12,
          replies: 3,
          timestamp: new Date().toISOString(),
          user_id: "anon_1",
        },
        {
          id: "2",
          title: "Job search is exhausting",
          content: "Applied to 50 places, no response. Feeling worthless.",
          category: "Career",
          upvotes: 8,
          replies: 5,
          timestamp: new Date().toISOString(),
          user_id: "anon_2",
        },
      ];
      seeds.forEach((p) => db.posts.create(p));
      setPosts(seeds);
    } else {
      setPosts(loadedPosts);
    }
  }, []);

  const handleVote = (id, type) => {
    const updated = posts.map((p) => {
      if (p.id === id) {
        const change = type === "up" ? 1 : -1;
        return { ...p, upvotes: p.upvotes + change };
      }
      return p;
    });
    setPosts(updated);
    // Sync to DB would happen here
  };

  const handleCreatePost = () => {
    if (!newPostContent.title || !newPostContent.content) return;

    // AI Moderation Mock
    const harmful = ["suicide", "die", "kill", "hurt myself"].some((word) =>
      newPostContent.content.toLowerCase().includes(word),
    );

    if (harmful) {
      toast({
        title: "Support Alert",
        description:
          "It sounds like you're going through a lot. We've prioritized connecting you with a counsellor.",
        variant: "destructive",
      });
      // In real app, redirect to crisis page
      return;
    }

    const newPost = {
      title: newPostContent.title,
      content: newPostContent.content,
      category: newPostContent.category,
      user_id: user.id || "anon_user",
    };

    db.posts.create(newPost);
    setPosts([newPost, ...posts]);
    setShowNewPost(false);
    setNewPostContent({ title: "", content: "", category: "General Wellness" });
    toast({
      title: "Post Shared",
      description: "Your post is now visible to the community.",
    });
  };

  const filteredPosts =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Community Support</h2>
        <Button
          onClick={() => setShowNewPost(!showNewPost)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              filter === cat
                ? "bg-purple-100 text-purple-700 font-bold"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {showNewPost && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white p-6 rounded-xl shadow-md border border-purple-100"
        >
          <h3 className="font-bold mb-4">Create a new post</h3>
          <input
            placeholder="Title"
            className="w-full mb-3 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
            value={newPostContent.title}
            onChange={(e) =>
              setNewPostContent({ ...newPostContent, title: e.target.value })
            }
          />
          <textarea
            placeholder="What's on your mind? (Anonymous)"
            className="w-full mb-3 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none h-32"
            value={newPostContent.content}
            onChange={(e) =>
              setNewPostContent({ ...newPostContent, content: e.target.value })
            }
          />
          <div className="flex justify-between items-center">
            <select
              className="p-2 border rounded-lg text-sm bg-gray-50"
              value={newPostContent.category}
              onChange={(e) =>
                setNewPostContent({
                  ...newPostContent,
                  category: e.target.value,
                })
              }
            >
              {CATEGORIES.slice(1).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setShowNewPost(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>Post</Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id || Math.random()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">
                Anonymous • {new Date(post.timestamp).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote(post.id, "up")}
                  className="hover:text-purple-600"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <span>{post.upvotes}</span>
                <button
                  onClick={() => handleVote(post.id, "down")}
                  className="hover:text-red-600"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>{post.replies?.length || post.replies || 0} Replies</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PeerForum;
