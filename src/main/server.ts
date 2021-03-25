import express from 'express'

const app = express()

app.listen(5050, () => {
  console.log('Server running at http://127.0.0.1:5050')
})
