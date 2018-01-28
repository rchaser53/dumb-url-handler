![build_status](https://travis-ci.org/rchaser53/dumb-url-handler.svg?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# what's this?

Node module 'url' is changed destructively in Node version 8. But now some service(AWS Lambda etc.) doesn't support Node 8. So we have to rewrite the code for 'url'. Needless to say, noone wants it. That's the reason why I create this module.

# support node version

above version 4.3.2(this version is used by AWS Lambda)

# how to use

use like below.

```javascript
const { createUrl, addQuery } = require('dumb-url-handler')

createUrl('http://localhost', ['yyy.js'])
// http://localhost/yyy.js

addQuery('http://localhost/yyy.js', { query1: 'value', query2: 'value2' })
// http://localhost/yyy.js?query1=value&query2=value2

parseQuery('http://localhost/yyy.js?query1=value1&query2=value2')
// { query1: 'value1', query2: 'value2' }
```
