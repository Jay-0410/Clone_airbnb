// Initiate map
mapboxgl.accessToken = mapToken;
console.log(mapToken);
console.log(mapboxgl);
console.log(coordinates.length);

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
  console.log(map);
console.log(coordinates);
console.log(coordinates);
const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates)
    .addTo(map);