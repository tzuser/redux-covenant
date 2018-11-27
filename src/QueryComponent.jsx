import React, {Component} from 'react';
import cache from './cache';
import memory from './memory';
import {getCacheName, getVariablesData} from './utils';

function getQueryComponent({
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
  class QueryComponent extends Component {
    constructor(props) {
      super(props);
      this.awaitQuery = awaitQuery;
      if (typeof window === 'object') {
        this.query(props, variables, forcedUpdate, updateQuery);
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.loading && !this.props.loading) {
        this.query(this.props, variables, forcedUpdate, updateQuery);
      }
    }
    fetchData() {
      // 服务端渲染时首次请求用
      if (ssr) {
        return this.query(this.props, variables, forcedUpdate, updateQuery);
      }
    }

    async query(props, variables, forcedUpdate, updateQuery) {
      //等待父级加载完成
      let {store, setStore, queryName,loading:fatherLoading, ...other} = props;
      if (fatherLoading) {
        setStore(queryName, {loading: true});
        return;
      }
      let variablesData = getVariablesData(variables, other);
      let cacheName = getCacheName(queryName, variablesData);
      let previousResult = Object.assign({}, store);
      if (forcedUpdate || !cache.exist(cacheName)) {
        //如果当前正在请求
        if (memory[cacheName]) {
          return;
        }
        memory[cacheName] = true;
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
          memory[cacheName] = false;
          setStore(queryName, {error: err.message, loading: false});
          return;
        }
        memory[cacheName] = false;
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
        if (updateQuery) {
          let resData = updateQuery(previousResult, fetchMoreResult);
          setStore(queryName, resData);
        } else if (!store) {
          setStore(queryName, fetchMoreResult);
        }
      }
    }

    refetch() {
      if (!forcedUpdate) {
        cache.clearByName(this.props.queryName);
      }
      this.query(this.props, variables, true);
    }

    fetchMore({variables = {}, forcedUpdate = false, awaitQuery = false, updateQuery}) {
      this.awaitQuery = awaitQuery;
      this.query(this.props, variables, forcedUpdate, updateQuery);
    }

    render() {
      let {store, setStore, queryName, ...other} = this.props;

      //剔除store setStore
      let newProps = {
        ...other,
        refetch: this.refetch.bind(this),
        fetchMore: this.fetchMore.bind(this),
        [queryName]: store,
      };

      if (this.awaitQuery && (!store || store.loading)) {
        return null;
      }

      if (!store) return null;
      if (renderFun) {
        return renderFun(newProps);
      } else if (WrappedComponent) {
        return <WrappedComponent {...newProps} />;
      }
    }
  }

  return QueryComponent;
}
export default getQueryComponent;
