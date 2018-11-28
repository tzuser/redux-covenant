import React, {Component} from 'react';
import QueryComponent from '../QueryComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {covenantAct} from './covenantStore';

const mapDispatchToProps = dispatch => bindActionCreators({covenantAct: covenantAct}, dispatch);
const mapStateToProps = (state,props) => {
  if(!props.query){
    throw new Error('query is essential')
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
    let {children,...other}=this.props;
    if(typeof children!=="function"){
      throw new Error("QueryComponent Children Not a function")
    }
    return (
      <QueryComponent
        {...other}
        renderFun={children}
        setStore={(name, value) => {
          this.props.covenantAct(name, value);
        }}
      />
    );
  }
}
export default Query;
