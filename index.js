$(document).ready(function () {
  var channels = [
    "cretetion",
    "freecodecamp",
    "habathcx",
    "noobs2ninjas",
    "OgamingSC2",
    "RobotCaleb",
  ];

  channels.forEach(function (channel) {
    getInfo("channels", channel);
  });

  function getInfo(type, channel) {
    $.ajax({
      url: "https://wind-bow.glitch.me/twitch-api/" + type + "/" + channel,
      method: "GET",
      dataType: "jsonp",
      success: function (json) {
        if (type === "channels") {
          displayChannel(json, channel);
        } else {
          checkStream(json);
        }
      },
    });
  }

  function displayChannel(json, channel) {
    var statusText;
    var accountName;
    var streaming = "";
    if (json.error) {
      statusText = json.error + ": " + json.message;
      accountName = channel;
    } else {
      statusText = '<a href="' + json.url + '" target="_blank">OFFLINE</a>';
      accountName = json.display_name;
    }

    var html =
      '<div class="row" id="' +
      json.name +
      '"><div class="col-sm-2"><img class="logo" height="50px" src="' +
      json.logo +
      '"></div><div class="name col-sm-3">' +
      accountName +
      '</div><div class="status col-sm-7"><div>' +
      statusText +
      '</div><div class="details"></div></div></div>';
    $("#channels").append(html);
    getInfo("streams", channel);
  }

  function checkStream(json) {
    var statusText;
    if (json.stream === null) {
      statusText = "OFFLINE";
    } else {
      statusText = "ONLINE";
      $("#" + json.stream.channel.name + " .status a").text(statusText);
      $("#" + json.stream.channel.name + " .details").text(
        json.stream.channel.status
      );
    }
  }
});
