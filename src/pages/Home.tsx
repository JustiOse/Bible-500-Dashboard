import React from 'react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../data/books';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>Bible@500 Season 4</h1>
      </div>

      <div className="container">
        <h2>പഴയനിയമം</h2>
        <div className="book-grid">
          {BOOKS.map((book) => (
            <Link
              key={book.slug}
              to={`/book/${book.slug}`}
              className="book-card"
              title={`See top 3 winners and full quiz results for ${book.displayName}`}
            >
              <span className="book-card-name">{book.displayName}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
