'use strict';

var MC = require('@kissmybutton/motorcortex');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MC__default = /*#__PURE__*/_interopDefaultLegacy(MC);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

class Loader {
  constructor(apiKey = null, options = {}) {
    this.apiKey = apiKey;
    this.options = options;

    if (typeof window === 'undefined') {
      throw new Error('google-maps is supported only in browser environment');
    }
  }

  load() {
    if (typeof this.api !== 'undefined') {
      return Promise.resolve(this.api);
    }

    if (typeof this.loader !== 'undefined') {
      return this.loader;
    }

    window[Loader.CALLBACK_NAME] = () => {
      this.api = window['google'];

      if (typeof this.resolve === 'undefined') {
        throw new Error('Should not happen');
      }

      this.resolve(this.api);
    };

    window['gm_authFailure'] = () => {
      if (typeof this.reject === 'undefined') {
        throw new Error('Should not happen');
      }

      this.reject(new Error('google-maps: authentication error'));
    };

    return this.loader = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      const script = document.createElement('script');
      script.src = this.createUrl();
      script.async = true;

      script.onerror = e => reject(e);

      document.head.appendChild(script);
    });
  }

  createUrl() {
    const parameters = [`callback=${Loader.CALLBACK_NAME}`];

    if (this.apiKey) {
      parameters.push(`key=${this.apiKey}`);
    }

    for (let name in this.options) {
      if (this.options.hasOwnProperty(name)) {
        let value = this.options[name];

        if (name === 'version') {
          name = 'v';
        }

        if (name === 'libraries') {
          value = value.join(',');
        }

        parameters.push(`${name}=${value}`);
      }
    }

    return `https://maps.googleapis.com/maps/api/js?${parameters.join('&')}`;
  }

}
Loader.CALLBACK_NAME = '_dk_google_maps_loader_cb';

var olMap =
/*#__PURE__*/
function (_MC$API$DOMClip) {
  _inherits(olMap, _MC$API$DOMClip);

  function olMap() {
    _classCallCheck(this, olMap);

    return _possibleConstructorReturn(this, _getPrototypeOf(olMap).apply(this, arguments));
  }

  _createClass(olMap, [{
    key: "onAfterRender",
    value: function onAfterRender() {
      var _this = this;

      var loader = new Loader('AIzaSyA_hEYSWVXFGVfesIRwE6BmQeQzktlKXso', {});
      this.context.loading = true;
      this.contextLoading();
      var gMap = {
        map: {},
        google: {},
        elem: this.context.rootElement
      };
      this.context.rootElement.style.transformOrigin = "center";
      loader.load().then(function (google) {
        gMap.google = google;
        gMap.map = new google.maps.Map(_this.context.rootElement, {
          center: {
            lat: _this.attrs.view.center[1],
            lng: _this.attrs.view.center[0]
          },
          zoom: 20
        });
        _this.context.loading = false;

        _this.contextLoaded();

        _this.setCustomEntity("gmap", gMap, ["maps"]);
      });
      this.setCustomEntity("gmap", gMap, ["maps"]);
    }
  }]);

  return olMap;
}(MC__default['default'].API.DOMClip);

var ZoomTo =
/*#__PURE__*/
function (_MC$API$MonoIncident) {
  _inherits(ZoomTo, _MC$API$MonoIncident);

  function ZoomTo() {
    _classCallCheck(this, ZoomTo);

    return _possibleConstructorReturn(this, _getPrototypeOf(ZoomTo).apply(this, arguments));
  }

  _createClass(ZoomTo, [{
    key: "onProgress",
    value: function onProgress(progress
    /*, millisecond*/
    ) {

      if (this.element.entity.map.getZoom() !== parseInt(11 + progress * 20)) {
        this.element.entity.map.setZoom(parseInt(11 + progress * 20));
      }
    }
  }]);

  return ZoomTo;
}(MC__default['default'].API.MonoIncident);

var index = {
  npm_name: "@kissmybutton/motorcortex-google-maps",
  incidents: [{
    exportable: ZoomTo,
    name: "ZoomTo"
  }],
  compositeAttributes: {
    goto: ["center", "zoom"]
  },
  Clip: olMap
};

module.exports = index;
