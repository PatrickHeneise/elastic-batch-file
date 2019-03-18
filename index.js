const fs = require('fs')

module.exports = batch = (data, index, output) => {
  if (!output || output.length <= 0) {
    output = index
  }

  const file = fs.createWriteStream(`${process.env.PWD}/batch_${output}`)

  data.forEach(item => {
    const action = {
      index: { _index: index, _type: '_doc', _id: item.id }
    }
    delete item.id
    file.write(JSON.stringify(action))
    file.write('\n')
    file.write(JSON.stringify(item))
    file.write('\n')
  })

  file.end()
}
