const got = require('got')
const { readFile, writeJSON, writeFile } = require('fs-extra')
const { aliyun } = require('./config')

const url = 'https://ocrapi-advanced.taobao.com/ocrservice/advanced'
  ;
(async () => {
  try {
    const bits = await readFile('./test.jpg')
    const res = await got.post(url, {
      headers: {
        'Authorization': 'APPCODE ' + aliyun.AppCode
      },
      json: {
        img: bits.toString('base64')
      }
    }).json()

    await writeJSON('results/aliyun_full.json', res)
    let text = res.prism_wordsInfo.map(x => x.word).join('\n')
    await writeFile('results/aliyun.txt', text)
    console.log(text)
  } catch (e) {
    console.log(e)
  }
})()