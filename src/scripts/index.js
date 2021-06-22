import axios from 'axios';
import 'regenerator-runtime'; 
import Validator from './utils/form-validator';
import MapPicker from './utils/maps';
import { getUrlParams } from './utils/query-parser';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
        }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
        });
    });
}

$('select').select2();
$('form').on('submit', function(event){
    event.preventDefault()
})
$('.topbar-item > a').click(function(){
    window.location.href = $(this).attr('href')
})
const lokasiKejadian = new MapPicker(document.getElementById('lokasi_kejadian'));
google.maps.event.addListener(lokasiKejadian.map, 'idle', function (event) {
    var location = lokasiKejadian.getCenter();
    $('[name="lokasi_lat"]').val(location.lat)
    $('[name="lokasi_long"]').val(location.lng)
});
$('#button__use_current_location').click(function(event){
    event.preventDefault();
    lokasiKejadian.setCurrentPosition();
})
Validator.init()

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const {latitude:lat, longitude:long} = position.coords
        console.log({lat, long})
        $('[name="lokasi_long"]').val(long)
        $('[name="lokasi_lat"]').val(lat)
    });
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

$('#button__submit').click(function(){
    const button = $(this)
    button.attr('disabled', 'true')
    axios.post('http://152.70.96.84:8000/api/pelaporan-sos', $('form').serialize()).then((res) => {
        console.log(JSON.stringify(res.data))
        if(res.data.success){
            window.location.href = '?kode='+res.data.kode
        }
    }).catch(err => {
        button.removeAttr('disabled')
        Validator.handleError(err.response.data.errors)
        if(error.toJSON().message === 'Network Error'){
            toastr.error("Jaringan internet anda bermasalah, silahkan coba lagi")
        }
    })
})

if(getUrlParams().kode){
    let contentHTML = /*html*/ `
        <div class="row">
            <div class="col-xl-12">
                <div class="card card-scretch gutter-b">
                    <div class="card-body">
                        Pelaporan anda sudah kami terima dengan kode pelaporan ${getUrlParams().kode}
                    </div>
                </div>
            </div>
        </div>
    `;
    $('#content').html(contentHTML)
}