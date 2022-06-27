import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'
import UploadButton from './UploadButton'
import AttributionTable from './AttributionTable'

import { getType, bbox } from '@turf/turf'
import maplibregl from 'maplibre-gl'

import classes from '../Map.module.css'
import 'react-virtualized/styles.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import LoadingOverlay from './LoadingOverlay'

export const MapContext = React.createContext()

class MaplibreGLButtonControl {
  constructor({ className = '', title = '', eventHandler = null }) {
    this._className = className
    this._title = title
    this._eventHandler = eventHandler
  }

  onAdd(map) {
    this._btn = document.createElement('button')
    this._btn.className = 'maplibregl-ctrl-icon' + ' ' + this._className
    this._btn.type = 'button'
    this._btn.title = this._title
    this._btn.onclick = this._eventHandler

    this._container = document.createElement('div')
    this._container.className = 'maplibregl-ctrl-group maplibregl-ctrl'
    this._container.appendChild(this._btn)

    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }
}

const ShapefileViewMap = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)
  const [uploadData, setUploadData] = useState(null)
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [dataLoading, setDataLoading] = useState(false)

  const zoomToGeoJSON = useCallback(
    (geojson) => {
      let _bbox = bbox(geojson)
      let bounds = new maplibregl.LngLatBounds([_bbox[0], _bbox[1]], [_bbox[2], _bbox[3]])

      map.fitBounds(bounds, {
        padding: 20,
        maxZoom: 15,
      })
    },
    [map]
  )

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | <a href="https://www.openstreetmap.org/fixthemap" target="_blank">Fix the map</a>',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 22,
            paint: {
              'raster-opacity': 0.7,
            },
          },
        ],
      },
      center: [0, 0],
      zoom: 0,
    })
    setMap(map)

    // Add Control
    map.addControl(new maplibregl.NavigationControl())
    map.addControl(
      new MaplibreGLButtonControl({
        className: 'maplibregl-ctrl-full-extent',
        title: 'Full Extent',
        eventHandler: function () {
          let source = map.getSource('upload-data-source-id')
          if (source === undefined) return
          zoomToGeoJSON(source._data)
        },
      })
    )

    map.on('mousemove', 'upload-data-layer-id', function (e) {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'upload-data-layer-id', function () {
      map.getCanvas().style.cursor = ''
    })

    map.on('click', (e) => {
      const selectedFeatures = map.queryRenderedFeatures(e.point)
      if (selectedFeatures.length === 0) {
        setSelectedRowIndex(-1)
        map.setFilter('highlighted-layer-id', ['==', 'OBJECTID', -1])
        return
      }

      let firstFeature = selectedFeatures[0]
      zoomToGeoJSON(firstFeature)

      let firstFeatureOID = firstFeature.properties.OBJECTID
      setSelectedRowIndex(firstFeatureOID)
      map.setFilter('highlighted-layer-id', ['==', 'OBJECTID', firstFeatureOID])
    })

    const zoomToGeoJSON = (geojson) => {
      let _bbox = bbox(geojson)
      let bounds = new maplibregl.LngLatBounds([_bbox[0], _bbox[1]], [_bbox[2], _bbox[3]])

      map.fitBounds(bounds, {
        padding: 20,
        maxZoom: 15,
      })
    }
    // Clean up function
    return () => map.remove()
  }, [])

  useEffect(() => {
    if (map === null) return
    if (uploadData == null) return

    let sourceId = 'upload-data-source-id'
    let layerId = 'upload-data-layer-id'
    let highlightedLayerId = 'highlighted-layer-id'

    // Get layer with id
    let uploadLayer = map.getStyle().layers.find((l) => l.id === layerId)
    let highlightedLayer = map.getStyle().layers.find((l) => l.id === highlightedLayerId)

    if (uploadLayer) {
      // Remove Layer
      map.removeLayer(layerId)
    }

    if (highlightedLayer) {
      // Remove Layer
      map.removeLayer(highlightedLayerId)
    }

    // Get source with id
    let uploadSource = map.getSource(sourceId)
    if (uploadSource) {
      // Remove source
      map.removeSource(sourceId)
    }

    let source = {
      type: 'geojson',
      data: uploadData,
    }
    map.addSource(sourceId, source)

    // Check geometry type
    let isPoint = uploadData.features.every(
      (feature) => getType(feature) === 'Point' || getType(feature) === 'MultiPoint'
    )
    let isLineString = uploadData.features.every(
      (feature) => getType(feature) === 'LineString' || getType(feature) === 'MultiLineString'
    )
    let isPolygon = uploadData.features.every(
      (feature) => getType(feature) === 'Polygon' || getType(feature) === 'MultiPolygon'
    )

    let getRandomColor = () => {
      // var letters = '0123456789ABCDEF'
      // dark color
      var letters = '012345678'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 9)]
      }
      return color
    }

    if (isPoint) {
      map.addLayer({
        id: layerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 0.1, 8, 1, 12, 3, 18, 7],
          'circle-color': getRandomColor(),
          'circle-stroke-color': 'white',
          'circle-stroke-width': {
            stops: [
              [9, 0.1],
              [12, 0.5],
              [15, 1],
              [18, 2],
            ],
          },
        },
      })

      map.addLayer({
        id: highlightedLayerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 0.1, 8, 1, 12, 3, 18, 7],
          'circle-opacity': 0,
          'circle-stroke-color': '#34D4FF',
          'circle-stroke-width': 2,
        },
        filter: ['==', 'OBJECTID', ''],
      })
    }

    if (isLineString) {
      map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': getRandomColor(),
          'line-width': 5,
        },
      })

      map.addLayer({
        id: highlightedLayerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#34D4FF',
          'line-width': 5,
        },
        filter: ['==', 'OBJECTID', ''],
      })
    }

    if (isPolygon) {
      map.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': getRandomColor(),
          'fill-opacity': 0.8,
          'fill-outline-color': {
            stops: [
              [8, 'rgba(255, 255, 255, 0.7)'],
              [12, 'rgba(255, 255, 255, 0.8)'],
              [16, 'rgba(255, 255, 255, 1)'],
            ],
          },
        },
      })

      map.addLayer({
        id: highlightedLayerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-opacity': 0.5,
          'fill-color': '#6CECFC',
          'fill-outline-color': '#00FFF7',
        },
        filter: ['==', 'OBJECTID', ''],
      })
    }

    // Zoom to layer
    zoomToGeoJSON(uploadData)
  }, [uploadData, map, zoomToGeoJSON])

  return (
    <Fragment>
      <MapContext.Provider
        value={{
          map,
          uploadData,
          setUploadData,
          selectedRowIndex,
          setSelectedRowIndex,
          zoomToGeoJSON,
          setDataLoading,
        }}
      >
        <UploadButton />
        <div ref={mapContainerRef} className={classes.map}>
          {dataLoading && <LoadingOverlay />}
        </div>

        {uploadData !== null && <AttributionTable />}
      </MapContext.Provider>
    </Fragment>
  )
}

export default ShapefileViewMap
