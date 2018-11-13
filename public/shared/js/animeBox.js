// ============================================================
// ＠＠
// アニメーションボックス
// 
// %update / 2013.02.13
// 
// %use / jquery
// %use / jquery cookie
// ============================================================

// 名前の衝突をふせぐために名前空間を用意する
var ANIBOX;
if( ( ANIBOX && ( (typeof ANIBOX !== 'object') || !('isNamespace' in ANIBOX) ) ) || (ANIBOX === false) || (ANIBOX === 0) ) {
	throw new Error('"ANIBOX" already exists! You cannot define "ANIBOX".');
} else if( ANIBOX && ('isNamespace' in ANIBOX) ) {
	throw new Error('Namespace "ANIBOX" already exists!');
}
ANIBOX = {};  // 名前空間用のオブジェ生成
ANIBOX.toString = function() { return '[object ANIBOX(is Namespace)]'; };
ANIBOX.isNamespace = true;

// ------------------
// 【定数・変数】
// ------------------

// タイルアニメーション
ANIBOX.animeBox = {
	numSpeed : 2.5, //アニメーション速度（秒）
	slcAniArea : '#PgBoxAnimation', //アニメーションエリアのCSSセレクタ
	slcAniBox : '#PgBoxAnimation .pgBoxItem', //アニメボックスのCSSセレクタ
	slcHasItemBox : '#PgBoxAnimation .pgBoxItem .pgMoveBox', //ボックス内に要素があるボックスのCSSセレクタ
	clsAniBoxInr : 'pgBoxItemInr', //アニメボックスのCSSセレクタ
	clsColor : 'pgBoxColorSet', //
	blnMoving : false, //
	blnSlideMoving : false, //
	timerID01 : null //,タイマーID
}

// ------------------
// 【関数】
// ------------------
// なし

