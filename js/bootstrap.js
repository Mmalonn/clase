/*!
  * Bootstrap v4.6.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
})(this, (function (exports, $, Popper) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Popper__default = /*#__PURE__*/_interopDefaultLegacy(Popper);

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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Private TransitionEnd Helpers
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($__default["default"](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $__default["default"](this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $__default["default"].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default["default"].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * Public Util API
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (_) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $__default["default"](element).css('transition-duration');
      var transitionDelay = $__default["default"](element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $__default["default"](element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $__default["default"] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $__default["default"].fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * Constants
   */

  var NAME$a = 'alert';
  var VERSION$a = '4.6.1';
  var DATA_KEY$a = 'bs.alert';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$a = $__default["default"].fn[NAME$a];
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_SHOW$7 = 'show';
  var EVENT_CLOSE = "close" + EVENT_KEY$a;
  var EVENT_CLOSED = "closed" + EVENT_KEY$a;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$a + DATA_API_KEY$7;
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  /**
   * Class definition
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$a);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $__default["default"](element).closest("." + CLASS_NAME_ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $__default["default"].Event(EVENT_CLOSE);
      $__default["default"](element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $__default["default"](element).removeClass(CLASS_NAME_SHOW$7);

      if (!$__default["default"](element).hasClass(CLASS_NAME_FADE$5)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $__default["default"](element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $__default["default"](element).detach().trigger(EVENT_CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY$a);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY$a, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }]);

    return Alert;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$a] = Alert._jQueryInterface;
  $__default["default"].fn[NAME$a].Constructor = Alert;

  $__default["default"].fn[NAME$a].noConflict = function () {
    $__default["default"].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Alert._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$9 = 'button';
  var VERSION$9 = '4.6.1';
  var DATA_KEY$9 = 'bs.button';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $__default["default"].fn[NAME$9];
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$9 + DATA_API_KEY$6;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$9 + DATA_API_KEY$6 + " " + ("blur" + EVENT_KEY$9 + DATA_API_KEY$6);
  var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$9 + DATA_API_KEY$6;
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE$2 = '.active';
  var SELECTOR_BUTTON = '.btn';
  /**
   * Class definition
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $__default["default"](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE$3)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE$2);

              if (activeElement) {
                $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE$3);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE$3);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default["default"](input).trigger('change');
            }
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE$3));
        }

        if (triggerChangeEvent) {
          $__default["default"](this._element).toggleClass(CLASS_NAME_ACTIVE$3);
        }
      }
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY$9);

        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY$9, data);
        }

        data.shouldAvoidTriggerChange = avoidTriggerChange;

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Button;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;

    if (!$__default["default"](button).hasClass(CLASS_NAME_BUTTON)) {
      button = $__default["default"](button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
        Button._jQueryInterface.call($__default["default"](button), 'toggle', initialButton.tagName === 'INPUT');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $__default["default"](event.target).closest(SELECTOR_BUTTON)[0];
    $__default["default"](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $__default["default"](window).on(EVENT_LOAD_DATA_API$2, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE$3);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE$3);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$4));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE$3);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE$3);
      }
    }
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$9] = Button._jQueryInterface;
  $__default["default"].fn[NAME$9].Constructor = Button;

  $__default["default"].fn[NAME$9].noConflict = function () {
    $__default["default"].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Button._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$8 = 'carousel';
  var VERSION$8 = '4.6.1';
  var DATA_KEY$8 = 'bs.carousel';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $__default["default"].fn[NAME$8];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$8;
  var EVENT_SLID = "slid" + EVENT_KEY$8;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$8;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$8;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$8;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$8;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$8;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$8;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$8;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$8;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$5;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$8 + DATA_API_KEY$5;
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var Default$7 = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType$7 = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * Class definition
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      var $element = $__default["default"](this._element); // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible

      if (!document.hidden && $element.is(':visible') && $element.css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $__default["default"](this._element).one(EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $__default["default"](this._element).off(EVENT_KEY$8);
      $__default["default"].removeData(this._element, DATA_KEY$8);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, config);
      Util.typeCheckConfig(NAME$8, config, DefaultType$7);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $__default["default"](this._element).on(EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $__default["default"](this._element).on(EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        _this3.touchDeltaX = event.originalEvent.touches && event.originalEvent.touches.length > 1 ? 0 : event.originalEvent.touches[0].clientX - _this3.touchStartX;
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $__default["default"](this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $__default["default"](this._element).on(EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        $__default["default"](this._element).on(EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default["default"](this._element).on(EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        $__default["default"](this._element).on(EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        $__default["default"](this._element).on(EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $__default["default"].Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $__default["default"](this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default["default"](indicators).removeClass(CLASS_NAME_ACTIVE$2);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $__default["default"](nextIndicator).addClass(CLASS_NAME_ACTIVE$2);
        }
      }
    };

    _proto._updateInterval = function _updateInterval() {
      var element = this._activeElement || this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      if (!element) {
        return;
      }

      var elementInterval = parseInt(element.getAttribute('data-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default["default"](nextElement).hasClass(CLASS_NAME_ACTIVE$2)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;
      var slidEvent = $__default["default"].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default["default"](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default["default"](nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $__default["default"](activeElement).addClass(directionalClassName);
        $__default["default"](nextElement).addClass(directionalClassName);
        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $__default["default"](activeElement).one(Util.TRANSITION_END, function () {
          $__default["default"](nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE$2);
          $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE$2 + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $__default["default"](_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE$2);
        $__default["default"](nextElement).addClass(CLASS_NAME_ACTIVE$2);
        this._isSliding = false;
        $__default["default"](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$8);

        var _config = _extends({}, Default$7, $__default["default"](this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default["default"](this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $__default["default"](selector)[0];

      if (!target || !$__default["default"](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $__default["default"](target).data(), $__default["default"](this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default["default"](target), config);

      if (slideIndex) {
        $__default["default"](target).data(DATA_KEY$8).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Carousel;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $__default["default"](window).on(EVENT_LOAD_DATA_API$1, function () {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $__default["default"](carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$8] = Carousel._jQueryInterface;
  $__default["default"].fn[NAME$8].Constructor = Carousel;

  $__default["default"].fn[NAME$8].noConflict = function () {
    $__default["default"].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return Carousel._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$7 = 'collapse';
  var VERSION$7 = '4.6.1';
  var DATA_KEY$7 = 'bs.collapse';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$7 = $__default["default"].fn[NAME$7];
  var CLASS_NAME_SHOW$6 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var EVENT_SHOW$4 = "show" + EVENT_KEY$7;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$7;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$7;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$7;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$7 + DATA_API_KEY$4;
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="collapse"]';
  var Default$6 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$6 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  /**
   * Class definition
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$3));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($__default["default"](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $__default["default"](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $__default["default"](actives).not(this._selector).data(DATA_KEY$7);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $__default["default"].Event(EVENT_SHOW$4);
      $__default["default"](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default["default"](actives).not(this._selector), 'hide');

        if (!activesData) {
          $__default["default"](actives).data(DATA_KEY$7, null);
        }
      }

      var dimension = this._getDimension();

      $__default["default"](this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default["default"](this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $__default["default"](_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$6);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $__default["default"](_this._element).trigger(EVENT_SHOWN$4);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default["default"](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$__default["default"](this._element).hasClass(CLASS_NAME_SHOW$6)) {
        return;
      }

      var startEvent = $__default["default"].Event(EVENT_HIDE$4);
      $__default["default"](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $__default["default"](this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$6);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $__default["default"]([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(CLASS_NAME_SHOW$6)) {
              $__default["default"](trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $__default["default"](_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN$4);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default["default"](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$7);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$7, config, DefaultType$6);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $__default["default"](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $__default["default"](children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $__default["default"](element).hasClass(CLASS_NAME_SHOW$6);

      if (triggerArray.length) {
        $__default["default"](triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY$7);

        var _config = _extends({}, Default$6, $element.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return Collapse;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $__default["default"](this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $__default["default"](selectors).each(function () {
      var $target = $__default["default"](this);
      var data = $target.data(DATA_KEY$7);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$7] = Collapse._jQueryInterface;
  $__default["default"].fn[NAME$7].Constructor = Collapse;

  $__default["default"].fn[NAME$7].noConflict = function () {
    $__default["default"].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Collapse._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$6 = 'dropdown';
  var VERSION$6 = '4.6.1';
  var DATA_KEY$6 = 'bs.dropdown';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$6 = $__default["default"].fn[NAME$6];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE$1);
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_SHOW$5 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$6;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$6;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$6;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$6;
  var EVENT_CLICK = "click" + EVENT_KEY$6;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$6 + DATA_API_KEY$3;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$6 + DATA_API_KEY$3;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$6 + DATA_API_KEY$3;
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$5 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$5 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * Class definition
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var isActive = $__default["default"](this._menu).hasClass(CLASS_NAME_SHOW$5);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED$1) || $__default["default"](this._menu).hasClass(CLASS_NAME_SHOW$5)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $__default["default"].Event(EVENT_SHOW$3, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default["default"](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Totally disable Popper for Dropdowns in Navbar


      if (!this._inNavbar && usePopper) {
        // Check for Popper dependency
        if (typeof Popper__default["default"] === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $__default["default"](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper__default["default"](referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $__default["default"](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default["default"](document.body).children().on('mouseover', null, $__default["default"].noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $__default["default"](this._menu).toggleClass(CLASS_NAME_SHOW$5);
      $__default["default"](parent).toggleClass(CLASS_NAME_SHOW$5).trigger($__default["default"].Event(EVENT_SHOWN$3, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED$1) || !$__default["default"](this._menu).hasClass(CLASS_NAME_SHOW$5)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $__default["default"].Event(EVENT_HIDE$3, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default["default"](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default["default"](this._menu).toggleClass(CLASS_NAME_SHOW$5);
      $__default["default"](parent).toggleClass(CLASS_NAME_SHOW$5).trigger($__default["default"].Event(EVENT_HIDDEN$3, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$6);
      $__default["default"](this._element).off(EVENT_KEY$6);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $__default["default"](this._element).on(EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $__default["default"](this._element).data(), config);
      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $__default["default"](this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default["default"](this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default["default"](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $__default["default"](this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element));
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$6);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default["default"](this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $__default["default"](toggles[i]).data(DATA_KEY$6);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$__default["default"](parent).hasClass(CLASS_NAME_SHOW$5)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $__default["default"].contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $__default["default"].Event(EVENT_HIDE$3, relatedTarget);
        $__default["default"](parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $__default["default"](document.body).children().off('mouseover', null, $__default["default"].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default["default"](dropdownMenu).removeClass(CLASS_NAME_SHOW$5);
        $__default["default"](parent).removeClass(CLASS_NAME_SHOW$5).trigger($__default["default"].Event(EVENT_HIDDEN$3, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE$1 && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $__default["default"](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || $__default["default"](this).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $__default["default"](parent).hasClass(CLASS_NAME_SHOW$5);

      if (!isActive && event.which === ESCAPE_KEYCODE$1) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || event.which === ESCAPE_KEYCODE$1 || event.which === SPACE_KEYCODE) {
        if (event.which === ESCAPE_KEYCODE$1) {
          $__default["default"](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default["default"](this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
        return $__default["default"](item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Dropdown;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$2 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default["default"](this), 'toggle');
  }).on(EVENT_CLICK_DATA_API$2, SELECTOR_FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$6] = Dropdown._jQueryInterface;
  $__default["default"].fn[NAME$6].Constructor = Dropdown;

  $__default["default"].fn[NAME$6].noConflict = function () {
    $__default["default"].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Dropdown._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.6.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $__default["default"].fn[NAME$5];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$5 + DATA_API_KEY$2;
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  var Default$4 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$4 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  /**
   * Class definition
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      var showEvent = $__default["default"].Event(EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      $__default["default"](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      if ($__default["default"](this._element).hasClass(CLASS_NAME_FADE$4)) {
        this._isTransitioning = true;
      }

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default["default"](this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function (event) {
        return _this.hide(event);
      });
      $__default["default"](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function () {
        $__default["default"](_this._element).one(EVENT_MOUSEUP_DISMISS, function (event) {
          if ($__default["default"](event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $__default["default"].Event(EVENT_HIDE$2);
      $__default["default"](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $__default["default"](this._element).hasClass(CLASS_NAME_FADE$4);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default["default"](document).off(EVENT_FOCUSIN);
      $__default["default"](this._element).removeClass(CLASS_NAME_SHOW$4);
      $__default["default"](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default["default"](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default["default"](this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $__default["default"](htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      $__default["default"](document).off(EVENT_FOCUSIN);
      $__default["default"].removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$4, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$4);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      var hideEventPrevented = $__default["default"].Event(EVENT_HIDE_PREVENTED);
      $__default["default"](this._element).trigger(hideEventPrevented);

      if (hideEventPrevented.isDefaultPrevented()) {
        return;
      }

      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }

      this._element.classList.add(CLASS_NAME_STATIC);

      var modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
      $__default["default"](this._element).off(Util.TRANSITION_END);
      $__default["default"](this._element).one(Util.TRANSITION_END, function () {
        _this3._element.classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          $__default["default"](_this3._element).one(Util.TRANSITION_END, function () {
            _this3._element.style.overflowY = '';
          }).emulateTransitionEnd(_this3._element, modalTransitionDuration);
        }
      }).emulateTransitionEnd(modalTransitionDuration);

      this._element.focus();
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $__default["default"](this._element).hasClass(CLASS_NAME_FADE$4);
      var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      if ($__default["default"](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default["default"](this._element).addClass(CLASS_NAME_SHOW$4);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $__default["default"].Event(EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $__default["default"](_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default["default"](this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $__default["default"](document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
      .on(EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $__default["default"](_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $__default["default"](this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE) {
            event.preventDefault();

            _this6.hide();
          } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default["default"](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $__default["default"](window).on(EVENT_RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $__default["default"](window).off(EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $__default["default"](document.body).removeClass(CLASS_NAME_OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $__default["default"](_this8._element).trigger(EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $__default["default"](this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $__default["default"](this._element).hasClass(CLASS_NAME_FADE$4) ? CLASS_NAME_FADE$4 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default["default"](this._backdrop).appendTo(document.body);
        $__default["default"](this._element).on(EVENT_CLICK_DISMISS$1, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this9._config.backdrop === 'static') {
            _this9._triggerBackdropTransition();
          } else {
            _this9.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $__default["default"](this._backdrop).addClass(CLASS_NAME_SHOW$4);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $__default["default"](this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default["default"](this._backdrop).removeClass(CLASS_NAME_SHOW$4);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($__default["default"](this._element).hasClass(CLASS_NAME_FADE$4)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default["default"](this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

        $__default["default"](fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $__default["default"](element).css('padding-right');
          $__default["default"](element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $__default["default"](stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $__default["default"](element).css('margin-right');
          $__default["default"](element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $__default["default"](document.body).css('padding-right');
        $__default["default"](document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $__default["default"](document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default["default"](fixedContent).each(function (index, element) {
        var padding = $__default["default"](element).data('padding-right');
        $__default["default"](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
      $__default["default"](elements).each(function (index, element) {
        var margin = $__default["default"](element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $__default["default"](element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $__default["default"](document.body).data('padding-right');
      $__default["default"](document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$5);

        var _config = _extends({}, Default$4, $__default["default"](this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $__default["default"](this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }]);

    return Modal;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $__default["default"](target).data(DATA_KEY$5) ? 'toggle' : _extends({}, $__default["default"](target).data(), $__default["default"](this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $__default["default"](target).one(EVENT_SHOW$2, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(EVENT_HIDDEN$2, function () {
        if ($__default["default"](_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default["default"](target), config, this);
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$5] = Modal._jQueryInterface;
  $__default["default"].fn[NAME$5].Constructor = Modal;

  $__default["default"].fn[NAME$5].noConflict = function () {
    $__default["default"].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attrName)) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes); // eslint-disable-next-line unicorn/prefer-spread

      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * Constants
   */

  var NAME$4 = 'tooltip';
  var VERSION$4 = '4.6.1';
  var DATA_KEY$4 = 'bs.tooltip';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var JQUERY_NO_CONFLICT$4 = $__default["default"].fn[NAME$4];
  var CLASS_PREFIX$1 = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$3 = 'show';
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$3 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var DefaultType$3 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    INSERTED: "inserted" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    FOCUSIN: "focusin" + EVENT_KEY$4,
    FOCUSOUT: "focusout" + EVENT_KEY$4,
    MOUSEENTER: "mouseenter" + EVENT_KEY$4,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$4
  };
  /**
   * Class definition
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper__default["default"] === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      } // Private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $__default["default"](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $__default["default"](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default["default"](this.getTipElement()).hasClass(CLASS_NAME_SHOW$3)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $__default["default"].removeData(this.element, this.constructor.DATA_KEY);
      $__default["default"](this.element).off(this.constructor.EVENT_KEY);
      $__default["default"](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default["default"](this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($__default["default"](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $__default["default"].Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $__default["default"](this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $__default["default"].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $__default["default"](tip).addClass(CLASS_NAME_FADE$3);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $__default["default"](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default["default"].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default["default"](tip).appendTo(container);
        }

        $__default["default"](this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper__default["default"](this.element, tip, this._getPopperConfig(attachment));
        $__default["default"](tip).addClass(CLASS_NAME_SHOW$3);
        $__default["default"](tip).addClass(this.config.customClass); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $__default["default"](document.body).children().on('mouseover', null, $__default["default"].noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $__default["default"](_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE$3)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $__default["default"](this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $__default["default"].Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $__default["default"](_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default["default"](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $__default["default"](tip).removeClass(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $__default["default"](document.body).children().off('mouseover', null, $__default["default"].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE$3)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $__default["default"](tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default["default"](this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default["default"](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($__default["default"](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default["default"](tip).removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$3);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default["default"](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default["default"](content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element));
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $__default["default"](this.config.container);
      }

      return $__default["default"](document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $__default["default"](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $__default["default"](_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $__default["default"](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default["default"](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default["default"](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if ($__default["default"](context.getTipElement()).hasClass(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default["default"](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default["default"](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $__default["default"](this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default["default"](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $__default["default"](tip).removeClass(CLASS_NAME_FADE$3);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY$4);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$4;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$4;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$4;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$3;
      }
    }]);

    return Tooltip;
  }();
  /**
   * jQuery
   */


  $__default["default"].fn[NAME$4] = Tooltip._jQueryInterface;
  $__default["default"].fn[NAME$4].Constructor = Tooltip;

  $__default["default"].fn[NAME$4].noConflict = function () {
    $__default["default"].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Tooltip._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$3 = 'popover';
  var VERSION$3 = '4.6.1';
  var DATA_KEY$3 = 'bs.popover';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var JQUERY_NO_CONFLICT$3 = $__default["default"].fn[NAME$3];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$2 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';

  var Default$2 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$2 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var Event = {
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    INSERTED: "inserted" + EVENT_KEY$3,
    CLICK: "click" + EVENT_KEY$3,
    FOCUSIN: "focusin" + EVENT_KEY$3,
    FOCUSOUT: "focusout" + EVENT_KEY$3,
    MOUSEENTER: "mouseenter" + EVENT_KEY$3,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$3
  };
  /**
   * Class definition
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default["default"](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default["default"](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $__default["default"](this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(CLASS_NAME_FADE$2 + " " + CLASS_NAME_SHOW$2);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default["default"](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$3);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default["default"](this).data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      get: // Getters
      function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$3;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$3;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$3;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * jQuery
   */


  $__default["default"].fn[NAME$3] = Popover._jQueryInterface;
  $__default["default"].fn[NAME$3].Constructor = Popover;

  $__default["default"].fn[NAME$3].noConflict = function () {
    $__default["default"].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Popover._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$2 = 'scrollspy';
  var VERSION$2 = '4.6.1';
  var DATA_KEY$2 = 'bs.scrollspy';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $__default["default"].fn[NAME$2];
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$2;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$1;
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var Default$1 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$1 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  /**
   * Class definition
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default["default"](this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default["default"](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$2);
      $__default["default"](this._scrollElement).off(EVENT_KEY$2);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        var id = $__default["default"](config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$2);
          $__default["default"](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$2, config, DefaultType$1);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default["default"]([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN$1).find(SELECTOR_DROPDOWN_TOGGLE$1).addClass(CLASS_NAME_ACTIVE$1);
        $link.addClass(CLASS_NAME_ACTIVE$1);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$1); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP$1).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE$1); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP$1).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE$1);
      }

      $__default["default"](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$1);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$1);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY$2);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default["default"](this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](window).on(EVENT_LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default["default"](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$2] = ScrollSpy._jQueryInterface;
  $__default["default"].fn[NAME$2].Constructor = ScrollSpy;

  $__default["default"].fn[NAME$2].noConflict = function () {
    $__default["default"].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME$1 = 'tab';
  var VERSION$1 = '4.6.1';
  var DATA_KEY$1 = 'bs.tab';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $__default["default"].fn[NAME$1];
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$1 = 'show';
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$1;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$1;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$1;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$1;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY$1 + DATA_API_KEY;
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * Class definition
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default["default"](this._element).hasClass(CLASS_NAME_ACTIVE) || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $__default["default"](this._element).closest(SELECTOR_NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = $__default["default"].makeArray($__default["default"](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $__default["default"].Event(EVENT_HIDE$1, {
        relatedTarget: this._element
      });
      var showEvent = $__default["default"].Event(EVENT_SHOW$1, {
        relatedTarget: previous
      });

      if (previous) {
        $__default["default"](previous).trigger(hideEvent);
      }

      $__default["default"](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $__default["default"].Event(EVENT_HIDDEN$1, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default["default"].Event(EVENT_SHOWN$1, {
          relatedTarget: previous
        });
        $__default["default"](previous).trigger(hiddenEvent);
        $__default["default"](_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default["default"](container).find(SELECTOR_ACTIVE_UL) : $__default["default"](container).children(SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default["default"](active).hasClass(CLASS_NAME_FADE$1);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $__default["default"](active).removeClass(CLASS_NAME_SHOW$1).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default["default"](active).removeClass(CLASS_NAME_ACTIVE);
        var dropdownChild = $__default["default"](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $__default["default"](dropdownChild).removeClass(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default["default"](element).addClass(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }

      var parent = element.parentNode;

      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && $__default["default"](parent).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default["default"](element).closest(SELECTOR_DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE));
          $__default["default"](dropdownToggleList).addClass(CLASS_NAME_ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $__default["default"](this);
        var data = $this.data(DATA_KEY$1);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$1, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Tab;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($__default["default"](this), 'show');
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME$1] = Tab._jQueryInterface;
  $__default["default"].fn[NAME$1].Constructor = Tab;

  $__default["default"].fn[NAME$1].noConflict = function () {
    $__default["default"].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Tab._jQueryInterface;
  };

  /**
   * Constants
   */

  var NAME = 'toast';
  var VERSION = '4.6.1';
  var DATA_KEY = 'bs.toast';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY;
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var SELECTOR_DATA_DISMISS = '[data-dismiss="toast"]';
  var Default = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  /**
   * Class definition
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $__default["default"].Event(EVENT_SHOW);
      $__default["default"](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW);

        $__default["default"](_this._element).trigger(EVENT_SHOWN);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      Util.reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default["default"](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var hideEvent = $__default["default"].Event(EVENT_HIDE);
      $__default["default"](this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      $__default["default"](this._element).off(EVENT_CLICK_DISMISS);
      $__default["default"].removeData(this._element, DATA_KEY);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, $__default["default"](this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $__default["default"](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        $__default["default"](_this3._element).trigger(EVENT_HIDDEN);
      };

      this._element.classList.remove(CLASS_NAME_SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default["default"](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default["default"](this);
        var data = $element.data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Toast;
  }();
  /**
   * jQuery
   */


  $__default["default"].fn[NAME] = Toast._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Toast;

  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bootstrap.js.map{"version":3,"file":"bootstrap.js","sources":["../../js/src/util.js","../../js/src/alert.js","../../js/src/button.js","../../js/src/carousel.js","../../js/src/collapse.js","../../js/src/dropdown.js","../../js/src/modal.js","../../js/src/tools/sanitizer.js","../../js/src/tooltip.js","../../js/src/popover.js","../../js/src/scrollspy.js","../../js/src/tab.js","../../js/src/toast.js"],"sourcesContent":["/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): util.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\n\n/**\n * Private TransitionEnd Helpers\n */\n\nconst TRANSITION_END = 'transitionend'\nconst MAX_UID = 1000000\nconst MILLISECONDS_MULTIPLIER = 1000\n\n// Shoutout AngusCroll (https://goo.gl/pxwQGp)\nfunction toType(obj) {\n  if (obj === null || typeof obj === 'undefined') {\n    return `${obj}`\n  }\n\n  return {}.toString.call(obj).match(/\\s([a-z]+)/i)[1].toLowerCase()\n}\n\nfunction getSpecialTransitionEndEvent() {\n  return {\n    bindType: TRANSITION_END,\n    delegateType: TRANSITION_END,\n    handle(event) {\n      if ($(event.target).is(this)) {\n        return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params\n      }\n\n      return undefined\n    }\n  }\n}\n\nfunction transitionEndEmulator(duration) {\n  let called = false\n\n  $(this).one(Util.TRANSITION_END, () => {\n    called = true\n  })\n\n  setTimeout(() => {\n    if (!called) {\n      Util.triggerTransitionEnd(this)\n    }\n  }, duration)\n\n  return this\n}\n\nfunction setTransitionEndSupport() {\n  $.fn.emulateTransitionEnd = transitionEndEmulator\n  $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent()\n}\n\n/**\n * Public Util API\n */\n\nconst Util = {\n  TRANSITION_END: 'bsTransitionEnd',\n\n  getUID(prefix) {\n    do {\n      // eslint-disable-next-line no-bitwise\n      prefix += ~~(Math.random() * MAX_UID) // \"~~\" acts like a faster Math.floor() here\n    } while (document.getElementById(prefix))\n\n    return prefix\n  },\n\n  getSelectorFromElement(element) {\n    let selector = element.getAttribute('data-target')\n\n    if (!selector || selector === '#') {\n      const hrefAttr = element.getAttribute('href')\n      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : ''\n    }\n\n    try {\n      return document.querySelector(selector) ? selector : null\n    } catch (_) {\n      return null\n    }\n  },\n\n  getTransitionDurationFromElement(element) {\n    if (!element) {\n      return 0\n    }\n\n    // Get transition-duration of the element\n    let transitionDuration = $(element).css('transition-duration')\n    let transitionDelay = $(element).css('transition-delay')\n\n    const floatTransitionDuration = parseFloat(transitionDuration)\n    const floatTransitionDelay = parseFloat(transitionDelay)\n\n    // Return 0 if element or transition duration is not found\n    if (!floatTransitionDuration && !floatTransitionDelay) {\n      return 0\n    }\n\n    // If multiple durations are defined, take the first\n    transitionDuration = transitionDuration.split(',')[0]\n    transitionDelay = transitionDelay.split(',')[0]\n\n    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER\n  },\n\n  reflow(element) {\n    return element.offsetHeight\n  },\n\n  triggerTransitionEnd(element) {\n    $(element).trigger(TRANSITION_END)\n  },\n\n  supportsTransitionEnd() {\n    return Boolean(TRANSITION_END)\n  },\n\n  isElement(obj) {\n    return (obj[0] || obj).nodeType\n  },\n\n  typeCheckConfig(componentName, config, configTypes) {\n    for (const property in configTypes) {\n      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {\n        const expectedTypes = configTypes[property]\n        const value = config[property]\n        const valueType = value && Util.isElement(value) ?\n          'element' : toType(value)\n\n        if (!new RegExp(expectedTypes).test(valueType)) {\n          throw new Error(\n            `${componentName.toUpperCase()}: ` +\n            `Option \"${property}\" provided type \"${valueType}\" ` +\n            `but expected type \"${expectedTypes}\".`)\n        }\n      }\n    }\n  },\n\n  findShadowRoot(element) {\n    if (!document.documentElement.attachShadow) {\n      return null\n    }\n\n    // Can find the shadow root otherwise it'll return the document\n    if (typeof element.getRootNode === 'function') {\n      const root = element.getRootNode()\n      return root instanceof ShadowRoot ? root : null\n    }\n\n    if (element instanceof ShadowRoot) {\n      return element\n    }\n\n    // when we don't find a shadow root\n    if (!element.parentNode) {\n      return null\n    }\n\n    return Util.findShadowRoot(element.parentNode)\n  },\n\n  jQueryDetection() {\n    if (typeof $ === 'undefined') {\n      throw new TypeError('Bootstrap\\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\\'s JavaScript.')\n    }\n\n    const version = $.fn.jquery.split(' ')[0].split('.')\n    const minMajor = 1\n    const ltMajor = 2\n    const minMinor = 9\n    const minPatch = 1\n    const maxMajor = 4\n\n    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {\n      throw new Error('Bootstrap\\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')\n    }\n  }\n}\n\nUtil.jQueryDetection()\nsetTransitionEndSupport()\n\nexport default Util\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): alert.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'alert'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.alert'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\n\nconst CLASS_NAME_ALERT = 'alert'\nconst CLASS_NAME_FADE = 'fade'\nconst CLASS_NAME_SHOW = 'show'\n\nconst EVENT_CLOSE = `close${EVENT_KEY}`\nconst EVENT_CLOSED = `closed${EVENT_KEY}`\nconst EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`\n\nconst SELECTOR_DISMISS = '[data-dismiss=\"alert\"]'\n\n/**\n * Class definition\n */\n\nclass Alert {\n  constructor(element) {\n    this._element = element\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  // Public\n  close(element) {\n    let rootElement = this._element\n    if (element) {\n      rootElement = this._getRootElement(element)\n    }\n\n    const customEvent = this._triggerCloseEvent(rootElement)\n\n    if (customEvent.isDefaultPrevented()) {\n      return\n    }\n\n    this._removeElement(rootElement)\n  }\n\n  dispose() {\n    $.removeData(this._element, DATA_KEY)\n    this._element = null\n  }\n\n  // Private\n  _getRootElement(element) {\n    const selector = Util.getSelectorFromElement(element)\n    let parent = false\n\n    if (selector) {\n      parent = document.querySelector(selector)\n    }\n\n    if (!parent) {\n      parent = $(element).closest(`.${CLASS_NAME_ALERT}`)[0]\n    }\n\n    return parent\n  }\n\n  _triggerCloseEvent(element) {\n    const closeEvent = $.Event(EVENT_CLOSE)\n\n    $(element).trigger(closeEvent)\n    return closeEvent\n  }\n\n  _removeElement(element) {\n    $(element).removeClass(CLASS_NAME_SHOW)\n\n    if (!$(element).hasClass(CLASS_NAME_FADE)) {\n      this._destroyElement(element)\n      return\n    }\n\n    const transitionDuration = Util.getTransitionDurationFromElement(element)\n\n    $(element)\n      .one(Util.TRANSITION_END, event => this._destroyElement(element, event))\n      .emulateTransitionEnd(transitionDuration)\n  }\n\n  _destroyElement(element) {\n    $(element)\n      .detach()\n      .trigger(EVENT_CLOSED)\n      .remove()\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      const $element = $(this)\n      let data = $element.data(DATA_KEY)\n\n      if (!data) {\n        data = new Alert(this)\n        $element.data(DATA_KEY, data)\n      }\n\n      if (config === 'close') {\n        data[config](this)\n      }\n    })\n  }\n\n  static _handleDismiss(alertInstance) {\n    return function (event) {\n      if (event) {\n        event.preventDefault()\n      }\n\n      alertInstance.close(this)\n    }\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(document).on(\n  EVENT_CLICK_DATA_API,\n  SELECTOR_DISMISS,\n  Alert._handleDismiss(new Alert())\n)\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Alert._jQueryInterface\n$.fn[NAME].Constructor = Alert\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Alert._jQueryInterface\n}\n\nexport default Alert\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): button.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\n\n/**\n * Constants\n */\n\nconst NAME = 'button'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.button'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\n\nconst CLASS_NAME_ACTIVE = 'active'\nconst CLASS_NAME_BUTTON = 'btn'\nconst CLASS_NAME_FOCUS = 'focus'\n\nconst EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`\nconst EVENT_FOCUS_BLUR_DATA_API = `focus${EVENT_KEY}${DATA_API_KEY} ` +\n                          `blur${EVENT_KEY}${DATA_API_KEY}`\nconst EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`\n\nconst SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^=\"button\"]'\nconst SELECTOR_DATA_TOGGLES = '[data-toggle=\"buttons\"]'\nconst SELECTOR_DATA_TOGGLE = '[data-toggle=\"button\"]'\nconst SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle=\"buttons\"] .btn'\nconst SELECTOR_INPUT = 'input:not([type=\"hidden\"])'\nconst SELECTOR_ACTIVE = '.active'\nconst SELECTOR_BUTTON = '.btn'\n\n/**\n * Class definition\n */\n\nclass Button {\n  constructor(element) {\n    this._element = element\n    this.shouldAvoidTriggerChange = false\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  // Public\n  toggle() {\n    let triggerChangeEvent = true\n    let addAriaPressed = true\n    const rootElement = $(this._element).closest(SELECTOR_DATA_TOGGLES)[0]\n\n    if (rootElement) {\n      const input = this._element.querySelector(SELECTOR_INPUT)\n\n      if (input) {\n        if (input.type === 'radio') {\n          if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {\n            triggerChangeEvent = false\n          } else {\n            const activeElement = rootElement.querySelector(SELECTOR_ACTIVE)\n\n            if (activeElement) {\n              $(activeElement).removeClass(CLASS_NAME_ACTIVE)\n            }\n          }\n        }\n\n        if (triggerChangeEvent) {\n          // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input\n          if (input.type === 'checkbox' || input.type === 'radio') {\n            input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE)\n          }\n\n          if (!this.shouldAvoidTriggerChange) {\n            $(input).trigger('change')\n          }\n        }\n\n        input.focus()\n        addAriaPressed = false\n      }\n    }\n\n    if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {\n      if (addAriaPressed) {\n        this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE))\n      }\n\n      if (triggerChangeEvent) {\n        $(this._element).toggleClass(CLASS_NAME_ACTIVE)\n      }\n    }\n  }\n\n  dispose() {\n    $.removeData(this._element, DATA_KEY)\n    this._element = null\n  }\n\n  // Static\n  static _jQueryInterface(config, avoidTriggerChange) {\n    return this.each(function () {\n      const $element = $(this)\n      let data = $element.data(DATA_KEY)\n\n      if (!data) {\n        data = new Button(this)\n        $element.data(DATA_KEY, data)\n      }\n\n      data.shouldAvoidTriggerChange = avoidTriggerChange\n\n      if (config === 'toggle') {\n        data[config]()\n      }\n    })\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(document)\n  .on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, event => {\n    let button = event.target\n    const initialButton = button\n\n    if (!$(button).hasClass(CLASS_NAME_BUTTON)) {\n      button = $(button).closest(SELECTOR_BUTTON)[0]\n    }\n\n    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {\n      event.preventDefault() // work around Firefox bug #1540995\n    } else {\n      const inputBtn = button.querySelector(SELECTOR_INPUT)\n\n      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {\n        event.preventDefault() // work around Firefox bug #1540995\n        return\n      }\n\n      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {\n        Button._jQueryInterface.call($(button), 'toggle', initialButton.tagName === 'INPUT')\n      }\n    }\n  })\n  .on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, event => {\n    const button = $(event.target).closest(SELECTOR_BUTTON)[0]\n    $(button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type))\n  })\n\n$(window).on(EVENT_LOAD_DATA_API, () => {\n  // ensure correct active class is set to match the controls' actual values/states\n\n  // find all checkboxes/readio buttons inside data-toggle groups\n  let buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS))\n  for (let i = 0, len = buttons.length; i < len; i++) {\n    const button = buttons[i]\n    const input = button.querySelector(SELECTOR_INPUT)\n    if (input.checked || input.hasAttribute('checked')) {\n      button.classList.add(CLASS_NAME_ACTIVE)\n    } else {\n      button.classList.remove(CLASS_NAME_ACTIVE)\n    }\n  }\n\n  // find all button toggles\n  buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE))\n  for (let i = 0, len = buttons.length; i < len; i++) {\n    const button = buttons[i]\n    if (button.getAttribute('aria-pressed') === 'true') {\n      button.classList.add(CLASS_NAME_ACTIVE)\n    } else {\n      button.classList.remove(CLASS_NAME_ACTIVE)\n    }\n  }\n})\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Button._jQueryInterface\n$.fn[NAME].Constructor = Button\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Button._jQueryInterface\n}\n\nexport default Button\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): carousel.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'carousel'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.carousel'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\nconst ARROW_LEFT_KEYCODE = 37 // KeyboardEvent.which value for left arrow key\nconst ARROW_RIGHT_KEYCODE = 39 // KeyboardEvent.which value for right arrow key\nconst TOUCHEVENT_COMPAT_WAIT = 500 // Time for mouse compat events to fire after touch\nconst SWIPE_THRESHOLD = 40\n\nconst CLASS_NAME_CAROUSEL = 'carousel'\nconst CLASS_NAME_ACTIVE = 'active'\nconst CLASS_NAME_SLIDE = 'slide'\nconst CLASS_NAME_RIGHT = 'carousel-item-right'\nconst CLASS_NAME_LEFT = 'carousel-item-left'\nconst CLASS_NAME_NEXT = 'carousel-item-next'\nconst CLASS_NAME_PREV = 'carousel-item-prev'\nconst CLASS_NAME_POINTER_EVENT = 'pointer-event'\n\nconst DIRECTION_NEXT = 'next'\nconst DIRECTION_PREV = 'prev'\nconst DIRECTION_LEFT = 'left'\nconst DIRECTION_RIGHT = 'right'\n\nconst EVENT_SLIDE = `slide${EVENT_KEY}`\nconst EVENT_SLID = `slid${EVENT_KEY}`\nconst EVENT_KEYDOWN = `keydown${EVENT_KEY}`\nconst EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`\nconst EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`\nconst EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`\nconst EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`\nconst EVENT_TOUCHEND = `touchend${EVENT_KEY}`\nconst EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`\nconst EVENT_POINTERUP = `pointerup${EVENT_KEY}`\nconst EVENT_DRAG_START = `dragstart${EVENT_KEY}`\nconst EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`\nconst EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`\n\nconst SELECTOR_ACTIVE = '.active'\nconst SELECTOR_ACTIVE_ITEM = '.active.carousel-item'\nconst SELECTOR_ITEM = '.carousel-item'\nconst SELECTOR_ITEM_IMG = '.carousel-item img'\nconst SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev'\nconst SELECTOR_INDICATORS = '.carousel-indicators'\nconst SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]'\nconst SELECTOR_DATA_RIDE = '[data-ride=\"carousel\"]'\n\nconst Default = {\n  interval: 5000,\n  keyboard: true,\n  slide: false,\n  pause: 'hover',\n  wrap: true,\n  touch: true\n}\n\nconst DefaultType = {\n  interval: '(number|boolean)',\n  keyboard: 'boolean',\n  slide: '(boolean|string)',\n  pause: '(string|boolean)',\n  wrap: 'boolean',\n  touch: 'boolean'\n}\n\nconst PointerType = {\n  TOUCH: 'touch',\n  PEN: 'pen'\n}\n\n/**\n * Class definition\n */\n\nclass Carousel {\n  constructor(element, config) {\n    this._items = null\n    this._interval = null\n    this._activeElement = null\n    this._isPaused = false\n    this._isSliding = false\n    this.touchTimeout = null\n    this.touchStartX = 0\n    this.touchDeltaX = 0\n\n    this._config = this._getConfig(config)\n    this._element = element\n    this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS)\n    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0\n    this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent)\n\n    this._addEventListeners()\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  // Public\n  next() {\n    if (!this._isSliding) {\n      this._slide(DIRECTION_NEXT)\n    }\n  }\n\n  nextWhenVisible() {\n    const $element = $(this._element)\n    // Don't call next when the page isn't visible\n    // or the carousel or its parent isn't visible\n    if (!document.hidden &&\n      ($element.is(':visible') && $element.css('visibility') !== 'hidden')) {\n      this.next()\n    }\n  }\n\n  prev() {\n    if (!this._isSliding) {\n      this._slide(DIRECTION_PREV)\n    }\n  }\n\n  pause(event) {\n    if (!event) {\n      this._isPaused = true\n    }\n\n    if (this._element.querySelector(SELECTOR_NEXT_PREV)) {\n      Util.triggerTransitionEnd(this._element)\n      this.cycle(true)\n    }\n\n    clearInterval(this._interval)\n    this._interval = null\n  }\n\n  cycle(event) {\n    if (!event) {\n      this._isPaused = false\n    }\n\n    if (this._interval) {\n      clearInterval(this._interval)\n      this._interval = null\n    }\n\n    if (this._config.interval && !this._isPaused) {\n      this._updateInterval()\n\n      this._interval = setInterval(\n        (document.visibilityState ? this.nextWhenVisible : this.next).bind(this),\n        this._config.interval\n      )\n    }\n  }\n\n  to(index) {\n    this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM)\n\n    const activeIndex = this._getItemIndex(this._activeElement)\n\n    if (index > this._items.length - 1 || index < 0) {\n      return\n    }\n\n    if (this._isSliding) {\n      $(this._element).one(EVENT_SLID, () => this.to(index))\n      return\n    }\n\n    if (activeIndex === index) {\n      this.pause()\n      this.cycle()\n      return\n    }\n\n    const direction = index > activeIndex ?\n      DIRECTION_NEXT :\n      DIRECTION_PREV\n\n    this._slide(direction, this._items[index])\n  }\n\n  dispose() {\n    $(this._element).off(EVENT_KEY)\n    $.removeData(this._element, DATA_KEY)\n\n    this._items = null\n    this._config = null\n    this._element = null\n    this._interval = null\n    this._isPaused = null\n    this._isSliding = null\n    this._activeElement = null\n    this._indicatorsElement = null\n  }\n\n  // Private\n  _getConfig(config) {\n    config = {\n      ...Default,\n      ...config\n    }\n    Util.typeCheckConfig(NAME, config, DefaultType)\n    return config\n  }\n\n  _handleSwipe() {\n    const absDeltax = Math.abs(this.touchDeltaX)\n\n    if (absDeltax <= SWIPE_THRESHOLD) {\n      return\n    }\n\n    const direction = absDeltax / this.touchDeltaX\n\n    this.touchDeltaX = 0\n\n    // swipe left\n    if (direction > 0) {\n      this.prev()\n    }\n\n    // swipe right\n    if (direction < 0) {\n      this.next()\n    }\n  }\n\n  _addEventListeners() {\n    if (this._config.keyboard) {\n      $(this._element).on(EVENT_KEYDOWN, event => this._keydown(event))\n    }\n\n    if (this._config.pause === 'hover') {\n      $(this._element)\n        .on(EVENT_MOUSEENTER, event => this.pause(event))\n        .on(EVENT_MOUSELEAVE, event => this.cycle(event))\n    }\n\n    if (this._config.touch) {\n      this._addTouchEventListeners()\n    }\n  }\n\n  _addTouchEventListeners() {\n    if (!this._touchSupported) {\n      return\n    }\n\n    const start = event => {\n      if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {\n        this.touchStartX = event.originalEvent.clientX\n      } else if (!this._pointerEvent) {\n        this.touchStartX = event.originalEvent.touches[0].clientX\n      }\n    }\n\n    const move = event => {\n      // ensure swiping with one touch and not pinching\n      this.touchDeltaX = event.originalEvent.touches && event.originalEvent.touches.length > 1 ?\n        0 :\n        event.originalEvent.touches[0].clientX - this.touchStartX\n    }\n\n    const end = event => {\n      if (this._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {\n        this.touchDeltaX = event.originalEvent.clientX - this.touchStartX\n      }\n\n      this._handleSwipe()\n      if (this._config.pause === 'hover') {\n        // If it's a touch-enabled device, mouseenter/leave are fired as\n        // part of the mouse compatibility events on first tap - the carousel\n        // would stop cycling until user tapped out of it;\n        // here, we listen for touchend, explicitly pause the carousel\n        // (as if it's the second time we tap on it, mouseenter compat event\n        // is NOT fired) and after a timeout (to allow for mouse compatibility\n        // events to fire) we explicitly restart cycling\n\n        this.pause()\n        if (this.touchTimeout) {\n          clearTimeout(this.touchTimeout)\n        }\n\n        this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval)\n      }\n    }\n\n    $(this._element.querySelectorAll(SELECTOR_ITEM_IMG))\n      .on(EVENT_DRAG_START, e => e.preventDefault())\n\n    if (this._pointerEvent) {\n      $(this._element).on(EVENT_POINTERDOWN, event => start(event))\n      $(this._element).on(EVENT_POINTERUP, event => end(event))\n\n      this._element.classList.add(CLASS_NAME_POINTER_EVENT)\n    } else {\n      $(this._element).on(EVENT_TOUCHSTART, event => start(event))\n      $(this._element).on(EVENT_TOUCHMOVE, event => move(event))\n      $(this._element).on(EVENT_TOUCHEND, event => end(event))\n    }\n  }\n\n  _keydown(event) {\n    if (/input|textarea/i.test(event.target.tagName)) {\n      return\n    }\n\n    switch (event.which) {\n      case ARROW_LEFT_KEYCODE:\n        event.preventDefault()\n        this.prev()\n        break\n      case ARROW_RIGHT_KEYCODE:\n        event.preventDefault()\n        this.next()\n        break\n      default:\n    }\n  }\n\n  _getItemIndex(element) {\n    this._items = element && element.parentNode ?\n      [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) :\n      []\n    return this._items.indexOf(element)\n  }\n\n  _getItemByDirection(direction, activeElement) {\n    const isNextDirection = direction === DIRECTION_NEXT\n    const isPrevDirection = direction === DIRECTION_PREV\n    const activeIndex = this._getItemIndex(activeElement)\n    const lastItemIndex = this._items.length - 1\n    const isGoingToWrap = isPrevDirection && activeIndex === 0 ||\n                            isNextDirection && activeIndex === lastItemIndex\n\n    if (isGoingToWrap && !this._config.wrap) {\n      return activeElement\n    }\n\n    const delta = direction === DIRECTION_PREV ? -1 : 1\n    const itemIndex = (activeIndex + delta) % this._items.length\n\n    return itemIndex === -1 ?\n      this._items[this._items.length - 1] : this._items[itemIndex]\n  }\n\n  _triggerSlideEvent(relatedTarget, eventDirectionName) {\n    const targetIndex = this._getItemIndex(relatedTarget)\n    const fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM))\n    const slideEvent = $.Event(EVENT_SLIDE, {\n      relatedTarget,\n      direction: eventDirectionName,\n      from: fromIndex,\n      to: targetIndex\n    })\n\n    $(this._element).trigger(slideEvent)\n\n    return slideEvent\n  }\n\n  _setActiveIndicatorElement(element) {\n    if (this._indicatorsElement) {\n      const indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE))\n      $(indicators).removeClass(CLASS_NAME_ACTIVE)\n\n      const nextIndicator = this._indicatorsElement.children[\n        this._getItemIndex(element)\n      ]\n\n      if (nextIndicator) {\n        $(nextIndicator).addClass(CLASS_NAME_ACTIVE)\n      }\n    }\n  }\n\n  _updateInterval() {\n    const element = this._activeElement || this._element.querySelector(SELECTOR_ACTIVE_ITEM)\n\n    if (!element) {\n      return\n    }\n\n    const elementInterval = parseInt(element.getAttribute('data-interval'), 10)\n\n    if (elementInterval) {\n      this._config.defaultInterval = this._config.defaultInterval || this._config.interval\n      this._config.interval = elementInterval\n    } else {\n      this._config.interval = this._config.defaultInterval || this._config.interval\n    }\n  }\n\n  _slide(direction, element) {\n    const activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM)\n    const activeElementIndex = this._getItemIndex(activeElement)\n    const nextElement = element || activeElement &&\n      this._getItemByDirection(direction, activeElement)\n    const nextElementIndex = this._getItemIndex(nextElement)\n    const isCycling = Boolean(this._interval)\n\n    let directionalClassName\n    let orderClassName\n    let eventDirectionName\n\n    if (direction === DIRECTION_NEXT) {\n      directionalClassName = CLASS_NAME_LEFT\n      orderClassName = CLASS_NAME_NEXT\n      eventDirectionName = DIRECTION_LEFT\n    } else {\n      directionalClassName = CLASS_NAME_RIGHT\n      orderClassName = CLASS_NAME_PREV\n      eventDirectionName = DIRECTION_RIGHT\n    }\n\n    if (nextElement && $(nextElement).hasClass(CLASS_NAME_ACTIVE)) {\n      this._isSliding = false\n      return\n    }\n\n    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName)\n    if (slideEvent.isDefaultPrevented()) {\n      return\n    }\n\n    if (!activeElement || !nextElement) {\n      // Some weirdness is happening, so we bail\n      return\n    }\n\n    this._isSliding = true\n\n    if (isCycling) {\n      this.pause()\n    }\n\n    this._setActiveIndicatorElement(nextElement)\n    this._activeElement = nextElement\n\n    const slidEvent = $.Event(EVENT_SLID, {\n      relatedTarget: nextElement,\n      direction: eventDirectionName,\n      from: activeElementIndex,\n      to: nextElementIndex\n    })\n\n    if ($(this._element).hasClass(CLASS_NAME_SLIDE)) {\n      $(nextElement).addClass(orderClassName)\n\n      Util.reflow(nextElement)\n\n      $(activeElement).addClass(directionalClassName)\n      $(nextElement).addClass(directionalClassName)\n\n      const transitionDuration = Util.getTransitionDurationFromElement(activeElement)\n\n      $(activeElement)\n        .one(Util.TRANSITION_END, () => {\n          $(nextElement)\n            .removeClass(`${directionalClassName} ${orderClassName}`)\n            .addClass(CLASS_NAME_ACTIVE)\n\n          $(activeElement).removeClass(`${CLASS_NAME_ACTIVE} ${orderClassName} ${directionalClassName}`)\n\n          this._isSliding = false\n\n          setTimeout(() => $(this._element).trigger(slidEvent), 0)\n        })\n        .emulateTransitionEnd(transitionDuration)\n    } else {\n      $(activeElement).removeClass(CLASS_NAME_ACTIVE)\n      $(nextElement).addClass(CLASS_NAME_ACTIVE)\n\n      this._isSliding = false\n      $(this._element).trigger(slidEvent)\n    }\n\n    if (isCycling) {\n      this.cycle()\n    }\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      let data = $(this).data(DATA_KEY)\n      let _config = {\n        ...Default,\n        ...$(this).data()\n      }\n\n      if (typeof config === 'object') {\n        _config = {\n          ..._config,\n          ...config\n        }\n      }\n\n      const action = typeof config === 'string' ? config : _config.slide\n\n      if (!data) {\n        data = new Carousel(this, _config)\n        $(this).data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'number') {\n        data.to(config)\n      } else if (typeof action === 'string') {\n        if (typeof data[action] === 'undefined') {\n          throw new TypeError(`No method named \"${action}\"`)\n        }\n\n        data[action]()\n      } else if (_config.interval && _config.ride) {\n        data.pause()\n        data.cycle()\n      }\n    })\n  }\n\n  static _dataApiClickHandler(event) {\n    const selector = Util.getSelectorFromElement(this)\n\n    if (!selector) {\n      return\n    }\n\n    const target = $(selector)[0]\n\n    if (!target || !$(target).hasClass(CLASS_NAME_CAROUSEL)) {\n      return\n    }\n\n    const config = {\n      ...$(target).data(),\n      ...$(this).data()\n    }\n    const slideIndex = this.getAttribute('data-slide-to')\n\n    if (slideIndex) {\n      config.interval = false\n    }\n\n    Carousel._jQueryInterface.call($(target), config)\n\n    if (slideIndex) {\n      $(target).data(DATA_KEY).to(slideIndex)\n    }\n\n    event.preventDefault()\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler)\n\n$(window).on(EVENT_LOAD_DATA_API, () => {\n  const carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE))\n  for (let i = 0, len = carousels.length; i < len; i++) {\n    const $carousel = $(carousels[i])\n    Carousel._jQueryInterface.call($carousel, $carousel.data())\n  }\n})\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Carousel._jQueryInterface\n$.fn[NAME].Constructor = Carousel\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Carousel._jQueryInterface\n}\n\nexport default Carousel\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): collapse.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'collapse'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.collapse'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\n\nconst CLASS_NAME_SHOW = 'show'\nconst CLASS_NAME_COLLAPSE = 'collapse'\nconst CLASS_NAME_COLLAPSING = 'collapsing'\nconst CLASS_NAME_COLLAPSED = 'collapsed'\n\nconst DIMENSION_WIDTH = 'width'\nconst DIMENSION_HEIGHT = 'height'\n\nconst EVENT_SHOW = `show${EVENT_KEY}`\nconst EVENT_SHOWN = `shown${EVENT_KEY}`\nconst EVENT_HIDE = `hide${EVENT_KEY}`\nconst EVENT_HIDDEN = `hidden${EVENT_KEY}`\nconst EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`\n\nconst SELECTOR_ACTIVES = '.show, .collapsing'\nconst SELECTOR_DATA_TOGGLE = '[data-toggle=\"collapse\"]'\n\nconst Default = {\n  toggle: true,\n  parent: ''\n}\n\nconst DefaultType = {\n  toggle: 'boolean',\n  parent: '(string|element)'\n}\n\n/**\n * Class definition\n */\n\nclass Collapse {\n  constructor(element, config) {\n    this._isTransitioning = false\n    this._element = element\n    this._config = this._getConfig(config)\n    this._triggerArray = [].slice.call(document.querySelectorAll(\n      `[data-toggle=\"collapse\"][href=\"#${element.id}\"],` +\n      `[data-toggle=\"collapse\"][data-target=\"#${element.id}\"]`\n    ))\n\n    const toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE))\n    for (let i = 0, len = toggleList.length; i < len; i++) {\n      const elem = toggleList[i]\n      const selector = Util.getSelectorFromElement(elem)\n      const filterElement = [].slice.call(document.querySelectorAll(selector))\n        .filter(foundElem => foundElem === element)\n\n      if (selector !== null && filterElement.length > 0) {\n        this._selector = selector\n        this._triggerArray.push(elem)\n      }\n    }\n\n    this._parent = this._config.parent ? this._getParent() : null\n\n    if (!this._config.parent) {\n      this._addAriaAndCollapsedClass(this._element, this._triggerArray)\n    }\n\n    if (this._config.toggle) {\n      this.toggle()\n    }\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  // Public\n  toggle() {\n    if ($(this._element).hasClass(CLASS_NAME_SHOW)) {\n      this.hide()\n    } else {\n      this.show()\n    }\n  }\n\n  show() {\n    if (this._isTransitioning ||\n      $(this._element).hasClass(CLASS_NAME_SHOW)) {\n      return\n    }\n\n    let actives\n    let activesData\n\n    if (this._parent) {\n      actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES))\n        .filter(elem => {\n          if (typeof this._config.parent === 'string') {\n            return elem.getAttribute('data-parent') === this._config.parent\n          }\n\n          return elem.classList.contains(CLASS_NAME_COLLAPSE)\n        })\n\n      if (actives.length === 0) {\n        actives = null\n      }\n    }\n\n    if (actives) {\n      activesData = $(actives).not(this._selector).data(DATA_KEY)\n      if (activesData && activesData._isTransitioning) {\n        return\n      }\n    }\n\n    const startEvent = $.Event(EVENT_SHOW)\n    $(this._element).trigger(startEvent)\n    if (startEvent.isDefaultPrevented()) {\n      return\n    }\n\n    if (actives) {\n      Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide')\n      if (!activesData) {\n        $(actives).data(DATA_KEY, null)\n      }\n    }\n\n    const dimension = this._getDimension()\n\n    $(this._element)\n      .removeClass(CLASS_NAME_COLLAPSE)\n      .addClass(CLASS_NAME_COLLAPSING)\n\n    this._element.style[dimension] = 0\n\n    if (this._triggerArray.length) {\n      $(this._triggerArray)\n        .removeClass(CLASS_NAME_COLLAPSED)\n        .attr('aria-expanded', true)\n    }\n\n    this.setTransitioning(true)\n\n    const complete = () => {\n      $(this._element)\n        .removeClass(CLASS_NAME_COLLAPSING)\n        .addClass(`${CLASS_NAME_COLLAPSE} ${CLASS_NAME_SHOW}`)\n\n      this._element.style[dimension] = ''\n\n      this.setTransitioning(false)\n\n      $(this._element).trigger(EVENT_SHOWN)\n    }\n\n    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1)\n    const scrollSize = `scroll${capitalizedDimension}`\n    const transitionDuration = Util.getTransitionDurationFromElement(this._element)\n\n    $(this._element)\n      .one(Util.TRANSITION_END, complete)\n      .emulateTransitionEnd(transitionDuration)\n\n    this._element.style[dimension] = `${this._element[scrollSize]}px`\n  }\n\n  hide() {\n    if (this._isTransitioning ||\n      !$(this._element).hasClass(CLASS_NAME_SHOW)) {\n      return\n    }\n\n    const startEvent = $.Event(EVENT_HIDE)\n    $(this._element).trigger(startEvent)\n    if (startEvent.isDefaultPrevented()) {\n      return\n    }\n\n    const dimension = this._getDimension()\n\n    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`\n\n    Util.reflow(this._element)\n\n    $(this._element)\n      .addClass(CLASS_NAME_COLLAPSING)\n      .removeClass(`${CLASS_NAME_COLLAPSE} ${CLASS_NAME_SHOW}`)\n\n    const triggerArrayLength = this._triggerArray.length\n    if (triggerArrayLength > 0) {\n      for (let i = 0; i < triggerArrayLength; i++) {\n        const trigger = this._triggerArray[i]\n        const selector = Util.getSelectorFromElement(trigger)\n\n        if (selector !== null) {\n          const $elem = $([].slice.call(document.querySelectorAll(selector)))\n          if (!$elem.hasClass(CLASS_NAME_SHOW)) {\n            $(trigger).addClass(CLASS_NAME_COLLAPSED)\n              .attr('aria-expanded', false)\n          }\n        }\n      }\n    }\n\n    this.setTransitioning(true)\n\n    const complete = () => {\n      this.setTransitioning(false)\n      $(this._element)\n        .removeClass(CLASS_NAME_COLLAPSING)\n        .addClass(CLASS_NAME_COLLAPSE)\n        .trigger(EVENT_HIDDEN)\n    }\n\n    this._element.style[dimension] = ''\n    const transitionDuration = Util.getTransitionDurationFromElement(this._element)\n\n    $(this._element)\n      .one(Util.TRANSITION_END, complete)\n      .emulateTransitionEnd(transitionDuration)\n  }\n\n  setTransitioning(isTransitioning) {\n    this._isTransitioning = isTransitioning\n  }\n\n  dispose() {\n    $.removeData(this._element, DATA_KEY)\n\n    this._config = null\n    this._parent = null\n    this._element = null\n    this._triggerArray = null\n    this._isTransitioning = null\n  }\n\n  // Private\n  _getConfig(config) {\n    config = {\n      ...Default,\n      ...config\n    }\n    config.toggle = Boolean(config.toggle) // Coerce string values\n    Util.typeCheckConfig(NAME, config, DefaultType)\n    return config\n  }\n\n  _getDimension() {\n    const hasWidth = $(this._element).hasClass(DIMENSION_WIDTH)\n    return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT\n  }\n\n  _getParent() {\n    let parent\n\n    if (Util.isElement(this._config.parent)) {\n      parent = this._config.parent\n\n      // It's a jQuery object\n      if (typeof this._config.parent.jquery !== 'undefined') {\n        parent = this._config.parent[0]\n      }\n    } else {\n      parent = document.querySelector(this._config.parent)\n    }\n\n    const selector = `[data-toggle=\"collapse\"][data-parent=\"${this._config.parent}\"]`\n    const children = [].slice.call(parent.querySelectorAll(selector))\n\n    $(children).each((i, element) => {\n      this._addAriaAndCollapsedClass(\n        Collapse._getTargetFromElement(element),\n        [element]\n      )\n    })\n\n    return parent\n  }\n\n  _addAriaAndCollapsedClass(element, triggerArray) {\n    const isOpen = $(element).hasClass(CLASS_NAME_SHOW)\n\n    if (triggerArray.length) {\n      $(triggerArray)\n        .toggleClass(CLASS_NAME_COLLAPSED, !isOpen)\n        .attr('aria-expanded', isOpen)\n    }\n  }\n\n  // Static\n  static _getTargetFromElement(element) {\n    const selector = Util.getSelectorFromElement(element)\n    return selector ? document.querySelector(selector) : null\n  }\n\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      const $element = $(this)\n      let data = $element.data(DATA_KEY)\n      const _config = {\n        ...Default,\n        ...$element.data(),\n        ...(typeof config === 'object' && config ? config : {})\n      }\n\n      if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {\n        _config.toggle = false\n      }\n\n      if (!data) {\n        data = new Collapse(this, _config)\n        $element.data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config]()\n      }\n    })\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {\n  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element\n  if (event.currentTarget.tagName === 'A') {\n    event.preventDefault()\n  }\n\n  const $trigger = $(this)\n  const selector = Util.getSelectorFromElement(this)\n  const selectors = [].slice.call(document.querySelectorAll(selector))\n\n  $(selectors).each(function () {\n    const $target = $(this)\n    const data = $target.data(DATA_KEY)\n    const config = data ? 'toggle' : $trigger.data()\n    Collapse._jQueryInterface.call($target, config)\n  })\n})\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Collapse._jQueryInterface\n$.fn[NAME].Constructor = Collapse\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Collapse._jQueryInterface\n}\n\nexport default Collapse\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): dropdown.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Popper from 'popper.js'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'dropdown'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.dropdown'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\nconst ESCAPE_KEYCODE = 27 // KeyboardEvent.which value for Escape (Esc) key\nconst SPACE_KEYCODE = 32 // KeyboardEvent.which value for space key\nconst TAB_KEYCODE = 9 // KeyboardEvent.which value for tab key\nconst ARROW_UP_KEYCODE = 38 // KeyboardEvent.which value for up arrow key\nconst ARROW_DOWN_KEYCODE = 40 // KeyboardEvent.which value for down arrow key\nconst RIGHT_MOUSE_BUTTON_WHICH = 3 // MouseEvent.which value for the right button (assuming a right-handed mouse)\nconst REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEYCODE}|${ARROW_DOWN_KEYCODE}|${ESCAPE_KEYCODE}`)\n\nconst CLASS_NAME_DISABLED = 'disabled'\nconst CLASS_NAME_SHOW = 'show'\nconst CLASS_NAME_DROPUP = 'dropup'\nconst CLASS_NAME_DROPRIGHT = 'dropright'\nconst CLASS_NAME_DROPLEFT = 'dropleft'\nconst CLASS_NAME_MENURIGHT = 'dropdown-menu-right'\nconst CLASS_NAME_POSITION_STATIC = 'position-static'\n\nconst EVENT_HIDE = `hide${EVENT_KEY}`\nconst EVENT_HIDDEN = `hidden${EVENT_KEY}`\nconst EVENT_SHOW = `show${EVENT_KEY}`\nconst EVENT_SHOWN = `shown${EVENT_KEY}`\nconst EVENT_CLICK = `click${EVENT_KEY}`\nconst EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`\nconst EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`\nconst EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`\n\nconst SELECTOR_DATA_TOGGLE = '[data-toggle=\"dropdown\"]'\nconst SELECTOR_FORM_CHILD = '.dropdown form'\nconst SELECTOR_MENU = '.dropdown-menu'\nconst SELECTOR_NAVBAR_NAV = '.navbar-nav'\nconst SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'\n\nconst PLACEMENT_TOP = 'top-start'\nconst PLACEMENT_TOPEND = 'top-end'\nconst PLACEMENT_BOTTOM = 'bottom-start'\nconst PLACEMENT_BOTTOMEND = 'bottom-end'\nconst PLACEMENT_RIGHT = 'right-start'\nconst PLACEMENT_LEFT = 'left-start'\n\nconst Default = {\n  offset: 0,\n  flip: true,\n  boundary: 'scrollParent',\n  reference: 'toggle',\n  display: 'dynamic',\n  popperConfig: null\n}\n\nconst DefaultType = {\n  offset: '(number|string|function)',\n  flip: 'boolean',\n  boundary: '(string|element)',\n  reference: '(string|element)',\n  display: 'string',\n  popperConfig: '(null|object)'\n}\n\n/**\n * Class definition\n */\n\nclass Dropdown {\n  constructor(element, config) {\n    this._element = element\n    this._popper = null\n    this._config = this._getConfig(config)\n    this._menu = this._getMenuElement()\n    this._inNavbar = this._detectNavbar()\n\n    this._addEventListeners()\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  static get DefaultType() {\n    return DefaultType\n  }\n\n  // Public\n  toggle() {\n    if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED)) {\n      return\n    }\n\n    const isActive = $(this._menu).hasClass(CLASS_NAME_SHOW)\n\n    Dropdown._clearMenus()\n\n    if (isActive) {\n      return\n    }\n\n    this.show(true)\n  }\n\n  show(usePopper = false) {\n    if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED) || $(this._menu).hasClass(CLASS_NAME_SHOW)) {\n      return\n    }\n\n    const relatedTarget = {\n      relatedTarget: this._element\n    }\n    const showEvent = $.Event(EVENT_SHOW, relatedTarget)\n    const parent = Dropdown._getParentFromElement(this._element)\n\n    $(parent).trigger(showEvent)\n\n    if (showEvent.isDefaultPrevented()) {\n      return\n    }\n\n    // Totally disable Popper for Dropdowns in Navbar\n    if (!this._inNavbar && usePopper) {\n      // Check for Popper dependency\n      if (typeof Popper === 'undefined') {\n        throw new TypeError('Bootstrap\\'s dropdowns require Popper (https://popper.js.org)')\n      }\n\n      let referenceElement = this._element\n\n      if (this._config.reference === 'parent') {\n        referenceElement = parent\n      } else if (Util.isElement(this._config.reference)) {\n        referenceElement = this._config.reference\n\n        // Check if it's jQuery element\n        if (typeof this._config.reference.jquery !== 'undefined') {\n          referenceElement = this._config.reference[0]\n        }\n      }\n\n      // If boundary is not `scrollParent`, then set position to `static`\n      // to allow the menu to \"escape\" the scroll parent's boundaries\n      // https://github.com/twbs/bootstrap/issues/24251\n      if (this._config.boundary !== 'scrollParent') {\n        $(parent).addClass(CLASS_NAME_POSITION_STATIC)\n      }\n\n      this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig())\n    }\n\n    // If this is a touch-enabled device we add extra\n    // empty mouseover listeners to the body's immediate children;\n    // only needed because of broken event delegation on iOS\n    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html\n    if ('ontouchstart' in document.documentElement &&\n        $(parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {\n      $(document.body).children().on('mouseover', null, $.noop)\n    }\n\n    this._element.focus()\n    this._element.setAttribute('aria-expanded', true)\n\n    $(this._menu).toggleClass(CLASS_NAME_SHOW)\n    $(parent)\n      .toggleClass(CLASS_NAME_SHOW)\n      .trigger($.Event(EVENT_SHOWN, relatedTarget))\n  }\n\n  hide() {\n    if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED) || !$(this._menu).hasClass(CLASS_NAME_SHOW)) {\n      return\n    }\n\n    const relatedTarget = {\n      relatedTarget: this._element\n    }\n    const hideEvent = $.Event(EVENT_HIDE, relatedTarget)\n    const parent = Dropdown._getParentFromElement(this._element)\n\n    $(parent).trigger(hideEvent)\n\n    if (hideEvent.isDefaultPrevented()) {\n      return\n    }\n\n    if (this._popper) {\n      this._popper.destroy()\n    }\n\n    $(this._menu).toggleClass(CLASS_NAME_SHOW)\n    $(parent)\n      .toggleClass(CLASS_NAME_SHOW)\n      .trigger($.Event(EVENT_HIDDEN, relatedTarget))\n  }\n\n  dispose() {\n    $.removeData(this._element, DATA_KEY)\n    $(this._element).off(EVENT_KEY)\n    this._element = null\n    this._menu = null\n    if (this._popper !== null) {\n      this._popper.destroy()\n      this._popper = null\n    }\n  }\n\n  update() {\n    this._inNavbar = this._detectNavbar()\n    if (this._popper !== null) {\n      this._popper.scheduleUpdate()\n    }\n  }\n\n  // Private\n  _addEventListeners() {\n    $(this._element).on(EVENT_CLICK, event => {\n      event.preventDefault()\n      event.stopPropagation()\n      this.toggle()\n    })\n  }\n\n  _getConfig(config) {\n    config = {\n      ...this.constructor.Default,\n      ...$(this._element).data(),\n      ...config\n    }\n\n    Util.typeCheckConfig(\n      NAME,\n      config,\n      this.constructor.DefaultType\n    )\n\n    return config\n  }\n\n  _getMenuElement() {\n    if (!this._menu) {\n      const parent = Dropdown._getParentFromElement(this._element)\n\n      if (parent) {\n        this._menu = parent.querySelector(SELECTOR_MENU)\n      }\n    }\n\n    return this._menu\n  }\n\n  _getPlacement() {\n    const $parentDropdown = $(this._element.parentNode)\n    let placement = PLACEMENT_BOTTOM\n\n    // Handle dropup\n    if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {\n      placement = $(this._menu).hasClass(CLASS_NAME_MENURIGHT) ?\n        PLACEMENT_TOPEND :\n        PLACEMENT_TOP\n    } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {\n      placement = PLACEMENT_RIGHT\n    } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {\n      placement = PLACEMENT_LEFT\n    } else if ($(this._menu).hasClass(CLASS_NAME_MENURIGHT)) {\n      placement = PLACEMENT_BOTTOMEND\n    }\n\n    return placement\n  }\n\n  _detectNavbar() {\n    return $(this._element).closest('.navbar').length > 0\n  }\n\n  _getOffset() {\n    const offset = {}\n\n    if (typeof this._config.offset === 'function') {\n      offset.fn = data => {\n        data.offsets = {\n          ...data.offsets,\n          ...this._config.offset(data.offsets, this._element)\n        }\n\n        return data\n      }\n    } else {\n      offset.offset = this._config.offset\n    }\n\n    return offset\n  }\n\n  _getPopperConfig() {\n    const popperConfig = {\n      placement: this._getPlacement(),\n      modifiers: {\n        offset: this._getOffset(),\n        flip: {\n          enabled: this._config.flip\n        },\n        preventOverflow: {\n          boundariesElement: this._config.boundary\n        }\n      }\n    }\n\n    // Disable Popper if we have a static display\n    if (this._config.display === 'static') {\n      popperConfig.modifiers.applyStyle = {\n        enabled: false\n      }\n    }\n\n    return {\n      ...popperConfig,\n      ...this._config.popperConfig\n    }\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      let data = $(this).data(DATA_KEY)\n      const _config = typeof config === 'object' ? config : null\n\n      if (!data) {\n        data = new Dropdown(this, _config)\n        $(this).data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config]()\n      }\n    })\n  }\n\n  static _clearMenus(event) {\n    if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH ||\n      event.type === 'keyup' && event.which !== TAB_KEYCODE)) {\n      return\n    }\n\n    const toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE))\n\n    for (let i = 0, len = toggles.length; i < len; i++) {\n      const parent = Dropdown._getParentFromElement(toggles[i])\n      const context = $(toggles[i]).data(DATA_KEY)\n      const relatedTarget = {\n        relatedTarget: toggles[i]\n      }\n\n      if (event && event.type === 'click') {\n        relatedTarget.clickEvent = event\n      }\n\n      if (!context) {\n        continue\n      }\n\n      const dropdownMenu = context._menu\n      if (!$(parent).hasClass(CLASS_NAME_SHOW)) {\n        continue\n      }\n\n      if (event && (event.type === 'click' &&\n          /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) &&\n          $.contains(parent, event.target)) {\n        continue\n      }\n\n      const hideEvent = $.Event(EVENT_HIDE, relatedTarget)\n      $(parent).trigger(hideEvent)\n      if (hideEvent.isDefaultPrevented()) {\n        continue\n      }\n\n      // If this is a touch-enabled device we remove the extra\n      // empty mouseover listeners we added for iOS support\n      if ('ontouchstart' in document.documentElement) {\n        $(document.body).children().off('mouseover', null, $.noop)\n      }\n\n      toggles[i].setAttribute('aria-expanded', 'false')\n\n      if (context._popper) {\n        context._popper.destroy()\n      }\n\n      $(dropdownMenu).removeClass(CLASS_NAME_SHOW)\n      $(parent)\n        .removeClass(CLASS_NAME_SHOW)\n        .trigger($.Event(EVENT_HIDDEN, relatedTarget))\n    }\n  }\n\n  static _getParentFromElement(element) {\n    let parent\n    const selector = Util.getSelectorFromElement(element)\n\n    if (selector) {\n      parent = document.querySelector(selector)\n    }\n\n    return parent || element.parentNode\n  }\n\n  // eslint-disable-next-line complexity\n  static _dataApiKeydownHandler(event) {\n    // If not input/textarea:\n    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command\n    // If input/textarea:\n    //  - If space key => not a dropdown command\n    //  - If key is other than escape\n    //    - If key is not up or down => not a dropdown command\n    //    - If trigger inside the menu => not a dropdown command\n    if (/input|textarea/i.test(event.target.tagName) ?\n      event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE &&\n      (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE ||\n        $(event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {\n      return\n    }\n\n    if (this.disabled || $(this).hasClass(CLASS_NAME_DISABLED)) {\n      return\n    }\n\n    const parent = Dropdown._getParentFromElement(this)\n    const isActive = $(parent).hasClass(CLASS_NAME_SHOW)\n\n    if (!isActive && event.which === ESCAPE_KEYCODE) {\n      return\n    }\n\n    event.preventDefault()\n    event.stopPropagation()\n\n    if (!isActive || (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {\n      if (event.which === ESCAPE_KEYCODE) {\n        $(parent.querySelector(SELECTOR_DATA_TOGGLE)).trigger('focus')\n      }\n\n      $(this).trigger('click')\n      return\n    }\n\n    const items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS))\n      .filter(item => $(item).is(':visible'))\n\n    if (items.length === 0) {\n      return\n    }\n\n    let index = items.indexOf(event.target)\n\n    if (event.which === ARROW_UP_KEYCODE && index > 0) { // Up\n      index--\n    }\n\n    if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) { // Down\n      index++\n    }\n\n    if (index < 0) {\n      index = 0\n    }\n\n    items[index].focus()\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(document)\n  .on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown._dataApiKeydownHandler)\n  .on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler)\n  .on(`${EVENT_CLICK_DATA_API} ${EVENT_KEYUP_DATA_API}`, Dropdown._clearMenus)\n  .on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {\n    event.preventDefault()\n    event.stopPropagation()\n    Dropdown._jQueryInterface.call($(this), 'toggle')\n  })\n  .on(EVENT_CLICK_DATA_API, SELECTOR_FORM_CHILD, e => {\n    e.stopPropagation()\n  })\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Dropdown._jQueryInterface\n$.fn[NAME].Constructor = Dropdown\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Dropdown._jQueryInterface\n}\n\nexport default Dropdown\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): modal.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'modal'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.modal'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\nconst ESCAPE_KEYCODE = 27 // KeyboardEvent.which value for Escape (Esc) key\n\nconst CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable'\nconst CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure'\nconst CLASS_NAME_BACKDROP = 'modal-backdrop'\nconst CLASS_NAME_OPEN = 'modal-open'\nconst CLASS_NAME_FADE = 'fade'\nconst CLASS_NAME_SHOW = 'show'\nconst CLASS_NAME_STATIC = 'modal-static'\n\nconst EVENT_HIDE = `hide${EVENT_KEY}`\nconst EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`\nconst EVENT_HIDDEN = `hidden${EVENT_KEY}`\nconst EVENT_SHOW = `show${EVENT_KEY}`\nconst EVENT_SHOWN = `shown${EVENT_KEY}`\nconst EVENT_FOCUSIN = `focusin${EVENT_KEY}`\nconst EVENT_RESIZE = `resize${EVENT_KEY}`\nconst EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`\nconst EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`\nconst EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`\nconst EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`\nconst EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`\n\nconst SELECTOR_DIALOG = '.modal-dialog'\nconst SELECTOR_MODAL_BODY = '.modal-body'\nconst SELECTOR_DATA_TOGGLE = '[data-toggle=\"modal\"]'\nconst SELECTOR_DATA_DISMISS = '[data-dismiss=\"modal\"]'\nconst SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'\nconst SELECTOR_STICKY_CONTENT = '.sticky-top'\n\nconst Default = {\n  backdrop: true,\n  keyboard: true,\n  focus: true,\n  show: true\n}\n\nconst DefaultType = {\n  backdrop: '(boolean|string)',\n  keyboard: 'boolean',\n  focus: 'boolean',\n  show: 'boolean'\n}\n\n/**\n * Class definition\n */\n\nclass Modal {\n  constructor(element, config) {\n    this._config = this._getConfig(config)\n    this._element = element\n    this._dialog = element.querySelector(SELECTOR_DIALOG)\n    this._backdrop = null\n    this._isShown = false\n    this._isBodyOverflowing = false\n    this._ignoreBackdropClick = false\n    this._isTransitioning = false\n    this._scrollbarWidth = 0\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  // Public\n  toggle(relatedTarget) {\n    return this._isShown ? this.hide() : this.show(relatedTarget)\n  }\n\n  show(relatedTarget) {\n    if (this._isShown || this._isTransitioning) {\n      return\n    }\n\n    const showEvent = $.Event(EVENT_SHOW, {\n      relatedTarget\n    })\n\n    $(this._element).trigger(showEvent)\n\n    if (showEvent.isDefaultPrevented()) {\n      return\n    }\n\n    this._isShown = true\n\n    if ($(this._element).hasClass(CLASS_NAME_FADE)) {\n      this._isTransitioning = true\n    }\n\n    this._checkScrollbar()\n    this._setScrollbar()\n\n    this._adjustDialog()\n\n    this._setEscapeEvent()\n    this._setResizeEvent()\n\n    $(this._element).on(\n      EVENT_CLICK_DISMISS,\n      SELECTOR_DATA_DISMISS,\n      event => this.hide(event)\n    )\n\n    $(this._dialog).on(EVENT_MOUSEDOWN_DISMISS, () => {\n      $(this._element).one(EVENT_MOUSEUP_DISMISS, event => {\n        if ($(event.target).is(this._element)) {\n          this._ignoreBackdropClick = true\n        }\n      })\n    })\n\n    this._showBackdrop(() => this._showElement(relatedTarget))\n  }\n\n  hide(event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    if (!this._isShown || this._isTransitioning) {\n      return\n    }\n\n    const hideEvent = $.Event(EVENT_HIDE)\n\n    $(this._element).trigger(hideEvent)\n\n    if (!this._isShown || hideEvent.isDefaultPrevented()) {\n      return\n    }\n\n    this._isShown = false\n    const transition = $(this._element).hasClass(CLASS_NAME_FADE)\n\n    if (transition) {\n      this._isTransitioning = true\n    }\n\n    this._setEscapeEvent()\n    this._setResizeEvent()\n\n    $(document).off(EVENT_FOCUSIN)\n\n    $(this._element).removeClass(CLASS_NAME_SHOW)\n\n    $(this._element).off(EVENT_CLICK_DISMISS)\n    $(this._dialog).off(EVENT_MOUSEDOWN_DISMISS)\n\n    if (transition) {\n      const transitionDuration = Util.getTransitionDurationFromElement(this._element)\n\n      $(this._element)\n        .one(Util.TRANSITION_END, event => this._hideModal(event))\n        .emulateTransitionEnd(transitionDuration)\n    } else {\n      this._hideModal()\n    }\n  }\n\n  dispose() {\n    [window, this._element, this._dialog]\n      .forEach(htmlElement => $(htmlElement).off(EVENT_KEY))\n\n    /**\n     * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`\n     * Do not move `document` in `htmlElements` array\n     * It will remove `EVENT_CLICK_DATA_API` event that should remain\n     */\n    $(document).off(EVENT_FOCUSIN)\n\n    $.removeData(this._element, DATA_KEY)\n\n    this._config = null\n    this._element = null\n    this._dialog = null\n    this._backdrop = null\n    this._isShown = null\n    this._isBodyOverflowing = null\n    this._ignoreBackdropClick = null\n    this._isTransitioning = null\n    this._scrollbarWidth = null\n  }\n\n  handleUpdate() {\n    this._adjustDialog()\n  }\n\n  // Private\n  _getConfig(config) {\n    config = {\n      ...Default,\n      ...config\n    }\n    Util.typeCheckConfig(NAME, config, DefaultType)\n    return config\n  }\n\n  _triggerBackdropTransition() {\n    const hideEventPrevented = $.Event(EVENT_HIDE_PREVENTED)\n\n    $(this._element).trigger(hideEventPrevented)\n    if (hideEventPrevented.isDefaultPrevented()) {\n      return\n    }\n\n    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight\n\n    if (!isModalOverflowing) {\n      this._element.style.overflowY = 'hidden'\n    }\n\n    this._element.classList.add(CLASS_NAME_STATIC)\n\n    const modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog)\n    $(this._element).off(Util.TRANSITION_END)\n\n    $(this._element).one(Util.TRANSITION_END, () => {\n      this._element.classList.remove(CLASS_NAME_STATIC)\n      if (!isModalOverflowing) {\n        $(this._element).one(Util.TRANSITION_END, () => {\n          this._element.style.overflowY = ''\n        })\n          .emulateTransitionEnd(this._element, modalTransitionDuration)\n      }\n    })\n      .emulateTransitionEnd(modalTransitionDuration)\n    this._element.focus()\n  }\n\n  _showElement(relatedTarget) {\n    const transition = $(this._element).hasClass(CLASS_NAME_FADE)\n    const modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null\n\n    if (!this._element.parentNode ||\n        this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {\n      // Don't move modal's DOM position\n      document.body.appendChild(this._element)\n    }\n\n    this._element.style.display = 'block'\n    this._element.removeAttribute('aria-hidden')\n    this._element.setAttribute('aria-modal', true)\n    this._element.setAttribute('role', 'dialog')\n\n    if ($(this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {\n      modalBody.scrollTop = 0\n    } else {\n      this._element.scrollTop = 0\n    }\n\n    if (transition) {\n      Util.reflow(this._element)\n    }\n\n    $(this._element).addClass(CLASS_NAME_SHOW)\n\n    if (this._config.focus) {\n      this._enforceFocus()\n    }\n\n    const shownEvent = $.Event(EVENT_SHOWN, {\n      relatedTarget\n    })\n\n    const transitionComplete = () => {\n      if (this._config.focus) {\n        this._element.focus()\n      }\n\n      this._isTransitioning = false\n      $(this._element).trigger(shownEvent)\n    }\n\n    if (transition) {\n      const transitionDuration = Util.getTransitionDurationFromElement(this._dialog)\n\n      $(this._dialog)\n        .one(Util.TRANSITION_END, transitionComplete)\n        .emulateTransitionEnd(transitionDuration)\n    } else {\n      transitionComplete()\n    }\n  }\n\n  _enforceFocus() {\n    $(document)\n      .off(EVENT_FOCUSIN) // Guard against infinite focus loop\n      .on(EVENT_FOCUSIN, event => {\n        if (document !== event.target &&\n            this._element !== event.target &&\n            $(this._element).has(event.target).length === 0) {\n          this._element.focus()\n        }\n      })\n  }\n\n  _setEscapeEvent() {\n    if (this._isShown) {\n      $(this._element).on(EVENT_KEYDOWN_DISMISS, event => {\n        if (this._config.keyboard && event.which === ESCAPE_KEYCODE) {\n          event.preventDefault()\n          this.hide()\n        } else if (!this._config.keyboard && event.which === ESCAPE_KEYCODE) {\n          this._triggerBackdropTransition()\n        }\n      })\n    } else if (!this._isShown) {\n      $(this._element).off(EVENT_KEYDOWN_DISMISS)\n    }\n  }\n\n  _setResizeEvent() {\n    if (this._isShown) {\n      $(window).on(EVENT_RESIZE, event => this.handleUpdate(event))\n    } else {\n      $(window).off(EVENT_RESIZE)\n    }\n  }\n\n  _hideModal() {\n    this._element.style.display = 'none'\n    this._element.setAttribute('aria-hidden', true)\n    this._element.removeAttribute('aria-modal')\n    this._element.removeAttribute('role')\n    this._isTransitioning = false\n    this._showBackdrop(() => {\n      $(document.body).removeClass(CLASS_NAME_OPEN)\n      this._resetAdjustments()\n      this._resetScrollbar()\n      $(this._element).trigger(EVENT_HIDDEN)\n    })\n  }\n\n  _removeBackdrop() {\n    if (this._backdrop) {\n      $(this._backdrop).remove()\n      this._backdrop = null\n    }\n  }\n\n  _showBackdrop(callback) {\n    const animate = $(this._element).hasClass(CLASS_NAME_FADE) ?\n      CLASS_NAME_FADE : ''\n\n    if (this._isShown && this._config.backdrop) {\n      this._backdrop = document.createElement('div')\n      this._backdrop.className = CLASS_NAME_BACKDROP\n\n      if (animate) {\n        this._backdrop.classList.add(animate)\n      }\n\n      $(this._backdrop).appendTo(document.body)\n\n      $(this._element).on(EVENT_CLICK_DISMISS, event => {\n        if (this._ignoreBackdropClick) {\n          this._ignoreBackdropClick = false\n          return\n        }\n\n        if (event.target !== event.currentTarget) {\n          return\n        }\n\n        if (this._config.backdrop === 'static') {\n          this._triggerBackdropTransition()\n        } else {\n          this.hide()\n        }\n      })\n\n      if (animate) {\n        Util.reflow(this._backdrop)\n      }\n\n      $(this._backdrop).addClass(CLASS_NAME_SHOW)\n\n      if (!callback) {\n        return\n      }\n\n      if (!animate) {\n        callback()\n        return\n      }\n\n      const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop)\n\n      $(this._backdrop)\n        .one(Util.TRANSITION_END, callback)\n        .emulateTransitionEnd(backdropTransitionDuration)\n    } else if (!this._isShown && this._backdrop) {\n      $(this._backdrop).removeClass(CLASS_NAME_SHOW)\n\n      const callbackRemove = () => {\n        this._removeBackdrop()\n        if (callback) {\n          callback()\n        }\n      }\n\n      if ($(this._element).hasClass(CLASS_NAME_FADE)) {\n        const backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop)\n\n        $(this._backdrop)\n          .one(Util.TRANSITION_END, callbackRemove)\n          .emulateTransitionEnd(backdropTransitionDuration)\n      } else {\n        callbackRemove()\n      }\n    } else if (callback) {\n      callback()\n    }\n  }\n\n  // ----------------------------------------------------------------------\n  // the following methods are used to handle overflowing modals\n  // todo (fat): these should probably be refactored out of modal.js\n  // ----------------------------------------------------------------------\n\n  _adjustDialog() {\n    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight\n\n    if (!this._isBodyOverflowing && isModalOverflowing) {\n      this._element.style.paddingLeft = `${this._scrollbarWidth}px`\n    }\n\n    if (this._isBodyOverflowing && !isModalOverflowing) {\n      this._element.style.paddingRight = `${this._scrollbarWidth}px`\n    }\n  }\n\n  _resetAdjustments() {\n    this._element.style.paddingLeft = ''\n    this._element.style.paddingRight = ''\n  }\n\n  _checkScrollbar() {\n    const rect = document.body.getBoundingClientRect()\n    this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth\n    this._scrollbarWidth = this._getScrollbarWidth()\n  }\n\n  _setScrollbar() {\n    if (this._isBodyOverflowing) {\n      // Note: DOMNode.style.paddingRight returns the actual value or '' if not set\n      //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set\n      const fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT))\n      const stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT))\n\n      // Adjust fixed content padding\n      $(fixedContent).each((index, element) => {\n        const actualPadding = element.style.paddingRight\n        const calculatedPadding = $(element).css('padding-right')\n        $(element)\n          .data('padding-right', actualPadding)\n          .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`)\n      })\n\n      // Adjust sticky content margin\n      $(stickyContent).each((index, element) => {\n        const actualMargin = element.style.marginRight\n        const calculatedMargin = $(element).css('margin-right')\n        $(element)\n          .data('margin-right', actualMargin)\n          .css('margin-right', `${parseFloat(calculatedMargin) - this._scrollbarWidth}px`)\n      })\n\n      // Adjust body padding\n      const actualPadding = document.body.style.paddingRight\n      const calculatedPadding = $(document.body).css('padding-right')\n      $(document.body)\n        .data('padding-right', actualPadding)\n        .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`)\n    }\n\n    $(document.body).addClass(CLASS_NAME_OPEN)\n  }\n\n  _resetScrollbar() {\n    // Restore fixed content padding\n    const fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT))\n    $(fixedContent).each((index, element) => {\n      const padding = $(element).data('padding-right')\n      $(element).removeData('padding-right')\n      element.style.paddingRight = padding ? padding : ''\n    })\n\n    // Restore sticky content\n    const elements = [].slice.call(document.querySelectorAll(`${SELECTOR_STICKY_CONTENT}`))\n    $(elements).each((index, element) => {\n      const margin = $(element).data('margin-right')\n      if (typeof margin !== 'undefined') {\n        $(element).css('margin-right', margin).removeData('margin-right')\n      }\n    })\n\n    // Restore body padding\n    const padding = $(document.body).data('padding-right')\n    $(document.body).removeData('padding-right')\n    document.body.style.paddingRight = padding ? padding : ''\n  }\n\n  _getScrollbarWidth() { // thx d.walsh\n    const scrollDiv = document.createElement('div')\n    scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER\n    document.body.appendChild(scrollDiv)\n    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth\n    document.body.removeChild(scrollDiv)\n    return scrollbarWidth\n  }\n\n  // Static\n  static _jQueryInterface(config, relatedTarget) {\n    return this.each(function () {\n      let data = $(this).data(DATA_KEY)\n      const _config = {\n        ...Default,\n        ...$(this).data(),\n        ...(typeof config === 'object' && config ? config : {})\n      }\n\n      if (!data) {\n        data = new Modal(this, _config)\n        $(this).data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config](relatedTarget)\n      } else if (_config.show) {\n        data.show(relatedTarget)\n      }\n    })\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {\n  let target\n  const selector = Util.getSelectorFromElement(this)\n\n  if (selector) {\n    target = document.querySelector(selector)\n  }\n\n  const config = $(target).data(DATA_KEY) ?\n    'toggle' : {\n      ...$(target).data(),\n      ...$(this).data()\n    }\n\n  if (this.tagName === 'A' || this.tagName === 'AREA') {\n    event.preventDefault()\n  }\n\n  const $target = $(target).one(EVENT_SHOW, showEvent => {\n    if (showEvent.isDefaultPrevented()) {\n      // Only register focus restorer if modal will actually get shown\n      return\n    }\n\n    $target.one(EVENT_HIDDEN, () => {\n      if ($(this).is(':visible')) {\n        this.focus()\n      }\n    })\n  })\n\n  Modal._jQueryInterface.call($(target), config, this)\n})\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Modal._jQueryInterface\n$.fn[NAME].Constructor = Modal\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Modal._jQueryInterface\n}\n\nexport default Modal\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): tools/sanitizer.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nconst uriAttrs = [\n  'background',\n  'cite',\n  'href',\n  'itemtype',\n  'longdesc',\n  'poster',\n  'src',\n  'xlink:href'\n]\n\nconst ARIA_ATTRIBUTE_PATTERN = /^aria-[\\w-]*$/i\n\nexport const DefaultWhitelist = {\n  // Global attributes allowed on any supplied element below.\n  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],\n  a: ['target', 'href', 'title', 'rel'],\n  area: [],\n  b: [],\n  br: [],\n  col: [],\n  code: [],\n  div: [],\n  em: [],\n  hr: [],\n  h1: [],\n  h2: [],\n  h3: [],\n  h4: [],\n  h5: [],\n  h6: [],\n  i: [],\n  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],\n  li: [],\n  ol: [],\n  p: [],\n  pre: [],\n  s: [],\n  small: [],\n  span: [],\n  sub: [],\n  sup: [],\n  strong: [],\n  u: [],\n  ul: []\n}\n\n/**\n * A pattern that recognizes a commonly useful subset of URLs that are safe.\n *\n * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts\n */\nconst SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i\n\n/**\n * A pattern that matches safe data URLs. Only matches image, video and audio types.\n *\n * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts\n */\nconst DATA_URL_PATTERN = /^data:(?:image\\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\\/(?:mpeg|mp4|ogg|webm)|audio\\/(?:mp3|oga|ogg|opus));base64,[\\d+/a-z]+=*$/i\n\nfunction allowedAttribute(attr, allowedAttributeList) {\n  const attrName = attr.nodeName.toLowerCase()\n\n  if (allowedAttributeList.indexOf(attrName) !== -1) {\n    if (uriAttrs.indexOf(attrName) !== -1) {\n      return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue))\n    }\n\n    return true\n  }\n\n  const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp)\n\n  // Check if a regular expression validates the attribute.\n  for (let i = 0, len = regExp.length; i < len; i++) {\n    if (regExp[i].test(attrName)) {\n      return true\n    }\n  }\n\n  return false\n}\n\nexport function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {\n  if (unsafeHtml.length === 0) {\n    return unsafeHtml\n  }\n\n  if (sanitizeFn && typeof sanitizeFn === 'function') {\n    return sanitizeFn(unsafeHtml)\n  }\n\n  const domParser = new window.DOMParser()\n  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html')\n  const whitelistKeys = Object.keys(whiteList)\n  const elements = [].slice.call(createdDocument.body.querySelectorAll('*'))\n\n  for (let i = 0, len = elements.length; i < len; i++) {\n    const el = elements[i]\n    const elName = el.nodeName.toLowerCase()\n\n    if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {\n      el.parentNode.removeChild(el)\n\n      continue\n    }\n\n    const attributeList = [].slice.call(el.attributes)\n    // eslint-disable-next-line unicorn/prefer-spread\n    const whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || [])\n\n    attributeList.forEach(attr => {\n      if (!allowedAttribute(attr, whitelistedAttributes)) {\n        el.removeAttribute(attr.nodeName)\n      }\n    })\n  }\n\n  return createdDocument.body.innerHTML\n}\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): tooltip.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport { DefaultWhitelist, sanitizeHtml } from './tools/sanitizer'\nimport $ from 'jquery'\nimport Popper from 'popper.js'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'tooltip'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.tooltip'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\nconst CLASS_PREFIX = 'bs-tooltip'\nconst BSCLS_PREFIX_REGEX = new RegExp(`(^|\\\\s)${CLASS_PREFIX}\\\\S+`, 'g')\nconst DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn']\n\nconst CLASS_NAME_FADE = 'fade'\nconst CLASS_NAME_SHOW = 'show'\n\nconst HOVER_STATE_SHOW = 'show'\nconst HOVER_STATE_OUT = 'out'\n\nconst SELECTOR_TOOLTIP_INNER = '.tooltip-inner'\nconst SELECTOR_ARROW = '.arrow'\n\nconst TRIGGER_HOVER = 'hover'\nconst TRIGGER_FOCUS = 'focus'\nconst TRIGGER_CLICK = 'click'\nconst TRIGGER_MANUAL = 'manual'\n\nconst AttachmentMap = {\n  AUTO: 'auto',\n  TOP: 'top',\n  RIGHT: 'right',\n  BOTTOM: 'bottom',\n  LEFT: 'left'\n}\n\nconst Default = {\n  animation: true,\n  template: '<div class=\"tooltip\" role=\"tooltip\">' +\n                    '<div class=\"arrow\"></div>' +\n                    '<div class=\"tooltip-inner\"></div></div>',\n  trigger: 'hover focus',\n  title: '',\n  delay: 0,\n  html: false,\n  selector: false,\n  placement: 'top',\n  offset: 0,\n  container: false,\n  fallbackPlacement: 'flip',\n  boundary: 'scrollParent',\n  customClass: '',\n  sanitize: true,\n  sanitizeFn: null,\n  whiteList: DefaultWhitelist,\n  popperConfig: null\n}\n\nconst DefaultType = {\n  animation: 'boolean',\n  template: 'string',\n  title: '(string|element|function)',\n  trigger: 'string',\n  delay: '(number|object)',\n  html: 'boolean',\n  selector: '(string|boolean)',\n  placement: '(string|function)',\n  offset: '(number|string|function)',\n  container: '(string|element|boolean)',\n  fallbackPlacement: '(string|array)',\n  boundary: '(string|element)',\n  customClass: '(string|function)',\n  sanitize: 'boolean',\n  sanitizeFn: '(null|function)',\n  whiteList: 'object',\n  popperConfig: '(null|object)'\n}\n\nconst Event = {\n  HIDE: `hide${EVENT_KEY}`,\n  HIDDEN: `hidden${EVENT_KEY}`,\n  SHOW: `show${EVENT_KEY}`,\n  SHOWN: `shown${EVENT_KEY}`,\n  INSERTED: `inserted${EVENT_KEY}`,\n  CLICK: `click${EVENT_KEY}`,\n  FOCUSIN: `focusin${EVENT_KEY}`,\n  FOCUSOUT: `focusout${EVENT_KEY}`,\n  MOUSEENTER: `mouseenter${EVENT_KEY}`,\n  MOUSELEAVE: `mouseleave${EVENT_KEY}`\n}\n\n/**\n * Class definition\n */\n\nclass Tooltip {\n  constructor(element, config) {\n    if (typeof Popper === 'undefined') {\n      throw new TypeError('Bootstrap\\'s tooltips require Popper (https://popper.js.org)')\n    }\n\n    // Private\n    this._isEnabled = true\n    this._timeout = 0\n    this._hoverState = ''\n    this._activeTrigger = {}\n    this._popper = null\n\n    // Protected\n    this.element = element\n    this.config = this._getConfig(config)\n    this.tip = null\n\n    this._setListeners()\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  static get NAME() {\n    return NAME\n  }\n\n  static get DATA_KEY() {\n    return DATA_KEY\n  }\n\n  static get Event() {\n    return Event\n  }\n\n  static get EVENT_KEY() {\n    return EVENT_KEY\n  }\n\n  static get DefaultType() {\n    return DefaultType\n  }\n\n  // Public\n  enable() {\n    this._isEnabled = true\n  }\n\n  disable() {\n    this._isEnabled = false\n  }\n\n  toggleEnabled() {\n    this._isEnabled = !this._isEnabled\n  }\n\n  toggle(event) {\n    if (!this._isEnabled) {\n      return\n    }\n\n    if (event) {\n      const dataKey = this.constructor.DATA_KEY\n      let context = $(event.currentTarget).data(dataKey)\n\n      if (!context) {\n        context = new this.constructor(\n          event.currentTarget,\n          this._getDelegateConfig()\n        )\n        $(event.currentTarget).data(dataKey, context)\n      }\n\n      context._activeTrigger.click = !context._activeTrigger.click\n\n      if (context._isWithActiveTrigger()) {\n        context._enter(null, context)\n      } else {\n        context._leave(null, context)\n      }\n    } else {\n      if ($(this.getTipElement()).hasClass(CLASS_NAME_SHOW)) {\n        this._leave(null, this)\n        return\n      }\n\n      this._enter(null, this)\n    }\n  }\n\n  dispose() {\n    clearTimeout(this._timeout)\n\n    $.removeData(this.element, this.constructor.DATA_KEY)\n\n    $(this.element).off(this.constructor.EVENT_KEY)\n    $(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler)\n\n    if (this.tip) {\n      $(this.tip).remove()\n    }\n\n    this._isEnabled = null\n    this._timeout = null\n    this._hoverState = null\n    this._activeTrigger = null\n    if (this._popper) {\n      this._popper.destroy()\n    }\n\n    this._popper = null\n    this.element = null\n    this.config = null\n    this.tip = null\n  }\n\n  show() {\n    if ($(this.element).css('display') === 'none') {\n      throw new Error('Please use show on visible elements')\n    }\n\n    const showEvent = $.Event(this.constructor.Event.SHOW)\n    if (this.isWithContent() && this._isEnabled) {\n      $(this.element).trigger(showEvent)\n\n      const shadowRoot = Util.findShadowRoot(this.element)\n      const isInTheDom = $.contains(\n        shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement,\n        this.element\n      )\n\n      if (showEvent.isDefaultPrevented() || !isInTheDom) {\n        return\n      }\n\n      const tip = this.getTipElement()\n      const tipId = Util.getUID(this.constructor.NAME)\n\n      tip.setAttribute('id', tipId)\n      this.element.setAttribute('aria-describedby', tipId)\n\n      this.setContent()\n\n      if (this.config.animation) {\n        $(tip).addClass(CLASS_NAME_FADE)\n      }\n\n      const placement = typeof this.config.placement === 'function' ?\n        this.config.placement.call(this, tip, this.element) :\n        this.config.placement\n\n      const attachment = this._getAttachment(placement)\n      this.addAttachmentClass(attachment)\n\n      const container = this._getContainer()\n      $(tip).data(this.constructor.DATA_KEY, this)\n\n      if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {\n        $(tip).appendTo(container)\n      }\n\n      $(this.element).trigger(this.constructor.Event.INSERTED)\n\n      this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment))\n\n      $(tip).addClass(CLASS_NAME_SHOW)\n      $(tip).addClass(this.config.customClass)\n\n      // If this is a touch-enabled device we add extra\n      // empty mouseover listeners to the body's immediate children;\n      // only needed because of broken event delegation on iOS\n      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html\n      if ('ontouchstart' in document.documentElement) {\n        $(document.body).children().on('mouseover', null, $.noop)\n      }\n\n      const complete = () => {\n        if (this.config.animation) {\n          this._fixTransition()\n        }\n\n        const prevHoverState = this._hoverState\n        this._hoverState = null\n\n        $(this.element).trigger(this.constructor.Event.SHOWN)\n\n        if (prevHoverState === HOVER_STATE_OUT) {\n          this._leave(null, this)\n        }\n      }\n\n      if ($(this.tip).hasClass(CLASS_NAME_FADE)) {\n        const transitionDuration = Util.getTransitionDurationFromElement(this.tip)\n\n        $(this.tip)\n          .one(Util.TRANSITION_END, complete)\n          .emulateTransitionEnd(transitionDuration)\n      } else {\n        complete()\n      }\n    }\n  }\n\n  hide(callback) {\n    const tip = this.getTipElement()\n    const hideEvent = $.Event(this.constructor.Event.HIDE)\n    const complete = () => {\n      if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {\n        tip.parentNode.removeChild(tip)\n      }\n\n      this._cleanTipClass()\n      this.element.removeAttribute('aria-describedby')\n      $(this.element).trigger(this.constructor.Event.HIDDEN)\n      if (this._popper !== null) {\n        this._popper.destroy()\n      }\n\n      if (callback) {\n        callback()\n      }\n    }\n\n    $(this.element).trigger(hideEvent)\n\n    if (hideEvent.isDefaultPrevented()) {\n      return\n    }\n\n    $(tip).removeClass(CLASS_NAME_SHOW)\n\n    // If this is a touch-enabled device we remove the extra\n    // empty mouseover listeners we added for iOS support\n    if ('ontouchstart' in document.documentElement) {\n      $(document.body).children().off('mouseover', null, $.noop)\n    }\n\n    this._activeTrigger[TRIGGER_CLICK] = false\n    this._activeTrigger[TRIGGER_FOCUS] = false\n    this._activeTrigger[TRIGGER_HOVER] = false\n\n    if ($(this.tip).hasClass(CLASS_NAME_FADE)) {\n      const transitionDuration = Util.getTransitionDurationFromElement(tip)\n\n      $(tip)\n        .one(Util.TRANSITION_END, complete)\n        .emulateTransitionEnd(transitionDuration)\n    } else {\n      complete()\n    }\n\n    this._hoverState = ''\n  }\n\n  update() {\n    if (this._popper !== null) {\n      this._popper.scheduleUpdate()\n    }\n  }\n\n  // Protected\n  isWithContent() {\n    return Boolean(this.getTitle())\n  }\n\n  addAttachmentClass(attachment) {\n    $(this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`)\n  }\n\n  getTipElement() {\n    this.tip = this.tip || $(this.config.template)[0]\n    return this.tip\n  }\n\n  setContent() {\n    const tip = this.getTipElement()\n    this.setElementContent($(tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle())\n    $(tip).removeClass(`${CLASS_NAME_FADE} ${CLASS_NAME_SHOW}`)\n  }\n\n  setElementContent($element, content) {\n    if (typeof content === 'object' && (content.nodeType || content.jquery)) {\n      // Content is a DOM node or a jQuery\n      if (this.config.html) {\n        if (!$(content).parent().is($element)) {\n          $element.empty().append(content)\n        }\n      } else {\n        $element.text($(content).text())\n      }\n\n      return\n    }\n\n    if (this.config.html) {\n      if (this.config.sanitize) {\n        content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn)\n      }\n\n      $element.html(content)\n    } else {\n      $element.text(content)\n    }\n  }\n\n  getTitle() {\n    let title = this.element.getAttribute('data-original-title')\n\n    if (!title) {\n      title = typeof this.config.title === 'function' ?\n        this.config.title.call(this.element) :\n        this.config.title\n    }\n\n    return title\n  }\n\n  // Private\n  _getPopperConfig(attachment) {\n    const defaultBsConfig = {\n      placement: attachment,\n      modifiers: {\n        offset: this._getOffset(),\n        flip: {\n          behavior: this.config.fallbackPlacement\n        },\n        arrow: {\n          element: SELECTOR_ARROW\n        },\n        preventOverflow: {\n          boundariesElement: this.config.boundary\n        }\n      },\n      onCreate: data => {\n        if (data.originalPlacement !== data.placement) {\n          this._handlePopperPlacementChange(data)\n        }\n      },\n      onUpdate: data => this._handlePopperPlacementChange(data)\n    }\n\n    return {\n      ...defaultBsConfig,\n      ...this.config.popperConfig\n    }\n  }\n\n  _getOffset() {\n    const offset = {}\n\n    if (typeof this.config.offset === 'function') {\n      offset.fn = data => {\n        data.offsets = {\n          ...data.offsets,\n          ...this.config.offset(data.offsets, this.element)\n        }\n\n        return data\n      }\n    } else {\n      offset.offset = this.config.offset\n    }\n\n    return offset\n  }\n\n  _getContainer() {\n    if (this.config.container === false) {\n      return document.body\n    }\n\n    if (Util.isElement(this.config.container)) {\n      return $(this.config.container)\n    }\n\n    return $(document).find(this.config.container)\n  }\n\n  _getAttachment(placement) {\n    return AttachmentMap[placement.toUpperCase()]\n  }\n\n  _setListeners() {\n    const triggers = this.config.trigger.split(' ')\n\n    triggers.forEach(trigger => {\n      if (trigger === 'click') {\n        $(this.element).on(\n          this.constructor.Event.CLICK,\n          this.config.selector,\n          event => this.toggle(event)\n        )\n      } else if (trigger !== TRIGGER_MANUAL) {\n        const eventIn = trigger === TRIGGER_HOVER ?\n          this.constructor.Event.MOUSEENTER :\n          this.constructor.Event.FOCUSIN\n        const eventOut = trigger === TRIGGER_HOVER ?\n          this.constructor.Event.MOUSELEAVE :\n          this.constructor.Event.FOCUSOUT\n\n        $(this.element)\n          .on(eventIn, this.config.selector, event => this._enter(event))\n          .on(eventOut, this.config.selector, event => this._leave(event))\n      }\n    })\n\n    this._hideModalHandler = () => {\n      if (this.element) {\n        this.hide()\n      }\n    }\n\n    $(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler)\n\n    if (this.config.selector) {\n      this.config = {\n        ...this.config,\n        trigger: 'manual',\n        selector: ''\n      }\n    } else {\n      this._fixTitle()\n    }\n  }\n\n  _fixTitle() {\n    const titleType = typeof this.element.getAttribute('data-original-title')\n\n    if (this.element.getAttribute('title') || titleType !== 'string') {\n      this.element.setAttribute(\n        'data-original-title',\n        this.element.getAttribute('title') || ''\n      )\n\n      this.element.setAttribute('title', '')\n    }\n  }\n\n  _enter(event, context) {\n    const dataKey = this.constructor.DATA_KEY\n    context = context || $(event.currentTarget).data(dataKey)\n\n    if (!context) {\n      context = new this.constructor(\n        event.currentTarget,\n        this._getDelegateConfig()\n      )\n      $(event.currentTarget).data(dataKey, context)\n    }\n\n    if (event) {\n      context._activeTrigger[\n        event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER\n      ] = true\n    }\n\n    if ($(context.getTipElement()).hasClass(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {\n      context._hoverState = HOVER_STATE_SHOW\n      return\n    }\n\n    clearTimeout(context._timeout)\n\n    context._hoverState = HOVER_STATE_SHOW\n\n    if (!context.config.delay || !context.config.delay.show) {\n      context.show()\n      return\n    }\n\n    context._timeout = setTimeout(() => {\n      if (context._hoverState === HOVER_STATE_SHOW) {\n        context.show()\n      }\n    }, context.config.delay.show)\n  }\n\n  _leave(event, context) {\n    const dataKey = this.constructor.DATA_KEY\n    context = context || $(event.currentTarget).data(dataKey)\n\n    if (!context) {\n      context = new this.constructor(\n        event.currentTarget,\n        this._getDelegateConfig()\n      )\n      $(event.currentTarget).data(dataKey, context)\n    }\n\n    if (event) {\n      context._activeTrigger[\n        event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER\n      ] = false\n    }\n\n    if (context._isWithActiveTrigger()) {\n      return\n    }\n\n    clearTimeout(context._timeout)\n\n    context._hoverState = HOVER_STATE_OUT\n\n    if (!context.config.delay || !context.config.delay.hide) {\n      context.hide()\n      return\n    }\n\n    context._timeout = setTimeout(() => {\n      if (context._hoverState === HOVER_STATE_OUT) {\n        context.hide()\n      }\n    }, context.config.delay.hide)\n  }\n\n  _isWithActiveTrigger() {\n    for (const trigger in this._activeTrigger) {\n      if (this._activeTrigger[trigger]) {\n        return true\n      }\n    }\n\n    return false\n  }\n\n  _getConfig(config) {\n    const dataAttributes = $(this.element).data()\n\n    Object.keys(dataAttributes)\n      .forEach(dataAttr => {\n        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {\n          delete dataAttributes[dataAttr]\n        }\n      })\n\n    config = {\n      ...this.constructor.Default,\n      ...dataAttributes,\n      ...(typeof config === 'object' && config ? config : {})\n    }\n\n    if (typeof config.delay === 'number') {\n      config.delay = {\n        show: config.delay,\n        hide: config.delay\n      }\n    }\n\n    if (typeof config.title === 'number') {\n      config.title = config.title.toString()\n    }\n\n    if (typeof config.content === 'number') {\n      config.content = config.content.toString()\n    }\n\n    Util.typeCheckConfig(\n      NAME,\n      config,\n      this.constructor.DefaultType\n    )\n\n    if (config.sanitize) {\n      config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn)\n    }\n\n    return config\n  }\n\n  _getDelegateConfig() {\n    const config = {}\n\n    if (this.config) {\n      for (const key in this.config) {\n        if (this.constructor.Default[key] !== this.config[key]) {\n          config[key] = this.config[key]\n        }\n      }\n    }\n\n    return config\n  }\n\n  _cleanTipClass() {\n    const $tip = $(this.getTipElement())\n    const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX)\n    if (tabClass !== null && tabClass.length) {\n      $tip.removeClass(tabClass.join(''))\n    }\n  }\n\n  _handlePopperPlacementChange(popperData) {\n    this.tip = popperData.instance.popper\n    this._cleanTipClass()\n    this.addAttachmentClass(this._getAttachment(popperData.placement))\n  }\n\n  _fixTransition() {\n    const tip = this.getTipElement()\n    const initConfigAnimation = this.config.animation\n\n    if (tip.getAttribute('x-placement') !== null) {\n      return\n    }\n\n    $(tip).removeClass(CLASS_NAME_FADE)\n    this.config.animation = false\n    this.hide()\n    this.show()\n    this.config.animation = initConfigAnimation\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      const $element = $(this)\n      let data = $element.data(DATA_KEY)\n      const _config = typeof config === 'object' && config\n\n      if (!data && /dispose|hide/.test(config)) {\n        return\n      }\n\n      if (!data) {\n        data = new Tooltip(this, _config)\n        $element.data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config]()\n      }\n    })\n  }\n}\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Tooltip._jQueryInterface\n$.fn[NAME].Constructor = Tooltip\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Tooltip._jQueryInterface\n}\n\nexport default Tooltip\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): popover.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Tooltip from './tooltip'\n\n/**\n * Constants\n */\n\nconst NAME = 'popover'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.popover'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\nconst CLASS_PREFIX = 'bs-popover'\nconst BSCLS_PREFIX_REGEX = new RegExp(`(^|\\\\s)${CLASS_PREFIX}\\\\S+`, 'g')\n\nconst CLASS_NAME_FADE = 'fade'\nconst CLASS_NAME_SHOW = 'show'\n\nconst SELECTOR_TITLE = '.popover-header'\nconst SELECTOR_CONTENT = '.popover-body'\n\nconst Default = {\n  ...Tooltip.Default,\n  placement: 'right',\n  trigger: 'click',\n  content: '',\n  template: '<div class=\"popover\" role=\"tooltip\">' +\n              '<div class=\"arrow\"></div>' +\n              '<h3 class=\"popover-header\"></h3>' +\n              '<div class=\"popover-body\"></div></div>'\n}\n\nconst DefaultType = {\n  ...Tooltip.DefaultType,\n  content: '(string|element|function)'\n}\n\nconst Event = {\n  HIDE: `hide${EVENT_KEY}`,\n  HIDDEN: `hidden${EVENT_KEY}`,\n  SHOW: `show${EVENT_KEY}`,\n  SHOWN: `shown${EVENT_KEY}`,\n  INSERTED: `inserted${EVENT_KEY}`,\n  CLICK: `click${EVENT_KEY}`,\n  FOCUSIN: `focusin${EVENT_KEY}`,\n  FOCUSOUT: `focusout${EVENT_KEY}`,\n  MOUSEENTER: `mouseenter${EVENT_KEY}`,\n  MOUSELEAVE: `mouseleave${EVENT_KEY}`\n}\n\n/**\n * Class definition\n */\n\nclass Popover extends Tooltip {\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  static get NAME() {\n    return NAME\n  }\n\n  static get DATA_KEY() {\n    return DATA_KEY\n  }\n\n  static get Event() {\n    return Event\n  }\n\n  static get EVENT_KEY() {\n    return EVENT_KEY\n  }\n\n  static get DefaultType() {\n    return DefaultType\n  }\n\n  // Overrides\n  isWithContent() {\n    return this.getTitle() || this._getContent()\n  }\n\n  addAttachmentClass(attachment) {\n    $(this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`)\n  }\n\n  getTipElement() {\n    this.tip = this.tip || $(this.config.template)[0]\n    return this.tip\n  }\n\n  setContent() {\n    const $tip = $(this.getTipElement())\n\n    // We use append for html objects to maintain js events\n    this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle())\n    let content = this._getContent()\n    if (typeof content === 'function') {\n      content = content.call(this.element)\n    }\n\n    this.setElementContent($tip.find(SELECTOR_CONTENT), content)\n\n    $tip.removeClass(`${CLASS_NAME_FADE} ${CLASS_NAME_SHOW}`)\n  }\n\n  // Private\n  _getContent() {\n    return this.element.getAttribute('data-content') ||\n      this.config.content\n  }\n\n  _cleanTipClass() {\n    const $tip = $(this.getTipElement())\n    const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX)\n    if (tabClass !== null && tabClass.length > 0) {\n      $tip.removeClass(tabClass.join(''))\n    }\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      let data = $(this).data(DATA_KEY)\n      const _config = typeof config === 'object' ? config : null\n\n      if (!data && /dispose|hide/.test(config)) {\n        return\n      }\n\n      if (!data) {\n        data = new Popover(this, _config)\n        $(this).data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config]()\n      }\n    })\n  }\n}\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Popover._jQueryInterface\n$.fn[NAME].Constructor = Popover\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Popover._jQueryInterface\n}\n\nexport default Popover\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): scrollspy.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'scrollspy'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.scrollspy'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\n\nconst CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item'\nconst CLASS_NAME_ACTIVE = 'active'\n\nconst EVENT_ACTIVATE = `activate${EVENT_KEY}`\nconst EVENT_SCROLL = `scroll${EVENT_KEY}`\nconst EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`\n\nconst METHOD_OFFSET = 'offset'\nconst METHOD_POSITION = 'position'\n\nconst SELECTOR_DATA_SPY = '[data-spy=\"scroll\"]'\nconst SELECTOR_NAV_LIST_GROUP = '.nav, .list-group'\nconst SELECTOR_NAV_LINKS = '.nav-link'\nconst SELECTOR_NAV_ITEMS = '.nav-item'\nconst SELECTOR_LIST_ITEMS = '.list-group-item'\nconst SELECTOR_DROPDOWN = '.dropdown'\nconst SELECTOR_DROPDOWN_ITEMS = '.dropdown-item'\nconst SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle'\n\nconst Default = {\n  offset: 10,\n  method: 'auto',\n  target: ''\n}\n\nconst DefaultType = {\n  offset: 'number',\n  method: 'string',\n  target: '(string|element)'\n}\n\n/**\n * Class definition\n */\n\nclass ScrollSpy {\n  constructor(element, config) {\n    this._element = element\n    this._scrollElement = element.tagName === 'BODY' ? window : element\n    this._config = this._getConfig(config)\n    this._selector = `${this._config.target} ${SELECTOR_NAV_LINKS},` +\n                          `${this._config.target} ${SELECTOR_LIST_ITEMS},` +\n                          `${this._config.target} ${SELECTOR_DROPDOWN_ITEMS}`\n    this._offsets = []\n    this._targets = []\n    this._activeTarget = null\n    this._scrollHeight = 0\n\n    $(this._scrollElement).on(EVENT_SCROLL, event => this._process(event))\n\n    this.refresh()\n    this._process()\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  // Public\n  refresh() {\n    const autoMethod = this._scrollElement === this._scrollElement.window ?\n      METHOD_OFFSET : METHOD_POSITION\n\n    const offsetMethod = this._config.method === 'auto' ?\n      autoMethod : this._config.method\n\n    const offsetBase = offsetMethod === METHOD_POSITION ?\n      this._getScrollTop() : 0\n\n    this._offsets = []\n    this._targets = []\n\n    this._scrollHeight = this._getScrollHeight()\n\n    const targets = [].slice.call(document.querySelectorAll(this._selector))\n\n    targets\n      .map(element => {\n        let target\n        const targetSelector = Util.getSelectorFromElement(element)\n\n        if (targetSelector) {\n          target = document.querySelector(targetSelector)\n        }\n\n        if (target) {\n          const targetBCR = target.getBoundingClientRect()\n          if (targetBCR.width || targetBCR.height) {\n            // TODO (fat): remove sketch reliance on jQuery position/offset\n            return [\n              $(target)[offsetMethod]().top + offsetBase,\n              targetSelector\n            ]\n          }\n        }\n\n        return null\n      })\n      .filter(item => item)\n      .sort((a, b) => a[0] - b[0])\n      .forEach(item => {\n        this._offsets.push(item[0])\n        this._targets.push(item[1])\n      })\n  }\n\n  dispose() {\n    $.removeData(this._element, DATA_KEY)\n    $(this._scrollElement).off(EVENT_KEY)\n\n    this._element = null\n    this._scrollElement = null\n    this._config = null\n    this._selector = null\n    this._offsets = null\n    this._targets = null\n    this._activeTarget = null\n    this._scrollHeight = null\n  }\n\n  // Private\n  _getConfig(config) {\n    config = {\n      ...Default,\n      ...(typeof config === 'object' && config ? config : {})\n    }\n\n    if (typeof config.target !== 'string' && Util.isElement(config.target)) {\n      let id = $(config.target).attr('id')\n      if (!id) {\n        id = Util.getUID(NAME)\n        $(config.target).attr('id', id)\n      }\n\n      config.target = `#${id}`\n    }\n\n    Util.typeCheckConfig(NAME, config, DefaultType)\n\n    return config\n  }\n\n  _getScrollTop() {\n    return this._scrollElement === window ?\n      this._scrollElement.pageYOffset : this._scrollElement.scrollTop\n  }\n\n  _getScrollHeight() {\n    return this._scrollElement.scrollHeight || Math.max(\n      document.body.scrollHeight,\n      document.documentElement.scrollHeight\n    )\n  }\n\n  _getOffsetHeight() {\n    return this._scrollElement === window ?\n      window.innerHeight : this._scrollElement.getBoundingClientRect().height\n  }\n\n  _process() {\n    const scrollTop = this._getScrollTop() + this._config.offset\n    const scrollHeight = this._getScrollHeight()\n    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight()\n\n    if (this._scrollHeight !== scrollHeight) {\n      this.refresh()\n    }\n\n    if (scrollTop >= maxScroll) {\n      const target = this._targets[this._targets.length - 1]\n\n      if (this._activeTarget !== target) {\n        this._activate(target)\n      }\n\n      return\n    }\n\n    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {\n      this._activeTarget = null\n      this._clear()\n      return\n    }\n\n    for (let i = this._offsets.length; i--;) {\n      const isActiveTarget = this._activeTarget !== this._targets[i] &&\n          scrollTop >= this._offsets[i] &&\n          (typeof this._offsets[i + 1] === 'undefined' ||\n              scrollTop < this._offsets[i + 1])\n\n      if (isActiveTarget) {\n        this._activate(this._targets[i])\n      }\n    }\n  }\n\n  _activate(target) {\n    this._activeTarget = target\n\n    this._clear()\n\n    const queries = this._selector\n      .split(',')\n      .map(selector => `${selector}[data-target=\"${target}\"],${selector}[href=\"${target}\"]`)\n\n    const $link = $([].slice.call(document.querySelectorAll(queries.join(','))))\n\n    if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {\n      $link.closest(SELECTOR_DROPDOWN)\n        .find(SELECTOR_DROPDOWN_TOGGLE)\n        .addClass(CLASS_NAME_ACTIVE)\n      $link.addClass(CLASS_NAME_ACTIVE)\n    } else {\n      // Set triggered link as active\n      $link.addClass(CLASS_NAME_ACTIVE)\n      // Set triggered links parents as active\n      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor\n      $link.parents(SELECTOR_NAV_LIST_GROUP)\n        .prev(`${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`)\n        .addClass(CLASS_NAME_ACTIVE)\n      // Handle special case when .nav-link is inside .nav-item\n      $link.parents(SELECTOR_NAV_LIST_GROUP)\n        .prev(SELECTOR_NAV_ITEMS)\n        .children(SELECTOR_NAV_LINKS)\n        .addClass(CLASS_NAME_ACTIVE)\n    }\n\n    $(this._scrollElement).trigger(EVENT_ACTIVATE, {\n      relatedTarget: target\n    })\n  }\n\n  _clear() {\n    [].slice.call(document.querySelectorAll(this._selector))\n      .filter(node => node.classList.contains(CLASS_NAME_ACTIVE))\n      .forEach(node => node.classList.remove(CLASS_NAME_ACTIVE))\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      let data = $(this).data(DATA_KEY)\n      const _config = typeof config === 'object' && config\n\n      if (!data) {\n        data = new ScrollSpy(this, _config)\n        $(this).data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config]()\n      }\n    })\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(window).on(EVENT_LOAD_DATA_API, () => {\n  const scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY))\n  const scrollSpysLength = scrollSpys.length\n\n  for (let i = scrollSpysLength; i--;) {\n    const $spy = $(scrollSpys[i])\n    ScrollSpy._jQueryInterface.call($spy, $spy.data())\n  }\n})\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = ScrollSpy._jQueryInterface\n$.fn[NAME].Constructor = ScrollSpy\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return ScrollSpy._jQueryInterface\n}\n\nexport default ScrollSpy\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): tab.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'tab'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.tab'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst DATA_API_KEY = '.data-api'\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\n\nconst CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu'\nconst CLASS_NAME_ACTIVE = 'active'\nconst CLASS_NAME_DISABLED = 'disabled'\nconst CLASS_NAME_FADE = 'fade'\nconst CLASS_NAME_SHOW = 'show'\n\nconst EVENT_HIDE = `hide${EVENT_KEY}`\nconst EVENT_HIDDEN = `hidden${EVENT_KEY}`\nconst EVENT_SHOW = `show${EVENT_KEY}`\nconst EVENT_SHOWN = `shown${EVENT_KEY}`\nconst EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`\n\nconst SELECTOR_DROPDOWN = '.dropdown'\nconst SELECTOR_NAV_LIST_GROUP = '.nav, .list-group'\nconst SELECTOR_ACTIVE = '.active'\nconst SELECTOR_ACTIVE_UL = '> li > .active'\nconst SELECTOR_DATA_TOGGLE = '[data-toggle=\"tab\"], [data-toggle=\"pill\"], [data-toggle=\"list\"]'\nconst SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle'\nconst SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active'\n\n/**\n * Class definition\n */\n\nclass Tab {\n  constructor(element) {\n    this._element = element\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  // Public\n  show() {\n    if (this._element.parentNode &&\n        this._element.parentNode.nodeType === Node.ELEMENT_NODE &&\n        $(this._element).hasClass(CLASS_NAME_ACTIVE) ||\n        $(this._element).hasClass(CLASS_NAME_DISABLED)) {\n      return\n    }\n\n    let target\n    let previous\n    const listElement = $(this._element).closest(SELECTOR_NAV_LIST_GROUP)[0]\n    const selector = Util.getSelectorFromElement(this._element)\n\n    if (listElement) {\n      const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE\n      previous = $.makeArray($(listElement).find(itemSelector))\n      previous = previous[previous.length - 1]\n    }\n\n    const hideEvent = $.Event(EVENT_HIDE, {\n      relatedTarget: this._element\n    })\n\n    const showEvent = $.Event(EVENT_SHOW, {\n      relatedTarget: previous\n    })\n\n    if (previous) {\n      $(previous).trigger(hideEvent)\n    }\n\n    $(this._element).trigger(showEvent)\n\n    if (showEvent.isDefaultPrevented() ||\n        hideEvent.isDefaultPrevented()) {\n      return\n    }\n\n    if (selector) {\n      target = document.querySelector(selector)\n    }\n\n    this._activate(\n      this._element,\n      listElement\n    )\n\n    const complete = () => {\n      const hiddenEvent = $.Event(EVENT_HIDDEN, {\n        relatedTarget: this._element\n      })\n\n      const shownEvent = $.Event(EVENT_SHOWN, {\n        relatedTarget: previous\n      })\n\n      $(previous).trigger(hiddenEvent)\n      $(this._element).trigger(shownEvent)\n    }\n\n    if (target) {\n      this._activate(target, target.parentNode, complete)\n    } else {\n      complete()\n    }\n  }\n\n  dispose() {\n    $.removeData(this._element, DATA_KEY)\n    this._element = null\n  }\n\n  // Private\n  _activate(element, container, callback) {\n    const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ?\n      $(container).find(SELECTOR_ACTIVE_UL) :\n      $(container).children(SELECTOR_ACTIVE)\n\n    const active = activeElements[0]\n    const isTransitioning = callback && (active && $(active).hasClass(CLASS_NAME_FADE))\n    const complete = () => this._transitionComplete(\n      element,\n      active,\n      callback\n    )\n\n    if (active && isTransitioning) {\n      const transitionDuration = Util.getTransitionDurationFromElement(active)\n\n      $(active)\n        .removeClass(CLASS_NAME_SHOW)\n        .one(Util.TRANSITION_END, complete)\n        .emulateTransitionEnd(transitionDuration)\n    } else {\n      complete()\n    }\n  }\n\n  _transitionComplete(element, active, callback) {\n    if (active) {\n      $(active).removeClass(CLASS_NAME_ACTIVE)\n\n      const dropdownChild = $(active.parentNode).find(\n        SELECTOR_DROPDOWN_ACTIVE_CHILD\n      )[0]\n\n      if (dropdownChild) {\n        $(dropdownChild).removeClass(CLASS_NAME_ACTIVE)\n      }\n\n      if (active.getAttribute('role') === 'tab') {\n        active.setAttribute('aria-selected', false)\n      }\n    }\n\n    $(element).addClass(CLASS_NAME_ACTIVE)\n    if (element.getAttribute('role') === 'tab') {\n      element.setAttribute('aria-selected', true)\n    }\n\n    Util.reflow(element)\n\n    if (element.classList.contains(CLASS_NAME_FADE)) {\n      element.classList.add(CLASS_NAME_SHOW)\n    }\n\n    let parent = element.parentNode\n    if (parent && parent.nodeName === 'LI') {\n      parent = parent.parentNode\n    }\n\n    if (parent && $(parent).hasClass(CLASS_NAME_DROPDOWN_MENU)) {\n      const dropdownElement = $(element).closest(SELECTOR_DROPDOWN)[0]\n\n      if (dropdownElement) {\n        const dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE))\n\n        $(dropdownToggleList).addClass(CLASS_NAME_ACTIVE)\n      }\n\n      element.setAttribute('aria-expanded', true)\n    }\n\n    if (callback) {\n      callback()\n    }\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      const $this = $(this)\n      let data = $this.data(DATA_KEY)\n\n      if (!data) {\n        data = new Tab(this)\n        $this.data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config]()\n      }\n    })\n  }\n}\n\n/**\n * Data API implementation\n */\n\n$(document)\n  .on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {\n    event.preventDefault()\n    Tab._jQueryInterface.call($(this), 'show')\n  })\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Tab._jQueryInterface\n$.fn[NAME].Constructor = Tab\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Tab._jQueryInterface\n}\n\nexport default Tab\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.6.1): toast.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * Constants\n */\n\nconst NAME = 'toast'\nconst VERSION = '4.6.1'\nconst DATA_KEY = 'bs.toast'\nconst EVENT_KEY = `.${DATA_KEY}`\nconst JQUERY_NO_CONFLICT = $.fn[NAME]\n\nconst CLASS_NAME_FADE = 'fade'\nconst CLASS_NAME_HIDE = 'hide'\nconst CLASS_NAME_SHOW = 'show'\nconst CLASS_NAME_SHOWING = 'showing'\n\nconst EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`\nconst EVENT_HIDE = `hide${EVENT_KEY}`\nconst EVENT_HIDDEN = `hidden${EVENT_KEY}`\nconst EVENT_SHOW = `show${EVENT_KEY}`\nconst EVENT_SHOWN = `shown${EVENT_KEY}`\n\nconst SELECTOR_DATA_DISMISS = '[data-dismiss=\"toast\"]'\n\nconst Default = {\n  animation: true,\n  autohide: true,\n  delay: 500\n}\n\nconst DefaultType = {\n  animation: 'boolean',\n  autohide: 'boolean',\n  delay: 'number'\n}\n\n/**\n * Class definition\n */\n\nclass Toast {\n  constructor(element, config) {\n    this._element = element\n    this._config = this._getConfig(config)\n    this._timeout = null\n    this._setListeners()\n  }\n\n  // Getters\n  static get VERSION() {\n    return VERSION\n  }\n\n  static get DefaultType() {\n    return DefaultType\n  }\n\n  static get Default() {\n    return Default\n  }\n\n  // Public\n  show() {\n    const showEvent = $.Event(EVENT_SHOW)\n\n    $(this._element).trigger(showEvent)\n    if (showEvent.isDefaultPrevented()) {\n      return\n    }\n\n    this._clearTimeout()\n\n    if (this._config.animation) {\n      this._element.classList.add(CLASS_NAME_FADE)\n    }\n\n    const complete = () => {\n      this._element.classList.remove(CLASS_NAME_SHOWING)\n      this._element.classList.add(CLASS_NAME_SHOW)\n\n      $(this._element).trigger(EVENT_SHOWN)\n\n      if (this._config.autohide) {\n        this._timeout = setTimeout(() => {\n          this.hide()\n        }, this._config.delay)\n      }\n    }\n\n    this._element.classList.remove(CLASS_NAME_HIDE)\n    Util.reflow(this._element)\n    this._element.classList.add(CLASS_NAME_SHOWING)\n    if (this._config.animation) {\n      const transitionDuration = Util.getTransitionDurationFromElement(this._element)\n\n      $(this._element)\n        .one(Util.TRANSITION_END, complete)\n        .emulateTransitionEnd(transitionDuration)\n    } else {\n      complete()\n    }\n  }\n\n  hide() {\n    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {\n      return\n    }\n\n    const hideEvent = $.Event(EVENT_HIDE)\n\n    $(this._element).trigger(hideEvent)\n    if (hideEvent.isDefaultPrevented()) {\n      return\n    }\n\n    this._close()\n  }\n\n  dispose() {\n    this._clearTimeout()\n\n    if (this._element.classList.contains(CLASS_NAME_SHOW)) {\n      this._element.classList.remove(CLASS_NAME_SHOW)\n    }\n\n    $(this._element).off(EVENT_CLICK_DISMISS)\n\n    $.removeData(this._element, DATA_KEY)\n    this._element = null\n    this._config = null\n  }\n\n  // Private\n  _getConfig(config) {\n    config = {\n      ...Default,\n      ...$(this._element).data(),\n      ...(typeof config === 'object' && config ? config : {})\n    }\n\n    Util.typeCheckConfig(\n      NAME,\n      config,\n      this.constructor.DefaultType\n    )\n\n    return config\n  }\n\n  _setListeners() {\n    $(this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide())\n  }\n\n  _close() {\n    const complete = () => {\n      this._element.classList.add(CLASS_NAME_HIDE)\n      $(this._element).trigger(EVENT_HIDDEN)\n    }\n\n    this._element.classList.remove(CLASS_NAME_SHOW)\n    if (this._config.animation) {\n      const transitionDuration = Util.getTransitionDurationFromElement(this._element)\n\n      $(this._element)\n        .one(Util.TRANSITION_END, complete)\n        .emulateTransitionEnd(transitionDuration)\n    } else {\n      complete()\n    }\n  }\n\n  _clearTimeout() {\n    clearTimeout(this._timeout)\n    this._timeout = null\n  }\n\n  // Static\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      const $element = $(this)\n      let data = $element.data(DATA_KEY)\n      const _config = typeof config === 'object' && config\n\n      if (!data) {\n        data = new Toast(this, _config)\n        $element.data(DATA_KEY, data)\n      }\n\n      if (typeof config === 'string') {\n        if (typeof data[config] === 'undefined') {\n          throw new TypeError(`No method named \"${config}\"`)\n        }\n\n        data[config](this)\n      }\n    })\n  }\n}\n\n/**\n * jQuery\n */\n\n$.fn[NAME] = Toast._jQueryInterface\n$.fn[NAME].Constructor = Toast\n$.fn[NAME].noConflict = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Toast._jQueryInterface\n}\n\nexport default Toast\n"],"names":["TRANSITION_END","MAX_UID","MILLISECONDS_MULTIPLIER","toType","obj","toString","call","match","toLowerCase","getSpecialTransitionEndEvent","bindType","delegateType","handle","event","$","target","is","handleObj","handler","apply","arguments","undefined","transitionEndEmulator","duration","called","one","Util","setTimeout","triggerTransitionEnd","setTransitionEndSupport","fn","emulateTransitionEnd","special","getUID","prefix","Math","random","document","getElementById","getSelectorFromElement","element","selector","getAttribute","hrefAttr","trim","querySelector","_","getTransitionDurationFromElement","transitionDuration","css","transitionDelay","floatTransitionDuration","parseFloat","floatTransitionDelay","split","reflow","offsetHeight","trigger","supportsTransitionEnd","Boolean","isElement","nodeType","typeCheckConfig","componentName","config","configTypes","property","Object","prototype","hasOwnProperty","expectedTypes","value","valueType","RegExp","test","Error","toUpperCase","findShadowRoot","documentElement","attachShadow","getRootNode","root","ShadowRoot","parentNode","jQueryDetection","TypeError","version","jquery","minMajor","ltMajor","minMinor","minPatch","maxMajor","NAME","VERSION","DATA_KEY","EVENT_KEY","DATA_API_KEY","JQUERY_NO_CONFLICT","CLASS_NAME_ALERT","CLASS_NAME_FADE","CLASS_NAME_SHOW","EVENT_CLOSE","EVENT_CLOSED","EVENT_CLICK_DATA_API","SELECTOR_DISMISS","Alert","_element","close","rootElement","_getRootElement","customEvent","_triggerCloseEvent","isDefaultPrevented","_removeElement","dispose","removeData","parent","closest","closeEvent","Event","removeClass","hasClass","_destroyElement","detach","remove","_jQueryInterface","each","$element","data","_handleDismiss","alertInstance","preventDefault","on","Constructor","noConflict","CLASS_NAME_ACTIVE","CLASS_NAME_BUTTON","CLASS_NAME_FOCUS","EVENT_FOCUS_BLUR_DATA_API","EVENT_LOAD_DATA_API","SELECTOR_DATA_TOGGLE_CARROT","SELECTOR_DATA_TOGGLES","SELECTOR_DATA_TOGGLE","SELECTOR_DATA_TOGGLES_BUTTONS","SELECTOR_INPUT","SELECTOR_ACTIVE","SELECTOR_BUTTON","Button","shouldAvoidTriggerChange","toggle","triggerChangeEvent","addAriaPressed","input","type","checked","classList","contains","activeElement","focus","hasAttribute","setAttribute","toggleClass","avoidTriggerChange","button","initialButton","inputBtn","tagName","window","buttons","slice","querySelectorAll","i","len","length","add","ARROW_LEFT_KEYCODE","ARROW_RIGHT_KEYCODE","TOUCHEVENT_COMPAT_WAIT","SWIPE_THRESHOLD","CLASS_NAME_CAROUSEL","CLASS_NAME_SLIDE","CLASS_NAME_RIGHT","CLASS_NAME_LEFT","CLASS_NAME_NEXT","CLASS_NAME_PREV","CLASS_NAME_POINTER_EVENT","DIRECTION_NEXT","DIRECTION_PREV","DIRECTION_LEFT","DIRECTION_RIGHT","EVENT_SLIDE","EVENT_SLID","EVENT_KEYDOWN","EVENT_MOUSEENTER","EVENT_MOUSELEAVE","EVENT_TOUCHSTART","EVENT_TOUCHMOVE","EVENT_TOUCHEND","EVENT_POINTERDOWN","EVENT_POINTERUP","EVENT_DRAG_START","SELECTOR_ACTIVE_ITEM","SELECTOR_ITEM","SELECTOR_ITEM_IMG","SELECTOR_NEXT_PREV","SELECTOR_INDICATORS","SELECTOR_DATA_SLIDE","SELECTOR_DATA_RIDE","Default","interval","keyboard","slide","pause","wrap","touch","DefaultType","PointerType","TOUCH","PEN","Carousel","_items","_interval","_activeElement","_isPaused","_isSliding","touchTimeout","touchStartX","touchDeltaX","_config","_getConfig","_indicatorsElement","_touchSupported","navigator","maxTouchPoints","_pointerEvent","PointerEvent","MSPointerEvent","_addEventListeners","next","_slide","nextWhenVisible","hidden","prev","cycle","clearInterval","_updateInterval","setInterval","visibilityState","bind","to","index","activeIndex","_getItemIndex","direction","off","_handleSwipe","absDeltax","abs","_keydown","_addTouchEventListeners","start","originalEvent","pointerType","clientX","touches","move","end","clearTimeout","e","which","indexOf","_getItemByDirection","isNextDirection","isPrevDirection","lastItemIndex","isGoingToWrap","delta","itemIndex","_triggerSlideEvent","relatedTarget","eventDirectionName","targetIndex","fromIndex","slideEvent","from","_setActiveIndicatorElement","indicators","nextIndicator","children","addClass","elementInterval","parseInt","defaultInterval","activeElementIndex","nextElement","nextElementIndex","isCycling","directionalClassName","orderClassName","slidEvent","action","ride","_dataApiClickHandler","slideIndex","carousels","$carousel","CLASS_NAME_COLLAPSE","CLASS_NAME_COLLAPSING","CLASS_NAME_COLLAPSED","DIMENSION_WIDTH","DIMENSION_HEIGHT","EVENT_SHOW","EVENT_SHOWN","EVENT_HIDE","EVENT_HIDDEN","SELECTOR_ACTIVES","Collapse","_isTransitioning","_triggerArray","id","toggleList","elem","filterElement","filter","foundElem","_selector","push","_parent","_getParent","_addAriaAndCollapsedClass","hide","show","actives","activesData","not","startEvent","dimension","_getDimension","style","attr","setTransitioning","complete","capitalizedDimension","scrollSize","getBoundingClientRect","triggerArrayLength","$elem","isTransitioning","hasWidth","_getTargetFromElement","triggerArray","isOpen","currentTarget","$trigger","selectors","$target","ESCAPE_KEYCODE","SPACE_KEYCODE","TAB_KEYCODE","ARROW_UP_KEYCODE","ARROW_DOWN_KEYCODE","RIGHT_MOUSE_BUTTON_WHICH","REGEXP_KEYDOWN","CLASS_NAME_DISABLED","CLASS_NAME_DROPUP","CLASS_NAME_DROPRIGHT","CLASS_NAME_DROPLEFT","CLASS_NAME_MENURIGHT","CLASS_NAME_POSITION_STATIC","EVENT_CLICK","EVENT_KEYDOWN_DATA_API","EVENT_KEYUP_DATA_API","SELECTOR_FORM_CHILD","SELECTOR_MENU","SELECTOR_NAVBAR_NAV","SELECTOR_VISIBLE_ITEMS","PLACEMENT_TOP","PLACEMENT_TOPEND","PLACEMENT_BOTTOM","PLACEMENT_BOTTOMEND","PLACEMENT_RIGHT","PLACEMENT_LEFT","offset","flip","boundary","reference","display","popperConfig","Dropdown","_popper","_menu","_getMenuElement","_inNavbar","_detectNavbar","disabled","isActive","_clearMenus","usePopper","showEvent","_getParentFromElement","Popper","referenceElement","_getPopperConfig","body","noop","hideEvent","destroy","update","scheduleUpdate","stopPropagation","constructor","_getPlacement","$parentDropdown","placement","_getOffset","offsets","modifiers","enabled","preventOverflow","boundariesElement","applyStyle","toggles","context","clickEvent","dropdownMenu","_dataApiKeydownHandler","items","item","CLASS_NAME_SCROLLABLE","CLASS_NAME_SCROLLBAR_MEASURER","CLASS_NAME_BACKDROP","CLASS_NAME_OPEN","CLASS_NAME_STATIC","EVENT_HIDE_PREVENTED","EVENT_FOCUSIN","EVENT_RESIZE","EVENT_CLICK_DISMISS","EVENT_KEYDOWN_DISMISS","EVENT_MOUSEUP_DISMISS","EVENT_MOUSEDOWN_DISMISS","SELECTOR_DIALOG","SELECTOR_MODAL_BODY","SELECTOR_DATA_DISMISS","SELECTOR_FIXED_CONTENT","SELECTOR_STICKY_CONTENT","backdrop","Modal","_dialog","_backdrop","_isShown","_isBodyOverflowing","_ignoreBackdropClick","_scrollbarWidth","_checkScrollbar","_setScrollbar","_adjustDialog","_setEscapeEvent","_setResizeEvent","_showBackdrop","_showElement","transition","_hideModal","forEach","htmlElement","handleUpdate","_triggerBackdropTransition","hideEventPrevented","isModalOverflowing","scrollHeight","clientHeight","overflowY","modalTransitionDuration","modalBody","Node","ELEMENT_NODE","appendChild","removeAttribute","scrollTop","_enforceFocus","shownEvent","transitionComplete","has","_resetAdjustments","_resetScrollbar","_removeBackdrop","callback","animate","createElement","className","appendTo","backdropTransitionDuration","callbackRemove","paddingLeft","paddingRight","rect","round","left","right","innerWidth","_getScrollbarWidth","fixedContent","stickyContent","actualPadding","calculatedPadding","actualMargin","marginRight","calculatedMargin","padding","elements","margin","scrollDiv","scrollbarWidth","width","clientWidth","removeChild","uriAttrs","ARIA_ATTRIBUTE_PATTERN","DefaultWhitelist","a","area","b","br","col","code","div","em","hr","h1","h2","h3","h4","h5","h6","img","li","ol","p","pre","s","small","span","sub","sup","strong","u","ul","SAFE_URL_PATTERN","DATA_URL_PATTERN","allowedAttribute","allowedAttributeList","attrName","nodeName","nodeValue","regExp","attrRegex","sanitizeHtml","unsafeHtml","whiteList","sanitizeFn","domParser","DOMParser","createdDocument","parseFromString","whitelistKeys","keys","el","elName","attributeList","attributes","whitelistedAttributes","concat","innerHTML","CLASS_PREFIX","BSCLS_PREFIX_REGEX","DISALLOWED_ATTRIBUTES","HOVER_STATE_SHOW","HOVER_STATE_OUT","SELECTOR_TOOLTIP_INNER","SELECTOR_ARROW","TRIGGER_HOVER","TRIGGER_FOCUS","TRIGGER_CLICK","TRIGGER_MANUAL","AttachmentMap","AUTO","TOP","RIGHT","BOTTOM","LEFT","animation","template","title","delay","html","container","fallbackPlacement","customClass","sanitize","HIDE","HIDDEN","SHOW","SHOWN","INSERTED","CLICK","FOCUSIN","FOCUSOUT","MOUSEENTER","MOUSELEAVE","Tooltip","_isEnabled","_timeout","_hoverState","_activeTrigger","tip","_setListeners","enable","disable","toggleEnabled","dataKey","_getDelegateConfig","click","_isWithActiveTrigger","_enter","_leave","getTipElement","_hideModalHandler","isWithContent","shadowRoot","isInTheDom","ownerDocument","tipId","setContent","attachment","_getAttachment","addAttachmentClass","_getContainer","_fixTransition","prevHoverState","_cleanTipClass","getTitle","setElementContent","content","empty","append","text","defaultBsConfig","behavior","arrow","onCreate","originalPlacement","_handlePopperPlacementChange","onUpdate","find","triggers","eventIn","eventOut","_fixTitle","titleType","dataAttributes","dataAttr","key","$tip","tabClass","join","popperData","instance","popper","initConfigAnimation","SELECTOR_TITLE","SELECTOR_CONTENT","Popover","_getContent","CLASS_NAME_DROPDOWN_ITEM","EVENT_ACTIVATE","EVENT_SCROLL","METHOD_OFFSET","METHOD_POSITION","SELECTOR_DATA_SPY","SELECTOR_NAV_LIST_GROUP","SELECTOR_NAV_LINKS","SELECTOR_NAV_ITEMS","SELECTOR_LIST_ITEMS","SELECTOR_DROPDOWN","SELECTOR_DROPDOWN_ITEMS","SELECTOR_DROPDOWN_TOGGLE","method","ScrollSpy","_scrollElement","_offsets","_targets","_activeTarget","_scrollHeight","_process","refresh","autoMethod","offsetMethod","offsetBase","_getScrollTop","_getScrollHeight","targets","map","targetSelector","targetBCR","height","top","sort","pageYOffset","max","_getOffsetHeight","innerHeight","maxScroll","_activate","_clear","isActiveTarget","queries","$link","parents","node","scrollSpys","scrollSpysLength","$spy","CLASS_NAME_DROPDOWN_MENU","SELECTOR_ACTIVE_UL","SELECTOR_DROPDOWN_ACTIVE_CHILD","Tab","previous","listElement","itemSelector","makeArray","hiddenEvent","activeElements","active","_transitionComplete","dropdownChild","dropdownElement","dropdownToggleList","$this","CLASS_NAME_HIDE","CLASS_NAME_SHOWING","autohide","Toast","_clearTimeout","_close"],"mappings":"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"}