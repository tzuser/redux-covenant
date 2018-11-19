export function getCacheName(name, data) {
  let list = [];
  for (let [key, value] of Object.entries(data)) {
    list.push({ key, value });
  }
  let newList = list.sort(function(a, b) {
    var nameA = a.key.toUpperCase(); // ignore upper and lowercase
    var nameB = b.key.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  for (let item of newList) {
    name = `${name}&${item.key}=${item.value}`;
  }
  return name;
}

export function getVariablesData(variables, props) {
  if (typeof variables === 'function') {
    return variables(props);
  } else {
    return variables;
  }
}
