"use strict"

let myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [48.695502, 44.508109],
        zoom: 18,
        controls: ['zoomControl',  'fullscreenControl', 'routeButtonControl']
    }, {
        searchControlProvider: 'yandex#search'
    });
    var myPlacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [48.695502, 44.508109]
        },
        properties: {
            hintContent: 'помещение № 9, вход со стороны Волги'
        }
    });
    myMap.geoObjects.add(myPlacemark);
}