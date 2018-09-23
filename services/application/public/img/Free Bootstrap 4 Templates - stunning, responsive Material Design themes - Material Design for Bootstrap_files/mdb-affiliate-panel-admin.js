(function( $ ) {
    'use strict';
    
    $(document).ready(function() {

        var $searchInput  = $("#search-users-affiliate");
		var $submitButton = $("#submit-search-users-affiliate");
	
		$submitButton.on("click", function(e){
			e.preventDefault();
	
			var userId = $searchInput.val();
			document.location.hash = '';
			var url = document.location.href
			url = url.replace('#', '');
			var re = new RegExp("[&\?]user_id=\\d+");
			url = url.replace(re, '');

			if(document.location.href.indexOf("?") > -1) {
				url = url+"?user_id=" + userId;
			}else{
				url = url+"?user_id=" + userId;
			}
	
			window.location.replace(url);
        });
        
		$searchInput.keypress(function (e) {
			var key = e.which;
			if(key == 13){
				$submitButton.click();
				return false;  
			}
			key = String.fromCharCode( key );
			var regex = /[0-9]/;
			if( !regex.test(key) ) {
				e.returnValue = false;
				if(e.preventDefault) e.preventDefault();
			}
        });
        
        $('#editAffiliateModalSave').on('click', function(e){

            var column 	= $('#editAffiliateLabel').text();
            var value 	= $('#editAffiliateModalInput').val();
            var type 	= $('#editAffiliateModalInput').attr('data-type');
            var id 		= $('#editAffiliateModalInput').attr('data-id');
            var user_id = $('#editAffiliateModalInput').attr('data-user-id');
    
            $.ajax({
                url : mdw_search_object.ajaxurl,
                type : 'post',
                data : {
                    action : 'edit_affiliate_'+type,
                    column: column,
                    value: value,
                    id: id,
                    user_id: user_id
                },
                success : function( response ) {
                    toastr.success('Success');
                    location.reload();
                }
            });
        });
    
        $('#editAffiliateModal').on('hidden.bs.modal', function (e) {
            $('#editAffiliateLabel').text('');
            $('#editAffiliateModalInput').val('');
            $('#editAffiliateModalInput').attr('data-id', '');
            $('#editAffiliateModalInput').attr('data-type', '');
        });
    
    
        $('#editAffiliateModal').on('shown.bs.modal', function (e) {
            $('#editAffiliateModalInput').focus();
            $('#editAffiliateModalInput').select();
        });
    
    
        $('#editAffiliateModalInput').keypress(function (e) {
            var key = e.which;
            if(key == 13){
                $('#editAffiliateModalSave').click();
                return false;  
            } else if(key == 27){
                $('#editAffiliateModal').modal('hide');
                return false;
            }
        });

        $('button[name="affiliateApproveButton"]').on('click', function(e){
            $('#mdb-affiliate-preloader').show();
            var $button = $(this)
            var id = $(this).data('id')
            $.ajax({
				url : mdw_search_object.ajaxurl,
				type : 'post',
				data : {
					action : 'approve_application',
					id: id,
				},
				success : function( response ) {
                    response = JSON.parse(response);
                    if(response.status){
                        toastr.success(response.message);
                        $button.text('Approved!');
                        $button.removeAttr('name');
                        $button.attr("disabled", "disabled")
                    } else {
                        toastr.error(response.message);
                    }
                    $('#mdb-affiliate-preloader').hide();
				}
			});
        })
        
        $('#mock-orders').on('click', function(e){
            $('#mdb-affiliate-preloader').show();
            var amount = $('#mock-orders-amount').val();
            var user_id = $(this).data('user-id');
            $.ajax({
				url : mdw_search_object.ajaxurl,
				type : 'post',
				data : {
					action : 'mock_affiliate_orders',
					amount: amount,
					user_id: user_id
				},
				success : function( response ) {
                    response = JSON.parse(response);
                    if(response.status){
                        toastr.success(response.message);
                        location.reload();
                    } else {
                        toastr.error(response.message);
                    }
                    $('#mdb-affiliate-preloader').hide();
				}
			});
        })

        $("#statusParent").click(function() {
            $(".statusChild").prop("checked", this.checked);
        });
        
        $('.statusChild').click(function() {
            if ($('.statusChild:checked').length == $('.statusChild').length) {
            $('#statusParent').prop('checked', true);
            } else {
            $('#statusParent').prop('checked', false);
            }
        });
        $("#completePayoff").on('click', function(e){
            $('#mdb-affiliate-preloader').show();
            var idsToComplete = [];
            var orderIdsToComplete = [];
            var user_id = $(this).attr('data-user-id');
            $('.statusChild:checked').each(function(index){
                idsToComplete.push($(this).attr('id'));
                orderIdsToComplete.push($(this).attr('order_id'));
            })
            $.ajax({
                url : mdw_search_object.ajaxurl,
                type : 'post',
                data : {
                    action : 'payoff_status_to_completed',
                    ids: idsToComplete,
                    order_ids: orderIdsToComplete,
                    user_id: user_id,
                },
                success : function( response ) {
                    toastr.success('Success');
                    location.reload();
                }
            });
        })
    });
})( jQuery );