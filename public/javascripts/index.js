/* global io */
'use strict';

$(function() {
  console.log('hoge');
  var socket = io.connect('http://localhost:5000');

  socket.on('result', function (data) {
    if (!data.err) {
      $('#result').val(data.result);
      var match = data.result.match(/\n/g);
      $('#result').attr({ rows: match.length });
    }
  });

  $('#convert-btn').click(function() {
    var xml = $('#xml').val();
    socket.emit('convert', { xml: xml });
  });

});

