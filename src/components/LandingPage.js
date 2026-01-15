import React, { useState, useEffect } from 'react';
import './../LandingPage.css';  // or './LandingPage.css' if same folder

const LandingPage = () => {
  const userName = localStorage.getItem('userName') || 'Guest';
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categoryIcons = {
    'Maths': '📐',
    'Math': '📐',
    'Mathematics': '📐',
    'General Knowledge': '🧠',
    'GK': '🧠',
    'Science': '🔬',
    'Physics': '⚛️',
    'Chemistry': '🧪',
    'Biology': '🧬',
    'Sports': '⚽',
    'History': '📚',
    'Geography': '🗺️',
    'English': '📖',
    'Computer Science': '💻',
    'Art': '🎨',
    'Music': '🎵',
    'Literature': '📕',
    'Economics': '💰',
    'default': '📝'
  };

  const getIconForCategory = (category) => {
    return categoryIcons[category] || categoryIcons['default'];
  };

  // Fetch quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL_GET_QUIZZES_CATEGORY);
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Extract unique categories from quizzes
  const categories = [...new Set(quizzes.map(quiz => quiz.category))].map(category => ({
    name: category,
    icon: getIconForCategory(category),
    count: quizzes.filter(q => q.category === category).length
  }));

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 3);

  const recentQuizzes = [
    {
      name: 'Biology',
      questions: 12,
      status: 'Completed',
      icon: '🧬'
    },
    {
      name: 'Geography',
      questions: 20,
      status: 'Incomplete',
      icon: '🗺️'
    }
  ];

  return (
    <div className="container">
      <div className="max-width">
        {/* Welcome Header */}
        <div className="hero">
          <h1 className="hero-title">Welcome, {userName}! 👋</h1>
          <p className="hero-text">Ready to challenge yourself? Start a quiz and test your knowledge!</p>
        </div>

        {/* Categories Section */}
        <div style={{ marginBottom: '32px' }}>
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            {categories.length > 3 && (
              <button
                className="see-all-btn"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? 'Show less' : 'See all'}
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="loading">No categories available</div>
          ) : (
            <div className="categories-grid">
              {displayedCategories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-icon">{category.icon}</div>
                  <p className="category-name">{category.name}</p>
                  <p className="category-count">
                    {category.count} quiz{category.count !== 1 ? 'zes' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Section */}
        <div>
          <h2 className="section-title" style={{ marginBottom: '24px' }}>Recent</h2>
          <div className="recent-list">
            {recentQuizzes.map((quiz, index) => (
              <div key={index} className="quiz-card">
                <div className="quiz-left">
                  <div className="quiz-icon">{quiz.icon}</div>
                  <div>
                    <h3 className="quiz-name">{quiz.name}</h3>
                    <p className="quiz-questions">{quiz.questions} questions</p>
                  </div>
                </div>
                <span
                  className={`status-badge ${quiz.status === 'Completed' ? 'completed' : 'incomplete'}`}
                >
                  {quiz.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
