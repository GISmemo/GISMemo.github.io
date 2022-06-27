import { Fragment, useContext } from 'react'
import { MapContext } from './ShapefileViewMap'
import { Column, Table, AutoSizer } from 'react-virtualized'

const moveObjectIdToFirst = (tableHeader) => {
  let OBJECTID = 'OBJECTID'
  var index = tableHeader.indexOf(OBJECTID)
  if (index !== -1) {
    tableHeader.splice(index, 1)
  }
  tableHeader.unshift(OBJECTID)
  return tableHeader
}

const AttributionTable = () => {
  const {
    map,
    uploadData: data,
    selectedRowIndex,
    setSelectedRowIndex,
    zoomToGeoJSON,
  } = useContext(MapContext)

  let tableHeader = Object.keys(data.features[0].properties)
  tableHeader = moveObjectIdToFirst(tableHeader)

  const attributeRowClickedHandler = (e) => {
    let feature = data.features[e.index]
    let OBJECTID = feature.properties.OBJECTID
    if (selectedRowIndex === OBJECTID) {
      setSelectedRowIndex(-1)
      map.setFilter('highlighted-layer-id', ['==', 'OBJECTID', -1])
      return
    }
    setSelectedRowIndex(OBJECTID)
    map.setFilter('highlighted-layer-id', ['==', 'OBJECTID', OBJECTID])

    zoomToGeoJSON(feature)
  }

  const rowStyleFormat = (row) => {
    if (row.index < 0) return

    // selected highlight
    if (row.index === selectedRowIndex) {
      return {
        backgroundColor: '#88D1FE',
        color: '#333',
      }
    }

    if (row.index % 2 === 0) {
      return {
        backgroundColor: '#fafafa',
        color: '#333',
      }
    } else {
      return {
        backgroundColor: '#fff',
        color: '#333',
      }
    }
  }

  return (
    <Fragment>
      <div style={{ height: 400 }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={50}
              rowHeight={30}
              rowCount={data.features.length}
              rowGetter={({ index }) => data.features[index].properties}
              rowStyle={rowStyleFormat}
              onRowClick={attributeRowClickedHandler}
              scrollToIndex={selectedRowIndex}
            >
              {tableHeader.map((h, index) => (
                <Column key={index} label={h} dataKey={h} width={200} />
              ))}
            </Table>
          )}
        </AutoSizer>
      </div>
    </Fragment>
  )
}

export default AttributionTable
