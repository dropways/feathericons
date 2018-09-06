jQuery( document ).ready( function () {
	jQuery('.goto-section').on('click',function (e) {
		e.preventDefault();
		var target = jQuery(this).data('id');
		jQuery('html, body').stop().animate({
			'scrollTop': jQuery("#"+target).offset().top - 74
		}, 1600, 'swing', function () {
		});
	});
});
// modal overlay
$(".modal-wrap").each( function(){
	$(this).wrap('<div class="overlay"></div>')
});

// modal open
$(".open-modal").on('click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation;
	var $this = $(this),
	modal = $($this).data("modal");
	$(modal).parents(".overlay").addClass("open");
	setTimeout( function(){
		$(modal).addClass("open");
	}, 350);
	$(document).on('click', function(e){
		var target = $(e.target);
		if ($(target).hasClass("overlay")){
			$(target).find(".modal-wrap").each( function(){
				$(this).removeClass("open");
			});
			setTimeout( function(){
				$(target).removeClass("open");
			}, 350);
		}
	});

	// modal copy code
	$('.popup-wrap .content').html('');
	$(this).clone().appendTo( ".popup-wrap .content");
	$(".icon-code-div .copy-click").click(function (event) {
		event.preventDefault();
		var $html = $(this).parents('.box').find('.icon i').first();
		var str = $html.prop('outerHTML');
		CopyToClipboard(str, true, "Copied");
	});
	$(".icon-unicode .copy-click").click(function (event) {
		event.preventDefault();
		var $html = $(this).parents('.box').find('.unicode').first();
		var str = $html.prop('innerHTML');
		CopyToClipboard(str, true, "Copied");
	});
	$(".icon-cheatcode .copy-click").click(function (event) {
		event.preventDefault();
		var $html = $(this).parents('.box').find('.cheatcode').first();
		var str = $html.prop('innerHTML');
		CopyToClipboard(str, true, "Copied");
	});
	var clipboard = new ClipboardJS('.code-copy');
	clipboard.on('success', function(e) {
		CopyToClipboard('',true, "Copied");
		e.clearSelection();
	});
});

// modal close
$(".close-modal").on('click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation;

	var $this = $(this),
	modal = $($this).data("modal");

	$(modal).removeClass("open");
	setTimeout( function(){
		$(modal).parents(".overlay").removeClass("open");
	}, 350);
});

// append icon code
jQuery(window).on("load", function () {
	$( ".icon i" ).each(function(index, el) {
		jQuery(this).clone().appendTo(jQuery(this).parents('.box').find('.icon-code-div pre code'));
	});
});

// code split
var entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': '&quot;',
	"'": '&#39;',
	"/": '&#x2F;'
};
function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
}
//document.addEventListener("DOMContentLoaded", init, false);
window.onload = function init()
{
	var codeblock = document.querySelectorAll("pre code");
	if(codeblock.length)
	{
		for(var i=0, len=codeblock.length; i<len; i++)
		{
			var dom = codeblock[i];
			var html = dom.innerHTML;
			html = escapeHtml(html);
			dom.innerHTML = html;
		}
	}
}

// CopyToClipboard notification
function CopyToClipboard(value, showNotification, notificationText) {
	var $temp = $("<input>");
	if(value != ''){
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(value).select();
		document.execCommand("copy");
		$temp.remove();
	}
	if (typeof showNotification === 'undefined') {
		showNotification = true;
	}
	if (typeof notificationText === 'undefined') {
		notificationText = "Copied to clipboard";
	}
	var notificationTag = $("div.copy-notification");
	if (showNotification && notificationTag.length == 0) {
		notificationTag = $("<div/>", { "class": "copy-notification", text: notificationText });
		$("body").append(notificationTag);

		notificationTag.fadeIn("slow", function () {
			setTimeout(function () {
				notificationTag.fadeOut("slow", function () {
					notificationTag.remove();
				});
			}, 1000);
		});
	}
}

function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("box")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}