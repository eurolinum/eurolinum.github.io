/*

    Nevo Template Script
    Version 2.0
    By ThemeVillain
    https://themevillain.com/

    // Thank you for your purchase!
    // & Happy coding!

    // Have questions?
    // Ask support@themevillain.com

*/

$(function(){

    'use strict';

    var $html = $('html'),
        $body = $('body'),
        $wrapper = $('.wrapper'),
        $masonryGrid = $('.masonry'),
        $window = $(window),
        $content = $body.find('.content'),
        $topNav = $('<a href="#header" id="to-top" class="anchor-link"><hr/><hr/></a>'),
        headerHeight = $body.find('header.header').height(),
        $anchorLink = $body.find('.anchor-link'),
        $anchorSection = $body.find('.anchor-section');

    setTimeout(function(){
        $html.addClass('loaded');
    }, 200);

    $body.append($topNav);

    $('a:not(.lightbox):not(.filter):not(.anchor-link):not([target=_blank]):not([href^="#"])').addClass('smooth');

    $body.on('click touch', '.smooth', function(e){
        e.preventDefault();
        e.stopPropagation();
        var href = $(this).attr('href');
        $html.removeClass('loaded');
        setTimeout(function(){
            window.location = href;
        }, 500);
    });
    
    $('.burger').on('click touch', function(){
        $body.toggleClass('menu-opened');
    });

    $('.menu-link').on('click touch', function(){
        $body.removeClass('menu-opened');
    });
    // The Masonry Grid

    // Used for ID's so multiple grids don't interfere by filtering
    var gridCount = 0;

    // Loop through grids
    $masonryGrid.each(function(){

        var grid = $(this);

        // Set the isotope
        grid.isotope({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            hiddenStyle: {
                opacity: 0
            },
            visibleStyle: {
                opacity: 1,
                transform: 'translateY(-20px)',
                transition: 'opacity 0.4s'
            }
        });
        var gridItems = grid.find('.grid-item').slice(9);

        grid.isotope( 'hideItemElements', gridItems );
    });

    $body.on('click touch', '.load-more-fabrics', function(e){
        var button = $(this);
        var targetGrid = button.attr('data-target');
        var grid = $masonryGrid.filter('#'+targetGrid);
        var gridItems = grid.find('.grid-item').slice(9);

        grid.isotope( 'revealItemElements', gridItems );
        animateItems();
        button.hide();
        grid.isotope('layout');
    });

    // Add filter functionality
    $body.on('click touch', '.grid-filters .filter', function(e){

        e.preventDefault();
        e.stopImmediatePropagation();

        var el = $(this);
        var filters = el.attr('data-filter');
        var targetGrid = el.parents('.grid-filters').attr('data-target');

        el.addClass('active').parent().siblings().find('.filter').removeClass('active');

        $masonryGrid.filter('#'+targetGrid).isotope({
            filter : filters
        });
        el.closest('section').find('.load-more-fabrics').hide();
        animateItems();
    });

    // Lets make filters mobile-friendly
    $body.on('click touch', '.grid-filters', function(e){
        $(this).toggleClass('open');
    });

    $masonryGrid.on( 'arrangeComplete', animateItems );

    $html.find('header.header .has-dropdown').on('mouseover', function(){
        $wrapper.addClass('dropdown-hovered');
        $(this).addClass('hover');
    }).on('mouseout', function(){
        $wrapper.removeClass('dropdown-hovered');
        $(this).removeClass('hover');
    });

    $body.on('click touch', '.anchor-link', function(e){
        var anchor = $(this).attr('href');
        var offset = 0;

        $content.removeClass('faded');

        $(anchor).get(0).scroll();
        window.location.hash = anchor;
        $body.addClass('scrolled-up');
    });

    // Transitions 

    $body.on('click touch', 'a', function(e){

        $body.removeClass('menu-opened');
        
    });

    function setAnchors(){

        $anchorLink.each(function(){

            var href = $(this).attr('href');
            
            if(href !== '#'){
                var $anchorSection = $($(this).attr('href'));
                    $anchorSection.addClass('anchor-section');
                    $anchorSection.attr('data-pos', $anchorSection.offset().top);
            }

        });

        $anchorSection = $body.find('.anchor-section');

    }
    var fabricOffsets = 0;
    function render(props) {
        return function(tok, i) {
            return (i % 2) ? props[tok] : tok;
        };
    }

    setAnchors();

    window.requestAnimationFrame(function(){
        animateItems();
        animateText();
        nevoLightbox();
        $masonryGrid.isotope('layout');
    });
       
    $(document).on('lazyloaded', function(e){
        $masonryGrid.isotope('layout');
    });
        
    $window.bind("pageshow", function(event) {
        if (event.originalEvent.persisted)
            window.location.reload()
    });

    $window.bind("unload", function() { 
        // FF Fix, nothing else needed
    });

    $('.nevo-slider').each(function(){
        $(this).nevoslider();
    });

    // var typeAnimation = new Typed('.typed', {
    //     stringsElement : '.typed-content',
    //     typeSpeed : 100,
    //     startDelay : 1200,
    //     showCursor : false
    // });
    
});