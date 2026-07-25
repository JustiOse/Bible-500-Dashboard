import React from 'react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../data/books';
import { Book } from '../types';

const BookGrid: React.FC<{ books: Book[] }> = ({ books }) => (
  <div className="book-grid">
    {books.map((book) => (
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
);

const CHAMPION_MEDALS = ['🥇', '🥈', '🥉'];

const ChampionsTeaser: React.FC = () => (
  <div className="container champions-teaser">
    <div className="champions-heading">
      <h2>👑 Season 4 Grand Champions</h2>
      <span className="champions-badge">✨ Coming Soon</span>
    </div>
    <p className="champions-subtitle">
      The overall champions will be revealed after the official announcement.
    </p>
    <div className="champions-grid">
      {CHAMPION_MEDALS.map((medal, idx) => (
        <div key={idx} className={`champion-card champion-${idx + 1}`}>
          <div className="champion-avatar">
            <span>?</span>
          </div>
          <div className="champion-medal">{medal}</div>
          <div className="champion-name">To Be Revealed</div>
          <div className="champion-score">—</div>
        </div>
      ))}
    </div>
  </div>
);

const Home: React.FC = () => {
  const oldTestamentBooks = BOOKS.filter((book) => book.testament === 'old');
  const newTestamentBooks = BOOKS.filter((book) => book.testament === 'new');

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1>Bible@500 Season 4</h1>
      </div>

      <ChampionsTeaser />

      <div className="container">
        <details className="testament-section" open>
          <summary>
            <h2>പഴയനിയമം</h2>
          </summary>
          <BookGrid books={oldTestamentBooks} />
        </details>
      </div>

      {newTestamentBooks.length > 0 && (
        <div className="container">
          <details className="testament-section" open>
            <summary>
              <h2>പുതിയനിയമം</h2>
            </summary>
            <BookGrid books={newTestamentBooks} />
          </details>
        </div>
      )}
    </div>
  );
};

export default Home;
