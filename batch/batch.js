const { join } = require('path')
const { readdir, writeFile, writeJSON } = require('fs-extra')
const providers = ['baidu', 'aliyun', 'tencent']
  ;
(async () => {
  let files = await readdir(join(__dirname, 'images'))
  for (let file of files) {
    let filePath = join(__dirname, 'images', file)
    console.log(filePath)
    for (let provider of providers) {
      const method = require('../lib/' + provider)
      try {
        const { text, result } = await method(filePath)
        await writeFile(join(__dirname, 'texts', `${file}_${provider}.txt`), text)
        await writeJSON(join(__dirname, 'full_results', `${file}_${provider}.json`), result)

      } catch (e) {
        console.log(e)
      }
    }
  }
})()