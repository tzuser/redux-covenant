export const covenantReduice = (state = {}, action) => {
  if(action.type){
    if(action.type.startsWith('covenant/@clear')){
        return Object.assign({}, state, { [action.name]: null });
    }else if (action.type.startsWith('covenant/')) {
      let value = Object.assign({}, state[action.name], action.value);
      return Object.assign({}, state, { [action.name]: value });
    }
  }
  return state;
};



export const covenantAct = (name, value) => ({
  type: `covenant/${name}`,
  name,
  value,
});


export const covenantClearAct = (name) => ({
  type: `covenant/@clear_${name}`,
  name
});