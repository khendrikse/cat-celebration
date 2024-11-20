import React, { useEffect, useState } from 'react';
import { Cat, Heart, Sparkles } from 'lucide-react';
import { CommentForm } from './components/CommentForm';
import { CommentList } from './components/CommentList';

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await fetch('/.netlify/functions/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cat className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">CatCelebration</h1>
            </div>
            <Heart className="h-6 w-6 text-pink-500" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=2000&q=80"
                alt="Cute cat"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Celebrate Our Feline Friends</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Join our community in celebrating the joy, grace, and endless entertainment that cats bring to our lives. Share your thoughts and experiences with fellow cat enthusiasts!
                </p>
                <CommentForm onCommentAdded={fetchComments} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Community Thoughts</h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading comments...</p>
              </div>
            ) : (
              <CommentList comments={comments} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;