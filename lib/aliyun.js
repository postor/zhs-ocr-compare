const got = require('got')
const { readFile } = require('fs-extra')
const { aliyun } = require('../config')
const url = 'https://ocrapi-advanced.taobao.com/ocrservice/advanced'

module.exports = async (imgPath) => {
  const bits = await readFile(imgPath)
  const result = await got.post(url, {
    headers: {
      'Authorization': 'APPCODE ' + aliyun.AppCode
    },
    json: {
      img: bits.toString('base64')
    }
  }).json()
  let text = result.prism_wordsInfo ? result.prism_wordsInfo.map(x => x.word).join('\n') : ''
  return { result, text }
}