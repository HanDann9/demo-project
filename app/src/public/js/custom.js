'use strict'

// Toast alert
function ToastBuilder(options) {
  var opts = options || {}
  opts.defaultText = opts.defaultText || 'default text'
  opts.displayTime = opts.displayTime || 3000
  opts.target = opts.target || 'body'
  return function (text) {
    $('<div/>')
      .addClass('toast-notification small')
      .prependTo($(opts.target))
      .text(text || opts.defaultText)
      .queue(function (next) {
        $(this).css({
          opacity: 1,
        })
        var topOffset = 60
        $('.toast-notification').each(function () {
          var $this = $(this)
          var height = $this.outerHeight()
          var offset = 5
          $this.css('top', topOffset + 'px')
          topOffset += height + offset
        })
        next()
      })
      .delay(opts.displayTime)
      .queue(function (next) {
        var $this = $(this)
        var width = $this.outerWidth() + 20
        $this.css({
          right: '-' + width + 'px',
          opacity: 0,
        })
        next()
      })
      .delay(600)
      .queue(function (next) {
        $(this).remove()
        next()
      })
  }
}
const showToast = new ToastBuilder({
  defaultText: 'Toast, yo!',
  displayTime: 2000,
  target: 'body',
})
// Get prefectures, city, address by zipCode
$(document).ready(function () {
  if ($('#zipCode1').length > 0) {
    $(() => {
      $('#zipCode1').jpostal({
        click: '#handleZipCode',
        postcode: ['#zipCode1', '#zipCode2'],
        address: {
          '#prefectures': '%3',
          '#city': '%4',
          '#address': '%5',
        },
      })
    })
    $(document).on('keydown', '#zipCode1, #zipCode2', (event) => {
      let charCode = event.which ? event.which : event.keyCode
      return !(charCode > 31 && (charCode < 48 || charCode > 57))
    })
  }
})

// Convert name to Katakana
const toKatakana = (e) => {
  let value = $(e).val()
  let katakana = wanakana.toKatakana(value)
  $(e).val(katakana)
}
