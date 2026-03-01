/**
* @phun-ky/typeof
* A set of JavaScript helper functions to check for types
* @author Alexander Vassbotn Røyne-Helgesen <alexander@phun-ky.net>
* @version 2.0.3
* @license
* Copyright (c) 2024 Alexander Vassbotn Røyne-Helgesen
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
function t(t){return"string"==typeof t}function r(r){return!t(r)}function e(t){return"number"==typeof t}function n(t){return!e(t)}function o(t){return"boolean"==typeof t}function c(t){return!o(t)}function u(t){return void 0===t}function f(t){return!u(t)}function i(t){return!u(t)}function p(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;const r=Object.getPrototypeOf(t);return r===Object.prototype||null===r}function l(t){if("object"!=typeof t||null===t)return!1;if("[object Object]"!==Object.prototype.toString.call(t))return!1;const r=Object.getPrototypeOf(t);if(null===r)return!0;const e=Object.prototype.hasOwnProperty.call(r,"constructor")?r.constructor:null;return"function"==typeof e&&e instanceof e&&Function.prototype.call(e)===Function.prototype.call(t)}function y(t){const r=typeof t;return null!==t&&("object"===r||"function"===r)}function a(t){if("function"!=typeof t)return!1;if(b(t))return!1;try{const r=Object.getOwnPropertyDescriptor(t,"prototype");return!!r&&!r.writable}catch{return!1}}function b(t){if("function"!=typeof t)return!1;return[Object,Array,Function,String,Number,Boolean,Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,Map,WeakMap,Set,WeakSet,Promise].includes(t)}const O=new Set([Object,Array,Function,String,Number,Boolean,Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,Map,WeakMap,Set,WeakSet,Promise,BigInt,Symbol]);function j(t){return"function"==typeof t&&O.has(t)}function E(t){return"object"==typeof t&&null!==t&&Object.getPrototypeOf(t)!==Object.prototype&&null!==Object.getPrototypeOf(t)}export{o as isBoolean,j as isBuiltInCallable,b as isBuiltInConstructor,a as isClass,i as isDefined,E as isInstanceOfUnknownClass,c as isNotBoolean,n as isNotNumber,r as isNotString,f as isNotUndefined,e as isNumber,y as isObjectLoose,p as isObjectPlain,l as isObjectStrict,t as isString,u as isUndefined};
//# sourceMappingURL=typeof.js.map
