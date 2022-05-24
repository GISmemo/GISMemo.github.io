---
title: WebGIS應用：Sentinel EO Browser 空氣污染監測
date: 2022-05-24
lastmod: '2022-05-24'
tags: ['WebGIS', 'Remote Sensing', 'Air Pollution']
draft: false
authors: ['ChiaCheChang']
---

在空間資訊課程中常提及能以3S系統，即地理資訊系統（Geographic Information System，GIS）、全球導航系統（Global Navigation Satellite System，GNSS）與遙測技術（Remote Sensing，RS）解決地理上的問題，今天要介紹的 [Sentinel Hub EO Browser](https://apps.sentinel-hub.com/eo-browser/) 便是一個方便且強大的 WebGIS 系統，讓我們能透過瀏覽器處理遙測影像並分析成果。

## Sentinel Hub EO Browser

Sentinel Hub EO Browser 是由歐洲太空總署 ESA 所建置的 WebGIS 平台，由名稱便可知這個平台中提供許多 Sentinel 系列衛星的影像可使用，Sentinel 系列衛星中文有人稱呼其為哨兵衛星，頗有衛星從太空中緊盯著地球變化之意，其為目前歐洲太空總署ESA相當重要的任務之一，利用數種不同的衛星取得全球範圍的遙測資料。目前 Sentinel 家族中包含 Sentinel1~6 共七組衛星系統(Sentinel 5包含5及5P)，每個衛星系統依其設計功能不同搭載不同的感測器，未來有機會或許再和大家介紹，且 Sentinel 衛星最重要的一點是其全部為開放資料(Open Data)，任何人皆可免費取得影像並加以分析，通常在拍攝後數小時內即可下載影像，具有極高的時效性。

進入 Sentinel Hub EO Browser 後，先來熟悉這套系統的操作介面，左邊的頁籤可分為 **Discover**、**Visualize**、**Compare** 及 **Pins** 四大區塊

![Sentinel Hub EO Browser - Home Page](/static/images/202205/Sentinel_EO_Browser/home_page.png)

- **Discover**：Discover 頁籤搜尋可以所需要的影像，目前 Sentinel Hub EO Browser 架上的圖資涵蓋光學(Sentinel-2)、雷達(Sentinel-1)、海陸監測(Sentinel-3)及大氣監測衛星(Sentinel-5P)，同時也統整了 Landsat 等資源衛星的開放資料
- **Visualize**：Visualize 頁籤中可以選擇影像展示的方式，基本的呈現方式如真實色或假色影像，而 EO Browser 提供更進階的功能，可以分析如植生指標(Normalized Difference Vegetation Index，NDVI)、水體指標(Normalized Difference Water Index，NDWI)，甚至自訂各波段的視覺化效果。
- **Compare**：Compare 頁籤負責管理圖層，可以於其中操作圖層的順序、透明度等功能，方便我們比較不同的影像
- **Pins**：在 Visualize 頁籤中有 Pin 可以將視窗內的影像釘選，釘選時會同時包含顯示的區域及呈現方式，而影像會自動跑到 Pins 頁籤，我們可以在 Pins 頁籤隨時找回釘選過的影像

而畫面右側的黃色按鈕則提供基本地圖工具，功能依序為，以區域或興趣點做定位、測量距離、圖片輸出、GIF動畫輸出、2D/3D切換及統計分析功能。

## 認識衛星

這次將利用 Sentinel Hub EO Browser 中 Sentinel-2、Sentinel-5P 的資料來分析空氣污染的現象，簡單認識一下 Sentinel-2 及 Sentinel-5P，Sentinel-2 發射於2015(2A)及2017年(2B)，是高解析度的光學衛星，可見光波段的地面解析度為10m，可以用來辨識土地利用；Sentinel-5P 則是大氣監測衛星，發射於2017年，主要用來追蹤溫室氣體的濃度及分布。

### Sentinel-2

- 高解析度光
- 再訪週期：5天，2A
- 13個波段，可見光波段解析度
- 開放資料，可回溯至2017年

![Sentinel-2](/static/images/202205/Sentinel_EO_Browser/Sentinel_2.png)

### Sentinel-5P

- 大氣監測衛星，推估氣膠、溫室氣體
- 再訪週期：約1天
- 地面解析度5.5*3.5km
- 開放資料，可回溯至2018年

![Sentinel-5P](/static/images/202205/Sentinel_EO_Browser/Sentinel_5P.png)

## 實際案例

我們選擇義大利米蘭周圍作為氮氧化物空氣汙染案例研究區域，氮氧化物主要因汽機車廢氣、燃燒煤炭、石油或是天然氣而釋放到空氣中，低濃度的氮氧化物便會刺激呼吸系統，使人體感到不適。本次我們將利用 Sentinel-5P 的觀測資料找出氮氧化物濃度較高的區域，並進一步 Sentinel-2 的可見光影像進一步分析可能的汙染來源。

1. 先利用 Discover 頁籤中的 Search 搜尋 2018/7/27 的 Sentinel-5P 的氮氧化物資料，並點選 Visualize 讓影像顯示出來。

    ![practice_01](/static/images/202205/Sentinel_EO_Browser/practice_01.png)

    ![practice_02](/static/images/202205/Sentinel_EO_Browser/practice_02.png)

2. 此時 Visualize 頁籤中會顯示目前使用的資料，可見到 color bar 代表每單位面積內有多少濃度的氮氧化物，此時我們可以先PIN住影像，方便等等與 Sentinel-2 影像比較。

    ![practice_03](/static/images/202205/Sentinel_EO_Browser/practice_03.png)

3. 再次透過 Discover 頁籤中的 Search 搜尋 2018/7/31 的 Sentinel-2 影像，並點選 Visualize 讓影像顯示出來。

    ![practice_04](/static/images/202205/Sentinel_EO_Browser/practice_04.png)

    ![practice_05](/static/images/202205/Sentinel_EO_Browser/practice_05.png)

4. 同樣地再次 pin 住影像，方便等等進行比較。

    ![practice_06](/static/images/202205/Sentinel_EO_Browser/practice_06.png)

5. 改切換到 Compare 頁籤，此時我們可以將剛剛 pin 住的影像進行比較。

    ![practice_07](/static/images/202205/Sentinel_EO_Browser/practice_07.png)

6. 可以見到在米蘭郊區有部分區域氮氧化物的濃度特別偏高，我們可以進一步使用 Sentinel-2 的可見光影像進行確認，此時可發現在可見光影像中有許多圓形的構造物，其為油槽，故可進一步推斷該處應為石化廠。

    ![practice_08](/static/images/202205/Sentinel_EO_Browser/practice_08.png)

    ![practice_09](/static/images/202205/Sentinel_EO_Browser/practice_09.png)

## 總結

在過往探討空氣汙染時我們常利用實體部屬之測站資料進行監測與後續討論，然而近來因為各國碳排放、碳權議題日漸熱門，如何利用推估國家的實體排碳量成為重要議題，也常成為各國角力的議題之一。故近幾年許多國家的太空單位或民間的商業公司投入相當豐厚的資源希望能以衛星進行大氣觀測，使得讓這個領域日漸熱門，想必未來應該會更多且更高品質的觀測資料可供應用。也希望透過能本文讓大家稍微了解 Sentinel 系列衛星，成為大家進行課程或議題探討時能夠應用的資源！
