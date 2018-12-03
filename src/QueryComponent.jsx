import React, {Component} from 'react';
import cache from './cache';
//import memory from './memory';
import {getCacheName, getVariablesData} from './utils';

class QueryComponent extends Component {
  constructor(props) {
    super(props);
    // 通过queryName 及 variables 合成的name
    this.cacheName = null;
    if (typeof window === 'object') {
      this.initialQuery(props);
    }
  }
  //创建组件时首次请求数据
  initialQuery(props) {
    let {queryName, variables, forcedUpdate, updateQuery, aisle} = props;
    let variablesData = this.getVariablesData(variables, aisle);
    const cacheName = getCacheName(queryName, variablesData);
    this.cacheName = cacheName;
    return this.queryData({props, variablesData, cacheName, forcedUpdate, updateQuery});
  }
  // cacheName 为本次请求的特征码
  async queryData({props, variablesData, cacheName, forcedUpdate, updateQuery}) {
    let {store, setStore, query, queryName, hold} = props;
    //等待父级加载完成
    if (hold) {
      return;
    }
    //this.cacheName=cacheName;
    let previousResult = Object.assign({}, store);
    // 不强制更新以及不存在缓存,拉取数据
    if (forcedUpdate || !cache.exist(cacheName)) {
      //如果当前正在请求
      await new Promise(resolve => setTimeout(resolve));
      //设置状态为加载中...
      await setStore(queryName, {loading: true});
      //请求数据
      let res;
      try {
        res = await query(variablesData);
      } catch (err) {
        /*if(cacheName!==this.cacheName){
          return
        }*/
        await setStore(queryName, {error: err.message, loading: false});
        return;
      }
      /*if(cacheName!==this.cacheName){
        console.log(cacheName,this.cacheName)
        console.log(queryName,'e')
        return
      }*/
      //是否需要更新Store
      let resData = res;
      if (updateQuery) {
        let fetchMoreResult = Object.assign({}, res);
        resData = updateQuery(previousResult, fetchMoreResult);
      }
      resData.loading = false;
      resData.error = null;
      await setStore(queryName, resData);
      cache.set(cacheName, {name: queryName, data: res});
      return resData;
    }
    const fetchMoreResult = Object.assign({}, cache.getData(cacheName));
    // 请求数据处理
    if (updateQuery) {
      let resData = updateQuery(previousResult, fetchMoreResult);
      await setStore(queryName, resData);
      return resData;
    }
    await setStore(queryName, fetchMoreResult);
    return fetchMoreResult;
  }
  //对比是否需要请求
  diffQuery() {
    let {variables, queryName, aisle} = this.props;
    let variablesData = this.getVariablesData(variables, aisle);
    let cacheName = getCacheName(queryName, variablesData);
    let isDiff = this.cacheName === cacheName;
    this.cacheName = cacheName;
    return isDiff;
  }

  componentDidUpdate(prevProps, prevState) {
    let {hold} = this.props;
    let changeVariables = !this.diffQuery(); //variables引用变化
    let handleHold = prevProps.hold && !hold; //hold变化
    if (changeVariables || handleHold) {
      this.handleData();
    }
  }

  fetchData() {
    // 服务端 并且不需要服务端渲染时
    if (typeof widnow == 'undefined' && !ssr) return;
    let res = initialQuery(this.props);
    return res;
  }
  getVariablesData(variables, aisle) {
    return getVariablesData(variables, aisle);
  }

  // 重新请求数据，会清楚之前store
  handleData() {
    let {queryName, variables, forcedUpdate, clearStore, aisle} = this.props;
    let variablesData = this.getVariablesData(variables, aisle);
    const cacheName = getCacheName(queryName, variablesData);
    this.cacheName = cacheName;
    clearStore(queryName);
    this.queryData({props: this.props, variablesData, cacheName, forcedUpdate});
  }

  // 重新请求数据，会清除缓存
  refetch() {
    let {queryName, variables, forcedUpdate, aisle} = this.props;
    if (!forcedUpdate) {
      cache.clearByName(queryName);
    }
    let variablesData = this.getVariablesData(variables, aisle);
    const cacheName = getCacheName(queryName, variablesData);
    return this.queryData({props: this.props, variablesData, cacheName, forcedUpdate: true});
  }

  // 获取更多数据
  fetchMore({variables = {}, forcedUpdate = false, updateQuery}) {
    let prevVariablesData = this.getVariablesData(this.props.variables, this.props.aisle);
    let variablesData = this.getVariablesData(variables, this.props.aisle);
    let newVariablesData = Object.assign({}, prevVariablesData, variablesData);
    const cacheName = getCacheName(this.props.queryName, newVariablesData);
    return this.queryData({props: this.props, variablesData: newVariablesData, cacheName, forcedUpdate, updateQuery});
  }

  render() {
    let {store, queryName, WrappedComponent, renderFun, aisle} = this.props;
    //剔除store setStore
    let newProps = {
      ...aisle,
      refetch: this.refetch.bind(this),
      fetchMore: this.fetchMore.bind(this),
      [queryName]: store || {loading: true},
    };

    if (renderFun) {
      return renderFun(newProps);
    } else if (WrappedComponent) {
      return <WrappedComponent {...newProps} />;
    }
  }
}

export default QueryComponent;
