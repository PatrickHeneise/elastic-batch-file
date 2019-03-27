# Elasticsearch \_bulk File

The easiest way to get large amounts of data into an Elasticsearch index is by using the [\_bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html).

This script creates \_bulk-compatible files from regular JavaScript arrays.

## Installation

    npm install elastic-batch-file

## Usage

    const batch = require('elastic-batch-file')
    const arr = [
      { id: 'hello', name: 'world' },
      { id: 'whats', name: 'up' }
    ]

    batch(arr, 'indexname', 'out')

The file can be sent straight to Elasticsearch:

    curl -s -H "Content-Type: application/x-ndjson" -u 'elastic:auth' "https://elastic-db:port/_bulk" --data-binary "@batch_indexname"; echo

### Parameters

- arr: Array of Objects. Each entry requires an "id" field
- indexname: the name of the index for the bulk operation
- outfile: which file to write in the current directory. Starts with `batch_`

### Output

    {"index":{"_index":"indexname","_type":"_doc","_id":"hello"}}
    {"name":"world"}
    {"index":{"_index":"indexname","_type":"_doc","_id":"whats"}}
    {"name":"up"}

## License

MIT © Patrick Heneise
