import queryConnect from './redux/connect';
import covenantReduice from './redux/covenantReduice';
import getDataFromTreeFun from './getDataFromTree';

export const query = queryConnect;
export const covenant = covenantReduice;
export const getDataFromTree = getDataFromTreeFun;
// 获取缓存
export const getCacheData = async () => {
  let cache = (await import('./cache')).default;
  let res = cache.data;
  cache.data = {};
  return res;
};
