import React, { Component } from 'react';
import getQueryComponent from '../QueryComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const covenant = (name, value) => ({
  type: `covenant/${name}`,
  name,
  value,
});

const mapDispatchToProps = dispatch => bindActionCreators({ covenantAct: covenant }, dispatch);
//组件
/*export class Query extends Component {
  constructor(props) {
    super(props);
    let { query, type, name, variables, forcedUpdate = false, awaitQuery = false, updateQuery, children } = props;
    if (typeof children != 'function') {
      throw Error('children must be a Function');
    }
    this.QueryComponent = getQueryComponent({
      query,
      queryType: type,
      name,
      variables,
      forcedUpdate,
      awaitQuery,
      updateQuery,
      renderFun: children,
    });
  }
  render() {
    let QueryComponent = this.QueryComponent;
    return <QueryComponent />;
  }
}*/
// 连接器
const queryConnect = (query, options = {}) => WrappedComponent => {
  const mapStateToProps = state => {
    let queryName = options.name || query.name;
    return {
      queryName,
      store: state.covenant[queryName] || null,
    };
  };

  @connect(
    mapStateToProps,
    mapDispatchToProps
  )
  class QueryConsumer extends Component {
    constructor(props) {
      super(props);
      this.QueryComponent = getQueryComponent({
        ...options,
        query,
        WrappedComponent,
      });
    }

    render() {
      let QueryComponent = this.QueryComponent;
      return (
        <QueryComponent
          {...this.props}
          setStore={(name, value) => {
            this.props.covenantAct(name, value);
          }}
        />
      );
    }
  }
  return QueryConsumer;
};
export default queryConnect;
