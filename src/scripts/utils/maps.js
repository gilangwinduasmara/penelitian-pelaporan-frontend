class MapPicker{
    constructor(element, options={}){
        this.element = element;
        // google.maps.event.addDomListener(window, 'load', this.initialize());
        this.initialize();
        if(options.useCurrentPosition){
            this.setCurrentPosition();
        }
        if(options.lat && options.lng){
            this.map.setCenter({lat: parseFloat(options.lat), lng: parseFloat(options.lng)})
            this.map.setZoom(20)
        }else{
            this.setCurrentPosition();
        }
    }

    initialize(){
        console.log('initialize')
        var mapProp = {
            center:new google.maps.LatLng(51.508742,-0.120850),
            zoom:5,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.element, mapProp)
        let div = document.createElement('div')
        // <input id="pac-input" class="controls" type="text" placeholder="Search Box">
        let input = document.createElement('input')
        input.classList.add('form-control')
        input.classList.add('pac-input')
        input.id = this.element.id+"_pac_input"
        input.placeholder = "Cari lokasi ..."
        div.classList.add('centerMarker')
        if (this.element) {
            this.element.classList.add('location-picker')
            this.element.children[0].appendChild(div)
            this.element.children[0].appendChild(input)
        }
        const options = {
            componentRestrictions: { country: "id" },
            fields: ["formatted_address", "geometry", "name"],
            origin: this.map.getCenter(),
            strictBounds: false,
            types: ["establishment"],
        };
        const autocomplete = new google.maps.places.Autocomplete(document.getElementById(this.element.id+"_pac_input"), options);
        autocomplete.bindTo("bounds", this.map);
        autocomplete.addListener("place_changed", (event) => {
            // marker.setVisible(false);
            const place = autocomplete.getPlace();
            console.log(place)
            if (!place.geometry || !place.geometry.location) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert("No details available for input: '" + place.name + "'");
              return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
              this.map.fitBounds(place.geometry.viewport);
            } else {
              this.map.setCenter(place.geometry.location);
            //   this.map.setZoom(17);
            }
          });
    }

    getCenter(){
        const center = this.map.getCenter();
        return {lat: center.lat(), lng: center.lng()};
    }

    setCurrentPosition() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
              this.map.setCenter(pos)
              this.map.setZoom(20)
            },
            () => {
              console.log('Could not determine your location...')
            }
          )
        } else {
          console.log('Your browser does not support Geolocation.')
        }
    }
}

export default MapPicker;