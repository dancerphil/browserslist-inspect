# browserslist-inspect

[![version](https://img.shields.io/npm/v/browserslist-inspect.svg?style=flat-square)](http://npm.im/browserslist-inspect)
[![npm downloads](https://img.shields.io/npm/dm/browserslist-inspect.svg?style=flat-square)](https://www.npmjs.com/package/browserslist-inspect)
[![MIT License](https://img.shields.io/npm/l/browserslist-inspect.svg?style=flat-square)](http://opensource.org/licenses/MIT)

```javascript
import browserslistInspect from 'browserslist-inspect';

browserslistInspect(); // 'MATCHED' | 'BROWSER_NOT_SUPPORTED' | 'VERSION_TOO_LOW' | 'VERSION_TOO_HIGH'

browserslistInspect('> 0.5%, last 2 versions, Firefox ESR, not dead');
```

Also visit https://browserslist.dev to config your queries.
