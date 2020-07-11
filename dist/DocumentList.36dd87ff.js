// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../TS/LocStorage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocStorage = void 0;

var LocStorage =
/** @class */
function () {
  function LocStorage() {}

  LocStorage.prototype.saveDocument = function (formValues, isEdit, id) {
    if (isEdit === void 0) {
      isEdit = false;
    }

    if (isEdit === false) {
      var documentId = new Date().getTime().toString();
      var locStorageIds = localStorage.getItem('ids');
      var currentIds = locStorageIds !== null ? JSON.parse(locStorageIds) : [];
      currentIds.push(documentId);
      localStorage.setItem('ids', JSON.stringify(currentIds));
      localStorage.setItem(documentId, JSON.stringify(formValues));
      return documentId;
    } else {
      localStorage.setItem(id, JSON.stringify(formValues));
      return id;
    }
  };

  LocStorage.prototype.loadDocument = function (documentId) {
    return JSON.parse(localStorage.getItem(documentId));
  };

  LocStorage.prototype.getDocuments = function () {
    return JSON.parse(localStorage.getItem('ids'));
  };

  LocStorage.prototype.removeDocument = function (documentId) {
    localStorage.removeItem(documentId);
    var ids = this.getDocuments();
    var fIds = ids.filter(function (id) {
      return id !== documentId;
    });
    localStorage.setItem('ids', JSON.stringify(fIds));
  };

  return LocStorage;
}();

exports.LocStorage = LocStorage;
},{}],"../TS/Router.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var Router =
/** @class */
function () {
  function Router() {}

  Router.getParam = function () {
    return new URL(window.location.href).searchParams.get('id');
  };

  return Router;
}();

exports.Router = Router;
},{}],"../TS/Form.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LocStorage_1 = require("./LocStorage");

var Form =
/** @class */
function () {
  function Form(fields, id) {
    this.fields = fields;
    this._id = id;
    this._locaStorage = new LocStorage_1.LocStorage();
  }

  Form.prototype.save = function () {
    var inputs = document.querySelectorAll('input, textarea, select');
    var name = inputs[0],
        lastName = inputs[1],
        textarea1 = inputs[2],
        select = inputs[3],
        checbox = inputs[4],
        textarea2 = inputs[5];

    this._locaStorage.saveDocument({
      name: name.value,
      lastName: lastName.value,
      textarea1: textarea1.value,
      select: select.value,
      checbox: checbox.value,
      textarea2: textarea2.value
    });

    location.href = '/index.html';
  };

  Form.prototype.render = function () {
    var _this = this;

    var div = document.createElement("div");

    for (var i = 0; i < this.fields.length; i++) {
      var input = this.fields[i].render();
      div.appendChild(input);
    }

    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'submit';
    submitButton.addEventListener('click', function (e) {
      _this.save();
    });
    var backButton = document.createElement('button');
    backButton.textContent = 'back';
    backButton.addEventListener('click', function () {
      history.back();
    });
    div.appendChild(backButton);
    div.appendChild(submitButton);
    return div;
  };

  Form.prototype.getValue = function () {};

  ;
  return Form;
}();

exports.default = Form;
},{"./LocStorage":"../TS/LocStorage.ts"}],"../TS/FieldType.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FieldType;

(function (FieldType) {
  FieldType["text"] = "text";
  FieldType["data"] = "data";
  FieldType["fieldChose"] = "choose fild";
  FieldType["checkbox"] = "checkbox";
  FieldType["multiline"] = "multiline";
})(FieldType || (FieldType = {}));

exports.default = FieldType;
},{}],"../TS/EmailField.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FieldType_1 = __importDefault(require("./FieldType"));

var EmailField =
/** @class */
function () {
  function EmailField(name, lable, value) {
    if (value === void 0) {
      value = '';
    }

    this.name = name;
    this.value = value;
    this.type = FieldType_1.default.text;
  }

  EmailField.prototype.getValue = function () {
    return this.value;
  };

  EmailField.prototype.render = function () {
    var emailInput = document.createElement("input");
    emailInput.type = 'email';
    emailInput.value = this.value;
    return emailInput;
  };

  return EmailField;
}();

