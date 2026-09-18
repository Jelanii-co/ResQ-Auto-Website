// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// "Use my location" — fills the location field with coordinates,
// which the mechanic can open directly in maps.
const locationBtn = document.getElementById('use-location-btn');
const locationInput = document.getElementById('location');
const locationStatus = document.getElementById('location-status');

if (locationBtn) {
  locationBtn.addEventListener('click', () => {
    if (!('geolocation' in navigator)) {
      locationStatus.textContent = 'Location isn\'t available in this browser — please type your address instead.';
      return;
    }

    locationStatus.textContent = 'Finding your location…';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        locationInput.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        locationStatus.textContent = 'Location added. You can still edit this field.';
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          locationStatus.textContent = 'Location access was blocked — please type your address instead.';
        } else if (error.code === error.TIMEOUT) {
          locationStatus.textContent = 'Location took too long to find — please type your address instead.';
        } else {
          locationStatus.textContent = 'Couldn\'t get your location — please type your address instead.';
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  });
}
