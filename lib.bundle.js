'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Path = _interopDefault(require('path'));
var atom$1 = require('atom');
var arrayUnique = _interopDefault(require('lodash.uniq'));
var debounce = _interopDefault(require('sb-debounce'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();































var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var Commands=function(){function a(){var b=this;classCallCheck(this,a),this.emitter=new atom$1.Emitter,this.subscriptions=new atom$1.CompositeDisposable,this.subscriptions.add(this.emitter),this.subscriptions.add(atom.commands.add('atom-workspace',{'linter:enable-linter':function linterEnableLinter(){return b.enableLinter()},'linter:disable-linter':function linterDisableLinter(){return b.disableLinter()}})),this.subscriptions.add(atom.commands.add('atom-text-editor:not([mini])',{'linter:lint':function linterLint(){return b.lint()},'linter:debug':function linterDebug(){return b.debug()},'linter:toggle-active-editor':function linterToggleActiveEditor(){return b.toggleActiveEditor()}}));}return createClass(a,[{key:'lint',value:function lint(){this.emitter.emit('should-lint');}},{key:'debug',value:function debug(){this.emitter.emit('should-debug');}},{key:'enableLinter',value:function enableLinter(){this.emitter.emit('should-toggle-linter','enable');}},{key:'disableLinter',value:function disableLinter(){this.emitter.emit('should-toggle-linter','disable');}},{key:'toggleActiveEditor',value:function toggleActiveEditor(){this.emitter.emit('should-toggle-active-editor');}},{key:'onShouldLint',value:function onShouldLint(b){return this.emitter.on('should-lint',b)}},{key:'onShouldDebug',value:function onShouldDebug(b){return this.emitter.on('should-debug',b)}},{key:'onShouldToggleActiveEditor',value:function onShouldToggleActiveEditor(b){return this.emitter.on('should-toggle-active-editor',b)}},{key:'onShouldToggleLinter',value:function onShouldToggleLinter(b){return this.emitter.on('should-toggle-linter',b)}},{key:'dispose',value:function dispose(){this.subscriptions.dispose();}}]),a}();

var _NumberisNaN=Number.isNaN;var VALID_SEVERITY=new Set(['error','warning','info']);function showError(a,b,c){var d=c.map(function(e){return'  \u2022 '+e});atom.notifications.addWarning('[Linter] '+a,{dismissable:!0,detail:b+'\n'+d.join('\n')});}function validateUI(a){var b=[];return a&&'object'===('undefined'==typeof a?'undefined':_typeof(a))?('string'!=typeof a.name&&b.push('UI.name must be a string'),'function'!=typeof a.didBeginLinting&&b.push('UI.didBeginLinting must be a function'),'function'!=typeof a.didFinishLinting&&b.push('UI.didFinishLinting must be a function'),'function'!=typeof a.render&&b.push('UI.render must be a function'),'function'!=typeof a.dispose&&b.push('UI.dispose must be a function')):b.push('UI must be an object'),!b.length||(showError('Invalid UI received','These issues were encountered while registering the UI named \''+(a&&a.name?a.name:'Unknown')+'\'',b),!1)}function validateLinter(a,b){var c=[];return a&&'object'===('undefined'==typeof a?'undefined':_typeof(a))?('string'!=typeof a.name&&(2===b?c.push('Linter.name must be a string'):a.name='Unknown'),('string'!=typeof a.scope||'file'!==a.scope&&'project'!==a.scope)&&c.push('Linter.scope must be either \'file\' or \'project\''),1===b&&'boolean'!=typeof a.lintOnFly?c.push('Linter.lintOnFly must be a boolean'):2===b&&'boolean'!=typeof a.lintsOnChange&&c.push('Linter.lintsOnChange must be a boolean'),!Array.isArray(a.grammarScopes)&&c.push('Linter.grammarScopes must be an Array'),'function'!=typeof a.lint&&c.push('Linter.lint must be a function')):c.push('Linter must be an object'),!c.length||(showError('Invalid Linter received','These issues were encountered while registering a Linter named \''+(a&&a.name?a.name:'Unknown')+'\'',c),!1)}function validateIndie(a){var b=[];return a&&'object'===('undefined'==typeof a?'undefined':_typeof(a))?'string'!=typeof a.name&&b.push('Indie.name must be a string'):b.push('Indie must be an object'),!b.length||(showError('Invalid Indie received','These issues were encountered while registering an Indie Linter named \''+(a&&a.name?a.name:'Unknown')+'\'',b),!1)}function validateMessages(a,b){var c=[];if(Array.isArray(b))for(var d=!1,e=!1,f=!1,g=!1,h=!1,j=!1,k=!1,l=!1,m=0,n=b.length;m<n;++m){var o=b[m],p=o.reference;if(!e&&o.icon&&'string'!=typeof o.icon&&(e=!0,c.push('Message.icon must be a string')),!g&&(!o.location||'object'!==_typeof(o.location)||'string'!=typeof o.location.file||'object'!==_typeof(o.location.position)||!o.location.position))g=!0,c.push('Message.location must be valid');else if(!g){var q=atom$1.Range.fromObject(o.location.position);(_NumberisNaN(q.start.row)||_NumberisNaN(q.start.column)||_NumberisNaN(q.end.row)||_NumberisNaN(q.end.column))&&(g=!0,c.push('Message.location.position should not contain NaN coordinates'));}if(j||!o.solutions||Array.isArray(o.solutions)||(j=!0,c.push('Message.solutions must be valid')),!k&&p&&('object'!==('undefined'==typeof p?'undefined':_typeof(p))||'string'!=typeof p.file||'object'!==_typeof(p.position)||!p.position))k=!0,c.push('Message.reference must be valid');else if(!k&&p){var q=atom$1.Point.fromObject(p.position);(_NumberisNaN(q.row)||_NumberisNaN(q.column))&&(k=!0,c.push('Message.reference.position should not contain NaN coordinates'));}f||'string'==typeof o.excerpt||(f=!0,c.push('Message.excerpt must be a string')),h||VALID_SEVERITY.has(o.severity)||(h=!0,c.push('Message.severity must be \'error\', \'warning\' or \'info\'')),!d&&o.url&&'string'!=typeof o.url&&(d=!0,c.push('Message.url must a string')),!l&&o.description&&'function'!=typeof o.description&&'string'!=typeof o.description&&(l=!0,c.push('Message.description must be a function or string'));}else c.push('Linter Result must be an Array');return!c.length||(showError('Invalid Linter Result received','These issues were encountered while processing messages from a linter named \''+a+'\'',c),!1)}function validateMessagesLegacy(a,b){var c=[];if(Array.isArray(b))for(var o,d=!1,e=!1,f=!1,g=!1,h=!1,j=!1,k=!1,l=!1,m=0,n=b.length;m<n;++m){if(o=b[m],e||'string'==typeof o.type||(e=!0,c.push('Message.type must be a string')),j||('string'==typeof o.text||'string'==typeof o.html||o.html instanceof HTMLElement)&&(o.text||o.html)||(j=!0,c.push('Message.text or Message.html must have a valid value')),!k&&o.filePath&&'string'!=typeof o.filePath&&(k=!0,c.push('Message.filePath must be a string')),!g&&o.range&&'object'!==_typeof(o.range))g=!0,c.push('Message.range must be an object');else if(!g&&o.range){var p=atom$1.Range.fromObject(o.range);(_NumberisNaN(p.start.row)||_NumberisNaN(p.start.column)||_NumberisNaN(p.end.row)||_NumberisNaN(p.end.column))&&(g=!0,c.push('Message.range should not contain NaN coordinates'));}!f&&o.class&&'string'!=typeof o.class&&(f=!0,c.push('Message.class must be a string')),l||!o.severity||VALID_SEVERITY.has(o.severity)||(l=!0,c.push('Message.severity must be \'error\', \'warning\' or \'info\'')),h||!o.trace||Array.isArray(o.trace)||(h=!0,c.push('Message.trace must be an Array')),!d&&o.fix&&('object'!==_typeof(o.fix.range)||'string'!=typeof o.fix.newText||o.fix.oldText&&'string'!=typeof o.fix.oldText)&&(d=!0,c.push('Message.fix must be valid'));}else c.push('Linter Result must be an Array');return!c.length||(showError('Invalid Linter Result received','These issues were encountered while processing messages from a linter named \''+a+'\'',c),!1)}

var UIRegistry=function(){function a(){classCallCheck(this,a),this.providers=new Set,this.subscriptions=new atom$1.CompositeDisposable;}return createClass(a,[{key:'add',value:function add(b){!this.providers.has(b)&&validateUI(b)&&(this.subscriptions.add(b),this.providers.add(b));}},{key:'delete',value:function _delete(b){this.providers.has(b)&&(b.dispose(),this.providers.delete(b));}},{key:'render',value:function render(b){this.providers.forEach(function(c){c.render(b);});}},{key:'didBeginLinting',value:function didBeginLinting(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;this.providers.forEach(function(d){d.didBeginLinting(b,c);});}},{key:'didFinishLinting',value:function didFinishLinting(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;this.providers.forEach(function(d){d.didFinishLinting(b,c);});}},{key:'dispose',value:function dispose(){this.providers.clear(),this.subscriptions.dispose();}}]),a}();

var SelectListView; var ToggleProviders=function(){function a(b,c){var d=this;classCallCheck(this,a),this.action=b,this.emitter=new atom$1.Emitter,this.providers=c,this.subscriptions=new atom$1.CompositeDisposable,this.subscriptions.add(this.emitter),this.subscriptions.add(atom.config.observe('linter.disabledProviders',function(f){d.disabledProviders=f;}));}return createClass(a,[{key:'getItems',value:function(){var c=asyncToGenerator(function*(){var d=this;return'disable'===this.action?this.providers.filter(function(f){return!d.disabledProviders.includes(f)}):this.disabledProviders});return function(){return c.apply(this,arguments)}}()},{key:'process',value:function(){var c=asyncToGenerator(function*(d){if('disable'===this.action)this.disabledProviders.push(d),this.emitter.emit('did-disable',d);else{var f=this.disabledProviders.indexOf(d);-1!==f&&this.disabledProviders.splice(f,1);}atom.config.set('linter.disabledProviders',this.disabledProviders);});return function(){return c.apply(this,arguments)}}()},{key:'show',value:function(){var c=asyncToGenerator(function*(){var d=this;SelectListView||(SelectListView=require('atom-select-list'));var f=new SelectListView({items:yield this.getItems(),emptyMessage:'No matches found',filterKeyForItem:function filterKeyForItem(h){return h},elementForItem:function elementForItem(h){var i=document.createElement('li');return i.textContent=h,i},didConfirmSelection:function didConfirmSelection(h){d.process(h).catch(function(i){return console.error('[Linter] Unable to process toggle:',i)}).then(function(){return d.dispose()});},didCancelSelection:function didCancelSelection(){d.dispose();}}),g=atom.workspace.addModalPanel({item:f});f.focus(),this.subscriptions.add(new atom$1.Disposable(function(){g.destroy();}));});return function(){return c.apply(this,arguments)}}()},{key:'onDidDispose',value:function onDidDispose(b){return this.emitter.on('did-dispose',b)}},{key:'onDidDisable',value:function onDidDisable(b){return this.emitter.on('did-disable',b)}},{key:'dispose',value:function dispose(){this.emitter.emit('did-dispose'),this.subscriptions.dispose();}}]),a}();

var $version='__$sb_linter_version';var $activated='__$sb_linter_activated';var $requestLatest='__$sb_linter_request_latest';var $requestLastReceived='__$sb_linter_request_last_received';function shouldTriggerLinter(a,b,c){return b&&(2===a[$version]?!a.lintsOnChange:!a.lintOnFly)?!1:c.some(function(d){return a.grammarScopes.includes(d)})}var arrayUnique$1;function getEditorCursorScopes(a){return arrayUnique$1||(arrayUnique$1=require('lodash.uniq')),arrayUnique$1(a.getCursors().reduce(function(b,c){return b.concat(c.getScopeDescriptor().getScopesArray())},['*']))}var minimatch;function isPathIgnored(a,b,c){if(minimatch||(minimatch=require('minimatch')),c){for(var k,f=atom.project.getPaths(),g=0,h=f.length;g<h;++g)if(k=f[g],0===a.indexOf(k)){atom.project.getRepositories()[g];break}if(e&&e.isPathIgnored(a))return!0}var d='win32'===process.platform?a.replace(/\\/g,'/'):a;return minimatch(d,b)}function subscriptiveObserve(a,b,c){var d=null,e=a.observe(b,function(f){d&&d.dispose(),d=c.call(this,f);});return new atom$1.Disposable(function(){e.dispose(),d&&d.dispose();})}function messageKey(a){var b=a.reference;return['$LINTER:'+a.linterName,'$LOCATION:'+a.location.file+'$'+a.location.position.start.row+'$'+a.location.position.start.column+'$'+a.location.position.end.row+'$'+a.location.position.end.column,b?'$REFERENCE:'+b.file+'$'+(b.position?b.position.row+'$'+b.position.column:''):'$REFERENCE:null','$EXCERPT:'+a.excerpt,'$SEVERITY:'+a.severity,a.icon?'$ICON:'+a.icon:'$ICON:null',a.url?'$URL:'+a.url:'$URL:null'].join('')}function normalizeMessages(a,b){for(var c=0,d=b.length;c<d;++c){var e=b[c],f=e.reference;if(Array.isArray(e.location.position)&&(e.location.position=atom$1.Range.fromObject(e.location.position)),f&&Array.isArray(f.position)&&(f.position=atom$1.Point.fromObject(f.position)),e.solutions&&e.solutions.length)for(var k,g=0,h=e.solutions.length;g<h;g++)k=e.solutions[g],Array.isArray(k.position)&&(k.position=atom$1.Range.fromObject(k.position));e.version=2,e.linterName=a,e.key=messageKey(e);}}function messageKeyLegacy(a){return['$LINTER:'+a.linterName,'$LOCATION:'+(a.filePath||'')+'$'+(a.range?a.range.start.row+'$'+a.range.start.column+'$'+a.range.end.row+'$'+a.range.end.column:''),'$TEXT:'+(a.text||''),'$HTML:'+(a.html||''),'$SEVERITY:'+a.severity,'$TYPE:'+a.type,'$CLASS:'+(a.class||'')].join('')}function normalizeMessagesLegacy(a,b){for(var c=0,d=b.length;c<d;++c){var e=b[c],f=e.fix;if(e.range&&'Array'===e.range.constructor.name&&(e.range=atom$1.Range.fromObject(e.range)),f&&'Array'===f.range.constructor.name&&(f.range=atom$1.Range.fromObject(f.range)),!e.severity){var g=e.type.toLowerCase();e.severity='warning'===g?g:'info'===g||'trace'===g?'info':'error';}e.version=1,e.linterName=a,e.key=messageKeyLegacy(e),e.trace&&normalizeMessagesLegacy(a,e.trace);}}

var IndieDelegate=function(){function a(b,c){classCallCheck(this,a),this.indie=b,this.scope='project',this.version=c,this.emitter=new atom$1.Emitter,this.messages=new Map,this.subscriptions=new atom$1.CompositeDisposable,this.subscriptions.add(this.emitter);}return createClass(a,[{key:'getMessages',value:function getMessages(){return Array.from(this.messages.values()).reduce(function(b,c){return b.concat(c)},[])}},{key:'deleteMessages',value:function deleteMessages(){if(1===this.version)this.clearMessages();else throw new Error('Call to depreciated method deleteMessages(). Use clearMessages() insead')}},{key:'clearMessages',value:function clearMessages(){this.subscriptions.disposed||(this.emitter.emit('did-update',[]),this.messages.clear());}},{key:'setMessages',value:function setMessages(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;if(1===this.version){if(!Array.isArray(b))throw new Error('Parameter 1 to setMessages() must be Array');return void this.setAllMessages(b)}if('string'!=typeof b||!Array.isArray(c))throw new Error('Invalid Parameters to setMessages()');var d=b;this.subscriptions.disposed||!validateMessages(this.name,c)||(c.forEach(function(e){if(e.location.file!==d)throw console.debug('[Linter-UI-Default] Expected File',d,'Message',e),new Error('message.location.file does not match the given filePath')}),normalizeMessages(this.name,c),this.messages.set(d,c),this.emitter.emit('did-update',this.getMessages()));}},{key:'setAllMessages',value:function setAllMessages(b){if(!this.subscriptions.disposed){if(1===this.version){if(!validateMessagesLegacy(this.name,b))return;normalizeMessagesLegacy(this.name,b);}else{if(!validateMessages(this.name,b))return;normalizeMessages(this.name,b);}this.messages.clear();for(var c=0,d=b.length;c<d;++c){var e=b[c],f=1===e.version?e.filePath:e.location.file,g=this.messages.get(f);g||this.messages.set(f,g=[]),g.push(e);}this.emitter.emit('did-update',this.getMessages());}}},{key:'onDidUpdate',value:function onDidUpdate(b){return this.emitter.on('did-update',b)}},{key:'onDidDestroy',value:function onDidDestroy(b){return this.emitter.on('did-destroy',b)}},{key:'dispose',value:function dispose(){this.emitter.emit('did-destroy'),this.subscriptions.dispose(),this.messages.clear();}},{key:'name',get:function get$$1(){return this.indie.name}}]),a}();

var IndieRegistry=function(){function a(){classCallCheck(this,a),this.emitter=new atom$1.Emitter,this.delegates=new Set,this.subscriptions=new atom$1.CompositeDisposable,this.subscriptions.add(this.emitter);}return createClass(a,[{key:'register',value:function register(b,c){var d=this;if(!validateIndie(b))throw new Error('Error registering Indie Linter');var e=new IndieDelegate(b,c);return this.delegates.add(e),e.onDidDestroy(function(){d.delegates.delete(e);}),e.onDidUpdate(function(f){d.emitter.emit('did-update',{linter:e,messages:f});}),this.emitter.emit('observe',e),e}},{key:'observe',value:function observe(b){return this.delegates.forEach(b),this.emitter.on('observe',b)}},{key:'onDidUpdate',value:function onDidUpdate(b){return this.emitter.on('did-update',b)}},{key:'dispose',value:function dispose(){var b=!0,c=!1,d=void 0;try{for(var f,g,e=this.delegates[Symbol.iterator]();!(b=(f=e.next()).done);b=!0)g=f.value,g.dispose();}catch(g){c=!0,d=g;}finally{try{!b&&e.return&&e.return();}finally{if(c)throw d}}this.subscriptions.dispose();}}]),a}();

var $version$1=$version; var $activated$1=$activated; var $requestLatest$1=$requestLatest; var $requestLastReceived$1=$requestLastReceived; var LinterRegistry=function(){function a(){var b=this;classCallCheck(this,a),this.emitter=new atom$1.Emitter,this.linters=new Set,this.subscriptions=new atom$1.CompositeDisposable,this.subscriptions.add(atom.config.observe('linter.lintOnChange',function(c){b.lintOnChange=c;})),this.subscriptions.add(atom.config.observe('core.excludeVcsIgnoredPaths',function(c){b.ignoreVCS=c;})),this.subscriptions.add(atom.config.observe('linter.ignoreGlob',function(c){b.ignoreGlob=c;})),this.subscriptions.add(atom.config.observe('linter.lintPreviewTabs',function(c){b.lintPreviewTabs=c;})),this.subscriptions.add(atom.config.observe('linter.disabledProviders',function(c){b.disabledProviders=c;})),this.subscriptions.add(this.emitter);}return createClass(a,[{key:'hasLinter',value:function hasLinter(b){return this.linters.has(b)}},{key:'addLinter',value:function addLinter(b){var c=1<arguments.length&&void 0!==arguments[1]&&arguments[1],d=c?1:2;validateLinter(b,d)&&(b[$activated$1]=!0,'undefined'==typeof b[$requestLatest$1]&&(b[$requestLatest$1]=0),'undefined'==typeof b[$requestLastReceived$1]&&(b[$requestLastReceived$1]=0),b[$version$1]=d,this.linters.add(b));}},{key:'getLinters',value:function getLinters(){return Array.from(this.linters)}},{key:'deleteLinter',value:function deleteLinter(b){this.linters.has(b)&&(b[$activated$1]=!1,this.linters.delete(b));}},{key:'lint',value:function(){var c=asyncToGenerator(function*(d){var e=this,f=d.onChange,g=d.editor,h=g.getPath();if(f&&!this.lintOnChange||!h||isPathIgnored(g.getPath(),this.ignoreGlob,this.ignoreVCS)||!this.lintPreviewTabs&&atom.workspace.getActivePane().getPendingItem()===g)return!1;var i=getEditorCursorScopes(g),j=[],k=function _loop(r){if(!shouldTriggerLinter(r,f,i))return'continue';if(e.disabledProviders.includes(r.name))return'continue';var s=++r[$requestLatest$1],t='file'===r.scope?g.getBuffer():null,u='file'===r.scope?h:null;e.emitter.emit('did-begin-linting',{number:s,linter:r,filePath:u}),j.push(new Promise(function(v){v(r.lint(g));}).then(function(v){if((e.emitter.emit('did-finish-linting',{number:s,linter:r,filePath:u}),!(r[$requestLastReceived$1]>=s)&&r[$activated$1]&&(!t||t.isAlive()))&&(r[$requestLastReceived$1]=s,!t||t.isAlive())&&null!==v){var w=!0;(atom.inDevMode()||!Array.isArray(v))&&(w=2===r[$version$1]?validateMessages(r.name,v):validateMessagesLegacy(r.name,v)),w&&(2===r[$version$1]?normalizeMessages(r.name,v):normalizeMessagesLegacy(r.name,v),e.emitter.emit('did-update-messages',{messages:v,linter:r,buffer:t}));}},function(v){e.emitter.emit('did-finish-linting',{number:s,linter:r,filePath:u}),atom.notifications.addError('[Linter] Error running '+r.name,{detail:'See Console for more info. (Open View -> Developer -> Toogle Developer Tools)'}),console.error('[Linter] Error running '+r.name,v);}));},l=!0,m=!1,n=void 0;try{for(var p,o=this.linters[Symbol.iterator]();!(l=(p=o.next()).done);l=!0){var r=p.value,q=k(r);}}catch(r){m=!0,n=r;}finally{try{!l&&o.return&&o.return();}finally{if(m)throw n}}return yield Promise.all(j),!0});return function(){return c.apply(this,arguments)}}()},{key:'onDidUpdateMessages',value:function onDidUpdateMessages(b){return this.emitter.on('did-update-messages',b)}},{key:'onDidBeginLinting',value:function onDidBeginLinting(b){return this.emitter.on('did-begin-linting',b)}},{key:'onDidFinishLinting',value:function onDidFinishLinting(b){return this.emitter.on('did-finish-linting',b)}},{key:'dispose',value:function dispose(){this.linters.clear(),this.subscriptions.dispose();}}]),a}();

var MessageRegistry=function(){function a(){classCallCheck(this,a),this.emitter=new atom$1.Emitter,this.messages=[],this.messagesMap=new Set,this.subscriptions=new atom$1.CompositeDisposable,this.debouncedUpdate=debounce(this.update,100,!0),this.subscriptions.add(this.emitter);}return createClass(a,[{key:'set',value:function set$$1(b){var c=b.messages,d=b.linter,e=b.buffer,f=null,g=!0,h=!1,j=void 0;try{for(var l,m,k=this.messagesMap[Symbol.iterator]();!(g=(l=k.next()).done);g=!0)if(m=l.value,m.buffer===e&&m.linter===d){f=m;break}}catch(m){h=!0,j=m;}finally{try{!g&&k.return&&k.return();}finally{if(h)throw j}}f?(f.messages=c,f.changed=!0):this.messagesMap.add({messages:c,linter:d,buffer:e,oldMessages:[],changed:!0,deleted:!1}),this.debouncedUpdate();}},{key:'update',value:function update(){var b={added:[],removed:[],messages:[]},c=!0,d=!1,e=void 0;try{for(var g,h,f=this.messagesMap[Symbol.iterator]();!(c=(g=f.next()).done);c=!0){if(h=g.value,h.deleted){b.removed=b.removed.concat(h.oldMessages),this.messagesMap.delete(h);continue}if(!h.changed){b.messages=b.messages.concat(h.oldMessages);continue}if(h.changed=!1,!h.oldMessages.length){b.added=b.added.concat(h.messages),b.messages=b.messages.concat(h.messages),h.oldMessages=h.messages;continue}if(!h.messages.length){b.removed=b.removed.concat(h.oldMessages),h.oldMessages=[];continue}var j=new Set,k=new Set,l=h.oldMessages,m=!1;h.oldMessages=[];for(var p,n=0,o=l.length;n<o;++n)p=l[n],p.key=2===p.version?messageKey(p):messageKeyLegacy(p),k.add(p.key);for(var p,n=0,o=h.messages.length;n<o;++n)(p=h.messages[n],!j.has(p.key))&&(j.add(p.key),k.has(p.key)||(m=!0,b.added.push(p),b.messages.push(p),h.oldMessages.push(p)));if(!m&&h.messages.length===l.length){b.messages=b.messages.concat(l),h.oldMessages=l;continue}for(var p,n=0,o=l.length;n<o;++n)p=l[n],j.has(p.key)?(h.oldMessages.push(p),b.messages.push(p)):b.removed.push(p);}}catch(h){d=!0,e=h;}finally{try{!c&&f.return&&f.return();}finally{if(d)throw e}}(b.added.length||b.removed.length)&&(this.messages=b.messages,this.emitter.emit('did-update-messages',b));}},{key:'onDidUpdateMessages',value:function onDidUpdateMessages(b){return this.emitter.on('did-update-messages',b)}},{key:'deleteByBuffer',value:function deleteByBuffer(b){var c=!0,d=!1,e=void 0;try{for(var g,h,f=this.messagesMap[Symbol.iterator]();!(c=(g=f.next()).done);c=!0)h=g.value,h.buffer===b&&(h.deleted=!0);}catch(h){d=!0,e=h;}finally{try{!c&&f.return&&f.return();}finally{if(d)throw e}}this.debouncedUpdate();}},{key:'deleteByLinter',value:function deleteByLinter(b){var c=!0,d=!1,e=void 0;try{for(var g,h,f=this.messagesMap[Symbol.iterator]();!(c=(g=f.next()).done);c=!0)h=g.value,h.linter===b&&(h.deleted=!0);}catch(h){d=!0,e=h;}finally{try{!c&&f.return&&f.return();}finally{if(d)throw e}}this.debouncedUpdate();}},{key:'dispose',value:function dispose(){this.subscriptions.dispose();}}]),a}();

var EditorLinter=function(){function a(b){var c=this;if(classCallCheck(this,a),!atom.workspace.isTextEditor(b))throw new Error('EditorLinter expects a valid TextEditor');this.editor=b,this.emitter=new atom$1.Emitter,this.subscriptions=new atom$1.CompositeDisposable,this.subscriptions.add(this.editor.onDidDestroy(function(){return c.dispose()})),this.subscriptions.add(this.editor.onDidSave(debounce(function(){return c.emitter.emit('should-lint',!1)}),16,!0)),this.subscriptions.add(subscriptiveObserve(atom.config,'linter.lintOnChangeInterval',function(d){return c.editor.getBuffer().onDidChange(debounce(function(){c.emitter.emit('should-lint',!0);},d))}));}return createClass(a,[{key:'getEditor',value:function getEditor(){return this.editor}},{key:'lint',value:function lint(){var b=0<arguments.length&&void 0!==arguments[0]&&arguments[0];this.emitter.emit('should-lint',b);}},{key:'onShouldLint',value:function onShouldLint(b){return this.emitter.on('should-lint',b)}},{key:'onDidDestroy',value:function onDidDestroy(b){return this.emitter.on('did-destroy',b)}},{key:'dispose',value:function dispose(){this.emitter.emit('did-destroy'),this.subscriptions.dispose(),this.emitter.dispose();}}]),a}();

var EditorRegistry=function(){function a(){var b=this;classCallCheck(this,a),this.emitter=new atom$1.Emitter,this.subscriptions=new atom$1.CompositeDisposable,this.editorLinters=new Map,this.subscriptions.add(this.emitter),this.subscriptions.add(atom.config.observe('linter.lintOnOpen',function(c){b.lintOnOpen=c;}));}return createClass(a,[{key:'activate',value:function activate(){var b=this;this.subscriptions.add(atom.workspace.observeTextEditors(function(c){b.createFromTextEditor(c);}));}},{key:'get',value:function get$$1(b){return this.editorLinters.get(b)}},{key:'createFromTextEditor',value:function createFromTextEditor(b){var c=this,d=this.editorLinters.get(b);return d?d:(d=new EditorLinter(b),d.onDidDestroy(function(){c.editorLinters.delete(b);}),this.editorLinters.set(b,d),this.emitter.emit('observe',d),this.lintOnOpen&&d.lint(),d)}},{key:'observe',value:function observe(b){return this.editorLinters.forEach(b),this.emitter.on('observe',b)}},{key:'dispose',value:function dispose(){var b=!0,c=!1,d=void 0;try{for(var f,g,e=this.editorLinters.values()[Symbol.iterator]();!(b=(f=e.next()).done);b=!0)g=f.value,g.dispose();}catch(g){c=!0,d=g;}finally{try{!b&&e.return&&e.return();}finally{if(c)throw d}}this.subscriptions.dispose();}}]),a}();

var Linter=function(){function c(){var d=this;classCallCheck(this,c),this.commands=new Commands,this.registryUI=new UIRegistry,this.registryIndie=new IndieRegistry,this.registryEditors=new EditorRegistry,this.registryLinters=new LinterRegistry,this.registryMessages=new MessageRegistry,this.idleCallbacks=new Set,this.subscriptions=new atom$1.CompositeDisposable,this.subscriptions.add(this.commands),this.subscriptions.add(this.registryUI),this.subscriptions.add(this.registryIndie),this.subscriptions.add(this.registryMessages),this.subscriptions.add(this.registryEditors),this.subscriptions.add(this.registryLinters),this.commands.onShouldLint(function(){var f=d.registryEditors.get(atom.workspace.getActiveTextEditor());f&&f.lint();}),this.commands.onShouldToggleActiveEditor(function(){var f=atom.workspace.getActiveTextEditor(),g=d.registryEditors.get(f);g?g.dispose():f&&d.registryEditors.createFromTextEditor(f);}),this.commands.onShouldDebug(asyncToGenerator(function*(){var f=d.registryLinters.getLinters(),g=atom.workspace.getActiveTextEditor(),h=getEditorCursorScopes(g),i=atom.packages.getLoadedPackage('linter').metadata,j=f.sort(function(n,o){return n.name.localeCompare(o.name)}).map(function(n){return'  - '+n.name}).join('\n'),k=f.filter(function(n){return shouldTriggerLinter(n,!1,h)}).sort(function(n,o){return n.name.localeCompare(o.name)}).map(function(n){return'  - '+n.name}).join('\n'),l=h.map(function(n){return'  - '+n}).join('\n'),m=atom.config.get('linter.disabledProviders').map(function(n){return'  - '+n}).join('\n');atom.notifications.addInfo('Linter Debug Info',{detail:['Platform: '+process.platform,'Atom Version: '+atom.getVersion(),'Linter Version: '+i.version,'All Linter Providers: \n'+j,'Matching Linter Providers: \n'+k,'Disabled Linter Providers; \n'+m,'Current File scopes: \n'+l].join('\n'),dismissable:!0});})),this.commands.onShouldToggleLinter(function(f){var g=new ToggleProviders(f,arrayUnique(d.registryLinters.getLinters().map(function(h){return h.name})));g.onDidDispose(function(){d.subscriptions.remove(g);}),g.onDidDisable(function(h){var i=d.registryLinters.getLinters().find(function(j){return j.name===h});i&&d.registryMessages.deleteByLinter(i);}),g.show(),d.subscriptions.add(g);}),this.registryIndie.observe(function(f){f.onDidDestroy(function(){d.registryMessages.deleteByLinter(f);});}),this.registryEditors.observe(function(f){f.onShouldLint(function(g){d.registryLinters.lint({onChange:g,editor:f.getEditor()});}),f.onDidDestroy(function(){d.registryMessages.deleteByBuffer(f.getEditor().getBuffer());});}),this.registryIndie.onDidUpdate(function(f){var g=f.linter,h=f.messages;d.registryMessages.set({linter:g,messages:h,buffer:null});}),this.registryLinters.onDidUpdateMessages(function(f){var g=f.linter,h=f.messages,i=f.buffer;d.registryMessages.set({linter:g,messages:h,buffer:i});}),this.registryLinters.onDidBeginLinting(function(f){var g=f.linter,h=f.filePath;d.registryUI.didBeginLinting(g,h);}),this.registryLinters.onDidFinishLinting(function(f){var g=f.linter,h=f.filePath;d.registryUI.didFinishLinting(g,h);}),this.registryMessages.onDidUpdateMessages(function(f){d.registryUI.render(f);});var e=window.requestIdleCallback(function(){var g=this;this.subscriptions.disposed||this.subscriptions.add(atom.project.onDidChangePaths(function(){g.commands.lint();})),this.registryEditors.activate();}.bind(this));this.idleCallbacks.add(e);}return createClass(c,[{key:'dispose',value:function dispose(){this.idleCallbacks.forEach(function(d){return window.cancelIdleCallback(d)}),this.idleCallbacks.clear(),this.subscriptions.dispose();}},{key:'addUI',value:function addUI(d){this.registryUI.add(d);var e=this.registryMessages.messages;e.length&&d.render({added:e,messages:e,removed:[]});}},{key:'deleteUI',value:function deleteUI(d){this.registryUI.delete(d);}},{key:'addLinter',value:function addLinter(d){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1];this.registryLinters.addLinter(d,e);}},{key:'deleteLinter',value:function deleteLinter(d){this.registryLinters.deleteLinter(d),this.registryMessages.deleteByLinter(d);}},{key:'addIndie',value:function addIndie(d){this.registryIndie.register(d,2);}},{key:'addLegacyIndie',value:function addLegacyIndie(d){this.registryIndie.register(d,1);}}]),c}();

var _templateObject=taggedTemplateLiteral(['\n      Hi Linter user! \uD83D\uDC4B\n\n      Linter has been upgraded to v2.\n\n      Packages compatible with v1 will keep working on v2 for a long time.\n      If you are a package author, I encourage you to upgrade your package to the Linter v2 API.\n\n      You can read [the announcement post on my blog](http://steelbrain.me/2017/03/13/linter-v2-released.html).\n    '],['\n      Hi Linter user! \uD83D\uDC4B\n\n      Linter has been upgraded to v2.\n\n      Packages compatible with v1 will keep working on v2 for a long time.\n      If you are a package author, I encourage you to upgrade your package to the Linter v2 API.\n\n      You can read [the announcement post on my blog](http://steelbrain.me/2017/03/13/linter-v2-released.html).\n    ']);
var coolTrim=void 0;function greet(){return coolTrim||(coolTrim=require('cool-trim')),atom.notifications.addInfo('Welcome to Linter v2',{dismissable:!0,description:coolTrim(_templateObject)})}

var Greeter=function(){function a(){classCallCheck(this,a),this.notifications=new Set;}return createClass(a,[{key:'showWelcome',value:function showWelcome(){var b=this,c=greet();c.onDidDismiss(function(){return b.notifications.delete(c)}),this.notifications.add(c);}},{key:'dispose',value:function dispose(){this.notifications.forEach(function(b){return b.dismiss()}),this.notifications.clear();}}]),a}();

var instance; var idleCallbacks=new Set;var index = {activate:function activate(){this.subscriptions=new atom$1.CompositeDisposable,instance=new Linter,this.subscriptions.add(instance);var a=window.requestIdleCallback(function(){var c=asyncToGenerator(function*(){idleCallbacks.delete(a);var d=new Greeter;this.subscriptions.add(d);var f=atom.config.get('linter'),g=['lintOnFly','lintOnFlyInterval','ignoredMessageTypes','ignoreVCSIgnoredFiles','ignoreMatchedFiles','showErrorInline','inlineTooltipInterval','gutterEnabled','gutterPosition','underlineIssues','showProviderName','showErrorPanel','errorPanelHeight','alwaysTakeMinimumSpace','displayLinterInfo','displayLinterStatus','showErrorTabLine','showErrorTabFile','showErrorTabProject','statusIconScope','statusIconPosition'];g.some(function(j){return{}.hasOwnProperty.call(f,j)})&&d.showWelcome(),g.forEach(function(j){atom.config.unset('linter.'+j);});var h=require('sb-fs'),i=Path.join(atom.getConfigDirPath(),'linter-config.json');if(yield h.exists(i)){var j=atom.config.get('linter.disabledProviders');try{var k=yield h.readFile(i,'utf8');j=j.concat(JSON.parse(k).disabled);}catch(k){console.error('[Linter] Error reading old state file',k);}atom.config.set('linter.disabledProviders',j);try{yield h.unlink(i);}catch(k){}}});return function(){return c.apply(this,arguments)}}().bind(this));if(idleCallbacks.add(a),!atom.inSpecMode()){var b=window.requestIdleCallback(function(){idleCallbacks.delete(b),require('atom-package-deps').install('linter',!0);});idleCallbacks.add(b);}},consumeLinter:function consumeLinter(a){var b=[].concat(a),c=!0,d=!1,f=void 0;try{for(var h,i,g=b[Symbol.iterator]();!(c=(h=g.next()).done);c=!0)i=h.value,instance.addLinter(i);}catch(i){d=!0,f=i;}finally{try{!c&&g.return&&g.return();}finally{if(d)throw f}}return new atom$1.Disposable(function(){var i=!0,j=!1,k=void 0;try{for(var m,n,l=b[Symbol.iterator]();!(i=(m=l.next()).done);i=!0)n=m.value,instance.deleteLinter(n);}catch(n){j=!0,k=n;}finally{try{!i&&l.return&&l.return();}finally{if(j)throw k}}})},consumeLinterLegacy:function consumeLinterLegacy(a){var b=[].concat(a),c=!0,d=!1,f=void 0;try{for(var h,i,g=b[Symbol.iterator]();!(c=(h=g.next()).done);c=!0)i=h.value,a.name=a.name||'Unknown',a.lintOnFly=!!a.lintOnFly,instance.addLinter(i,!0);}catch(i){d=!0,f=i;}finally{try{!c&&g.return&&g.return();}finally{if(d)throw f}}return new atom$1.Disposable(function(){var i=!0,j=!1,k=void 0;try{for(var m,n,l=b[Symbol.iterator]();!(i=(m=l.next()).done);i=!0)n=m.value,instance.deleteLinter(n);}catch(n){j=!0,k=n;}finally{try{!i&&l.return&&l.return();}finally{if(j)throw k}}})},consumeUI:function consumeUI(a){var b=[].concat(a),c=!0,d=!1,f=void 0;try{for(var h,i,g=b[Symbol.iterator]();!(c=(h=g.next()).done);c=!0)i=h.value,instance.addUI(i);}catch(i){d=!0,f=i;}finally{try{!c&&g.return&&g.return();}finally{if(d)throw f}}return new atom$1.Disposable(function(){var i=!0,j=!1,k=void 0;try{for(var m,n,l=b[Symbol.iterator]();!(i=(m=l.next()).done);i=!0)n=m.value,instance.deleteUI(n);}catch(n){j=!0,k=n;}finally{try{!i&&l.return&&l.return();}finally{if(j)throw k}}})},provideIndie:function provideIndie(){return function(a){return instance.addIndie(a)}},provideIndieLegacy:function provideIndieLegacy(){return{register:function register(a){return instance.addLegacyIndie(a)}}},deactivate:function deactivate(){idleCallbacks.forEach(function(a){return window.cancelIdleCallback(a)}),idleCallbacks.clear(),this.subscriptions.dispose();}};

module.exports = index;
