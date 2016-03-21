var c = function cadenza(argument) {

  if (typeof argument === 'string') {
    var nodeCount = document.querySelectorAll(argument).length;

    if (nodeCount === 1) {
      var element = document.querySelector(argument);
    } else if (nodeCount > 1) {
      var nodeList = document.querySelectorAll(argument);
    }
  } else if (argument instanceof Element) {
    var element = argument;
  } else if (argument instanceof NodeList) {
    var nodeList = argument;
  }

  if (element) {
    return (function wrap(element) {

      function appendChild(tagName) {
        var newChild = createElement(tagName);
        element.appendChild(newChild);

        return wrap(newChild);
      }

      function appendSibling(tagName) {
        var newSibling = createElement(tagName);
        element.parentNode.insertBefore(newSibling, element.nextSibling);

        return wrap(newSibling);
      }

      function forEach(callback) {
        callback(element);
        return this;
      }

      function getClassName() {
        return element.getAttribute('class');
      }

      function getId() {
        return element.getAttribute('id');
      }

      function getTextContent() {
        return element.textContent;
      }

      function insertAfter(tagName, reference) {
        if (typeof reference === 'string') {
          reference = document.querySelector(reference);
        }

        var newChild = createElement(tagName);
        element.insertBefore(newChild, reference.nextSibling);

        return wrap(newChild);
      }

      function insertBefore(tagName, reference) {
        if (typeof reference === 'string') {
          reference = document.querySelector(reference);
        }

        var newChild = createElement(tagName);
        element.insertBefore(newChild, reference);

        return wrap(newChild);
      }

      function prependChild(tagName) {
        var newChild = createElement(tagName);
        element.insertBefore(newChild, element.firstChild);

        return wrap(newChild);
      }

      function prependSibling(tagName) {
        var newSibling = createElement(tagName);
        element.parentNode.insertBefore(newSibling, element);

        return wrap(newSibling);
      }

      function setAttributes(attributes) {
        for (var key in attributes) {
          var value = attributes[key];
          element.setAttribute(key, value);
        }

        return this;
      }

      function setClassName(className) {
        element.setAttribute('class', className);
        return this;
      }

      function setCustomDataAttributes(customDataAttributes) {
        for (var key in customDataAttributes) {
          var value = customDataAttributes[key];
          element.setAttribute('data-' + key, value);
        }

        return this;
      }

      function setId(id) {
        element.setAttribute('id', id);
        return this;
      }

      function setStyles(styles) {
        for (var key in styles) {
          var value = styles[key];
          element.style[key] = value;
        }

        return this;
      }

      function setTextContent(textContent) {
        element.textContent = textContent;
        return this;
      }

      function unwrap() {
        return element;
      }

      return deepFreeze({
        appendChild: appendChild,
        appendSibling: appendSibling,
        forEach: forEach,
        getClassName: getClassName,
        getId: getId,
        getTextContent: getTextContent,
        insertAfter: insertAfter,
        insertBefore: insertBefore,
        prependChild: prependChild,
        prependSibling: prependSibling,
        setAttributes: setAttributes,
        setClassName: setClassName,
        setCustomDataAttributes: setCustomDataAttributes,
        setId: setId,
        setTextContent: setTextContent,
        setStyles: setStyles,
        unwrap: unwrap
      });

    })(element);
  }

  if (nodeList) {
    return (function wrap(nodeList) {

      function forEach(callback) {
        for (var i = 0; i < nodeList.length; i += 1) {
          callback(nodeList[i]);
        }

        return this;
      }

      function setAttributes(attributes) {
        this.forEach(function (element) {
          c(element).setAttributes(attributes);
        });

        return this;
      }

      function setClassName(className) {
        this.forEach(function (element) {
          c(element).setClassName(className);
        });

        return this;
      }

      function setCustomDataAttributes(customDataAttributes) {
        this.forEach(function (element) {
          c(element).setCustomDataAttributes(customDataAttributes);
        });

        return this;
      }

      function setStyles(styles) {
        this.forEach(function (element) {
          c(element).setStyles(styles);
        });

        return this;
      }

      function unwrap() {
        return nodeList;
      }

      return deepFreeze({
        forEach: forEach,
        setAttributes: setAttributes,
        setClassName: setClassName,
        setCustomDataAttributes: setCustomDataAttributes,
        setStyles: setStyles,
        unwrap: unwrap
      });

    })(nodeList);
  }

  function createElement(tagName) {
    if (tagName === 'svg' || element instanceof SVGElement) {
      var svgNS = 'http://www.w3.org/2000/svg';
      return document.createElementNS(svgNS, tagName);
    } else if (element instanceof HTMLElement && tagName !== 'svg') {
      return document.createElement(tagName);
    }
  }

  function deepFreeze(object) {
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property] instanceof Object) {
          deepFreeze(object[property]);
        }
      }
    }

    return Object.freeze(object);
  }

};
