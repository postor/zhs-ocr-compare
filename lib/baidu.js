const { readFile } = require('fs-extra')
const AipOcrClient = require("baidu-aip-sdk").ocr;
const { baidu } = require('../config')
const client = new AipOcrClient(baidu.appid, baidu.apikey, baidu.apisecret);

module.exports = async (imgPath) => {
  const bits = await readFile(imgPath)
  const result = await client.accurate(bits.toString('base64'))
  const text = result.words_result ? result.words_result.map(x => x.words).join('\n') : ''
  return { result, text }
}