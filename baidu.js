const AipOcrClient = require("baidu-aip-sdk").ocr;
const { baidu } = require('./config')
const { readFile, writeJSON, writeFile } = require('fs-extra')

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(baidu.appid, baidu.apikey, baidu.apisecret);

(async () => {
  const bits = await readFile('./test.jpg')
  const result = await client.accurate(bits.toString('base64'))
  const text = result.words_result.map(x => x.words).join('\n')
  await writeFile('results/baidu.txt', text)
  await writeJSON('results/baidu_full.json', result)
  console.log(text)
})()