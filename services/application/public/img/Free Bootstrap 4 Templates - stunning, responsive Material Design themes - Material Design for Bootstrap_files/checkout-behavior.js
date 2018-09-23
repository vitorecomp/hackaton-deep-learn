(function( $ ) {
  $(document).ready(function() {

    function disableEuVatCheckboxIfNotFromEU() {
      var chosenCountry = $checkoutForm.find("select#billing_country").val();
      var isEuFromEU = isEuCountry(chosenCountry);
      if (!isEuFromEU) {

        $("p#billing_euvat_checkbox_field").addClass("disabled grey-text");
        $euvatPayerBtn.attr('checked', false);
        $euvatPayerBtnValue.val("0");
      } else {

        $("p#billing_euvat_checkbox_field").removeClass("disabled grey-text");
      }
    }

    function isEuCountry(code) {
      return [
        "AT", "BE", "BG", "CY",
        "CZ", "DE", "DK", "EE",
        "EL", "GR", "ES", "FI",
        "FR", "GB", "HR", "HU",
        "IE", "IT", "LT", "LU",
        "LV", "MT", "NL", "PL",
        "PT", "RO", "SE", "SI", "SK"
      ].indexOf(code) !== -1;
    }

    function isLeavingBillingForm(idOfElementToSwitch) {

      return (idOfElementToSwitch === '#tabCheckoutAddons' || idOfElementToSwitch === '#tabCheckoutPayment');
    }

    function switchTabTo(idOfElementToSwitch) {

      var $checkoutForm = $("form[name=checkout]");
      $checkoutForm.find(".tab-pane, .nav-link").removeClass("active show");
      $checkoutForm.find(idOfElementToSwitch + ", [href='" + idOfElementToSwitch + "']").addClass("active show");
    }

    function showPreloader(container) {

      var preloader =
        '<div class="checkout-preloader-container">' +
        '<div class="preloader-wrapper big active">' +
        '<div class="spinner-layer spinner-blue-only">' +
        '<div class="circle-clipper left">' +
        '<div class="circle"></div>' +
        '</div>' +
        '<div class="gap-patch">' +
        '<div class="circle"></div>' +
        '</div>' +
        '<div class="circle-clipper right">' +
        '<div class="circle"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

      $(container).prepend(preloader);
    }

    function hidePreloader(container) {

      $(container).find(".checkout-preloader-container").remove();
    }

    var $checkoutForm = $("form[name=checkout]");
    $checkoutForm.on("click", "[data-switch-to]", function (e) {
      e.stopImmediatePropagation();

      var idOfElementToSwitch = $(this).attr("data-switch-to");

      if (isLeavingBillingForm(idOfElementToSwitch) && typeof Validator !== 'undefined') {

        var stepValidator = new Validator();
        stepValidator.init();
        stepValidator.submitCheckoutForm = false;
        stepValidator.validateCheckoutForm(e);

        if (stepValidator.isValid) {

          switchTabTo(idOfElementToSwitch);
        }
      } else {

        switchTabTo(idOfElementToSwitch);
      }

      if (idOfElementToSwitch === '#tabCheckoutPayment') {

        $("#checkout-summary-place-order-button").removeClass("d-none");
      }
    });

    $checkoutForm.on("click", "#add-support", function () {

      showPreloader($("#tabCheckoutAddons, #order_cart_content"));

      var asyncCount = 0;
      var asyncQueue = [];
      var queued = {
        args: [],
        addToCart: function(productId, variationId) {

          $.ajax({
            method: "GET",
            url: "/",
            data: {
              "add-to-cart": productId,
              "variation_id": variationId
            }
          })
          .done(function(response) {

            asyncCount--;

            if (asyncCount === 0) {

              $.ajax({
                method: "GET",
                url: "/checkout"
              })
              .done(function(response) {

                hidePreloader($("#tabCheckoutAddons, #order_cart_content"));

                var $response = $(response);
                var $cartContent = $("#order_cart_content");
                var $checkoutAddonsTab = $("#tabCheckoutAddons");

                $cartContent.html($response.find("#order_cart_content").html());

                var addonsTabClass = $checkoutAddonsTab.attr("class");
                $checkoutAddonsTab.html($response.find("#tabCheckoutAddons").html());
                $checkoutAddonsTab.attr("class", addonsTabClass);
              });
            }
          });
        }
      };

      var variationId = $(this).attr("data-variation-id");
      var productId = $(this).attr("data-product-id");

      if (variationId !== "" && productId !== variationId) {

        asyncCount = 1;

        queued.args = [productId, variationId];
        asyncQueue.push(Object.assign({}, queued));
      } else {

        var variations = $("#checkout-support-technology").val();
        asyncCount = variations.length;

        variations.forEach(function(variation) {

          queued.args = [productId, variation];
          asyncQueue.push(Object.assign({}, queued));
        });
      }

      asyncQueue.forEach(function(q) {

        q.addToCart.apply(null, q.args);
      });
    });

    var $euvatPayerBtnWrapper = $("#billing_euvat_checkbox_field");
    var $euvatPayerBtn = $('#billing_euvat_checkbox');
    var $euvatPayerBtnValueWrapper = $("#billing_euvat_val_checkbox_field");
    var $euvatPayerBtnValue = $("#billing_euvat_val_checkbox");
    var $needInvoiceBtn = $('#billing_invoice_checkbox');

    $needInvoiceBtn.after('<label class="control-label d-inline" for="billing_invoice_checkbox">Need an invoice?</label>');
    $euvatPayerBtn.after('<label class="control-label d-inline" for="billing_euvat_checkbox">Active European VAT payer? <i class="fa fa-info-circle" data-toggle="tooltip" data-placement="right" title="The European Union value added tax (or EU VAT) is a value added tax on goods and services within the European Union (EU)."></i></label>');


    if ($needInvoiceBtn.is(":checked")) {

      $euvatPayerBtnWrapper.show();
      $euvatPayerBtnValueWrapper.removeClass("d-block").hide();

      $checkoutForm.find(".invoice-field").addClass("d-block");
      $checkoutForm.find(".invoice-field").removeClass("shrink");
      $checkoutForm.find(".invoice-field input").removeAttr("disabled");
      $checkoutForm.find("#billing_euvat_checkbox_field").attr("style", "");

      if($euvatPayerBtn.is(":checked")){

        $euvatPayerBtnValue.val("1");
      } else {
  
        $euvatPayerBtnValue.val("0");
      }

    } else {

      $euvatPayerBtnWrapper.hide();
      $("p.invoice-field").removeClass("d-block").hide();
    }

    $euvatPayerBtn.on("change", function(e) {

      if($(this).is(":checked")){

        $euvatPayerBtnValue.val("1");
      } else {

        $euvatPayerBtnValue.val("0");
      }
    });

    $needInvoiceBtn.on("change", function() {

      if ( $(this).is(":checked") ) {

        $("p.invoice-field").addClass("d-block");
        $euvatPayerBtnValueWrapper.removeClass("d-block").hide();

        if($euvatPayerBtn.is(":checked")){

          $euvatPayerBtnValue.val("1");
        } else {
    
          $euvatPayerBtnValue.val("0");
        }

      } else {

        $("p.invoice-field").removeClass("d-block").hide();
        $euvatPayerBtnValue.val("0");
      }
    });

    disableEuVatCheckboxIfNotFromEU();
    $checkoutForm.on("change", "select#billing_country", function() {
      disableEuVatCheckboxIfNotFromEU();
    });

    $checkoutForm.on("click", "#order_cart_content .checkout-cart-remove-item", function(e) {
      e.preventDefault();

      showPreloader($("#order_cart_content"));

      var url = $(this).attr("href");

      $.ajax({
        method: "GET",
        url: url
      })
      .done(function(response) {

        hidePreloader($checkoutForm.find("#order_cart_content"));

        var $response = $(response);
        var $cartContent = $("#order_cart_content");
        var $checkoutAddonsTab = $("#tabCheckoutAddons");

        if ($response.find("#order_cart_content").length) {

          $cartContent.html($response.find("#order_cart_content").html());
        } else {

          $(location).attr('href', '/products');
        }

        var addonsTabClass = $checkoutAddonsTab.attr("class");
        $checkoutAddonsTab.html($response.find("#tabCheckoutAddons").html());
        $checkoutAddonsTab.attr("class", addonsTabClass);
      });
    });


    var $cartForm = $(".woocommerce-form-coupon");
    $cartForm.on("submit", function(e) {
      e.preventDefault();

      showPreloader($('.woocommerce').find('.card'));

      var updateCartOrApplyCoupon = { apply_coupon: "Apply coupon" };
      var formData = $cartForm.serializeArray().reduce(function(result, curr) {

        result = result || {};

        if (isComplexKey(curr.name)) {

          var key = curr.name;
          var parentKey = key.substring(0, key.indexOf("["));

          result[parentKey] = result[parentKey] || {};

          var transformedIntoObject = transformComplexIntoObject(key, curr.value);

          result[parentKey] = Object.assign({}, result[parentKey], transformedIntoObject);
        } else {

          result[curr.name] = curr.value;
        }

        return result;
      }, updateCartOrApplyCoupon);

      $.ajax({
        method: "POST",
        url: "/checkout",
        data: formData
      })
      .done(function(response) {

        var $response = $(response);
        var $cartContent = $("#order_cart_content");
        var $cartTotals = $('#checkout-total-html');

        $cartContent.html($response.find("#order_cart_content").html());
        $cartTotals.html($response.find('#checkout-total-html').html());

        hidePreloader($('.woocommerce').find('.card'));

      })
      .fail(function(){

        hidePreloader($('.woocommerce').find('.card'));
      });
    });

    function isComplexKey(key) {
      return key.indexOf("[") !== -1;
    }

    function transformComplexIntoObject(key, deepestValue) {

      var resultObject;

      resultObject = cutOfParentKey(key);
      resultObject = getAllKeysAsArray(resultObject);
      resultObject = startBuildingTheResultFromTheEnd(resultObject);
      resultObject = transformReversedKeysIntoNestedObject(resultObject, deepestValue);

      return resultObject;
    }

    function cutOfParentKey(key) {
      return key.substring(key.indexOf("["));
    }

    function getAllKeysAsArray(key) {
      return key
        .replace(/\[/g, "")
        .split("]")
        .filter(function (el) {
          return el !== ""
        });
    }

    function startBuildingTheResultFromTheEnd(keys) {
      return keys.reverse();
    }

    function transformReversedKeysIntoNestedObject(keys, firstValue) {
      return keys
        .reduce(function (result, curr) {
          var temp = result;

          result = {};
          result[curr] = temp;

          return result;
        }, firstValue);
    }

    $( document.body ).on( 'click', '.woocommerce-remove-coupon', function(e) {
      e.preventDefault();

        $.ajax({
          method: "GET",
          url: $(e).attr('href')
        })
        .done(function(response) {

          var $response = $(response);
          var $cartContent = $("#order_cart_content");
          var $cartTotals = $('#checkout-total-html');
  
          $cartContent.html($response.find("#order_cart_content").html());
          $cartTotals.html($response.find('#checkout-total-html').html());

        });

    });

  });
})( jQuery );
