# Covenant
Covenant for redux devoting oneself to request data easily with UI Component,support SPA and SSR

> I am still working on composing context for the Covenant of Store and hooks.

Language: [Chinese](README.md)

# Example
[Base](https://codesandbox.io/s/vjp3xzv27)

[LoadMore](https://codesandbox.io/s/7zn7m37911)


# Install
```
npm install redux-covenant --save
```
# Start

Add Covenant to Reducers `/src/reducers/index.js`
```javascript
import {combineReducers} from 'redux';
import {covenant} from 'redux-covenant';

export default combineReducers({
  covenant,
  ...
});

```

The Request Method `/src/api/banner.js`
```javascript
import axios from 'axios';

export async function banner({ city_no = '020', platform = '1' }) {
  const url = `http://httpbin.org/get`;
  const res = await axios.get(url, { params: { city_no, platform } });
  // handle errors
  // e.g. throw new Error("")
  return { list: res.data.data };
}
```


Develop component
```javascript
import React, {Component} from 'react';
import {banner} from '/src/api/home';
import {query} from 'redux-covenant';

// 使用高阶函数获取数据给UI组件
// Use Higher-Order function fetch data to UI Components
@query(banner, {name: 'banner'})
class Banner extends Component {
  render() {
    let {banner, loading} = this.props;
    if (!banner || banner.loading) return "loading...";
    const {list, error} = banner;
    return (
      <div>
        {error}
        {list.map((item, key) => (
              <img key={key} src={item.img_url} title={item.alt} />
        ))}
      </div>
    );
  }
}
export default Banner;
```




