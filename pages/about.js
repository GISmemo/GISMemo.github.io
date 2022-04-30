import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug, getAllFilesFrontMatter } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authors = await getAllFilesFrontMatter('authors')
  let authorDetails = []
  for (let author of authors) {
    const detail = await getFileBySlug('authors', [`${author.slug}`])
    authorDetails.push(detail)
  }

  return { props: { authorDetails } }
}

const introduction = `一個分享 GIS 知識的地方`

export default function About({ authorDetails }) {
  return (
    <div>
      <div>{introduction}</div>
      {authorDetails.map((authorDetail) => {
        return (
          <MDXLayoutRenderer
            key={authorDetail.frontMatter.name}
            layout={authorDetail.frontMatter.layout || DEFAULT_LAYOUT}
            mdxSource={authorDetail.mdxSource}
            frontMatter={authorDetail.frontMatter}
          />
        )
      })}
    </div>
  )
}
