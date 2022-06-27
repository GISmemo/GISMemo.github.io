---
title: Shapefile 與它的附屬檔案們
date: 2022-06-24
lastmod: '2022-06-24'
tags: ['Shapefile']
draft: false
summary: '本篇文章將介紹什麼是 Shapefile，以及告訴大家，通常一個 Shapefile 資料格式由哪些檔案組成。'
images: ['']
authors: ['ShelleeShao', 'YuChunTsao']
---

有上過地理課的同學相信對於 Shapefile 都不陌生(至少聽過這個單字)，尤其在使用 ArcMap 或 QGIS 等軟體時，總是會使用到被稱作 Shapefile 的檔案，但應該還是有跟它不怎麼熟的同學 😆

本篇文章將介紹什麼是 Shapefile，以及告訴大家，通常一個 Shapefile 資料格式由哪些檔案組成。

---

## 什麼是 Shapefile？

ESRI Shapefile 常被稱為 shapefile, shp，是[美國環境系統研究公司(ESRI)](https://www.esri.com/en-us/home) 所開發出的空間資料開放格式，目前廣泛應用在 GIS 領域中，大多數的 GIS 軟體均有支持。

Shapefile 屬於一種向量圖形儲存的格式，可以用於描述幾何物件在空間上的位置以及相關資訊，例如：可以儲存道路、建築等空間物件的幾何形狀及位置，也可以儲存屬性，例如：道路名稱、建築面積等等。

Shapefile 實際上是由多個檔案組成，最少需要相同檔案名稱的以下三種檔案(副檔名)：

- `.shp` 記錄物件的幾何形狀
- `.shx` 記錄物件的在 `.shp` 中的索引位置
- `.dbf` 記錄每個幾何物件的屬性資料

其他常見的非必須附屬檔案

- `.prj` 記錄地理坐標系統與投影的資訊

> 若想深入了解更多 Shapefile 檔案附檔名的介紹，可以參考該份文件 [Shapefile file extensions](https://desktop.arcgis.com/en/arcmap/latest/manage-data/shapefiles/shapefile-file-extensions.htm)。

## 實際案例

以政府資料開放平臺上的 [直轄市、縣市界線(TWD97經緯度)](https://data.gov.tw/dataset/7442) 資料為例，[下載](https://data.moi.gov.tw/MoiOD/System/DownloadFile.aspx?DATA=72874C55-884D-4CEA-B7D6-F60B0BE85AB0)後將會拿到 `mapdata202205231050.zip` 壓縮檔案。

解壓縮後可以在資料夾中看到以下檔案：

```txt
.
├── COUNTY_MOI_1090820.CPG
├── COUNTY_MOI_1090820.dbf
├── COUNTY_MOI_1090820.prj
├── COUNTY_MOI_1090820.shp
├── COUNTY_MOI_1090820.shx
├── Metadata.xml
├── TW-01-301000100G-000017.xml
└── 修正清單_1081113&21.xlsx
```

其中名稱為 `COUNTY_MOI_1090820` 的檔案，副檔名包含了 `CPG`, `dbf`, `prj`, `shp` 及 `shx`。

> `.CPG` 檔案是用來記錄 `.dbf` 所使用的字元編碼

以 QGIS 開啟該份 Shapefile 將會看到以下結果，我們可以看到行政區的幾何形狀，可以了解幾何物件對應的屬性，以及幾何物件所在的地理座標位置，均是這些檔案所記錄。

/static/images/202205/Sentinel_EO_Browser/practice_05.png
![county_in_QGIS](/static/images/202206/What-is-a-shapefile/county_in_QGIS.png)

手邊沒有 GIS 軟體可以開啟 Shapefile 的話，可於下方地圖上傳所下載到的 Shapefile 壓縮檔，將可展示 Shapefile 於地圖上 🚀🚀🚀

> 編碼格式 BIG5 的 Shapefile 檔案上傳中文字將會顯示亂碼

<ShapefileViewMap />

## References

- [What is a shapefile?](https://desktop.arcgis.com/en/arcmap/latest/manage-data/shapefiles/what-is-a-shapefile.htm)
- [Shapefile file extensions](https://desktop.arcgis.com/en/arcmap/latest/manage-data/shapefiles/shapefile-file-extensions.htm)
- [直轄市、縣市界線(TWD97經緯度)](https://data.gov.tw/dataset/7442)
