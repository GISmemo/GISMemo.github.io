import ImageModal from './ImageModal'
import { useState } from 'react'

const Image = ({ ...rest }) => {
  const [isLarge, setIsLarge] = useState(false)

  const imageClick = () => {
    setIsLarge(!isLarge)
  }

  return (
    <div>
      <img loading="lazy" onClick={imageClick} {...rest} />
      {isLarge && <ImageModal onClose={imageClick} rest={rest} />}
    </div>
  )
}

export default Image
