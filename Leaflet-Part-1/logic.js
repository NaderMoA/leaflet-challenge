let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url).then(function (data) {
createMymap(data)
})
function createMymap(earthquake){
//base map
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  let myMap = L.map("map",{
    center: [37.7749,-122.4194],
    zoom: 5,
    layers: [street]
 })
  L.geoJSON(earthquake, {pointToLayer: function(feature, coords){
    let mag = feature.properties.mag;
    let depth = feature.geometry.coordinates[2];
    let circleSize = Math.sqrt(mag)*5;
    
    return L.circleMarker(coords, {
        radius: circleSize,
        fillColor: depth,
        color: "white",
        weight: 1,
        oacity: 1,
        fillOpacity: 0.5
    })}
  }
  ).addTo(myMap)
}
