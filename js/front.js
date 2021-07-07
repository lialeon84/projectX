$(function() {
    // ------------------------------------------------------- //
    // Navbar Sticky
    // ------------------------------------------------------ //
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > $(".top-bar").outerHeight()) {
            $("header.nav-holder.make-sticky").addClass("sticky");
            $("body").css("padding-top", "" + $("#navbar").outerHeight() + "px");
        } else {
            $("header.nav-holder.make-sticky").removeClass("sticky");
            $("body").css("padding-top", "0");
        }
    });

    // ------------------------------------------------------- //
    // Multi-level dropdown
    // ------------------------------------------------------ //

    $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        $(this)
            .siblings()
            .toggleClass("show");

        if (!$(this)
            .next()
            .hasClass("show")
        ) {
            $(this)
                .parents(".dropdown-menu")
                .first()
                .find(".show")
                .removeClass("show");
        }
        $(this)
            .parents("li.nav-item.dropdown.show")
            .on("hidden.bs.dropdown", function(e) {
                $(".dropdown-submenu .show").removeClass("show");
            });
    });

    // ------------------------------------------------------- //
    // Scroll To
    // ------------------------------------------------------ //
    $(".scroll-to").on("click", function(e) {
        e.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var target = parts[1];

        if ($("header.nav-holder").hasClass("sticky")) {
            var offset = -80;
        } else {
            var offset = -180;
        }

        var offset = $("header.nav-holder").outerHeight();

        $("body").scrollTo($("#" + target), 800, {
            offset: -offset
        });
    });

    // ------------------------------------------------------- //
    // Tooltip Initialization
    // ------------------------------------------------------ //
    $('[data-toggle="tooltip"]').tooltip();

    // ------------------------------------------------------- //
    // Product Gallery Slider
    // ------------------------------------------------------ //
    function productDetailGallery() {
        $("a.thumb").on("click", function(e) {
            e.preventDefault();
            source = $(this).attr("href");
            $("#mainImage")
                .find("img")
                .attr("src", source);
        });

        for (i = 0; i < 3; i++) {
            setTimeout(function() {
                $("a.thumb")
                    .eq(i)
                    .trigger("click");
            }, 300);
        }
    }

    productDetailGallery();

    // ------------------------------------------------------- //
    // Customers Slider
    // ------------------------------------------------------ //
    $(".customers").owlCarousel({
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    });

    // ------------------------------------------------------- //
    // Testimonials Slider
    // ------------------------------------------------------ //
    $(".testimonials").owlCarousel({
        items: 4,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    // ------------------------------------------------------- //
    // Homepage Slider
    // ------------------------------------------------------ //
    $(".homepage").owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        addClassActive: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1,
                loop: true
            }
        }
    });

    // ------------------------------------------------------- //
    // Adding fade effect to dropdowns
    // ------------------------------------------------------ //
    $(".dropdown").on("show.bs.dropdown", function() {
        $(this)
            .find(".dropdown-menu")
            .first()
            .stop(true, true)
            .fadeIn(100);
    });
    $(".dropdown").on("hide.bs.dropdown", function() {
        $(this)
            .find(".dropdown-menu")
            .first()
            .stop(true, true)
            .fadeOut(100);
    });

    // ------------------------------------------------------- //
    // Project Caroudel
    // ------------------------------------------------------ //
    $(".project").owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        nav: true,
        autoplay: true,
        smartSpeed: 1000,
        addClassActive: true,
        lazyload: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1,
                loop: true
            }
        }
    });

    // ------------------------------------------------------- //
    // jQuery Counter Up
    // ------------------------------------------------------ //
    $(".counter").counterUp({
        delay: 10,
        time: 1000
    });

    // ------------------------------------------------------- //
    // click on the box activates the radio
    // ------------------------------------------------------ //
    $("#checkout").on(
        "click",
        ".box.shipping-method, .box.payment-method",
        function(e) {
            var radio = $(this).find(":radio");
            radio.prop("checked", true);
        }
    );

    // ------------------------------------------------------- //
    //  Bootstrap Select
    // ------------------------------------------------------ //
    $(".bs-select").selectpicker({
        style: "btn-light",
        size: 4
    });

    // ------------------------------------------------------- //
    //  Shop Detail Carousel
    // ------------------------------------------------------ //
    $(".shop-detail-carousel").owlCarousel({
        items: 1,
        thumbs: true,
        nav: false,
        dots: false,
        autoplay: true,
        thumbsPrerendered: true
    });

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $("link#theme-stylesheet");
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $("link#new-stylesheet");

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function() {
        if ($(this).val() !== "") {
            var theme_csspath = "css/style." + $(this).val() + ".css";

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf("/"))
            });
        }

        return false;
    });

    if ($.cookie("theme_layout")) {
        $("body").addClass($.cookie("theme_layout"));
    }

    $("#layout").change(function() {
        if ($(this).val() !== "") {
            var theme_layout = $(this).val();

            $("body").removeClass("wide");
            $("body").removeClass("boxed");

            $("body").addClass(theme_layout);

            $.cookie("theme_layout", theme_layout, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf("/"))
            });
        }
    });
});

