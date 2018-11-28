import React, {Component} from 'react';
import QueryComponent from '../QueryComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {covenantAct} from './covenantStore';

const mapDispatchToProps = dispatch => bindActionCreators({covenantAct: covenantAct}, dispatch);

// 连接器
const queryConnect = (query, options = {}) => WrappedComponent => {
  const mapStateToProps = state => {
    let queryName = options.name || query.name;
    return {
      queryName,
      store: state.covenant[queryName] || {loading: true},
    };
  };

  @connect(
    mapStateToProps,
    mapDispatchToProps
  )
  class QueryConsumer extends Component {
    render() {
      return (
        <QueryComponent
          {...this.props}
          query={query}
          WrappedComponent={WrappedComponent}
          variables={options.variables}
          forcedUpdate={options.forcedUpdate}
          updateQuery={options.updateQuery}
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
