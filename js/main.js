/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */

 /* jQuery's document ready function. Contains all necessary jQuery animation/functionality within */
$(document).ready(function(){

  /*Set and maintain active tab styling*/
  $('.tab-title').click('click',function(){
    $('.tab-title').removeClass('selected');
    $(this).addClass('selected');
  })


  /*Display snapshot divs with proper animation*/
  $('#Snapshots').click(function(){

    $('.hidden-snapshot-content').show();

    $('#Snapshots').addClass('button-exhausted');

    $('#Icebreakers').hide();
    $('#Insights').hide();

    // $("html,body").animate(
    //   {
    //     scrollTop: $('document').height()
    // },
    // 1200);

    $('.tab-content').animate(
      {
        scrollTop: $('.tab-content').height()
    },
    1200);

  });

  /*Allow play icon to control video*/
  $('.site-video').parent().click(function(){
    if($(this).children('.site-video').get(0).paused){
      $(this).children('.site-video').get(0).play();
      $(this).children('.play-button').fadeOut();
    } else {
      $(this).children('.site-video').get(0).pause();
      $(this).children('.play-button').fadeIn();
    }
  })

})


//Have 3 clickedButtons
//When a button with an id matching a name in the is clicked, that button is an 'active one' and displays its content.

//Create an array of 3 'unclicked' html buttons
//When a button is clicked replace the unclicked array
//Remove the button from the unclicked array
//Render the remaining buttons in the unclicked array after the content

var unclickedButtons = ["Snapshots","Icebreakers","Insights"];
var clickedButtons = [];

var hey = function(){
  alert("I'm interested! (placeholder to initiate a feature)");
}

