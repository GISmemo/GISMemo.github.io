import { Fragment, useEffect, useRef, useState } from 'react'

import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import classes from './Map.module.css'

const MaplibreGL = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      //   style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [0, 0], // starting position [lng, lat]
      zoom: 1, // starting zoom
    })
    setMap(map)

    // Add Control
    map.addControl(new maplibregl.NavigationControl())

    // On load
    map.on('load', () => {
      // 初始化想要加入的圖層或動作可於此進行
    })

    // Clean up function
    return () => map.remove()
  }, [])

  return (
    <Fragment>
      <div ref={mapContainerRef} className={classes.map} />
    </Fragment>
  )
}

export default MaplibreGL
