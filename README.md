# redux-covenant
Covenant 可以让你轻松构建请求数据的UI组件。支持服务端渲染及首屏数据请求。

> 我正在构建context做为Store的Covenant，以及hooks版Covenant
# Installation
```
npm install redux-covenant --save
```
# Start

添加Covenant到Reducers `/src/reducers/index.js`
```
import {combineReducers} from 'redux';
import {covenant} from 'redux-covenant';

export default combineReducers({
  covenant,
  ...
});

```


编写Query方法 `/src/api/banner.js`
```
import axios from 'axios';

export async function banner({ city_no = '020', platform = '1' }) {
  let url = `https://m.gstzy.cn/api/admin.360gst.com/Interface/getbanner`;
  let res = await axios.get(url, { params: { city_no, platform } });
  // 这里可以做一些错误处理，只需要将错误抛出 throw new Error("")
  return { list: res.data.data };
}
```


组件开发
```
import React, {Component} from 'react';
import {banner} from '/src/api/home';
import {query} from 'redux-covenant';

// 使用高阶函数获取数据给UI组件
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
更多用法请参考API

query
正在编写中...
