document.addEventListener("DOMContentLoaded", function () {
  getLocation(); // Automatically fetch location when the page loads
});

// Function to get the user's live location
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

// Function to handle success of geolocation
function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  // Initialize the map and set its view to the user's location
  var map = L.map('map').setView([lat, lng], 15);

  // Add a dark theme tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  // Add a marker at the user's location
  var marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup("You are here!").openPopup();

  // Use OpenStreetMap Nominatim API for reverse geocoding
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((response) => response.json())
      .then((data) => {
          const locationName = data.display_name;
          console.log(locationName);
          
          document.querySelector(".input-field input").value = locationName;
          document.getElementById("dropdown").style.display = "none";
      })
      .catch((error) => {
          console.error("Error fetching location:", error);
          document.querySelector(
            ".input-field input"
          ).value = `Latitude: ${lat}, Longitude: ${lng}`;
          document.getElementById("dropdown").style.display = "none";
      });
}

// Function to handle geolocation errors
function showError(error) {
  switch (error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
  }
}

// Function to manually enter location
function manualLocation() {
  let manualLocation = prompt("Please enter your location:");
  if (manualLocation != null) {
      document.querySelector(".input-field input").value = manualLocation;
      document.getElementById("dropdown").style.display = "none";
  }
}

// Close the dropdown if clicked outside
window.addEventListener("click", function (e) {
  if (!document.getElementById("areaInput").contains(e.target)) {
      document.getElementById("dropdown").style.display = "none";
  }
});

// Handle destination input and redirect
document.getElementById('destination').addEventListener('change', function() {
  const destination = this.value.trim();
  console.log(destination);
  
  // Check if the destination input is not empty
  if (destination !== "") {
      // Redirect to rides.html page
      window.location.href = "assets/rides.html";
  }
});
