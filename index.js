const cors = require('cors');
const express = require('express')

const app = express()

// Use this to allow CROS request. Add domain of the hosted frontend app.
app.use(cors({
  origin: 'https://snack-web-player.s3.us-west-1.amazonaws.com'
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const port = 3000

app.get('/', (req, res) => {
  res.send('{"hello":"hi"}')
})

app.use(express.json())
app.use('/api/images', require('./routes/image'))

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})  