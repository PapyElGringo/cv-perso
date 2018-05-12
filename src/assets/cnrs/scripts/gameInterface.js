function loadGameInterface() {
  $('#fiestaButton').on('click', function () {
    birthdayParty();
  });
  //MOUSE EVENTS
  var oldscale;
  $("body").on('mousewheel MozMousePixelScroll', function (event) {
    if (tutorial.state > 10) {
      var event = event.originalEvent;
      var delta;
      if (event.wheelDelta) delta = event.wheelDelta / 120;
      if (event.detail) delta = -event.detail / 3;
      var oldscale = transform.s;
      var left = transform.l;
      var top = transform.t;
      var scale;
      if (delta < 0) {
        scale = Math.round(oldscale * 0.8 * 10) / 10;
      } else {
        scale = Math.round(oldscale / 0.8 * 10) / 10;
      }
      var w = $('body').width();
      var h = $('body').height();
      var px = event.pageX;
      var py = event.pageY;
      var alpha = scale / oldscale;
      var newLeft = alpha * left + (1 - alpha) * px;
      var newTop = alpha * top + (1 - alpha) * py;
      transform = {
        l: newLeft,
        t: newTop,
        s: scale
      };
      group.style("transition-duration", "0");
      group.style("transform", "translate(" + newLeft + "px," + newTop + "px)" + " scale(" + scale + ")");
      //background.attr("patternTransform", "translate(" + newLeft + "," + newTop + ")" + " scale(" + scale + ")");
      event.preventDefault();
    }
  });

  var drag = false;
  var startX;
  var startY;
  $("body").on('mousedown', function (event) {
    if (tutorial.state > 10 || !tutorial.clickToContinue) {
      if (!mouse_node) {
        drag = true;
        startX = event.pageX;
        startY = event.pageY;
      }
    }
  })
  $("body").on('mouseup', function (event) {
    drag = false;
    mouse_node = false;
  });
  $("body").on('mousemove', function (event) {
    if (drag == true) {
      var scale = transform.s;
      var left = transform.l;
      var top = transform.t;
      transform = {
        l: (left - (startX - event.pageX)),
        t: (top - (startY - event.pageY)),
        s: scale
      };
      group.style("transition-duration", "0");
      group.style("transform", "translate(" + (left - (startX - event.pageX)) + "px," + (top - (startY - event.pageY)) + "px)" + " scale(" + scale + ")");
      //background.attr("patternTransform", "translate(" + (left - (startX - event.pageX)) + "," + (top - (startY - event.pageY)) + ")" + " scale(" + scale + ")");
      startX = event.pageX;
      startY = event.pageY;
    }
  });
}
