import ImageModal from './ImageModal'
import { useState } from 'react'

const Image = ({ ...rest }) => {
  const [isLarge, setIsLarge] = useState(false)

  const imageClick = () => {
    setIsLarge(!isLarge)
  }

  return (
    <div>
      {isLarge && <ImageModal onClose={imageClick} rest={rest} />}
      {!isLarge && <img onClick={imageClick} {...rest} />}
    </div>
  )
}

export default Image