function selectChanged(newvalue) {
    document.getElementById("fee").value = "";
    document.getElementById("total").value = "";
    var amt = Number(document.getElementById("amount").value);
    document.getElementsByClassName("amounts").innerHTML = amt;
   
        //Check - B2B
        if (newvalue == "B2B" && amt <= 100) {
          $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
          }; $('#fee').appendVal('3.30%');
        } 
        if (newvalue == "B2B" && amt > 100 && amt <= 200) {
          $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
          }; $('#fee').appendVal('3.08%');
        } 
        if (newvalue == "B2B" && amt > 200 && amt <= 275) {
          $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
          }; $('#fee').appendVal('3.00%');
        } 
    if (newvalue == "B2B" && amt > 275 && amt <= 500) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.75%');
    } 
    if (newvalue == "B2B" && amt > 500 && amt <= 600) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.20%');
    } 
    if (newvalue == "B2B" && amt > 600 && amt <= 700) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.05%');
    } 
    if (newvalue == "B2B" && amt > 700 && amt <= 1000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.00%');
    } 
    if (newvalue == "B2B" && amt > 1000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.20%');
    } 

    //Check - Cashier's/Official
    if (newvalue == "Cashiers") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('5.00%');
    } 

    //Check - Consumer Loan
    if (newvalue == "CxLoan") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('3.00%');
    } 

    if (newvalue == "Free" ) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('0.00%');
    } 

    //Check - Govt - U.S. Treasury
    if (newvalue == "Govt" && amt <= 2100) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.00%');
    } 
    if (newvalue == "Govt" && amt > 2100 && amt <= 2200) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.25%');
    } 
    if (newvalue == "Govt" && amt > 2200 && amt <= 2300) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.31%');
    } 
    if (newvalue == "Govt" && amt > 2300 && amt <= 2400) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.39%');
    } 
    if (newvalue == "Govt" && amt > 2400 && amt <= 2500) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.50%');
    } 
    if (newvalue == "Govt" && amt > 2500 && amt <= 2750) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.55%');
    } 
    if (newvalue == "Govt" && amt > 2750 && amt <= 3000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.75%');
    } 
    if (newvalue == "Govt" && amt > 3000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.99%');
    } 

    //Check - Govt - All Other
    if (newvalue == "Govt1" && amt <= 2100) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.00%');
    }
    if (newvalue == "Govt1" && amt > 2100 && amt <= 2200) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.25%');
    }
    if (newvalue == "Govt1" && amt > 2200 && amt <= 2300) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.31%');
    } 
    if (newvalue == "Govt1" && amt > 2300 && amt <= 2400) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.39%');
    }
    if (newvalue == "Govt1" && amt > 2400 && amt <= 2500) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.50%');
    } 
    if (newvalue == "Govt1" && amt > 2500 && amt <= 2750) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.55%');
    }
    if (newvalue == "Govt1" && amt > 2750 && amt <= 3000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.75%');
    } 
    if (newvalue == "Govt1" && amt > 3000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.99%');
    } 

    //Check - Inc Tax Loan/RAL
    if (newvalue == "TaxLoan") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('5.00%');
    } 

    //Check - Insurance/Attorney
    if (newvalue == "Insurance") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('5.00%');
    } 

    //Check - Misc Check
    if (newvalue == "Misc") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('5.00%');
    } 

    //Check - Money Order
    if (newvalue == "MoneyO") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('10.00%');
    } 
        
    //Check - Money Order (In-House)
    if (newvalue == "InHouseO") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('1.00%');
    } 

    //Check - Payroll Handwritten
    if (newvalue == "PayrollH" && amt <= 275) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.99%');
    }
    if (newvalue == "PayrollH" && amt > 275 && amt <= 500) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.88%');
    }
    if (newvalue == "PayrollH" && amt > 500 && amt <= 600) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.30%');
    }
    if (newvalue == "PayrollH" && amt > 600 && amt <= 700) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.15%');
    }
    if (newvalue == "PayrollH" && amt > 700 && amt <= 800) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.07%');
    }
    if (newvalue == "PayrollH" && amt > 800 && amt <= 900) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.05%');
    }
    if (newvalue == "PayrollH" && amt > 900 && amt <= 1000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            ); 
        }; $('#fee').appendVal('2.00%');
    }
    if (newvalue == "PayrollH" && amt > 1000) { 
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.30%');
    } 

    //Check - Payroll Printed 
    if (newvalue == "PayrollP" && amt <= 275) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.99%');
    }
    if (newvalue == "PayrollP" && amt > 275 && amt <= 500) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.75%');
    }
    if (newvalue == "PayrollP" && amt > 500 && amt <= 600) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.20%');
    }
    if (newvalue == "PayrollP" && amt > 600 && amt <= 700) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.05%');
    }
    if (newvalue == "PayrollP" && amt > 700 && amt <= 1000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.00%');
    }
    if (newvalue == "PayrollP" && amt > 1000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('2.20%');
    }

    //Check - Student/School Loan and Check - Tax Refund - All Other
    if (newvalue == "Student" || newvalue == "TaxOther") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('5.00%');
    } 

    //Check - Tax Refund - U.S. Treasury
    if (newvalue == "Treasury" && amt <= 3000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('3.00%');
    }
    if (newvalue == "Treasury" && amt > 3000 && amt <= 5000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('3.25%');
    }
    if (newvalue == "Treasury" && amt > 5000) {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('3.50%');
    }

    //Check - Two Party and Check - Two Party Business
    if (newvalue == "TwoP" || newvalue == "TwoB") {
        $.fn.appendVal = function (TextToAppend) {
            return $(this).val(
                $(this).val() + TextToAppend
            );
        }; $('#fee').appendVal('10.00%');
    } 

    var per = parseFloat(document.getElementById("fee").value) / 100;
    var total = amt * per;
    document.getElementById("total").value = total.toFixed(2);
    
    
  
}
//front inro


