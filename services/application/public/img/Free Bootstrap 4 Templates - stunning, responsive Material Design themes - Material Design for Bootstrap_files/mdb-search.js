jQuery(document).ready(function($) {

    var $mdbMainSearch = $('#mdw_main_search');

    function mdbSearchHandler() {
        var query = $mdbMainSearch.val();

        if (query !== '') {
            var data = {
                'action': 'mdb_search',
                'query': query,
            };
            $.post(mdw_search_object.ajaxurl, data,
                function(response) {
                    var li = '<li>';
                    if (response.indexOf(li) !== -1) {
                        $('.dropdown-wrapper').html(response);
                    } else {
                        $('.dropdown-wrapper').html('');
                    }
                });
        } else {
            $('.dropdown-wrapper').html('');
        }
    }

    $mdbMainSearch.on('keyup', mdbSearchHandler);

    $mdbMainSearch.on('click', mdbSearchHandler);

    $('.search-form').on('click',function(e){
    	e.stopPropagation();
    });

    $('body').on('click',function(){
        $('.dropdown-wrapper').html('');
    });

    $(".dropdown-wrapper").on('click','.sv-phr',function(){

        var phrase = $(this).text();
        var userId = localStorage.getItem('_uuid').substring(0,5);
        var link = window.location.pathname;

        $.ajax({
            type: 'POST',
            url: mdw_search_object.ajaxurl,
            data: { action: "save_phrase", phrase: phrase, userId: userId, link: link }
        });

    });

});