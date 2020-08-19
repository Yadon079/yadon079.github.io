$(window).load(function() {
	$('#loading').hide();

	// 목차 태그가 있다면 제목을 찾는다.
	if ( $('.post-wrap').find('.list-of-tables') ) {
		var subject = $('.post-wrap').find('h2');
		var sub_subject = $('.post-wrap').find('h3');

		// ol tag 추가
		$('.list-of-tables').append('<ol>');
		// li tag 추가
		// 제목 추가
		for ( var i = 0; i<subject.length; i++ ) {
			$('.list-of-tables ol').append(
				'<li><a href="#' + subject[i].id + '" class="lot l-link">' + subject[i].textContent + '</a></li>'
			);

			// 부제목 추가
			for ( var j = 0; j<sub_subject.length; j++ ) {
				if ( subject[i].id.substring(0, 1) === sub_subject[j].id.substring(0, 1) ) {
						$('.list-of-tables ol').append(
							'<li><a href="#' + sub_subject[j].id + '" class="lot t-link">' + sub_subject[j].textContent + '</a></li>'
						);
				}
			}

		}
	}

	// // a 태그 target
	// $('a').click(function() {
	// 	var test = false;

	// 	if ( $(this).hasClass('s-link') === false || $(this).hasClass('lot') === false ) {
	// 		test = true;
	// 	}
	// 	if ( $(this).hasClass('posts-item') === false || $(this).hasClass('page-item') === false || $(this).hasClass('post-link') === false ) {
	// 		test = true;
	// 	}
	// 	if ( $(this).attr('href').substring(0, 1) !== "#" ) {
	// 		test = true;
	// 	}

	// 	if ( test === false ) {
	// 		$(this).attr('target', '_blank');
	// 	}
	// });
});

$(function() {

	// head category dropdown
	$('.dropdown').click(function() {
		console.log('a');
		if ( $(this).hasClass('active') === false ) {
			$(this).addClass('active');
			$('.dropdown ul').show();
		} else {
			$(this).removeClass('active');
			$('.dropdown ul').hide();
		}
	});

	// post img popup layer
	$('.post-wrap img').click(function(){
		var $href = $(this).attr('href');
		layer_popup($href);
	});

	// search
	$('.fa-search').click(function(){
		if ( !$(this).hasClass('active') ) { // false
			$(this).addClass('active');
			$(this).prev().css('display', 'inline-block');
		} else { // true
			$(this).removeClass('active');
			$(this).prev().hide();
		}
	});
});

function layer_popup(el){
	var $el = $(el);        //레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// 화면의 중앙에 레이어를 띄운다.
	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight /2,
			marginLeft: -$elWidth/2
		});
	} else {
		$el.css({top: 0, left: 0});
	}

	$el.find('a.btn-layerClose').click(function(){
		isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg').click(function(){
		$('.dim-layer').fadeOut();
		return false;
	});
}
