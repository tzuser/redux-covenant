import React, { Component } from 'react';
import cache from './cache';
import { getCacheName, getVariablesData } from './utils';

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
    fetchData() {
      // 服务端渲染时首次请求用
      if (ssr) {
        return this.query(this.props, variables, forcedUpdate, updateQuery);
      }
    }
    query(props, variables, forcedUpdate, updateQuery) {
      return new Promise((reject, resolve) => {
        let { store, setStore, queryName, ...other } = props;
        let variablesData = getVariablesData(variables, other);
        let cacheName = getCacheName(queryName, variablesData);
        let previousResult = Object.assign({}, store);
        if (forcedUpdate || !cache.exist(cacheName)) {
          let loading = true;
          //延迟设置加载
          setTimeout(() => {
            setStore(queryName, { loading: loading });
          });

          //判断是否更新数据
          query(variablesData)
            .then(res => {
              cache.set(cacheName, { name: queryName, data: res });
              let resData = res;
              if (updateQuery) {
                let fetchMoreResult = Object.assign({}, res);
                resData = updateQuery(previousResult, fetchMoreResult);
              }
              resData.loading = loading = false;
              resData.error = null;
              setStore(queryName, resData);
              reject();
            })
            .catch(err => {
              loading = false;
              setStore(queryName, { error: err.message, loading: false });
              resolve();
            });
        } else {
          const fetchMoreResult = Object.assign({}, cache.getData(cacheName));
          if (updateQuery) {
            let resData = updateQuery(previousResult, fetchMoreResult);
            setStore(queryName, resData);
          } else if (!store) {
            setStore(queryName, fetchMoreResult);
          }
          reject();
        }
      });
    }

    refetch() {
      if (!forcedUpdate) {
        cache.clearByName(this.props.queryName);
      }
      this.query(this.props, variables, true);
    }

    fetchMore({ variables = {}, forcedUpdate = false, awaitQuery = false, updateQuery }) {
      this.awaitQuery = awaitQuery;
      this.query(this.props, variables, forcedUpdate, updateQuery);
    }

    render() {
      let { store, setStore, queryName, ...other } = this.props;

      //剔除store setStore
      let newProps = {
        ...other,
        refetch: this.refetch.bind(this),
        fetchMore: this.fetchMore.bind(this),
        [queryName]: store || {},
      };

      if (this.awaitQuery && !store) {
        return null;
      }
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
