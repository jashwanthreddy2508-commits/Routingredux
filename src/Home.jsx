import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData } from './Dataslicer.js';

function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <main className="posts-page" aria-busy={loading}>
      <header className="posts-header">
        <p className="posts-eyebrow">DISCOVER</p>
        <h1>Latest posts</h1>
        <p className="posts-intro">Browse the latest stories from our community.</p>
      </header>

      {loading && (
        <div className="status-message" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          Loading posts...
        </div>
      )}

      {error && (
        <div className="status-message error-message" role="alert">
          <p>We couldn't load the posts. {error}</p>
          <button className="retry-button" onClick={() => dispatch(fetchData())}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <section className="posts-grid" aria-label="Posts">
          {data.map((post) => (
            <Link className="post-card-link" to={`/item/${post.id}`} key={post.id}>
              <article className="post-card">
                <img
                  className="post-image"
                  src={post.imgSrc}
                  alt=""
                  loading="lazy"
                  width="200"
                  height="200"
                />
                <span className="post-number">POST {String(post.id).padStart(2, '0')}</span>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <span className="post-author">POST BY USER {post.userId}</span>
              </article>
            </Link>
          ))}
          {data.length === 0 && <p className="status-message">No posts found.</p>}
        </section>
      )}
    </main>
  );
}

export default Home