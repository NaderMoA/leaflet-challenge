let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url).then(function (data) {
createMymap(data);

console.log(data);
function createMymap(earthquake){
//base map
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
  let myMap = L.map("map",{
    center: [37.7749,-122.4194],
    zoom: 5.5,
    layers: [street]
 });
 function colorScale(depth){
    if(depth > 90) { return "#FF3300"  }
    else if(depth > 70) { return "#FF9966" }
    else if(depth > 50) {return "#FFCC66"}
    else if(depth > 30) {return "#CCFF66"}
    else if(depth > 10) {return "#66FF33"}
    else  {return "#006400"}
    }
 L.geoJSON(earthquake, {
    pointToLayer: function(feature, coords){
        let mag = feature.properties.mag;
        let depth = feature.geometry.coordinates[2];
        let location = feature.properties.place;
        let circleMarker = L.circleMarker(coords, {
            radius: mag * 4,
            fillColor: colorScale(depth),
            color: "white",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5
        });

        // Bind popup to circle marker
        circleMarker.bindTooltip(`Click for more Info`);

        circleMarker.on('click', function(){
        circleMarker.bindPopup(`Magnitude: ${mag} <br> Depth: ${depth} <br> Location: ${location}`).openPopup();
                });

        return circleMarker;
    }
}).addTo(myMap);
}

})

