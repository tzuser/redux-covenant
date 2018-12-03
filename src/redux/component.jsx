import React, {Component} from 'react';
import QueryComponent from '../QueryComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {covenantAct} from './covenantStore';

const mapDispatchToProps = dispatch => bindActionCreators({covenantAct: covenantAct}, dispatch);
const mapStateToProps = (state, props) => {
  if (!props.query) {
    throw new Error('query is essential');
  }
  let queryName = props.name || props.query.name;
  return {
    queryName,
    store: state.covenant[queryName] || {loading: true},
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class Query extends Component {
  render() {
    let {children, queryName, store, hold, query, variables, forcedUpdate, updateQuery, ...aisle} = this.props;
    if (typeof children !== 'function') {
      throw new Error('QueryComponent Children Not a function');
    }
    return (
      <QueryComponent
        aisle={aisle}
        queryName={queryName}
        store={store}
        hold={hold}
        query={query}
        variables={variables}
        forcedUpdate={forcedUpdate}
        updateQuery={updateQuery}
        clearStore={name => {
          this.props.covenantClearAct(name);
        }}
        setStore={(name, value) => {
          this.props.covenantAct(name, value);
        }}
        renderFun={children}
      />
    );
  }
}
export default Query;
