var poscoord
const http = new XMLHttpRequest()
const result = document.querySelector("#result")

document.querySelector("#share").addEventListener("click", () => {
    console.log("hello")
  findmycoord()
})
function findmycoord(){
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude,position.coords.longitude)
          var poscoord = (position.coords.latitude) +" "+ (position.coords.longitude)
          console.log(poscoord)
      },
      (err) => {
          alert(err.message)
      })
  }
  else{
      alert("geolocation is not supported")
  }
}




// function initMap() {
//     var directionsService = new google.maps.DirectionsService;
//     var directionsDisplay = new google.maps.DirectionsRenderer;
//     const map = new google.maps.Map(document.getElementById("map"), {
//         center:{lat:12.9716,lng:77.5946},
//         zoom: 13,
//       mapTypeControl: false,
//     });
//     directionsDisplay.setMap(map);
//     var onchangerHandler = function(){
//         calculateanddisplayroute(directionsService,directionsDisplay);
//     };
//     document.getElementById("pac-input").addEventListener("change",onchangerHandler);


//     const card = document.getElementById("pac-card");
//     const input = document.getElementById("pac-input");
//     const biasInputElement = document.getElementById("use-location-bias");
//     const strictBoundsInputElement = document.getElementById("use-strict-bounds");
//     const options = {
//       fields: ["formatted_address", "geometry", "name"],
//       strictBounds: false,
//     };
  
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  
//     const autocomplete = new google.maps.places.Autocomplete(input, options);
  

//     autocomplete.bindTo("bounds", map);
  
//     const infowindow = new google.maps.InfoWindow();
//     const infowindowContent = document.getElementById("infowindow-content");
  
//     infowindow.setContent(infowindowContent);
  
//     const marker = new google.maps.Marker({
//       map,
//       anchorPoint: new google.maps.Point(0, -29),
//     });
  
//     autocomplete.addListener("place_changed", () => {
//       infowindow.close();
//       marker.setVisible(false);
  
//       const place = autocomplete.getPlace();
  
//       if (!place.geometry || !place.geometry.location) {
//         window.alert("No details available for input: '" + place.name + "");
//         return;
//       }
  
//       // If the place has a geometry, then present it on a map.
//       if (place.geometry.viewport) {
//         map.fitBounds(place.geometry.viewport);
//       } else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(10);
//       }
  
//       marker.setPosition(place.geometry.location);
//       marker.setVisible(true);
//       infowindowContent.children["place-name"].textContent = place.name;
//       infowindowContent.children["place-address"].textContent = place.formatted_address;
//       infowindow.open(map, marker);
//     });

//   }
  
//   function calculateanddisplayroute(directionsService,directionsDisplay){
//     directionsService.route({
//         origin : poscoord,
//         destination : document.getElementById("pac-input").value,
//         travelmode : "Driving"
//     },function(response,status){
//         if(status == "OK"){
//             directionsDisplay.setDirections(response);
//         }
//         else{
//             window.alert("some error in directions"+status);
//         }
//     }
//     )
//   }
  
//   window.initMap = initMap;



 
  function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center:{lat:12.9716,lng:77.5946},
    });
  
    directionsRenderer.setMap(map);
  
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const curr = document.getElementById("pac-curr");
    // const biasInputElement = document.getElementById("use-location-bias");
    // const strictBoundsInputElement = document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    const autocomplete1 = new google.maps.places.Autocomplete(curr, options);

    autocomplete.bindTo("bounds", map);
    autocomplete1.bindTo("bounds", map);
  
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
  
    infowindow.setContent(infowindowContent);
  
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
  
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
  
      const place = autocomplete.getPlace();
  
      if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for input: '" + place.name + "");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(10);
      }
  
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent = place.formatted_address;
      infowindow.open(map, marker);
    });

    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
  
    // document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("pac-input").addEventListener("change", onChangeHandler);
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
      .route({
        origin: {
          query: document.getElementById("pac-curr").value,
        },
        destination: {
          query: document.getElementById("pac-input").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

//     function calculateAndDisplayRoute(directionsService,directionsRenderer){
//     directionsService
//     .route({
//         origin: {
//           query: poscoord
//         },
//         destination: {
//           query: document.getElementById("pac-input").value,
//         },
//         travelMode: google.maps.TravelMode.DRIVING,
//       },function(response,status){
//         if(status == "OK"){
//             directionsRenderer.setDirections(response);
//         }
//         else{
//             window.alert("some error in directions"+status);
//         }
//     }
//     )
//   }
  
  window.initMap = initMap;