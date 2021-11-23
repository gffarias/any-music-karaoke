const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process');
const app = express()
const port = 3000

app.use(express.static('any_music_front'))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', (req, res) => {
  var url = req.body.yt;
  exec(`./core.sh ${url}`, (error, stdout, stderr) => {
    res.send(`<p>O <a href=${url}>vídeo<\a> foi baixado e separado com sucesso.<\p>
    <p>O áudio baixado encontra-se no diretório cache/download do projeto.<\p>
    <p>A parte instrumental encontra-se no diretório cache/accompaniment do projeto.<\p>`);
  });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
