// get long/lat from location

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");

    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/df29698ef49b8f5daeb6e6dbc024ce1e/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    // Set DOM Elements from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone.replace(/_/g, " ");
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"))


                    // Change temp from celsius/farenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textConent === "F") {
                            temperatureSpan.textContent = "C";
                        } else {
                            temperatureSpan.textConent = "F";
                        }
                    })
                });

        });
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_");
        skycons.play(); // animates skycon
        return skycons.set(iconId, currentIcon);
    }
    function returnDate() {
        let date = new Date();
        let time = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
        document.querySelector(".time").textContent = time;
    }
    returnDate();


});