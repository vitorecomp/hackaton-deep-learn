jQuery(document).ready(function($) {
    // Display form from link inside a popup
    $('#pop_login, #pop_signup').live('click', function(e) {
        formToFadeOut = $('form#register');
        formtoFadeIn = $('form#login');
        if ($(this).attr('id') == 'pop_signup') {
            formToFadeOut = $('form#login');
            formtoFadeIn = $('form#register');
        }
        formToFadeOut.fadeOut(500, function() {
            formtoFadeIn.fadeIn();
        })
        return false;
    });
    // Close popup
    $(document).on('click', '.login_overlay, .close', function() {
        $('form#login, form#register').fadeOut(500, function() {
            $('.login_overlay').remove();
        });
        return false;
    });

    // Show the login/signup popup on click
    $('#show_login, #navbar-static-login, #tutorial-sidebar-login-btn, #show_signup, #show_tutorial_singup').on('click', function(e) {
        $('body').prepend('<div class="login_overlay"></div>');
        if ($(this).attr('id') == 'navbar-static-login')
            $('form#login').fadeIn(500);
        else
            $('form#register').fadeIn(500);
        e.preventDefault();
    });

    // Perform AJAX login/register on form submit
    $('form#login, form#register').on('submit', function(e) {
        if (!$(this).valid()) return false;

        if($(this).attr('id') === "register") {
          if(grecaptcha.getResponse() == "") {
            $('p.status').text('Captcha is required');
            return false;
          }
        }

        $('p.status', this).show().text(ajax_auth_object.loadingmessage);
        action = 'ajaxlogin';
        username = $('form#login #username').val();
        password = $('form#login #password').val();
        email = '';
        security = $('form#login #security').val();
        reg =$(this).attr('id');
        if ($(this).attr('id') == 'register') {
            action = 'ajaxregister';
            name = $('#signonname').val();
            username = $('#signonusername').val();
            password = $('#signonpassword').val();
            email = $('#email').val();
            security = $('#signonsecurity').val();
        }
        ctrl = $(this);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_auth_object.ajaxurl,
            data: {
                'action': action,
                'name': name,
                'username': username,
                'password': password,
                'email': email,
                'security': security
            },
            success: function(data) {
                $('p.status', ctrl).text(data.message);
                if (data.loggedin == true) {
                    if (reg == 'register') {
                        var url = "https://mdbootstrap.com/registration-completed/";
                    } else {
                        var url = window.location.href;
                    }
                    console.log(reg);
                    console.log(url);
                    var redirectUrl = url;
                    document.location.href = redirectUrl;
                }
            }
        });
        e.preventDefault();
    });

    // Client side form validation
    if ($("#register").length)
        $("#register").validate({
            rules: {
                password2: {
                    equalTo: '#signonpassword'
                }
            }
        });
    else if ($("#login").length)
        $("#login").validate();
});
