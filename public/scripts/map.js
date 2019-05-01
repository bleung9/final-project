function initMap() {
  const toronto = { lat: 43.6529, lng: -79.3849 };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: toronto
  });

  map.data.loadGeoJson('https://raw.githubusercontent.com/jasonicarter/toronto-geojson/master/toronto_crs84.geojson');


  map.data.setStyle(function (feature) {
    var color = 'gray';
    if (feature.getProperty('isColorful')) {
      color = feature.getProperty('color');
    }
    return ({
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2
    });
  });

  map.data.addListener('click', function (event) {
    if (event.feature.getProperty('isColorful')) {
      event.feature.setProperty('isColorful', false);
      let place = document.getElementById(event.feature.l.AREA_NAME)
      place.remove()
    } else {
      let places = document.getElementById('desired')
      var place = document.createElement('option');
      place.setAttribute('id', event.feature.l.AREA_NAME);
      place.setAttribute('value', event.feature.l.AREA_NAME);
      places.appendChild(place);
      place.innerText = event.feature.l.AREA_NAME
      event.feature.setProperty('isColorful', true);
      id = "exampleFormControlSelect2"
    }
  });

  map.data.addListener('mouseover', function (event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, { strokeWeight: 8 });
  });

  map.data.addListener('mouseout', function (event) {
    map.data.revertStyle();
  });
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}

console.log('hi')

