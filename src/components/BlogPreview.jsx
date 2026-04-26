import Reveal from './Reveal.jsx'
import GlassPanel from './GlassPanel.jsx'

function BlogPreview({ posts, blogHref }) {
  return (
    <section id="blog" className="scroll-mt-28 space-y-6">
      <Reveal>
        <p className="eyebrow">Blog</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="section-title">Notes on engineering, design, and product thinking.</h2>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.title} delay={0.08 + index * 0.05}>
            <GlassPanel className="rounded-2xl p-5">
              <article className="space-y-3">
                <p className="text-xs uppercase tracking-[0.12em] text-ink-400">{post.date}</p>
                <h3 className="font-display text-lg font-semibold text-ink-50">{post.title}</h3>
                <p className="text-sm leading-7 text-ink-300">{post.excerpt}</p>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
                <a href={post.href} className="inline-flex text-sm text-accent-700 transition hover:text-accent-400">
                  Read Preview
                </a>
              </article>
            </GlassPanel>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <a href={blogHref} className="btn btn-primary">
          Enter Blog
        </a>
      </Reveal>
    </section>
  )
}

export default BlogPreview
