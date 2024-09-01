  // JavaScript to handle the dropdown and location selection
  document.getElementById("areaInput").addEventListener("click", function () {
    document.getElementById("dropdown").style.display = "block";
  });
  
  // Function to get the user's live location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
  
    // Use OpenStreetMap Nominatim API for reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((response) => response.json())
      .then((data) => {
        const locationName = data.display_name;
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
  