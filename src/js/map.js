let myMap;
 
const init = () => {

 myMap = new ymaps.Map("map", {

   center: [55.753017255272404, 37.59661174853763],
   zoom: 14, 
   controls: []

 });

 var coords = [
  [55.75863289137164, 37.58260879174918],
  [55.74297830313906, 37.58118378883947],
  [55.74988261908961, 37.60389742774722],
  [55.757106067067184, 37.6203831635985]
  ];

  var myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/map-marker.svg',
    iconImageSize: [58, 73],
    iconImageOffset: [-3, -42]
  });

  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');

};
 
ymaps.ready(init);