export const covenantReduice = (state = {}, action) => {
  if (action.type && action.type.startsWith('covenant/')) {
    let value = Object.assign({}, state[action.name], action.value);
    return Object.assign({}, state, { [action.name]: value });
  }
  return state;
};



export const covenantAct = (name, value) => ({
  type: `covenant/${name}`,
  name,
  value,
});
