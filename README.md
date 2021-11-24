# any-music-karaoke
Projeto final da discipliana de Introdução à Multimídia.

## Dependências
Testado com Ubuntu 20.04.

### Node.js
Para instalar a versão LTS no [Ubuntu](https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions):

```shell
$ curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Verifique se a instalação foi bem-sucedida consultando o `node` pelo número de versão dele:
```shell
$ node --version
```
```shell
v16.13.0
```

### FFmpeg
Para instalar o [FFmpeg](https://ffmpeg.org/documentation.html) com o gerenciador de pacotes `apt`:
```shell
$ sudo apt update
$ sudo apt install ffmpeg
```
Verifique se a instalação foi bem-sucedida consultando o `ffmpeg` pelo número de versão dele:
```shell
$ ffmpeg -version
```

### pip
Para instalar o gerenciador de pacotes pip para Python 3 com o gerenciador de pacotes `apt`:
```shell
$ sudo apt update
$ sudo apt install python3-pip
```
Verifique se a instalação foi bem-sucedida consultando o `pip` pelo número de versão dele:
```shell
$ pip --version
```
```shell
pip 20.0.2 from /usr/lib/python3/dist-packages/pip (python 3.8)
```

#### pytube
Instale o pacote [```pytube```](https://pytube.io/en/latest/user/install.html#installation-of-pytube) com o `pip`:
```shell
$ pip install pytube
```

#### spleeter
Instale o [`spleeter`](https://github.com/deezer/spleeter):
```shell
$ pip install spleeter
```

E em seguida, reinstale o pacote `numba` (dependência do `spleeter`) para a sua versão mais recente, sobrescrevendo a versão já instalada. Ignore a mensagem de erro informando que a versão exigida pelo `spleeter` é incompatível com a versão mais recente.
```shell
$ pip install numba
```

## Como rodar o servidor
Crie um clone local deste repositório e entre no diretório:
```shell
$ git clone https://github.com/gffarias/any-music-karaoke.git
$ cd any-music-karaoke
```
Ative o servidor:
```shell
$ node server.js
```
```shell
Server listening at http://localhost:3000
```
Agora é só abrir o navegador com a URL [localhost:3000](http://localhost:3000).