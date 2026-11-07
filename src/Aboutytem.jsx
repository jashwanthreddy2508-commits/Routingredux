import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function Aboutytem() {
  const { id } = useParams();
  const { data, loading, error } = useSelector((state) => state.data);
  const post = data.find((item) => item.id === Number(id));

  if (loading) {
    return (
      <main className="post-detail-page">
        <p className="status-message" role="status">Loading post...</p>
        <Link to="/">Back to posts</Link>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="post-detail-page">
        <p className="status-message error-message" role="alert">
          {error || 'Post not found.'}
        </p>
        <Link to="/">Back to posts</Link>
      </main>
    );
  }

  return (
    <main className="post-detail-page">
      <Link to="/" className="back-link">Back to posts</Link>
      <article className="post-detail-card">
        <img
          className="post-detail-image"
          src={post.imgSrc}
          alt={post.title}
          width="420"
          height="420"
        />
        <div className="post-detail-content">
          <span className="post-number">POST {String(post.id).padStart(2, '0')}</span>
          <h1>{post.title}</h1>
          <p className="post-detail-body">{post.body}</p>
          <p className="post-author">POST BY USER {post.userId}</p>
        </div>
      </article>
    </main>
  );
}

export default Aboutytem;
