'use strict';

const http = require(`http`);
const url = require(`url`);

const fs = require(`fs`);
const nodePath = require(`path`);
const {promisify} = require(`util`);

const readfile = promisify(fs.readFile);

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;
const DEFAULT_DIR = `${__dirname}/../static/`;
const DEFAULT_PATH = `${DEFAULT_DIR}index.html`;

const CONTENT_TYPES = {
  '.css': `text/css`,
  '.html': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.png': `image/png`,
  '.gif': `image/gif`,
  '.ico': `image/x-icon`
};

const getContentType = (extension) => CONTENT_TYPES[extension] ? CONTENT_TYPES[extension] : `text/plain`;

const serveFile = async (path, res) => {
  try {
    res.statusCode = 200;
    res.statusMessage = `OK`;
    const data = await readfile(path);
    res.setHeader(`content-type`, getContentType(nodePath.extname(path)));
    res.end(data);
  } catch (e) {
    res.writeHead(404, `Not Found`);
    res.end();
  }
};

const handler = (req, res) => {
  const localPath = url.parse(req.url).pathname;
  const absolutePath = localPath === `/` ? DEFAULT_PATH : `${DEFAULT_DIR}${localPath}`;
  serveFile(absolutePath, res)
    .catch((e) => {
      res.writeHead(500, e.message, {
        'content-type': `text/plain`
      });
      res.end(e.message);
    });
};

const server = http.createServer();

const createServer = (param) => {
  server.on(`request`, handler);
  server.listen(param, HOSTNAME, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at http://${HOSTNAME}:${param}/`);
  });
};

module.exports = {
  name: `--server`,
  description: `Поднимает сервер`,
  execute(param) {
    const port = param[0] || DEFAULT_PORT;
    return createServer(port);
  }
};