;(function(window) {

	'use strict';

	/**VARIABLE DEFINITIONS**/
	/************************************************************************************************************************
	********************************************************************************************************************************************
	********************************************************************************************************************************************
	********************************************************************************************************************************************
	// ********************************************************************************************************************************************/
	var support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],

		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},

		// the pages wrapper
		stack = document.querySelector('.pages-stack'),
		// the page elements
		pages = [].slice.call(stack.children),
		// total number of page elements
		pagesTotal = pages.length,
		// index of current page
		current = 0,
		// menu button
		// menuCtrl = document.querySelector('button.menu-button'),
		menuCtrl = document.querySelector('#arrow-button'),
		menuCtrl_two = document.querySelector('#eyelevel-brand-wrapper'),
		// the navigation wrapper
		nav = document.querySelector('.pages-nav'),
		// the menu nav items
		navItems = [].slice.call(nav.querySelectorAll('.link--page')),
		// check if menu is open
		isMenuOpen = false;

		/**END OF VARIABLE DEFINITIONS**/
		/************************************************************************************************************************
		********************************************************************************************************************************************
		********************************************************************************************************************************************
		********************************************************************************************************************************************
		// ********************************************************************************************************************************************/



	function init() {
		openMenu();
		buildStack();
		initEvents();
	}


	function buildStack() {
		var stackPagesIdxs = getStackPagesIdxs();


		// set z-index, opacity, initial transforms to pages and add class page--inactive to all except the current one
		for(var i = 0; i < pagesTotal; ++i) {
			var page = pages[i],
				posIdx = stackPagesIdxs.indexOf(i);


			if( current !== i ) {
				classie.add(page, 'page--inactive');

				if( posIdx !== -1 ) {
					// visible pages in the stack
					page.style.WebkitTransform = 'translate3d(0,100%,0)';
					page.style.transform = 'translate3d(0,100%,0)';


				}
				else {
					// invisible pages in the stack
					page.style.WebkitTransform = 'translate3d(0,75%,-300px)';
					page.style.transform = 'translate3d(0,75%,-300px)';
				}
			}
      //If i IS the current page, make that page active (JB)
			else {
				classie.remove(page, 'page--inactive');
			}

			page.style.zIndex = i < current ? parseInt(current - i) : parseInt(pagesTotal + current - i);

			if( posIdx !== -1 ) {
				page.style.opacity = parseFloat(1 - 0.1 * posIdx);
			}
			else {
				page.style.opacity = 0;
			}
		}
	}

	// event binding
	function initEvents() {
		// menu button click
		menuCtrl.addEventListener('click', closeMenu);
		menuCtrl_two.addEventListener('click', openMenu);

		// navigation menu clicks
		navItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				openPage(pageid);
			});
		});

		// clicking on a page when the menu is open triggers the menu to close again and open the clicked page
		pages.forEach(function(page) {
			var pageid = page.getAttribute('id');
			page.addEventListener('click', function(ev) {
				if( isMenuOpen ) {
					ev.preventDefault();
					openPage(pageid);
				}
			});
		});

		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			if( !isMenuOpen ) return;
			var keyCode = ev.keyCode || ev.which;
			if( keyCode === 27 ) {
				closeMenu();
			}
		} );
	}

	// toggle menu fn
	function toggleMenu() {
		if( isMenuOpen ) {
			closeMenu();
		}
		else {
			openMenu();
			isMenuOpen = true;
		}
	}

	// opens the menu
	function openMenu() {
		// toggle the menu button
		classie.add(menuCtrl, 'menu-button--open')
		// stack gets the class "pages-stack--open" to add the transitions
		classie.add(stack, 'pages-stack--open');
		// reveal the menu
		classie.add(nav, 'pages-nav--open');

		// now set the page transforms
		var stackPagesIdxs = getStackPagesIdxs();
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)'; // -200px, -230px, -260px
			page.style.transform = 'translate3d(0, 75%, ' + parseInt(-1 * 200 - 50*i) + 'px)';

      //JB added
      page.style.borderRadius = '30px';
      // page.style.width = '438px';
      var $navRow = $('.navRow')
      var $topMainContent = $('.top-main-content');
      var $tabContent = $('.tab-content');

      $navRow.css('position', 'relative');
      $topMainContent.css('margin-top', '30px');
      $tabContent.css('overflow-y', 'hidden');

      // page.style.webkitBorderRadius = '10px';

		}
	}

	// closes the menu
	function closeMenu() {
		// same as opening the current page again
		openPage();
	}

	// opens a page
	function openPage(id) {
		var futurePage = id ? document.getElementById(id) : pages[current],
      //Get index of what is to be the next page (JB)
			futureCurrent = pages.indexOf(futurePage),
			stackPagesIdxs = getStackPagesIdxs(futureCurrent);

		// set transforms for the new current page
		futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
		futurePage.style.transform = 'translate3d(0, 0, 0)';
		futurePage.style.opacity = 1;

    //JB added
    futurePage.style.borderRadius = '0px';
    futurePage.style.width = '100%';

    //Using jQuery to acccess and change css for DOM elements
    var $navRow = $('.navRow')
    var $topMainContent = $('.top-main-content');
    var $tabContent = $('.tab-content');

    $navRow.css('position', 'fixed');
    $topMainContent.css('margin-top', '150px');
    $tabContent.css('overflow-y', 'overlay');

    //JB check this out for scrollbar without fixed height: http://jsfiddle.net/cvmrvfhm/1/
    $tabContent.css('height', '80vh');
    // $tabContent.css('max-height', '100%');


		// set transforms for the other items in the stack
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0,100%,0)';
			page.style.transform = 'translate3d(0,100%,0)';

      page.style.opacity = 0;
		}

		// set current
		if( id ) {
			current = futureCurrent;
		}

		// close menu..
		classie.remove(menuCtrl, 'menu-button--open');
		classie.remove(nav, 'pages-nav--open');
		onEndTransition(futurePage, function() {
			classie.remove(stack, 'pages-stack--open');
			// reorganize stack

      //JB subtraction
			buildStack();
			// isMenuOpen = false;
		});
	}

	// gets the current stack pages indexes. If any of them is the excludePage then this one is not part of the returned array
	function getStackPagesIdxs(excludePageIdx) {

		var nextStackPageIdx = current + 1 < pagesTotal ? current + 1 : 0,
			nextStackPageIdx_2 = current + 2 < pagesTotal ? current + 2 : 1,
			idxs = [],

			excludeIdx = excludePageIdx || -1;

		if( excludePageIdx != current ) {
			idxs.push(current);
		}

    //JB comment out to allow there to only be one page

		// if( excludePageIdx != nextStackPageIdx ) {
		// 	idxs.push(nextStackPageIdx);
		// }
		// if( excludePageIdx != nextStackPageIdx_2 ) {
		// 	idxs.push(nextStackPageIdx_2);
		// }

		return idxs;
	}

	init();

	//changes to a page such as id="page-manuals" without opening the menu and preserving menu transition functionality
	window.openPageNoTransition = function(id){

		var futurePage = id ? document.getElementById(id) : pages[current],
			futureCurrent = pages.indexOf(futurePage),
			stackPagesIdxs = getStackPagesIdxs(futureCurrent);

		// set transforms for the new current page
		futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
		futurePage.style.transform = 'translate3d(0, 0, 0)';
		futurePage.style.opacity = 1;


		classie.remove(futurePage, 'page--inactive');

		// set current
		if( id ) {
			current = futureCurrent;
		}

		buildStack();
	}
})(window);
