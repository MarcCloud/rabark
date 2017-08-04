var Transform = require('stream').Transform

module.exports = class HtmlWriterStream extends Transform {
  constructor (options = {}) {
    super(options);
    this.started = false;
  }

  get isHead () {
    return !this.started;
  }

  head (data) {
    this.push(`<!DOCTYPE html><html lang="en">
<head>
  <meta charset="utf-8">
  <title>'No title'</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.0/css/bulma.min.css" rel="stylesheet" type="text/css" />
  <link href="/bundle.css" rel='stylesheet' type='text/css' />
</head><body>${data}`);

    this.started = false;
  }

  body (data) {
    this.push(data.toString());
  }

  footer () {
    this.push(`<script src="/bundle.js"></script>
  </body>
</html>`);
    this.push(null);
  }

  _transform (chunk, encoding, done) {
      var data = chunk.toString()
      if (this.isHead) {
        this.head(data)
      } else {
        this.body(data);
      }
      done();
  }

  _flush (done) {
      this.footer();
      this._lastLineData = null
      done();
  }
}