exports.default = EmailField;
},{"./FieldType":"../TS/FieldType.ts"}],"../TS/SelectField.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FieldType_1 = __importDefault(require("./FieldType"));

var SelectField =
/** @class */
function () {
  function SelectField(name, lable, value, options) {
    this._options = [];
    this.name = name;
    this.label = lable;
    this.value = value;
    this._options = options;
    this.type = FieldType_1.default.fieldChose;
  }

  SelectField.prototype.render = function () {
    var SelectField = document.createElement("select");

    for (var i = 0; i < this._options.length; i++) {
      var option = document.createElement("option");
      option.value = this._options[i];
      option.textContent = this._options[i];
      SelectField.appendChild(option);
    }

    return SelectField;
  };

  SelectField.prototype.getValue = function () {
    return this.value;
  };

  return SelectField;
}();

exports.default = SelectField;
},{"./FieldType":"../TS/FieldType.ts"}],"../TS/CheckboxField.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FieldType_1 = __importDefault(require("./FieldType"));

var CheckboxField =
/** @class */
function () {
  function CheckboxField(name, lable, value) {
    if (value === void 0) {
      value = false;
    }

    this.name = name;
    this.value = value;
    this.type = FieldType_1.default.checkbox;
  }

  CheckboxField.prototype.render = function () {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = this.value;
    return checkbox;
  };

  CheckboxField.prototype.getValue = function () {
    return this.value;
  };

  return CheckboxField;
}();

exports.default = CheckboxField;
},{"./FieldType":"../TS/FieldType.ts"}],"../TS/TextAreaField.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FieldType_1 = __importDefault(require("./FieldType"));

var TextAreaField =
/** @class */
function () {
  function TextAreaField(name, lable, value) {
    if (value === void 0) {
      value = '';
    }

    this.name = name;
    this.value = value;
    this.type = FieldType_1.default.text;
  }

  TextAreaField.prototype.render = function () {
    var textarea = document.createElement("textarea");
    textarea.value = this.value;
    return textarea;
  };

  return TextAreaField;
}();

exports.default = TextAreaField;
},{"./FieldType":"../TS/FieldType.ts"}],"../TS/FieldLabel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FieldLabel =
/** @class */
function () {
  function FieldLabel(label) {
    this.label = label;
  }

  FieldLabel.prototype.render = function () {
    var p = document.createElement('label');
    p.innerText = this.label;
    return p;
  };

  return FieldLabel;
}();

exports.default = FieldLabel;
},{}],"../TS/InputField.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FieldType_1 = __importDefault(require("./FieldType"));

var FieldLabel_1 = __importDefault(require("./FieldLabel"));

var InputField =
/** @class */
function () {
  function InputField(name, label, value) {
    if (value === void 0) {
      value = '';
    }

    this.type = FieldType_1.default.text;
    this.name = name;
    this.label = label;
    this.value = value;
  }

  InputField.prototype.getValue = function () {
    return this.htmlElement.value;
  };

  InputField.prototype.render = function () {
    var wrapper = document.createElement('div');
    var fieldLabel = new FieldLabel_1.default(this.label).render();
    wrapper.appendChild(fieldLabel);
    var input = document.createElement('input');
    input.type = 'text';
    input.value = this.value;
    wrapper.appendChild(input);
    this.htmlElement = input;
    return wrapper;
  };

  return InputField;
}();

exports.default = InputField;
},{"./FieldType":"../TS/FieldType.ts","./FieldLabel":"../TS/FieldLabel.ts"}],"../TS/App.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Form_1 = __importDefault(require("./Form"));

var EmailField_1 = __importDefault(require("./EmailField"));

var SelectField_1 = __importDefault(require("./SelectField"));

var CheckboxField_1 = __importDefault(require("./CheckboxField"));

var TextAreaField_1 = __importDefault(require("./TextAreaField"));

var InputField_1 = __importDefault(require("./InputField"));

