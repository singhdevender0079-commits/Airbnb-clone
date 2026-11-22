    const map = new mapboxgl.Map({
        accessToken:mapToken,
        container: 'map', // container ID
        center:listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
console.log(listing.geometry.coordinates);
// Create a new marker.
const marker = new mapboxgl.Marker({color :"red"})
    .setLngLat(listing.geometry.coordinates)
    .addTo(map)
.setPopup( new mapboxgl.Popup({offset: 25})
    .setHTML(`<h1>${listing.title}</h1> <p>exact location will be provided after booking</p>`)
    .setMaxWidth("300px")
    .addTo(map)
);
