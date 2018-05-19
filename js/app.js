// star the script when the page loads
window.onload = function () {
    getLocation();
};

// Get User Location
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            callback = callApi(position);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function callApi(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = '903bf89d114fb180fba8f0646906dcfc';
    const measurement = 'metric';
    console.log(lat, lon)


    axios.get('http://api.openweathermap.org/data/2.5/weather?', {
        params: {
            lat: lat,
            lon: lon,
            units: measurement,
            APPID: apiKey,
        }
    })
        .then(function (position) {
            const location = position.data.name;
            const tempCurrentC = position.data.main.temp;
            const tempHighC = position.data.main.temp_max;
            const tempLowC = position.data.main.temp_min;
            const tempCurrentF = tempCurrentC * 9/5 + 32;
            const tempHighF = tempHighC * 9 / 5 + 32;
            const tempLowF = tempLowC * 9 / 5 + 32;
            const conditions = position.data.weather["0"].description;
            const humidity = position.data.main.humidity;
            const imageCode = position.data.weather["0"].icon;
            let showScale = '&deg;C';

            //console.log(position);
           let showCelsius = innerHTML = `
            <div class="card-body">
                <img id="image" src="" style="height: 100px; width: 100px;">
                <h5 class="card-text lead">Current Temp:</h5>
                <h1 class="card-title" id="tempCurrent"></h1>
                <p id="conditions" class="card-text"></p>
                <br>
                <table class="table table-borderless">
                    <thead>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Humidity</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td id="tempHigh"></td>
                        <td id="tempLow"></td>
                        <td id="humidity"></td>
                    </tr>
                    </tbody>

                </table>
            </div>
            <div class="card-footer text-muted">
                <button href="#" id="myBtn" class="btn btn-primary">Show as Fahrenheit</button>
            </div>
           `;


        })
        .catch(function (error) {
            console.log(error);
        });

}




