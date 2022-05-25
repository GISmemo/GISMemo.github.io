const ImageModal = (props) => {
  props.rest.width = window.innerWidth * 0.8

  const imageClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-hidden">
          <div
            onClick={props.onClose}
            className="flex min-h-full place-items-center justify-center p-4 sm:items-center sm:p-0"
          >
            <div className="relative">
              <img loading="lazy" className="m-0" onClick={imageClick} {...props.rest} />
              <div className="modal-close absolute top-5 right-5 z-50 flex cursor-pointer flex-col items-center rounded-full bg-gray-100 p-2">
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal
