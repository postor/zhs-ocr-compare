const tencentcloud = require("tencentcloud-sdk-nodejs")
const { tencent } = require('./config')
const Client = require('tencentcloud-sdk-nodejs/tencentcloud/ocr/v20181119/ocr_client')
const { GeneralAccurateOCRRequest } = require('tencentcloud-sdk-nodejs/tencentcloud/ocr/v20181119/models')

const { readFile, writeJSON, writeFile } = require('fs-extra')
const Credential = tencentcloud.common.Credential

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey
let cred = new Credential(tencent.secretId, tencent.secretKey);

// 实例化要请求产品(以cvm为例)的client对象
let client = new Client(cred, 'ap-guangzhou');

(async () => {
  const bits = await readFile('./test.jpg')
  let model = new GeneralAccurateOCRRequest()
  model.ImageBase64 = bits.toString('base64')
  let res = await sendRequest(model)
  await writeJSON('results/tencent_full.json', res)
  let text = res.TextDetections.map(x => x.DetectedText).join('\n')
  await writeFile('results/tencent.txt', text)
  console.log(text)
})()


async function sendRequest(model) {
  return new Promise((resolve, reject) => {
    client.GeneralAccurateOCR(model, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}
