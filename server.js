const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process');
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.post('/', (req, res) => {
  var url = req.body.yt
  exec(`./core.sh ${url}`, (error, stdout, stderr) => {
    res.render('canvas', { audioPath: stdout.trim() })
  });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
