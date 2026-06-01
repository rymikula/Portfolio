// Workaround for a Node 22 regression on Windows where fs.readlink /
// fs.readlinkSync throw EISDIR for paths that are NOT symlinks (regular
// files and directories). The correct/expected error there is EINVAL.
//
// webpack's enhanced-resolve and Next's compiler call readlink on resolved
// modules as part of realpath; they treat EINVAL/ENOENT as "this path is
// not a symlink" and carry on, but an unexpected EISDIR bubbles up as a
// fatal build error:
//
//   Error: EISDIR: illegal operation on a directory, readlink '...page.tsx'
//
// and corrupts dev HMR chunks (the browser then throws
// "originalFactory is undefined" in webpack.js).
//
// We normalise EISDIR -> EINVAL on the readlink calls so callers take the
// correct non-symlink fallback. Preloaded via `node -r` in the npm scripts
// so it patches `fs` before Next / webpack / graceful-fs capture it.
'use strict';
const fs = require('fs');

function toEinval(err, path) {
  if (err && err.code === 'EISDIR') {
    const e = new Error(`EINVAL: invalid argument, readlink '${path}'`);
    e.code = 'EINVAL';
    e.errno = -4071; // UV_EINVAL on Windows
    e.syscall = 'readlink';
    e.path = path;
    return e;
  }
  return err;
}

const readlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return readlinkSync.call(fs, path, options);
  } catch (err) {
    throw toEinval(err, path);
  }
};

const readlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  return readlink.call(fs, path, options, function (err, linkString) {
    callback(toEinval(err, path), linkString);
  });
};

if (fs.promises && fs.promises.readlink) {
  const readlinkP = fs.promises.readlink;
  fs.promises.readlink = function (path, options) {
    return readlinkP.call(fs.promises, path, options).catch(function (err) {
      throw toEinval(err, path);
    });
  };
}
