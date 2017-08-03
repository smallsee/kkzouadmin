import axios from 'axios'
import Mock from 'mockjs';


/**
 * 获取淘宝Rap的Video数据
 * @returns {*}
 */
export function getVideoList() {
  const url = 'http://rap.taobao.org/mockjs/17725/api/video?accessToken=aaa';

  const data = Object.assign({}, {
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Mock.mock(res.data)
  })
}

/**
 * 获取淘宝Rap的声优数据
 * @returns {*}
 */
export function getAkiraList() {
  const url = 'http://rap.taobao.org/mockjs/17725/api/akira?accessToken=aaa';

  const data = Object.assign({}, {
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Mock.mock(res.data);
  })
}

/**
 * 获取淘宝Rap的类型数据
 * @returns {*}
 */
export function getTagList() {
  const url = 'http://rap.taobao.org/mockjs/17725/api/tag?accessToken=aaa';

  const data = Object.assign({}, {
    format: 'json'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Mock.mock(res.data);
  })
}