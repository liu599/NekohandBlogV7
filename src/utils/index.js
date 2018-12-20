import lodash from 'lodash';
import cache from './cache';
// 日期格式化
const timeFormat = (timestamp) => {
    // return new Date(timestamp * 1000).toISOString().replace(/[a-zA-Z]/g, ' ').slice(0, -5);
    return new Date(timestamp * 1000).toLocaleString('chinese', { hour12: false }).replace(/[a-zA-Z]/g, ' ').slice(0, -9);
};



/**
 * 作用将扁平状存储的数组转换成树结构
 * @id: 节点键id
 * @pid: 父节点键id
 * @example-input: {
      id: '1'
    }, {
      id: '2',
      pid: '1',
    },{
      id: '5'
    }
 * @example-output: {id: "1", children: [{
      id: '2',
      pid: '1',
    }, {
      id: '5'
    }]}
 * **/
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
    const data = lodash.cloneDeep(array);
    const result = [];
    const hash = {};
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index];
    });

    data.forEach((item) => {
        const hashVP = hash[item[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

export default {
    arrayToTree,
    cache,
    timeFormat: timeFormat,
};