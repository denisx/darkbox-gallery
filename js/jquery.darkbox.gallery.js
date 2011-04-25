( function ( $ ) {

	$.fn.darkboxgallery = function () {

	var canvas = $( '.darkbox .darkbox-canvas' );
	$( '<div/>',{
		text: ' '
		, 'class': 'l hidden'
	}).appendTo( canvas );

	$( '<div/>',{
		text: ' '
		, 'class': 'r hidden'
	}).appendTo( canvas );

		$( '<p/>',{
			text: '&nbsp;'
			, 'class': 'misc hidden'
		}).appendTo( canvas );


	var l =  $( '.darkbox .darkbox-canvas .l' );
	var r =  $( '.darkbox .darkbox-canvas .r' );
	var root = $( '.darkbox' );

	var can_work = true;
	var that = null;

	function start( e ){
		e.preventDefault();

		that = $( this );
		can_work = true;
		l.removeClass( 'end' );
		r.removeClass( 'end' );
		$( 'iframe' ).addClass( 'hidden' );
		iframe_turn_on();
		set_lr();
	}

	var img_l = null;
	var img_r = null;
	function error_img( side ){
		if ( side === 'l' ){
			l.addClass( 'hidden' );
		}else{
			r.addClass( 'hidden' );
		}
	}
	function load_img( side ){
		if ( side === 'l' ){
			l.removeClass( 'hidden' );
		}else{
			r.removeClass( 'hidden' );
		}
	}

	function set_lr(){
		if ( root.hasClass( 'darkbox-done' ) && can_work ){
			can_work = false;
			var w = $( '.darkbox-canvas img', root ).width();
			l.css({
				marginLeft: -(w/2 +40) + 'px'
			});
			r.css({
				marginLeft: (w/2+5 ) + 'px'
			});
			fu_l( false );
			fu_r( false );
			if ( that.next().length ){
				img_r = new Image();
				img_r.onload = function(){
					load_img('r');
				};
				img_r.src = that.next().children( 'img' ).attr( 'src' );
			}
			if ( that.prev().length )
			{
				img_l = new Image();
				img_r.onload = function(){
					load_img('l');
				};
				img_l.src = that.prev().children( 'img' ).attr( 'src' );
			}
			var misc = that.children( 'img' ).attr( 'title' );
			if ( misc !== '&nbsp;' && misc !== '' ){
				$( '.darkbox .misc' )
					.html( misc )
					.removeClass( 'hidden' );
			}else{
				$( '.darkbox .misc' )
					.html( '' )
					.addClass( 'hidden' );
			}
		}else{
			if ( $( '.darkbox' ).hasClass( 'darkbox-on' ) && can_work ){
				l.addClass( 'hidden' );
				r.addClass( 'hidden' );
				setTimeout( set_lr, 50 );
			}
		}
	}

		$( '.l' ).bind( 'click keypress', function(){
			fu_l( true );
		});
		$( '.r' ).bind( 'click keypress', function(){
			fu_r( true );
		});

		function iframe_turn_on(){
			if ( !root.hasClass( 'darkbox-on' )) {
				$( 'iframe' ).removeClass( 'hidden' );
			}
			setTimeout( iframe_turn_on, 500 );
		}


		function fu_l( action ){
			if ( that.prev().children( 'img' ).length ){
					if ( action ) {
						root
							.removeAttr( 'class' )
							.addClass( 'darkbox' );
						that = that.prev();
						that.click();
				}
			}else{
				l.addClass( 'end' );
			}
		}
		function fu_r( action ){
			if ( that.next().children( 'img' ).length ){
					if ( action ) {
						root
							.removeAttr( 'class' )
							.addClass( 'darkbox' );
						that = that.next();
						that.click();
				}
			}else{
				r.addClass( 'end' );
			}
		}
		this.click( start );
		return this; // Support chaining
	};
} ( jQuery ) );



