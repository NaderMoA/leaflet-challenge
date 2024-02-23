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
        circleMarker.bindTooltip(`Click here for more Info`);

        circleMarker.on('click', function(){
        circleMarker.bindPopup(`Magnitude: ${mag} <br> Depth: ${depth} <br> Location: ${location}`).openPopup();
                });

        return circleMarker;
    }
}).addTo(myMap);

let legend = L.control({ position: 'bottomright' });

legend.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'info legend');
    let grades = [-10, 10, 30, 50, 70, 90];
    let colors = ["#006400", "#66FF33", "#CCFF66", "#FFCC66", "#FF9966", "#FF3300"];
    div.style.backgroundColor="#FFFFFF"
    div.style.padding="10px"
    div.innerHTML += '<h4>Depth</h4>';
    // loop through our depth intervals and generate a label with a colored square for each interval
    for (let i = 0; i < colors.length; i++) {
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'>" +"___" +"</i>" + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
           
    }

    return div;
};
legend.addTo(myMap);

}

})

