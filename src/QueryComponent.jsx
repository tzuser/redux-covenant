import React, {Component} from 'react';
import cache from './cache';
import memory from './memory';
import {getCacheName, getVariablesData} from './utils';

/*function getQueryComponent({
  query,
  WrappedComponent,
  renderFun,
  name,
  variables = {},
  forcedUpdate = false,
  awaitQuery = false,
  ssr = true,
  updateQuery,
}) {

  
  return QueryComponent;
}
*/

class QueryComponent extends Component {
  constructor(props) {
    super(props);
    if (typeof window === 'object') {
      let {variables, forcedUpdate, updateQuery} = props;
      this.queryData(props, variables, forcedUpdate, updateQuery);
    }
    // 添加上下文
    memory.context[props.queryName] = {
      refetch: this.refetch.bind(this),
      fetchMore: this.fetchMore.bind(this),
    };
  }
  componentDidUpdate(prevProps, prevState) {
    let {variables, forcedUpdate, updateQuery,loading} = this.props;
    let changeVariables = prevProps.variables !== variables;
    let handleLoading = prevProps.loading && !loading;
    console.log(changeVariables,handleLoading)
    if (changeVariables || handleLoading) {
      this.queryData(this.props, variables, forcedUpdate, updateQuery);
    }
  }
  fetchData() {
    // 服务端 并且不需要服务端渲染时
    if (typeof widnow == 'undefined' && !ssr) return;
    let {variables, forcedUpdate, updateQuery} = this.props;
    let res = this.queryData(this.props, variables, forcedUpdate, updateQuery);
    return res;
  }

  async queryData(props, variables = {}, forcedUpdate, updateQuery) {
    //等待父级加载完成
    let {store, setStore, query, queryName, loading: fatherLoading, ...other} = props;
    if (fatherLoading) {
      setStore(queryName, {loading: true});
      return;
    }
    let variablesData = getVariablesData(variables, other);
    let cacheName = getCacheName(queryName, variablesData);
    let previousResult = Object.assign({}, store);
    // 不强制更新以及不存在缓存,拉取数据
    if (forcedUpdate || !cache.exist(cacheName)) {
      //如果当前正在请求
      if (memory.loading[cacheName]) {
        return;
      }
      memory.loading[cacheName] = true;
      let loading = true;
      //延迟设置加载
      setTimeout(() => {
        setStore(queryName, {loading: loading});
      });

      //请求数据
      let res;
      try {
        res = await query(variablesData);
      } catch (err) {
        loading = false;
        memory.loading[cacheName] = false;
        setStore(queryName, {error: err.message, loading: false});
        return;
      }
      memory.loading[cacheName] = false;
      //是否需要更新Store
      let resData = res;
      if (updateQuery) {
        let fetchMoreResult = Object.assign({}, res);
        resData = updateQuery(previousResult, fetchMoreResult);
      }
      resData.loading = loading = false;
      resData.error = null;
      setStore(queryName, resData);
      cache.set(cacheName, {name: queryName, data: res});
    } else {
      const fetchMoreResult = Object.assign({}, cache.getData(cacheName));
      // 请求数据处理
      if (updateQuery) {
        let resData = updateQuery(previousResult, fetchMoreResult);
        setStore(queryName, resData);
        // 加载中
      } else if (store.loading) {
        setStore(queryName, fetchMoreResult);
      }
    }
  }

  // 重新请求数据，会清除缓存
  refetch() {
    if (!forcedUpdate) {
      cache.clearByName(this.props.queryName);
    }
    this.queryData(this.props, this.props.variables, true);
  }

  // 获取更多数据
  fetchMore({variables = {}, forcedUpdate = false, updateQuery}) {
    this.queryData(this.props, variables, forcedUpdate, updateQuery);
  }

  render() {
    let {store, setStore, queryName, WrappedComponent, renderFun, query, ...other} = this.props;
    //剔除store setStore
    let newProps = {
      ...other,
      refetch: this.refetch.bind(this),
      fetchMore: this.fetchMore.bind(this),
      [queryName]: store,
    };

    if (renderFun) {
      return renderFun(newProps);
    } else if (WrappedComponent) {
      return <WrappedComponent {...newProps} />;
    }
  }
}

export default QueryComponent;
