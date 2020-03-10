const tencentcloud = require("tencentcloud-sdk-nodejs")
const { tencent } = require('../config')
const Client = require('tencentcloud-sdk-nodejs/tencentcloud/ocr/v20181119/ocr_client')
const { GeneralAccurateOCRRequest } = require('tencentcloud-sdk-nodejs/tencentcloud/ocr/v20181119/models')

const { readFile } = require('fs-extra')
const Credential = tencentcloud.common.Credential

let cred = new Credential(tencent.secretId, tencent.secretKey)
let client = new Client(cred, 'ap-guangzhou')

module.exports = async (imgPath) => {
  const bits = await readFile(imgPath)
  let model = new GeneralAccurateOCRRequest()
  model.ImageBase64 = bits.toString('base64')
  let result = await sendRequest(model)
  let text = result.TextDetections ? result.TextDetections.map(x => x.DetectedText).join('\n') : ''
  return { result, text }
}


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