var App =
/** @class */
function () {
  function App() {}

  App.prototype.initSimpleForm = function (doc) {
    var fields = [];
    var name = doc.name,
        lastName = doc.lastName,
        textarea1 = doc.textarea1,
        select = doc.select,
        checbox = doc.checbox,
        textarea2 = doc.textarea2;
    fields.push(new InputField_1.default('firstName', 'Imię', name));
    fields.push(new InputField_1.default('lastName', 'Nazwisko', lastName));
    fields.push(new EmailField_1.default('email', 'E-mail', textarea1));
    var options = ['Informatics', 'Econometrics'];
    fields.push(new SelectField_1.default('course', 'Wybierz kierunek studiów', select, options));
    fields.push(new CheckboxField_1.default('elearning', 'Czy preferujesz e-learning?', checbox === 'on' ? true : false));
    fields.push(new TextAreaField_1.default('comments', 'Uwagi', textarea2));
    return fields;
  };

  return App;
}();

exports.default = App;

if (window.location.pathname === '/new-document.html') {
  var app = new App();
  var fields = app.initSimpleForm({
    name: '',
    lastName: '',
    textarea1: '',
    select: '',
    checkbox: '',
    textarea2: ''
  });
  var form = new Form_1.default(fields, '0');
  document.body.appendChild(form.render());
}
},{"./Form":"../TS/Form.ts","./EmailField":"../TS/EmailField.ts","./SelectField":"../TS/SelectField.ts","./CheckboxField":"../TS/CheckboxField.ts","./TextAreaField":"../TS/TextAreaField.ts","./InputField":"../TS/InputField.ts"}],"../TS/DocumentList.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentList = void 0;

var LocStorage_1 = require("./LocStorage");

var Router_1 = require("./Router");

var App_1 = __importDefault(require("./App"));

var DocumentList =
/** @class */
function () {
  function DocumentList() {
    this._documentsList = null;
    this._locStorage = new LocStorage_1.LocStorage();
    this._app = new App_1.default();
  }

  DocumentList.prototype.getDocumentList = function () {
    this._documentsList = this._locStorage.getDocuments();
    return this._documentsList;
  };

  DocumentList.prototype.render = function () {
    console.table(this._documentsList);

    var urls = this._documentsList.map(function (el) {
      return "edit-document.html?id=" + el;
    });

    console.table(urls);
  };

  DocumentList.prototype.removeDocument = function (id) {};

  DocumentList.prototype.getDocument = function (id) {
    var _this = this;

    var doc = this._locStorage.loadDocument(id);

    console.log(doc);

    var fields = this._app.initSimpleForm(doc);

    fields.forEach(function (field) {
      document.body.appendChild(field.render());
    });
    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'submit';
    submitButton.addEventListener('click', function (e) {
      _this.save(id);
    });
    document.body.appendChild(submitButton);
  };

  DocumentList.prototype.save = function (id) {
    var inputs = document.querySelectorAll('input, textarea, select');
    var name = inputs[0],
        lastName = inputs[1],
        textarea1 = inputs[2],
        select = inputs[3],
        checbox = inputs[4],
        textarea2 = inputs[5];

    this._locStorage.saveDocument({
      name: name.value,
      lastName: lastName.value,
      textarea1: textarea1.value,
      select: select.value,
      checbox: checbox.value,
      textarea2: textarea2.value
    }, true, id);

    location.href = '/index.html';
  };

  return DocumentList;
}();

exports.DocumentList = DocumentList;
var documentList = new DocumentList();
var locStorage = new LocStorage_1.LocStorage();

if (window.location.pathname === '/document-list.html') {
  var documentsIds = documentList.getDocumentList();
  var docsUl_1 = document.querySelector('#docs-ul');

  if (documentsIds !== null) {
    documentsIds.forEach(function (doc) {
      docsUl_1.innerHTML += "\n            <li style=\"display: flex\">\n                <a href=\"edit-document.html?id=" + doc + "\">" + doc + "</a>\n                <button class=\"remove-btn\" data-id=\"" + doc + "\">remove</button>\n            </li>";
    });
    var removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var el = e.target;
        var id = el.getAttribute('data-id');
        console.log(id);
        locStorage.removeDocument(id);
        window.location.reload();
      });
    });
  }
}

if (window.location.pathname === '/edit-document.html') {
  var id = Router_1.Router.getParam();
  documentList.getDocument(id);
}
},{"./LocStorage":"../TS/LocStorage.ts","./Router":"../TS/Router.ts","./App":"../TS/App.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49212" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../TS/DocumentList.ts"], null)
//# sourceMappingURL=/DocumentList.36dd87ff.js.map