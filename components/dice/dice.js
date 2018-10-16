var $ = require('jquery');
var sha256 = require('js-sha256');
var urlParams = getUrlVars();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

$(document).ready(function() {
  // Hide and show content based on user's cookie status/url params
  if (urlParams['gid']) {
    var diceCookie = getCookie(urlParams['gid']);
    if (diceCookie && urlParams['name']) {
      $('.dice__table').show();
      $('.dice__table-invite-link')
      .val(window.location.host+window.location.pathname+'?gid='+urlParams['gid']+'&invite='+sha256(diceCookie));
    } else {
      $('.dice__join').show();
      if (!urlParams['invite']) {
        $('.dice__error').show();
      } else {
        $('.dice__notice').show();
      }
    }
  } else {
    $('.dice__welcome').show();
  }

  // Welcome; manages requests to create new game files
  $('.dice__welcome-button').bind('click', function() {
    var $name = $('.dice__welcome-name').val().replace(/[^a-z]/gi, '');
    if ($name && $name.length >= 5) {
      $.getJSON('https://wt-95013b9a0f89f6aeeb7319d2d8b1a80b-0.sandbox.auth0-extend.com/roll-dice?action=welcome&name='+$name+'&players=2', function(data) {
        if (data.welcome) {
          data.welcome = JSON.parse(data.welcome);
        }
        document.cookie = data.welcome.id+"="+data.welcome.key;
        console.log(data.welcome);
        window.location = 'http://'+window.location.host+window.location.pathname+'?gid='+data.welcome.id+'&name='+data.welcome.data.player1.name;
      });
    } else {
      alert('Name must be at least 5 characters long. You entered "'+$name.val()+'"')
    }
  });

  // Join; manages joining an existing game room
  $('.dice__join-button').bind('click', function() {
    var $name = $('.dice__join-name').val().replace(/[^a-z]/gi, '');
    if ($name && $name.length >= 5) {
      if (urlParams['gid'] && urlParams['invite'] && $name) {
        $.getJSON('https://wt-95013b9a0f89f6aeeb7319d2d8b1a80b-0.sandbox.auth0-extend.com/roll-dice?action=join&gid='+urlParams['gid']+'&name='+$name+'&invite='+urlParams['invite'], function(data) {
          if (data && data.join) {
            data.join = JSON.parse(data.join);
            document.cookie = data.join.parentId+"="+data.join.data.key;
            console.log(data.join);
            window.location = 'http://'+window.location.host+window.location.pathname+'?gid='+data.join.parentId+'&name='+data.join.data.player2.name;
          } else if (data && data.error) {
            alert(data.error);
          } else {
            alert('Error. Please try again.')
          }
        });
      } else {
        alert('Missing invite code, game ID, or name');
      }
    } else {
      alert('Name must be at least 5 characters long. You entered "'+$name.val()+'"');
    }
  });

  // Manages the copy-by-click functionality of invite link field
  $('.dice__table-invite-text').bind('click', function() {
    $('.dice__table-invite-link').select();
    document.execCommand('copy');
  });

  // Roll dice; manages what happens when you request to roll the dice
  $('.dice__roll').bind('click', function() {
    if (urlParams['gid'] && urlParams['name'] && getCookie(urlParams['gid'])) {
      $.getJSON('https://wt-95013b9a0f89f6aeeb7319d2d8b1a80b-0.sandbox.auth0-extend.com/roll-dice?action=roll&gid='+urlParams['gid']+'&name='+urlParams['name']+'&key='+getCookie(urlParams['gid']), function(data) {
        console.log(JSON.parse(data.roll));
        /*for (i = 0; i <= JSON.parse(data.roll).length; i++) {
          $('.dice__die[data-did="' + i + '"]')
          .attr('data-dval', JSON.parse(data.roll)[i]);
        }
        */
      });
    }
  });
});
