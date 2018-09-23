jQuery(document).ready(function() {

    /**
     * Initialize form validation.
     */

    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if( form.checkValidity() === false ) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            validateForm(form);
        }, false);
    });

    /**
     * Perform actions on form elements change.
     */

    jQuery(document).on('change keyup', '.needs-validation input, .needs-validation textarea, .needs-validation select', function() {

        var form = jQuery(this).closest('form');
        
        if( form.hasClass('was-validated') ) {
            validateForm(form);
        }

    });

    /**
     * Show the login/signup popup on click.
     */

    jQuery(document).on('click', '.show_login, .show_signup', function(e) {
        
        jQuery('#navbarLogin').modal('show');
        e.preventDefault();

    });

});

/**
 * Function used to initialize form validation.
 *
 * @param DOM Element form
 */

function initFormValidation(form) {

    if( form.checkValidity() === false ) {
        event.preventDefault();
        event.stopPropagation();
    }

    form.classList.add('was-validated');
    validateForm(form);

}

/**
 * Function used to validate form.
 *
 * @param DOM Element form
 */

function validateForm(form) {

    /**
     * Highlight "MDB Select" elements.
     * @link https://mdbootstrap.com/javascript/material-select/
     */

    jQuery(form).find('.mdb-select').each(function(key, value) {

        var container = jQuery(this).parent();

        container
            .removeClass('is-valid is-invalid')
            .next('.invalid-feedback')
            .hide(0);

        if( !jQuery(this).is(':disabled') ) {

            if( jQuery(this).is(':valid') ) { container.addClass('is-valid'); }
            else {

                container
                    .addClass('is-invalid')
                    .next('.invalid-feedback')
                    .show(0);

            }

        }

    });

    /**
     * Validate inputs by "minlength" attribute.
     */

    jQuery(form).find('[minlength]').each(function(key, value) {

        var input = jQuery(this),
            value = input.val().trim(),
            minlength = parseInt(input.attr('minlength'));

        if( value.length < minlength ) { this.setCustomValidity('Invalid field.'); }
        else { this.setCustomValidity(''); }

    });

}