$(function() {

    /* =========================================
     * tooltip
     *  =======================================*/

    $('.customer img').tooltip();


    /* =========================================
     * counters
     *  =======================================*/

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /* =================================================
     * Preventing URL update on navigation link click
     *  ==============================================*/

    $('.link-scroll').on('click', function(e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });


    /* =========================================
     *  Scroll Spy
     *  =======================================*/

    $('body').scrollspy({
        target: '#navbarcollapse',
        offset: 80
    });


    /* =========================================
     * testimonial slider
     *  =======================================*/

    // $(".testimonials").owlCarousel({
    //     nav: false,
    //     dots: true,
    //     responsiveClass: true,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 1
    //         },
    //         1000: {
    //             items: 3
    //         },
    //         1200: {
    //             items: 4
    //         }
    //     }
    // });


    /* =========================================
     * Leflet map
     *  =======================================*/
    // map();


    /* =========================================
     * parallax
     *  =======================================*/
    $(window).scroll(function() {

        var scroll = $(this).scrollTop();

        if ($(window).width() > 1250) {
            $('.parallax').css({
                'background-position': 'left -' + scroll / 8 + 'px'
            });
        } else {
            $('.parallax').css({
                'background-position': 'center center'
            });
        }
    });

    /* =========================================
     * filter
     *  =======================================*/

    $('#filter a').click(function(e) {
        e.preventDefault();

        $('#filter li').removeClass('active');
        $(this).parent('li').addClass('active');

        var categoryToFilter = $(this).attr('data-filter');

        $('.reference-item').each(function() {

            if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });


    /* =========================================
     * reference functionality
     *  =======================================*/
    $('.reference a').on('click', function(e) {

        e.preventDefault();

        var title = $(this).find('.reference-title').text(),
            description = $(this).siblings('.reference-description').html();

        $('#detail-title').text(title);
        $('#detail-content').html(description);

        var images = $(this).siblings('.reference-description').data('images').split(',');
        if (images.length > 0) {
            sliderContent = '';
            for (var i = 0; i < images.length; ++i) {
                sliderContent = sliderContent + '<div class="item"><img src=' + images[i] + ' alt="" class="img-fluid"></div>';
            }
        } else {
            sliderContent = '';
        }

        openReference(sliderContent);

    });

    function openReference(sliderContent) {
        $('#detail').slideDown();
        $('#references-masonry').slideUp();


        if (sliderContent !== '') {

            var slider = $('#detail-slider');

            if (slider.hasClass('owl-loaded')) {
                slider.trigger('replace.owl.carousel', sliderContent);
            } else {
                slider.html(sliderContent);
                slider.owlCarousel({
                    nav: false,
                    dots: true,
                    items: 1
                });

            }
        }
    }


    function closeReference() {
        $('#references-masonry').slideDown();
        $('#detail').slideUp();
    }

    $('#filter button, #detail .close').on('click', function() {
        closeReference();
    });


    /* =========================================
     *  animations
     *  =======================================*/

    delayTime = 0;

    $('[data-animate]').waypoint(function(direction) {
        delayTime += 250;

        var element = $(this.element);

        $(this.element).delay(delayTime).queue(function(next) {
            element.toggleClass('animated');
            element.toggleClass(element.data('animate'));
            delayTime = 0;
            next();
        });

        this.destroy();

    }, {
        offset: '90%'
    });

    $('[data-animate-hover]').hover(function() {
        $(this).css({
            opacity: 1
        });
        $(this).addClass('animated');
        $(this).removeClass($(this).data('animate'));
        $(this).addClass($(this).data('animate-hover'));
    }, function() {
        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-hover'));
    });

    /* =========================================
     
     *  =======================================*/

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function() {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });

});