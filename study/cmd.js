var execFile = require('child_process').execFile
var config = require('config')

exports.getHstPath = function () {
  if (config.has('hstbatch.path')) {
    var path = config.get('hstbatch.path')
    if (path.length) {
      return path
    }
    throw Error('Empty hstbatch.path config')
  }
  throw Error('No hstbatch.path config found')
}

exports.execHelperDir = function (studyDir, args, callback) {
  execFile(exports.getHstPath(), args, { cwd: studyDir }, (error, stdout, stderr) => {
    if (error) {
      console.log('EXEC Err' + error)
      return callback(error, null)
    }
    if (stderr.length) {
      console.log('EXEC Err' + stderr.toString())
    }
    console.log('EXEC Dir ' + stdout.length ? stdout.toString() : null)
    callback(
      stderr.length ? stderr.toString() : null,
      stdout.length ? stdout.toString() : null)
  })
}
