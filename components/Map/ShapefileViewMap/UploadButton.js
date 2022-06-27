import { Fragment, useRef, useState, useContext } from 'react'
import shpjs from 'shpjs'
import { MapContext } from './ShapefileViewMap'

const UploadButton = () => {
  const { setUploadData, setDataLoading } = useContext(MapContext)
  const uploadInputRef = useRef(null)
  const [uploadErrorMessage, setUploadErrorMessage] = useState('')

  const uploadShapefileHandler = () => {
    uploadInputRef.current.click()
  }

  const createOID = (data) => {
    data.features.forEach((feature, index) => {
      feature.properties.OBJECTID = index
    })
  }

  const updateFeaturesWithUpload = async (e) => {
    setUploadErrorMessage('')
    try {
      setDataLoading(true)
      let arrayBuffer = await e.target.files[0].arrayBuffer()
      let data = await shpjs.parseZip(arrayBuffer)

      if (Array.isArray(data)) {
        let message = '.zip 壓縮檔案中放置一個圖層就好 (這是只是個小小測試功能😅)'
        setUploadErrorMessage(message)
        return
      } else {
        createOID(data)
        setUploadData(data)
      }
    } catch (error) {
      // parseZip 僅丟出以下該錯誤
      if (error.message === 'no layers founds') {
        let message = '沒有發現圖層在 .zip 壓縮檔案中，請確認是否包含 .shp, .shx, .dbf 檔案！'
        setUploadErrorMessage(message)
      } else if (error.message === `Cannot read properties of undefined (reading '0')`) {
        let message = '您的 .zip 壓縮檔案中，缺少了 .dbf 檔案。'
        setUploadErrorMessage(message)
      } else {
        let message = '未知的錯誤發生😲'
        setUploadErrorMessage(message)
      }
    } finally {
      uploadInputRef.current.value = ''
      setDataLoading(false)
    }
  }

  return (
    <Fragment>
      <input
        style={{ display: 'none' }}
        ref={uploadInputRef}
        type="file"
        accept=".zip"
        onChange={updateFeaturesWithUpload}
      />
      <button
        type="button"
        onClick={uploadShapefileHandler}
        className={
          'w-full rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100'
        }
      >
        點我上傳 Shapefile 壓縮檔
      </button>
      {uploadErrorMessage !== '' && (
        <p style={{ color: '#ff5e40', fontWeight: 'bold' }}>{uploadErrorMessage}</p>
      )}
    </Fragment>
  )
}

export default UploadButton
