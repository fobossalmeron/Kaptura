$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 1200, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }

});

(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var allNav = querySelector('header');
  var menuIcon = querySelector('.newmenu');
  var body = querySelector('body');


  function closeMenu() {
    allNav.classList.remove('openmenu');
    body.classList.remove('preventscroll');
  };

  function toggleMenu(){
    allNav.classList.toggle('openmenu');
    body.classList.toggle('preventscroll');
  };

  menuIcon.addEventListener('click', toggleMenu);

  allNav.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });
})();


//Maps
function initMap() {
  var kaptura  = new google.maps.LatLng(19.352037, -99.151034);
  var kapturaOptions = {
    zoom: 16,
    center: kaptura,
    scrollwheel: false
  };
  var mapaKaptura = new google.maps.Map(document.getElementById("mapa"), kapturaOptions);

  mapaKaptura.set("styles", [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
]);

//Define image y guarda en .png, widthxheight en medidas, origen el centro y anchor la punta que señala

  var image = {
      url: '/images/layout/eyemap.svg',
      size: new google.maps.Size(50,50),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(30,70)
  };

  var retailSpot_180ShopMarker = new google.maps.Marker({
    position: kaptura,
    map: mapaKaptura,
    title:"Kaptura",
    icon: image
  });
};

//google.maps.event.addDomListener(window, 'load', initialize);
