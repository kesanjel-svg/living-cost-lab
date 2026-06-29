export function getBlogPath(slug) {
  return `/blog/${slug}`
}

export function getLatestPosts(posts, limit = 5) {
  return [...posts]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, limit)
}

export function getPostBySlug(posts, slug) {
  return posts.find((post) => post.slug === slug)
}

export function getRelatedPosts(posts, currentPost, limit = 3) {
  const sameCategory = posts.filter(
    (post) =>
      post.slug !== currentPost.slug &&
      post.category === currentPost.category,
  )

  if (sameCategory.length >= limit) {
    return getLatestPosts(sameCategory, limit)
  }

  const others = posts.filter(
    (post) =>
      post.slug !== currentPost.slug &&
      !sameCategory.some((item) => item.slug === post.slug),
  )

  return getLatestPosts([...sameCategory, ...others], limit)
}

export function formatBlogDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
