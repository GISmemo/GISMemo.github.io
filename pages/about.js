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

const contents = [
  '降溫後的台北盆地裡，一群地理系畢業的高中老師和工程師窩在咖啡廳的角落，聊教育聊課綱、談程式談網頁製作，電光石火間GIS memo就這麼被創造出來。我們期望創立一個程式語言和地理教育之外，更加實作性的知識平台。透過知識的轉譯及白話，讓更多人能以清楚簡明的文字了解空間資訊科學。讓科技真正走入生活，讓科學解釋生命，帶領讀者了解資訊在空間中可以如何運用，掌握資訊掌握空間。',
]

const Introductions = () => {
  return (
    <div>
      {contents.map((content, index) => (
        <p
          key={index}
          className="list-inside whitespace-pre-wrap indent-8 font-serif text-lg font-medium leading-loose text-neutral-600 dark:text-neutral-300"
        >
          {content}
        </p>
      ))}
    </div>
  )
}

export default function About({ authorDetails }) {
  return (
    <div>
      <Introductions />
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