// ------------------------------------------------------------
// ▼処理
// ------------------------------------------------------------
$(document).ready(function() {
	
	// ==============================
	// ■ タイルアニメーション
	( function() {
		
		// ------------------
		// 【定数・変数】
		// ------------------
		
		var numSpeed = ANIBOX.animeBox.numSpeed * 1000; //アニメーション速度ミリ秒に変換
		var numAreaW = $(ANIBOX.animeBox.slcAniArea).width(); //アニメエリアの幅
		var numAreaH = $(ANIBOX.animeBox.slcAniArea).height(); //アニメエリアの高さ
		var numBoxW = $(ANIBOX.animeBox.slcAniBox).width(); //ボックスの幅
		var numRandom = '';
		var aryBoxPosTop = []; //ボックスの初期位置配列（縦位置用）
		var aryBoxPosLeft = []; //ボックスの初期位置配列（横位置用）
		
		
		// ------------------
		// 【関数】
		// ------------------
		
		// ■初期設定
		// %param / なし
		// ------
		// %return / なし
		var fncInitBoxPos = function() {
			//BOXの初期位置を配列に取得
			$(ANIBOX.animeBox.slcAniBox).each(function() {
                aryBoxPosTop.push($(this).css('top'));
				aryBoxPosLeft.push($(this).css('left'));
			});
			//アニメーション用の画像を追加
			$(ANIBOX.animeBox.slcHasItemBox).each(function() {
                $(this).append('<p class="pgAnimePaper"><img src="/img/index_pic_paper_01.png" width="0" height="0" /></p>');
            });
		}
		
		// ■ボックスカラー変更
		// %param / target:string ターゲット指定
		// %param / num:string 変更カラー指定
		// ------
		// %return / なし
		var fncChangeColor = function(target, num) {
			var strThisColor = $(target).find('.' + ANIBOX.animeBox.clsAniBoxInr);
			var targetClass = strThisColor.attr('class').match( new RegExp(ANIBOX.animeBox.clsColor + '[0-9][0-9]'));
			strThisColor.removeClass(targetClass[0]).addClass(ANIBOX.animeBox.clsColor + num);
		}
		
		// ■垂直方向移動アニメ
		// %param / なし
		// ------
		// %return / なし
		var fncVerticalBox = function() {
			//ボックス位置を移動
			$(ANIBOX.animeBox.slcAniBox).each(function(i) {
				var numRadom = Math.round( Math.random() * 3000 );
				var numPosTop =  numRadom + numAreaH;
				$(this).css('top', '-' + numPosTop + 'px');
				fncChangeColor(this, '01');
            });
			//アニメーション実行
			var numMaxLength = $(aryBoxPosTop).length;
			for(i = 0; i < numMaxLength; i++ ) {
				if(i !== (numMaxLength - 1)){
					$(ANIBOX.animeBox.slcAniBox).eq(i).animate({
						top: aryBoxPosTop[i]
					}, numSpeed);
				}else{
					$(ANIBOX.animeBox.slcAniBox).eq(i).animate({
						top: aryBoxPosTop[i]
					},{
						duration: numSpeed,
						easing: 'swing',
						complete: function(){
							fncFadeImg();
						}
					});
				}
			}
		} //fncVerticalBox()
		
		// ■フェードインアニメ
		// %param / なし
		// ------
		// %return / なし
		var fncFadeImg = function() {
			$(ANIBOX.animeBox.slcAniArea).append('<div id="FadeItem01" class="fadeBox"><img src="/img/index_pic_main_01.png" /></div>');
			MAIN.fncAddAIL('#FadeItem01 img');
			$(ANIBOX.animeBox.slcAniArea + ' #FadeItem01').css({
				position: 'absolute',
				left: '0',
				top: '0'
			}).hide().fadeIn(500, function(){
				$(ANIBOX.animeBox.slcAniArea).append('<div id="FadeItem02" class="fadeBox"><img src="/img/index_pic_main_02.png" /></div>');
				//MAIN.fncAddAIL('#FadeItem02 img');
				$(ANIBOX.animeBox.slcAniArea + ' #FadeItem02').css({
				position: 'absolute',
				left: '0',
				top: '0'
			}).hide().fadeIn(1500, function(){
					$(ANIBOX.animeBox.slcAniArea + ' .fadeBox').fadeOut(2000, function(){
						fncTurnBox();
					});
				});
			});
		}
		
		// ■ボックスがクルクルめくれるアニメ
		// %param / なし
		// ------
		// %return / なし
		var fncTurnBox = function() {
			var numMaxLength = $(ANIBOX.animeBox.slcAniBox).length;
			var i = 0;
			var setTimeMove = function(i) {
				var numPow = 2.3;
				var numAdjust = 0.01;
				var numNextTime = (Math.pow(numMaxLength, numPow) - Math.pow(i, numPow)) * numAdjust;
				if (ANIBOX.animeBox.timerID01 !== null) { clearTimeout(ANIBOX.animeBox.timerID01); }
				ANIBOX.animeBox.timerID01 = setTimeout(function() {
					$(ANIBOX.animeBox.slcAniBox).eq(i).animate({
						width: 0,
						left: '+=' + (numBoxW * 0.5)
					},{
						duration: 300,
						easing: 'swing',
						complete: function(){
							var index = $(this).index();
							fncChangeColor(this, '02');
							$(this).animate({
								width: numBoxW,
								left: aryBoxPosLeft[index]
							},{
								duration: 300,
								easing: 'swing',
								complete: function(){
									if($(this).find('a').hasClass(MAIN.clsHide)){
										var targetImg =  $(this).find('img');
										MAIN.fncAddAIL(targetImg);
										$(this).find('a').removeClass(MAIN.clsHide).hide().fadeIn(200);
									}
									$(this).find('.boxHideImg').removeClass(MAIN.clsHide).hide().fadeIn(200);
									$(this).find('.noMoveImg').removeClass(MAIN.clsHide).hide().fadeIn(200);
									if(i == numMaxLength){
										$(ANIBOX.animeBox.slcAniArea).append('<div id="FadeItemFinish" class="fadeBox"><img src="/img/index_pic_main_finish.png" /></div>');
										MAIN.fncAddAIL('#FadeItemFinish img');
										$(ANIBOX.animeBox.slcAniArea + ' #FadeItemFinish').css({
											position: 'absolute',
											left: '0',
											top: '0'
										}).hide().fadeIn(1000, function(){
											$('#PgCUDBtn01').removeClass(MAIN.clsHide);
											fncAutoAniBox();
											fncPosRightBox();
										});
									}
								}
							});
						}
					});
					i = i + 1;
					if(i < numMaxLength) { setTimeMove(i); }
				},numNextTime);
			}
			setTimeMove(i);
		} //fncTurnBox()
		
		// ■ショートカットフェードアニメーション
		// %param / なし
		// ------
		// %return / なし
		var fncFadeBox = function() {
			$(ANIBOX.animeBox.slcAniBox).each(function() {
				fncChangeColor(this, '02');
				if($(this).find('a').hasClass(MAIN.clsHide)){
					var targetImg =  $(this).find('img');
					MAIN.fncAddAIL(targetImg);
					$(this).find('a').removeClass(MAIN.clsHide);
				}
				$(this).find('.boxHideImg').removeClass(MAIN.clsHide);
				$(this).find('.noMoveImg').removeClass(MAIN.clsHide);
			});
			$(ANIBOX.animeBox.slcAniArea).append('<div id="FadeItemFinish" class="fadeBox"><img src="/img/index_pic_main_finish.png" /></div>');
			MAIN.fncAddAIL('#FadeItemFinish img');
			$(ANIBOX.animeBox.slcAniArea + ' #FadeItemFinish').css({
				position: 'absolute',
				left: '0',
				top: '0'
			});
			$(ANIBOX.animeBox.slcAniArea).hide().fadeIn(2000, function(){
				$('#PgCUDBtn01').removeClass(MAIN.clsHide);
				fncAutoAniBox();
				fncPosRightBox();
			});
		} //fncFadeBox()
		
		// ■ボックススライドアニメーションのためにpositionを変更する
		// %param / なし
		// ------
		// %return / なし
		var fncPosRightBox = function() {
			$('.moveToBtm').closest('.pgBoxItem').each(function() {
                $(this).wrapAll('<div class="posLeftWrap"></div>');
				$(this).parent('.posLeftWrap').css({
					'position': 'absolute',
					'left': $(this).css('left'),
					'top': $(this).css('top'),
					'width': '99px',
					'height': '99px'
				});
				$(this).css({'left': 'auto', 'right': '0px', 'top': '0px'});
            });
			
			$('.moveToNomove').closest('.pgBoxItem').each(function() {
                $(this).wrapAll('<div class="posLeftWrap"></div>');
				$(this).parent('.posLeftWrap').css({
					'position': 'absolute',
					'left': $(this).css('left') ,
					'top': parseInt($(this).css('top')) - 99,
					'width': '198px',
					'height': '198px'
				});
				$(this).css({'left': '0px', 'top': 'auto', 'bottom': '0px'});
				$(this).find('.pgMoveBox').css({
					'position': 'absolute',
					'bottom': '0px',
					'left': '0',
					'width': '99px',
					'height': '99px'
				});
				$(this).find('.noMoveImg').css({
					'position': 'absolute',
					'display': 'block',
					'bottom': '0px',
					'left': '0',
					'width': '99px',
					'height': '99px'
				});
			});
		}
		
		// ■自動アニメーション
		// %param / なし
		// ------
		// %return / なし
		var fncAutoAniBox = function() {
			//alert('自動アニメーション開始');
			var setTimeMove = function() {
				if (ANIBOX.animeBox.timerID01 !== null) { clearTimeout(ANIBOX.animeBox.timerID01); }
				ANIBOX.animeBox.timerID01 = setTimeout(function() {
					ANIBOX.animeBox.blnMoving = true;
					numRandom = Math.round( Math.random() * ($(ANIBOX.animeBox.slcHasItemBox).length - 1) );
					$(ANIBOX.animeBox.slcHasItemBox + ' .pgAnimePaper img').eq(numRandom).animate({
						width: '50',
						height: '50'
					},{
						duration: 700,
						easing: 'swing',
						complete: function() {
							$(ANIBOX.animeBox.slcHasItemBox + ' .pgAnimePaper img').eq(numRandom).animate({
								width: '0',
								height: '0'
							},{
								duration: 700,
								easing: 'swing',
								complete: function() {
									ANIBOX.animeBox.blnMoving = false;
								}
							});
						}
					});
					setTimeMove();
				}, 3000);
			}
			setTimeMove();
		}
		
		// ■ボックススライドアニメーション
		// %param / なし
		// ------
		// %return / なし
		var fncSlideAnimeBox = function(strTarget, clsMoveTo, status, moveEnd) {
			if (ANIBOX.animeBox.timerID01 !== null) { clearTimeout(ANIBOX.animeBox.timerID01); }
			
			//アニメーション
			var fncStartAnime = function() {
				var strTo = '+';
				if(status == 'slideOpen') {
					$('#' + strTarget).css('z-index', '9000').addClass('slideOpen');
				}else {
					strTo = '-';
					$('#' + strTarget + ' .pgMoveBoxCaption').addClass(MAIN.clsHide);
				}
				//左下へスライドアニメーション
				if (clsMoveTo == 'Btm') {
					$('#' + strTarget).animate({
						'width': strTo + '=99',
						'height': strTo + '=99'
					}, 350);
					$('#' + strTarget + ' .pgMoveBox').animate({
						'width': strTo + '=99',
						'padding-top': strTo + '=99'
					},{
						duration: 350,
						easing: 'swing',
						complete: function() {
							if(status == 'slideOpen') {
								$('#' + strTarget + ' .pgMoveBoxCaption').removeClass(MAIN.clsHide).css({
									'position': 'absolute',
									'top': '0'
								}).hide().fadeIn(200, function() { if (moveEnd == 'moveEnd'){ ANIBOX.animeBox.blnSlideMoving = false } });
							}else {
								$('#' + strTarget).css('z-index', 'auto').removeClass('slideOpen');
								if (moveEnd == 'moveEnd'){ 
									ANIBOX.animeBox.blnSlideMoving = false;
									fncAutoAniBox();
								}
							}
						}
					});
				//右上へスライドアニメーション
				}else if(clsMoveTo == 'Top') {
					$('#' + strTarget).animate({
						'width': strTo + '=99',
						'height': strTo + '=99',
						'top': strTo + '=-99'
					}, 350);
					$('#' + strTarget + ' .pgMoveBox').animate({
						'height': strTo + '=99',
						'padding-left': strTo + '=99'
					},{
						duration: 350,
						easing: 'swing',
						complete: function() {
							if(status == 'slideOpen') {
								$('#' + strTarget + ' .pgMoveBoxCaption').removeClass(MAIN.clsHide).css({
									'position': 'absolute',
									'top': '99px',
									'left': '0'
								}).hide().fadeIn(200, function() { if (moveEnd == 'moveEnd'){ ANIBOX.animeBox.blnSlideMoving = false } });
							}else {
								$('#' + strTarget).css('z-index', 'auto').removeClass('slideOpen');
								if (moveEnd == 'moveEnd'){
									ANIBOX.animeBox.blnSlideMoving = false
									fncAutoAniBox();
								}
							}
						}
					});
				//要素が動かずスライドアニメーション
				}else if(clsMoveTo == 'Nomove') {
					$('#' + strTarget).animate({
						'width': strTo + '=99',
						'height': strTo + '=99'
					}, 350);
					$('#' + strTarget + ' .pgMoveBox').animate({
						'width': strTo + '=99',
						'height': strTo + '=99'
					},{
						duration: 350,
						easing: 'swing',
						complete: function() {
							if(status == 'slideOpen') {
								$('#' + strTarget + ' .pgMoveBoxCaption').removeClass(MAIN.clsHide).css({
									'position': 'absolute',
									'top': '0',
									'left': '0'
								}).hide().fadeIn(200, function() { if (moveEnd == 'moveEnd'){ ANIBOX.animeBox.blnSlideMoving = false } });
							}else {
								$('#' + strTarget).css('z-index', 'auto').removeClass('slideOpen');
								if (moveEnd == 'moveEnd'){
									ANIBOX.animeBox.blnSlideMoving = false
									fncAutoAniBox();
								}
							}
						}
					});
				} 
				
			} //fncOpenAnime()
			
			//オートアニメの動作判定(オートアニメ完了後にスライドアニメ実行)
			if (ANIBOX.animeBox.blnMoving == true) {
				ANIBOX.animeBox.blnMoving = false
				$(ANIBOX.animeBox.slcHasItemBox + ' .pgAnimePaper img').eq(numRandom).queue([]).stop().animate({
					width: '0',
					height: '0'
				},{
					duration: 350,
					easing: 'swing',
					complete: function() {
						fncStartAnime();
					}
				})
			}else {
				fncStartAnime();
			}
		}
		
		
		// ------------------
		// 【実行処理】
		// ------------------
		
		//初期化
		fncInitBoxPos();
		MAIN.fncAddAIL
		
		//ブラウザ起動後はじめてかどうかを判定して処理分岐
//		if($.cookie('shortCut') == 'On') {
//			fncFadeBox();
//		}else {
			//クッキーに格納
//			$.cookie('shortCut', 'On', { path: '/', expires: '' });
fncTurnBox();//			fncVerticalBox();
//		}

		//ボックスクリック時処理実行
		$(ANIBOX.animeBox.slcHasItemBox).click(function() {
			//動作判定
			if(ANIBOX.animeBox.blnSlideMoving == false) {
				ANIBOX.animeBox.blnSlideMoving = true;
				
				//クリックされたボックスをスライドアニメーション
				if($(this).closest('.pgBoxItem').hasClass('slideOpen') == false) {
					//オープン状態のボックスを閉じる
					$('.slideOpen').each(function() {
						var clsMoveCloseTo = $(this).find('.pgMoveBox').attr('class').match(new RegExp('moveTo([^ ]+)'));
						fncSlideAnimeBox($(this).attr('id'), clsMoveCloseTo[1], 'slideClose');
					});
					//ターゲットをスライドオープン
					var clsMoveTo = $(this).attr('class').match(new RegExp('moveTo([^ ]+)'));
					var strTarget = $(this).closest('.pgBoxItem').attr('id');
					fncSlideAnimeBox(strTarget, clsMoveTo[1], 'slideOpen', 'moveEnd');
				
				}else {
					//ターゲットをスライドクローズ
					var clsMoveTo = $(this).attr('class').match(new RegExp('moveTo([^ ]+)'));
					var strTarget = $(this).closest('.pgBoxItem').attr('id');
					fncSlideAnimeBox(strTarget, clsMoveTo[1], 'slideClose', 'moveEnd');
					
				}
			}
		});
	
	} )();
	// /==============================

}); // ready()

$(window).unload( function(e) {
	
	// タイマークリア
	if(ANIBOX.animeBox.timerID01 !== null) { clearTimeout(ANIBOX.animeBox.timerID01); }
	
} ); // unload()