import React, {Component} from 'react';
import QueryComponent from '../QueryComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {covenantAct, covenantClearAct} from './covenantStore';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      covenantAct: covenantAct,
      covenantClearAct: covenantClearAct,
    },
    dispatch
  );

// 连接器
const queryConnect = (query, options = {}) => WrappedComponent => {
  const mapStateToProps = state => {
    let queryName = options.name || query.name;
    return {
      queryName,
      store: state.covenant[queryName],
    };
  };

  @connect(
    mapStateToProps,
    mapDispatchToProps
  )
  class QueryConsumer extends Component {
    render() {
      let {queryName, store, hold, ...aisle} = this.props;
      return (
        <QueryComponent
          aisle={aisle}
          queryName={queryName}
          hold={hold}
          store={store}
          query={query}
          WrappedComponent={WrappedComponent}
          variables={options.variables}
          forcedUpdate={options.forcedUpdate}
          updateQuery={options.updateQuery}
          setStore={(name, value) => {
            this.props.covenantAct(name, value);
          }}
          clearStore={name => {
            this.props.covenantClearAct(name);
          }}
        />
      );
    }
  }
  return QueryConsumer;
};
export default queryConnect;
