function Star(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 2) + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255,255,255," + alpha + ")";
}

Star.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
};

Star.prototype.move = function() {
    this.y -= 0.15 + params.backgroundSpeed / 100;
    if (this.y <= -10) this.y = HEIGHT + 10;
    this.draw();
};

function Dot(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 5) + 1;
    this.maxLinks = 2;
    this.speed = 0.5;
    this.a = 0.5;
    this.aReduction = 0.005;
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

    this.dir = Math.floor(Math.random() * 140) + 200;
}

Dot.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
};

Dot.prototype.link = function() {
    if (this.id == 0) return;
    var previousDot1 = getPreviousDot(this.id, 1);
    var previousDot2 = getPreviousDot(this.id, 2);
    var previousDot3 = getPreviousDot(this.id, 3);
    if (!previousDot1) return;
    ctx.strokeStyle = this.linkColor;
    ctx.moveTo(previousDot1.x, previousDot1.y);
    ctx.beginPath();
    ctx.lineTo(this.x, this.y);
    if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
    if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
    ctx.stroke();
    ctx.closePath();
};

function getPreviousDot(id, stepback) {
    if (id == 0 || id - stepback < 0) return false;
    if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
    else return false; //getPreviousDot(id - stepback);
}

Dot.prototype.move = function() {
    this.a -= this.aReduction;
    if (this.a <= 0) {
        this.die();
        return;
    }
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
    (this.x =
        this.x +
        Math.cos(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100)),
    (this.y =
        this.y +
        Math.sin(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100));

    this.draw();
    this.link();
};

Dot.prototype.die = function() {
    dots[this.id] = null;
    delete dots[this.id];
};

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    WIDTH,
    HEIGHT,
    mouseMoving = false,
    mouseMoveChecker,
    mouseX,
    mouseY,
    stars = [],
    initStarsPopulation = 80,
    dots = [],
    dotsMinDist = 2,
    params = {
        maxDistFromCursor: 50,
        dotsSpeed: 0,
        backgroundSpeed: 0
    };

var gui;
gui = new dat.GUI();
gui
    .add(params, "maxDistFromCursor")
    .min(0)
    .max(100)
    .step(10)
    .name("Size");
gui
    .add(params, "dotsSpeed")
    .min(0)
    .max(100)
    .step(0.5)
    .name("Speed");
gui
    .add(params, "backgroundSpeed")
    .min(0)
    .max(150)
    .step(1)
    .name("Sky speed");
gui.open();

setCanvasSize();
init();

function setCanvasSize() {
    (WIDTH = document.documentElement.clientWidth),
    (HEIGHT = document.documentElement.clientHeight);

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
}

function init() {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(
            i,
            Math.floor(Math.random() * WIDTH),
            Math.floor(Math.random() * HEIGHT)
        );
        //stars[i].draw();
    }
    ctx.shadowBlur = 0;
    animate();
}

function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (var i in stars) {
        stars[i].move();
    }
    for (var i in dots) {
        dots[i].move();
    }
    drawIfMouseMoving();
    requestAnimationFrame(animate);
}

window.onmousemove = function(e) {
    mouseMoving = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearInterval(mouseMoveChecker);
    mouseMoveChecker = setTimeout(function() {
        mouseMoving = false;
    }, 100);
};

function drawIfMouseMoving() {
    if (!mouseMoving) return;

    if (dots.length == 0) {
        dots[0] = new Dot(0, mouseX, mouseY);
        dots[0].draw();
        return;
    }

    var previousDot = getPreviousDot(dots.length, 1);
    var prevX = previousDot.x;
    var prevY = previousDot.y;

    var diffX = Math.abs(prevX - mouseX);
    var diffY = Math.abs(prevY - mouseY);

    if (diffX < dotsMinDist || diffY < dotsMinDist) return;

    var xVariation = Math.random() > 0.5 ? -1 : 1;
    xVariation =
        xVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
    var yVariation = Math.random() > 0.5 ? -1 : 1;
    yVariation =
        yVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
    dots[dots.length] = new Dot(
        dots.length,
        mouseX + xVariation,
        mouseY + yVariation
    );
    dots[dots.length - 1].draw();
    dots[dots.length - 1].link();
}
//setInterval(drawIfMouseMoving, 17);

function degToRad(deg) {
    return deg * (Math.PI / 180);
}
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame;
})();
var canvas = document.getElementById("space");
var c = canvas.getContext("2d");

var numStars = 1900;
var radius = "0." + Math.floor(Math.random() * 9) + 1;
var focalLength = canvas.width * 2;
var warp = 0;
var centerX, centerY;

var stars = [],
    star;
var i;

var animate = true;

initializeStars();

function executeFrame() {
    if (animate) requestAnimFrame(executeFrame);
    moveStars();
    drawStars();
}

function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for (i = 0; i < numStars; i++) {
        star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: "0." + Math.floor(Math.random() * 99) + 1
        };
        stars.push(star);
    }
}

function moveStars() {
    for (i = 0; i < numStars; i++) {
        star = stars[i];
        star.z--;

        if (star.z <= 0) {
            star.z = canvas.width;
        }
    }
}

function drawStars() {
    var pixelX, pixelY, pixelRadius;

    // Resize to the screen
    if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
    }
    if (warp == 0) {
        c.fillStyle = "rgba(0,10,20,1)";
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
    for (i = 0; i < numStars; i++) {
        star = stars[i];

        pixelX = (star.x - centerX) * (focalLength / star.z);
        pixelX += centerX;
        pixelY = (star.y - centerY) * (focalLength / star.z);
        pixelY += centerY;
        pixelRadius = 1 * (focalLength / star.z);

        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
        c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
        //c.fill();
    }
}

document.getElementById("warp").addEventListener("click", function(e) {
    window.warp = window.warp == 1 ? 0 : 1;
    window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
    executeFrame();
});

executeFrame();

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