import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookBySlug } from '../data/books';
import { parseBookCsv } from '../utils/csvParser';
import { ParsedBook } from '../types';

const MEDALS = ['🥇', '🥈', '🥉'];

const BookResults: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug);

  const [data, setData] = useState<ParsedBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!book) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    fetch(book.url, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${book.name} (HTTP ${res.status}) from ${book.url}`);
        }
        return res.text();
      })
      .then((text) => setData(parseBookCsv(text)))
      .catch((err) => {
        const message = err && err.message ? err.message : 'Failed to load results';
        setError(`${message} — URL: ${book.url}`);
      })
      .finally(() => setLoading(false));
  }, [book, retryCount]);

  const filteredRows = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data.rows;
    const q = search.trim().toLowerCase();
    return data.rows.filter(
      (row) => row.name.toLowerCase().includes(q) || row.regNo.toLowerCase().includes(q)
    );
  }, [data, search]);

  if (!book) {
    return (
      <div className="container">
        <div className="error">Book not found.</div>
        <Link to="/" className="button button-secondary" style={{ marginTop: '16px', display: 'inline-block' }}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading {book.displayName} results...</div>;
  }

  if (error || !data) {
    return (
      <div className="container">
        <div className="error">{error || 'Could not load results for this book.'}</div>
        <button
          className="button"
          style={{ marginTop: '16px' }}
          onClick={() => setRetryCount((n) => n + 1)}
        >
          Retry
        </button>
      </div>
    );
  }

  const { headers, rows, nameHeader } = data;
  // Rank-based, not a fixed slice(0, 3): a tie for 1st/2nd/3rd means more
  // than 3 rows can share rank <= 3, and all of them should podium together.
  const winners = rows.filter((row) => row.rank <= 3);

  return (
    <div className="container">
      <div style={{ textAlign: 'left' }}>
        <Link to="/" className="button button-secondary button-small">← Back to Home</Link>
      </div>
      <h1 style={{ textAlign: 'center', marginTop: '12px' }}>{book.displayName}</h1>

      <div className="container container-tight">
        <h2 style={{ marginBottom: '10px' }}>🏆 Winners</h2>
        {winners.length === 0 ? (
          <p>No results yet for this book.</p>
        ) : (
          <div className="podium">
            {winners.map((row) => (
              <div key={row.email} className={`podium-card podium-${row.rank}`}>
                <div className="podium-medal">{MEDALS[row.rank - 1]}</div>
                <div className="podium-info">
                  <div className="podium-name" title={row.name || 'Unnamed participant'}>
                    {row.name || 'Unnamed participant'}
                  </div>
                  <div className="podium-email" title={row.maskedEmail}>
                    {row.maskedEmail}
                  </div>
                </div>
                <div className="podium-score">{row.total}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ margin: 0 }}>Full Results</h2>
          <input
            type="text"
            className="search-box"
            style={{ margin: 0 }}
            placeholder="Search by name or reg no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th className="sticky-col sticky-col-rank">Rank</th>
                {headers.map((header) => (
                  <th
                    key={header}
                    className={header === nameHeader ? 'sticky-col sticky-col-name' : undefined}
                    title={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, idx) => (
                <tr key={`${row.email}-${idx}`} className={row.rank <= 3 ? `top-rank rank-${row.rank}` : ''}>
                  <td className="sticky-col sticky-col-rank">
                    <strong>{row.rank <= 3 ? MEDALS[row.rank - 1] : row.rank}</strong>
                  </td>
                  {headers.map((header) => (
                    <td
                      key={header}
                      className={header === nameHeader ? 'sticky-col sticky-col-name' : undefined}
                      title={row.cells[header]}
                    >
                      {row.cells[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRows.length === 0 && (
          <p style={{ marginTop: '16px' }}>No participants match "{search}".</p>
        )}
      </div>
    </div>
  );
};

export default BookResults;
