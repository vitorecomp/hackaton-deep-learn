var $stars;
var maxRequestNumber = 5;
var requestCounter = 0;
var $rateTooltip;
var $popovers;

jQuery(document).ready(function ($) {
  var clickedStarIndex;
  $stars = $('.stars');
  $popovers = $('.popovers');
  $rateTooltip = $('#rateTooltip');

  $popovers.attr('data-content', "<div class='md-form'> <textarea type='text' class='md-textarea form-control' placeholder='Write us what can we improve' id='voteDescriptionInput' rows='3'></textarea> <input id='voteSubmitButton' type='submit' class='btn btn-sm btn-primary' value='Submit!'> <button id='closePopoverButton' class='btn btn-flat btn-sm'>Close</button>  </div>");


  $stars.on('click', function () {
    clickedStarIndex = $(this).attr('data-index');

    markStarsAsActive(clickedStarIndex);
    submitVote('');
  });

  $('#rateTooltip').on('mousedown', '#voteSubmitButton', function () {
    var voteDescription = $('#voteDescriptionInput').val();
    submitVote(voteDescription);
    $popovers.popover('hide');
  });

  $('#rateTooltip').on('click', '#closePopoverButton', function () {
    $popovers.popover('hide');
  });

  $stars.on('mouseover', function () {
    var index = $(this).attr('data-index');

    $popovers.attr('title', setPopoverTitle(index));
    $popovers.attr('data-original-title', setPopoverTitle(index));
    markStarsAsActive(index);
  });

  $('.stars').on('click', function () {
    $('.stars').popover('hide');
  });
});

function markStarsAsActive(index) {
  unmarkActive();
  for (var i = 0; i <= index; i++) {
    $($stars.get(i)).addClass('amber-text');
  }
}

function unmarkActive() {
  $stars.removeClass('amber-text');
}

function setPopoverTitle(index) {
  if (requestCounter >= maxRequestNumber) {
    return 'You have reached the vote limit';
  }

  switch (index) {
    case '0':
      {
        return 'Useless documentation';
      }
    case '1':
      {
        return 'Poor documentation';
      }
    case '2':
      {
        return 'Ok documentation';
      }
    case '3':
      {
        return 'Good documentation';
      }
    case '4':
      {
        return 'Excellent documentation';
      }
  }

}

function submitVote(description) {
  doSubmit(description);
}


function getDevice() {
  if (/Mobi/.test(navigator.userAgent)) {
    return 1;
  }

  if (/Tablet|iPad/i.test(navigator.userAgent)) {
    return 2;
  }

  return 3;
}

function doSubmit(desc) {
  requestCounter++;
  if (requestCounter <= maxRequestNumber) {
    $.ajax({
      method: 'POST',
      url: example_ajax_obj.ajaxurl,
      data: {
        action: 'pages_rates_request',
        vote_value: $('.stars.amber-text').length,
        vote_description: desc,
        page_id: $rateTooltip.attr('data-page-id'),
        guest_id: localStorage.getItem('_uuid').substring(0, 5),
        device_type: getDevice()
      }
    }).fail(function (errorThrown) {
      console.log(errorThrown);
    })
  }
}

$(function () {
  $('.stars').popover({
    container: '.popover-form-container'
  });
});
