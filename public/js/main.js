var utils = {
  ready: function(fn) {
    if (document.attachEvent? document.readyState==='complete': document.readyState!=='loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },
  isOk: function(value) {
    return value != null && value != undefined && (value+'').length;
  },
  isEmailAddress: function(value) {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
  },
  trim: function(s) {
    return s.replace(/^\s+|\s+$/g, '');
  }
};

utils.ready(function init() {
  // modal base logic
  var body = document.querySelector('body');
  var modal = document.querySelector('.modal');
  var showModal = function() {
    body.className = 'has-modal';
    modal.className = 'modal visible';
  };
  var hideModal = function() {
    body.className = '';
    modal.className = 'modal';
  };

  var backdrop = modal.querySelector('.backdrop');
  var closeButton = modal.querySelector('.close');
  backdrop.onclick = hideModal;
  closeButton.onclick = hideModal;

  // modal triggers
  var videoImageButton = document.querySelector('.results-section .action button');
  var freeVideosButton = document.querySelector('.billboard-section .video img');
  videoImageButton.onclick = showModal;
  freeVideosButton.onclick = showModal;

  // modal form logic
  var form = document.querySelector('form');
  var fnameField = form.querySelector('input[name=name]');
  var emailField = form.querySelector('input[name=email]');

  form.onsubmit = function() {
    fnameField.className = '';
    emailField.className = '';

    var fname = utils.trim(fnameField.value||'');
    var email = utils.trim(emailField.value||'');
    var errors = 0;

    if (!utils.isOk(fname)) {
      fnameField.className = 'error';
      errors++;
    }
    if (!utils.isOk(email) || !utils.isEmailAddress(email)) {
      emailField.className = 'error';
      errors++;
    }

    if (errors) return false;
    else return true; // success!
  };
});
