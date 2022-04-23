import { Fragment, useEffect, useRef, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import Attribution from 'ol/control/Attribution'

import 'ol/ol.css'
import classes from './Map.module.css'

const OpenLayers = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: [
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ],
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
    })
    setMap(map)

    // // On load
    // map.on('load', () => {
    //   // 初始化想要加入的圖層或動作可於此進行
    // })

    return () => map.setTarget(undefined)
  }, [])

  return (
    <Fragment>
      <div ref={mapContainerRef} className={classes.map} />
    </Fragment>
  )
}

export default OpenLayers
