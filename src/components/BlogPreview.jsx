import Reveal from './Reveal.jsx'

function BlogPreview({ posts, blogHref }) {
  return (
    <section id="blog" className="content-section">
      <Reveal>
        <h2 className="section-heading"><span aria-hidden="true">✍️</span> Recent Writing</h2>
      </Reveal>

      <div className="entry-list blog-list">
        {posts.map((post, index) => (
          <Reveal key={post.title} delay={0.04 + index * 0.03}>
            <article className="blog-entry">
              <time dateTime={post.date}>{post.date}</time>
              <div>
                <h3><a href={post.href}>{post.title}</a></h3>
                <p>{post.excerpt}</p>
                <p className="post-tags">{post.tags.join(' · ')}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <a href={blogHref} className="text-link">View all writing →</a>
      </Reveal>
    </section>
  )
}

export default BlogPreview
