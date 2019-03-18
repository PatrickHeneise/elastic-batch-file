const proxyquire = require('proxyquire')
const test = require('tap').test

let actual = ''
let filePath = ''
const batch = proxyquire('./index', {
  fs: {
    createWriteStream: function(path) {
      filePath = path
      return {
        write: function(text) {
          actual += text
        },
        end: function() {}
      }
    }
  }
})

test('batch() test output parameter', assert => {
  batch([], 'indexname')

  assert.equal(
    filePath.endsWith('batch_indexname'),
    true,
    'filePath matches indexname when no parameter is given'
  )
  assert.end()
})

test('batch() test output parameter', assert => {
  batch([], 'indexname', 'outfile')

  assert.equal(
    filePath.endsWith('batch_outfile'),
    true,
    'filePath matches output parameter'
  )
  assert.end()
})

test('batch() writes valid output data', assert => {
  const expected = `{"index":{"_index":"indexname","_type":"_doc","_id":"hello"}}
{"name":"world"}
{"index":{"_index":"indexname","_type":"_doc","_id":"whats"}}
{"name":"up"}
`

  const arr = [{ id: 'hello', name: 'world' }, { id: 'whats', name: 'up' }]

  batch(arr, 'indexname', 'out')
  const lines = actual.split('\n')
  const verifyAction = JSON.parse(lines[0])
  const verifyData = JSON.parse(lines[1])

  assert.equal(actual, expected, 'output meets expectations')
  assert.equal(verifyAction.index._id, 'hello', 'valid json action')
  assert.equal(verifyData.name, 'world', 'valid json data')
  assert.end()
})
