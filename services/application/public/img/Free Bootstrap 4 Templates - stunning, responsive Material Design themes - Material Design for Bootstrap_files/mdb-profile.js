jQuery(document).ready(function(){

	$('#mdb-settings-public-preloader').hide();
	$('#mdb-settings-account-preloader').hide();
	$('#mdb-settings-password-preloader').hide();
	$('#mdb-orders-preloader').hide();
	$('#mdb-project-preloader').hide();

    (function( $ ) {
        
        $('#edit-user-form').on('submit', function(e){
			$('#mdb-settings-public-preloader').show();
            e.preventDefault();
            var user = {
                first_name:     $('#edit-first-name').val(),
                last_name: 		$('#edit-last-name').val(),
                position: 		$('#edit-position').val(),
                company_name:   $('#edit-company').val(),
                website: 		$('#edit-website').val(),
                country: 		$('#edit-country').val(),
                city: 			$('#edit-city').val(),
                description: 	$('#edit-description').val(),
                facebook: 		$('#edit-facebook').val(),
                twitter: 		$('#edit-twitter').val(),
                linked_in:		$('#edit-linkedIn').val(),
                dribbble:		$('#edit-dribbble').val()
            }
            $.ajax({
                url : mdw_search_object.ajaxurl,
                type : 'post',
                data : {
                    action : 'user_edit',
                    user: user
                },
                success : function( response ) {
                    toastr.success('Success');
					//location.reload();
					$('#mdb-settings-public-preloader').hide();
				}
				
            });
        })

        $('#edit-user-account-form').on('submit', function(e){
			$('#mdb-settings-account-preloader').show();
			e.preventDefault();
			var data = {
				'display_name': $('#display_name').val(),
				'user_email': $('#user_email').val()
			}
			$.ajax({
				url : mdw_search_object.ajaxurl,
				type : 'post',
				data : {
					action : 'edit_account',
					data: data
				},
				success : function( response ) {
					response = JSON.parse(response)
					if(response.status){
						toastr.success('User edited.');
						//location.reload();
					} else {
						toastr.error(response.message);
					}
					$('#mdb-settings-account-preloader').hide();
				}
			});
        })
        $('#user-reset-password-form').on('submit', function(e){
            e.preventDefault();
			if(!$('#current_password').val()){
				toastr.warning('Current password field must be fiiled.');
				return;
			}
			if(!$('#new_password').val()){
				toastr.warning('New password field must be fiiled.');
				return;
			}
			if(!$('#confirm_new_password').val()){
				toastr.warning('New password field must be fiiled.');
				return;
			}
			if($('#new_password').val() !== $('#confirm_new_password').val()){
				toastr.error('Password confirmation faild.');
				return;
			}
			$('#mdb-settings-password-preloader').show();
			var data = {
				current_password:       $('#current_password').val(),
				new_password:           $('#new_password').val(),
				confirm_new_password:   $('#confirm_new_password').val()
			}
			$.ajax({
				url : mdw_search_object.ajaxurl,
                type : 'post',
				data : {
					action : 'password_reset',
					data: data
				},
				success : function( response ) {
					response = JSON.parse(response)
					if(response.status){
						toastr.success(response.message);
						$('#current_password').val('')
						$('#new_password').val('')
						$('#confirm_new_password').val('')
					} else {
						toastr.error(response.message);
					}
					$('#mdb-settings-password-preloader').hide();
				}
			});
		});

	})(jQuery);
	
	$('#save-billing-address-form').on('submit', function(e){
		$('#mdb-orders-preloader').show();
		var data = {
			'billing_email': $('#billing_email').val(),
			'billing_country': $('#billing_country').val(),
			'billing_first_name': $('#billing_first_name').val(),
			'billing_last_name': $('#billing_last_name').val(),
			'billing_company': $('#billing_company').val(),
			'billing_country': $('#billing_country').val(),
			'billing_address_1': $('#billing_address_1').val(),
			'billing_address_2': $('#billing_address_2').val(),
			'billing_city': $('#billing_city').val(),
			'billing_state': $('#billing_state').val(),
			'billing_postcode': $('#billing_postcode').val()
		}
		$.ajax({
			url : mdw_search_object.ajaxurl,
			type : 'post',
			data : {
				action : 'edit_billing_address',
				data: data
			},
			success : function( response ) {
				toastr.success('Success');
				$('#mdb-orders-preloader').hide();
			}
		});

	});

	$('#submit-project').on('click', function(e){
		$('#mdb-project-preloader').show();
		var data = {
			project_name: $('#project_name').val(),
			project_url: $('#project_url').val(),
			project_image: $('#project_image').val(),
			project_description: $('#project_description').val()
		}
		$.ajax({
			url : mdw_search_object.ajaxurl,
			type : 'post',
			data : {
				action : 'submit_project',
				data: data
			},
			success : function( response ) {
				response = JSON.parse(response)
				if(response.status){
					toastr.success(response.message);
					location.reload();
				} else {
					toastr.error(response.message);
				}
				$('#mdb-project-preloader').hide();
			}
		});
	});

	$('i[name="like-button"]').on('click', function(e){
		var likes_count = $(this).text()
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).text(parseInt(likes_count) - 1)
		} else {
			$(this).addClass('active');
			$(this).text(parseInt(likes_count) + 1)
		}
		var project = $(this).attr('data-project-id');
		$.ajax({
			url : mdw_search_object.ajaxurl,
			type : 'post',
			data : {
				action : 'like_project',
				project_id: project
			},
			success : function( response ) {
				response = JSON.parse(response)
				if(!response.status){
					if($(this).hasClass('active')){
						$(this).removeClass('active');
						$(this).text(parseInt(likes_count) - 1)
					} else {
						$(this).addClass('active');
						$(this).text(parseInt(likes_count) + 1)
					}
				}
			}
		});
	});
	
	$('i[name="remove-button"]').on('click', function(e){
		var project = $(this).attr('data-project-id');
		confirmProjectDeletion(project);
	});

	function confirmProjectDeletion(project){
		$('#confirm-project-deletion').attr('data-project', project);
		$('#modalConfirmDelete').modal('show');
	}

	$('#confirm-project-deletion').on('click', function(e){
		var project = $('#confirm-project-deletion').attr('data-project');
		if(!project){
			toastr.error('Project is unknown.');
		}
		$.ajax({
			url : mdw_search_object.ajaxurl,
			type : 'post',
			data : {
				action : 'remove_project',
				project_id: project
			},
			success : function( response ) {
				response = JSON.parse(response);
				$('#confirm-project-deletion').attr('data-project', '');
				$('#modalConfirmDelete').modal('hide');
				if(response.status){
					toastr.success('Success');
					location.reload();
				} else {
					toastr.error('Removing project faild.');
				}
				
			}
		});

	})

	$('button[name="achievement"]').on('click', function(e){
		var description = $(this).attr('data-description');
		var color = $(this).attr('data-color');
		var name = $(this).text();
		$('#achievement-header').css({"background-color": color})
		$('#achievement-close-button').css({"background-color": color})
		$('#achievement-description').text(description);
		$('#achievement-title').text(name);
		$('#modalAchievment').modal('show')
	})

	function showContent(){
		$('#mdb-panel-tab-content-loader').hide()
		$('#mdb-panel-tab-content').show()
	}

	if (location.hash) {
		if(location.hash === '#messages'){
			loadLastMessages()
		}
		if($('a[href="' + location.hash + '"].active').length){
			showContent()
			return;
		} else if (!$('a[href="' + location.hash + '"]').length) {
			showContent()
			return;
		}
		$('a[href="' + location.hash + '"]').tab('show');
		$(document).on('shown.bs.tab', 'a[href="' + location.hash + '"]', function (e) {
			showContent()
		});
	} else {
		showContent()
	}

	function updateURL(url) {
		if (history.pushState) {
			window.history.pushState({path:url},'',url);
		}
	}

	$("#buttonListInvoice").on("click", function(){

        var data = {
            action: "getInvoiceRequests"
        };

        $.ajax({
            url: mdw_search_object.ajaxurl,
            method: "POST",
            data: data
        }).done(function(response){
            response = JSON.parse(response);
            console.log(response);

            var requests = response.requests;

            $(".tableInvoice").html( "<table></table>" );
            var invoiceRequestsListTable = $(".tableInvoice table");

            invoiceRequestsListTable.attr("class", "shop_table shop_table_responsive table table-striped table-bordered");

            var thead = "<thead>" +
                            "<tr>" +
                                "<th>Order</th>" +
                                "<th>Actions</th>" +
                            "</tr>" +
                        "</thead>";


            var tbody = "<tbody>";

            if(requests.length === 0){
                tbody += "<tr><td>No new requests.</td><td></td></tr>";
            } else {
                for(var i = 0; i < requests.length; i++) {
                    var order = requests[i];

                    tbody += "<tr>" +
                                "<td>" +
                                    "<ul style='list-style-type:none;'>" +
                                        "<li><b>Order ID:</b> " + order.order_id + "</li>" +
                                        "<li><b>Invoice Date:</b> " + order.invoice_date + "</li>" +
                                        "<li><b>VAT Number:</b> " + order.vat_number + "</li>" +
                                        "<li><b>Buyer Name:</b> " + order.buyer_name + "</li>" +
                                        "<li><b>Country:</b> " + order.country + "</li>" +
                                        "<li><b>Tax:</b> " + order.tax + "</li>" +
                                        "<li><b>Netto:</b> " + order.netto + "</li>" +
                                        "<li><b>Brutto:</b> " + order.brutto + "</li>" +
                                        "<li><b>EU:</b> " + order.eu_valid + "</li>" +
                                    "</ul>" +
                                "</td>" +
                                "<td>" +
                                    "<a id='confirm-invoice' class='btn btn-primary' data-order-id='" + order.order_id + "' href='#'>Confirm</a>" +
                                "</td>" +
                             "</tr>";
                }
            }


            tbody += "</tbody>";

            invoiceRequestsListTable.append( thead );
            invoiceRequestsListTable.append( tbody );

        }).fail(function(err){
            console.log(err);
        });
	  });
	  
	  $("div[class*='tableInvoice']").on("click", "table #confirm-invoice", function(e){
        e.preventDefault();

        var self = $(this);

        self.html("<i class='fa fa-spinner fa-spin'></i> Processing...");

		var orderId = $(this).attr("data-order-id");
		console.log(orderId);
        var data = {
            action: "approveInvoiceRequest",
            order_id: orderId
        };

        $.ajax({
            url: mdw_search_object.ajaxurl,
            method: "POST",
            data: data
        }).done(function(response){
            console.log(response);

            self.html("<i class='fa fa-check'></i> Done").attr("class", "btn btn-success");
        }).fail(function(err){
			console.log(err);
			
            try {

              err = JSON.stringify(err);
            } catch (ex) {}

            self.html("<i class='fa fa-times'></i> Error").attr("class", "btn btn-danger");
            self.after("<b>Error:</b> " + err);
        });
	});
	  
});