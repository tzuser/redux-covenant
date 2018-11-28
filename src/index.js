import queryConnect from './redux/connect';
import {covenantReduice} from './redux/covenantStore';
import getDataFromTreeFun from './ssr/getDataFromTree';
import QueryCom from './redux/component';

export const query = queryConnect;
export const covenant = covenantReduice;
export const getDataFromTree = getDataFromTreeFun;
export const Query = QueryCom;
// 获取缓存
export const getCacheData = async () => {
  let cache = (await import('./cache')).default;
  let res = cache.data;
  cache.data = {};
  return res;
};
