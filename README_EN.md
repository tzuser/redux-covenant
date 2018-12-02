# Covenant
Covenant for redux devoting oneself to request data easily with UI Component,support SPA and SSR

> 我正在构建context做为Store的Covenant，以及hooks版Covenant
> Now i code Covenant 

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


# Covenant Api
`import {query} from 'redux-covenant';`
##### query(Promise,config)

## Promise
一个异步流

## Query Config

```json
{
  // `name` 请求成功后将会成为props的一个key
  name:'doctorList',
  
  // `variables`为异步流提供参数
  variables:props => ({
    shop_id: props.shopId,
    page_size: 4,
  }),
}

```

在返回的this.prop包含几个api
`fetchMore(config)`,获取更多
`json
confing
{
  //`variables`为异步流提供参数
variables: {page_no: doctorList.page + 1},
//`updateQuery`为异步流返回的结果，参数为之前的结果和新返回的数据
updateQuery: (previousResult, fetchMoreResult) => {
      return fetchMoreResult;
},
}

`

`refetch`,重新获取，相当强制重新拉取初始化的数据

