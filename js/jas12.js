function CurrentTime () {
    var currentTime = new Date ( );
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );

    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
    currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;

    $('#cur_time').html(currentTimeString);
}
var start_id=1;
var pathArray = location.href.split( '/' );
var protocol = pathArray[0];
var host = pathArray[2];
var home_url = protocol + '//' + host;
$.xhrPool = [];
$.xhrPool.abortAll = function() { // our abort function
    $(this).each(function(idx, jqXHR) {
        jqXHR.abort();
    });
    $.xhrPool.length = 0
};

$(function() {
    $(".fancybox").fancybox();
    $('select').styler();
	$('.form_time').datetimepicker(
        {
            lang:'ru',
            format:'d.m.Y H:i',
            dayOfWeekStart:1,
			todayButton:false,
			allowBlank:true,
			defaultSelect:false,
            closeOnDateSelect:true,
            minDate:0
        }
    );	
	$('.form_date,.form_date_transfer').datetimepicker(
        {
			timepicker:false,
            lang:'ru',
            format:'d.m.Y',
            dayOfWeekStart:1,
			todayButton:false,
			allowBlank:true,
			defaultSelect:false,
            closeOnDateSelect:true,
            minDate:0
        }
    );	
	$('.form_datetime,.form_datetime_transfer').datetimepicker(
        {
			datepicker:false,
            lang:'ru',
            format:'H:i',
			step:5,
            dayOfWeekStart:1,
			todayButton:false,
			allowBlank:true,
			defaultSelect:false,
            closeOnDateSelect:true,
            minDate:0
        }
    );
	
	$(function(){
		$(".form_phone,.contact_phone").mask("+7(999)999-9999");
	});

    $(".water").hover(function() {
        $(".water .popup").show()
    }, function() {
        $(".water .popup").hide()
    });
	
	
	$(".form_transfer").click(function() {
		if ($(this).is(':checked')){
			$(".time_transfer").show("slow");
			$('.home_main .inner').transition({height: '+=45px'});
		}
		else{
			$(".time_transfer").hide("slow");
			$('.home_main .inner').transition({height: '-=45px'});
		}
		
    });
	
    $(".sun").hover(function() {
        $(".sun .popup").show()
    }, function() {
        $(".sun .popup").hide()
    });
    setInterval(function() { CurrentTime (); }, 1000);
    if (typeof taxi_slogan !== 'undefined') {
        var start_id=1;
        Slogan ();
        setInterval(function() { Slogan (); }, 3000);

    }
    $(".fields input, .fields select").change(function() {
        var val='';
        $( ".fields input, .fields select" ).each(function( index ) {
            if ($(this).val()!='') {
                val=$(this).val();
            }
        });
        if (val!='') {
            if ($('.form_dop_info_comment').height()==0) {
                $('.home_main .inner').transition({height: '+=120px'});
            }
            $('.form_dop_info_comment').transition({marginTop:'20px', height: '100px' });

        }
        else {
            $('.form_dop_info_comment').transition({marginTop:'0px', height: '0px' });
           if ($('.form_dop_info_comment').height()>0) {
                $('.home_main .inner').transition({height: '-=120px'});
            }
        }
    });
	 $(".fields input").keyup(function() {
        var val='';
        $( ".fields input, .fields select" ).each(function( index ) {
            if ($(this).val()!='') {
                val=$(this).val();
            }
        });
        if (val!='') {
            if ($('.form_dop_info_comment').height()==0) {
                $('.home_main .inner').transition({height: '+=120px'});
            }
            $('.form_dop_info_comment').transition({marginTop:'20px', height: '100px' });

        }
        else {
            $('.form_dop_info_comment').transition({marginTop:'0px', height: '0px' });
           if ($('.form_dop_info_comment').height()>0) {
                $('.home_main .inner').transition({height: '-=120px'});
            }
        }
    });
    $(".type_select>div").click(function() {
       /* var val=$(this).attr('data-value');
        if (val=='plane') {
            if ($('.fields  .form_dop_info').height()==0) {
                $('.home_main .inner').transition({height: '+=65px'});
            }
            $('.fields  .form_dop_info').transition({marginTop:'20px', height: '45px' });
            $('.fields  .form_dop_info2').transition({marginTop:'20px', height: '45px' });
        }
        else {
            if ($('.fields  .form_dop_info').height()>0) {
                $('.home_main .inner').transition({height: '-=65px'});
            }
            $('.fields  .form_dop_info').transition({marginTop:'0px', height: '0px' });
            $('.fields  .form_dop_info2').transition({marginTop:'0px', height: '0px' });
    }*/
    });
    $(".type_select>div").click(function() {
        $(".type_select."+$(this).attr('data-target')+'_div >div').removeClass('active');
        $(this).addClass('active');
        var val=$(this).attr('data-value');
		var target=$(this).attr('data-target');
		
        if (val!='addr') {
            if (val=='plane') {
                $('.'+target).val('РђСЌСЂРѕРїРѕСЂС‚ РЎРёРјС„РµСЂРѕРїРѕР»СЏ');
            }
            if (val=='train') {
                $('.'+target).val('Р–/Рґ РІРѕРєР·Р°Р» РЎРёРјС„РµСЂРѕРїРѕР»СЏ');
            }
			
        }
        else {
          $('.'+target).val('empty');
        }
		$('.'+$(this).attr('data-target')).trigger('refresh');
		 CheckPrice($('.form_from').not('div').val(),$('.form_to').not('div').val(),$('.form_class').not('div').val());
		
    });

 $( document ).on( "change", ".form_from", function() {
	 $('.type_select.'+$(this).attr('data-target')+'_div >div').removeClass('active');
        $('.form_from_div .addr').addClass('active');
        CheckPrice($('.form_from').not('div').val(),$('.form_to').not('div').val(),$('.form_class').not('div').val());
    });
$( document ).on( "change", ".form_to", function() {
	$('.type_select'+$(this).attr('data-target')+'_div >div').removeClass('active');
        $('.form_to_div .addr').addClass('active');
        CheckPrice($('.form_from').not('div').val(),$('.form_to').not('div').val(),$('.form_class').not('div').val());
    });
	$( document ).on( "change", ".form_class", function() {
        CheckPrice($('.form_from').not('div').val(),$('.form_to').not('div').val(),$('.form_class').not('div').val());
    });
	
	
	$(document).on('click','#confirm_callback', function(){
		var code=$('.confirm_callback').val();
		if(/[0-9]{4}/.test(code)){
			 $.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "if_confirm", ajax: 1, 'form_phone':$('input.contact_phone').val(),'code':code
                }
            })
            .done(function( html ) {
				if (html=='No'){
					ShowError('Р’С‹ РІРІРµР»Рё РЅРµ РІРµСЂРЅС‹Р№ РєРѕРґ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ!');
				}
				else if(html=='5'){
					ShowError('Р’С‹ РІРІРµР»Рё РєРѕРґ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ Р±РѕР»СЊС€РѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЂР°Р·! РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°РЅРѕРІРѕ!');
					$(".order_call").hide();
					$(".contact_button").show();
				}
				else{	
					callback();
					$('#contact_button').show();
					$(".order_call").hide();
				}
				
                
            });
		}
		else{
			ShowError('Р’РІРµРґРёС‚Рµ РІСЃРµ С†РёС„СЂС‹!');
		}
	});
	
	$("#contact_button").click(function() {
		var error='';
        if ($('.contact_name').val()=='') {
            error='Р’РІРµРґРёС‚Рµ СЃРІРѕРµ РёРјСЏ';
        }
        else if ($('.contact_phone').val()=='') {
            error='Р’РІРµРґРёС‚Рµ СЃРІРѕР№ С‚РµР»РµС„РѕРЅ';
        }

        if (error!='') {
            ShowError(error);
        }
        else {
			$.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "confirmation_callback", ajax: 1, 'form_phone':$('.contact_phone').val(),
                }
            })
                .done(function( html ) {
                    ShowError(html);
					$('.confirm_callback').focus();
					$("#contact_button").hide();
					$(".order_call").show();
					$('.call_div').html('');
					$('.button_ok').attr('id','confirm_callback');
					$('.call_div').prepend(' <label>РњС‹ РІС‹СЃР»Р°Р»Рё РІР°Рј СЃРјСЃ, РІ С‚РµС‡РµРЅРёРµ 2 РјРёРЅСѓС‚ РІРІРµРґРёС‚Рµ РєРѕРґ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ</label><input class="confirm_callback" val="" />');
					$(".confirm_callback").mask("9999");
                });  
        }
		
	});
	
	function callback() {
            $.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "contact", ajax: 1,
                    'form_name':$('.contact_name').val(),  'form_phone':$('.contact_phone').val()
                }
            })
                .done(function( html ) {
                    ShowMessage(html);
                    $(".contact_name").val('');
                    $(".contact_phone").val('');
                    $.fancybox.close( );
                });
    }
    $(".slaider .go").click(function() {
        var sliders_a = jQuery.parseJSON(sliders);
        var newIndex=slider.getCurrentSlide();
        $('input.form_from').val(sliders_a[newIndex].start_point);
        $('input.form_to').val(sliders_a[newIndex].end_point);
        if (sliders_a[newIndex].start_point=='РђСЌСЂРѕРїРѕСЂС‚') {
            $('.form_dop_info').show();
            $('.form_dop_info2').show();
            $('input.form_from').attr('disabled',true);
            $(".type_select.form_from >div").removeClass('active');
            $(".type_select.form_from .plane").addClass('active');
        }
        else {
            $('.form_dop_info').hide();
            $('.form_dop_info2').hide();
            $('input.form_from').attr('disabled',false);
        }

        if (sliders_a[newIndex].start_point=='Р–/Р”') {
            $('input.form_from').attr('disabled',true);
            $(".type_select.form_from >div").removeClass('active');
            $(".type_select.form_from .train").addClass('active');
        }

        $('.form_dop_info_comment').show();
        $("html, body").animate({scrollTop: $('.slaider_calc').offset().top }, 1000);

    });
 $(".get_taxi").click(function() {
	 $("html, body").animate({scrollTop: 0 }, 1000);  

var go_0=0;     
var go_1=0;
	$('.form_from').not('div').find('option').each(function() {
        if($(this).val()==$('.get_taxi').attr('data-from')) {
            $('.form_from').val($(this).val());
			go_0=1;
			 return;
        }
    });
		if (go_0==0) {
			  $('.form_from').not('div').find('option').each(function() {
				if($(this).val().indexOf($('.get_taxi').attr('data-from'))>0) {
					$('.form_from').val($(this).val());
					 return;
				}
			});
		}
		$('.form_to').not('div').find('option').each(function() {
        if($(this).val()==$('.get_taxi').attr('data-to')) {
            $('.form_to').val($(this).val());
			go_1=1;
			 return;
        }
    });
		if (go_0==0) {
	$('.form_to').not('div').find('option').each(function() {
        if($(this).val().indexOf($('.get_taxi').attr('data-to'))>0) {
            $('.form_to').val($(this).val());
		 return;
        }
    });
		}
		$('.form_from').trigger('refresh');
		$('.form_to').trigger('refresh');
		
		CheckPrice($('.form_from').not('div').val(),$('.form_to').not('div').val(),$('.form_class').not('div').val());
   });
   
    $("#order_form_button").click(function() {
       var error='';

        if ($('select.form_from').val()=='empty') {
            error='РљСѓРґР° Р·Р° Р’Р°РјРё РїСЂРёРµС…Р°С‚СЊ?';
        }
        else if ($('select.form_to').val()=='empty') {
            error='РљСѓРґР° Р’С‹ РїРѕРµРґРёС‚Рµ?';
        }
       /* else if ($('input.form_name').val()=='') {
            error='Р’РІРµРґРёС‚Рµ СЃРІРѕРµ РёРјСЏ';
        }*/
        else if ($('input.form_phone').val()=='') {
            error='Р’РІРµРґРёС‚Рµ СЃРІРѕР№ С‚РµР»РµС„РѕРЅ';
        }
       /* else if ($('input.form_time').val()=='') {
            error='РљРѕРіРґР° Р·Р° Р’Р°РјРё Р·Р°РµС…Р°С‚СЊ?';
        }*/

        if (error!='') {
           ShowError(error);
        }
        else {
			$('#order_form_button_test').parent().hide();
            $.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "order", ajax: 1, 'form_from':$('select.form_from').val(), 'form_to':$('select.form_to').val(),
                'form_name':$('input.form_name').val(), 'form_class':$('.form_class option:selected').text(), 'form_phone':$('input.form_phone').val(),
                    'form_date':$('input.form_time').val(), 'form_flight_number':$('.form_air_number').val(),
                'form_flight_title':$('.form_air_title').val(), 'form_comment':$('.form_comment').val()

                }
            })
                .done(function( html ) {
                    ShowMessage(html);
                    $(".fields input").val('');
                    $(".fields input").attr('disabled',false);
                    $(".fields textarea").val('');
                    $(".type_select >div").removeClass('active');
                    $(".type_select >div:first-child").addClass('active');
                });
        }
    });

	//myne
	$(document).on('click','#confirm_code', function(){
		var code=$('.confirm_code').val();
		if(/[0-9]{4}/.test(code)){
			 $.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "if_confirm", ajax: 1, 'form_phone':$('input.form_phone').val(),'code':code
                }
            })
            .done(function( html ) {
				if (html=='No'){
					ShowError('Р’С‹ РІРІРµР»Рё РЅРµ РІРµСЂРЅС‹Р№ РєРѕРґ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ!');
				}
				else if(html=='5'){
					ShowError('Р’С‹ РІРІРµР»Рё РєРѕРґ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ Р±РѕР»СЊС€РѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЂР°Р·! РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°РЅРѕРІРѕ!');
					$(".order_pay").hide();
					$("#order_form_button_test").parent().show();
				}
				else{	
					sendSms('РќР°Р»РёС‡РЅС‹РјРё');
					$('.order_pay').html('<h3 class="confirmStatus">'+html+'</h3>');
					
					setTimeout(function() {
						$(".order_pay").hide();
						$('#order_form_button_test').parent().show();
					}, 5000);
					
				}
				
                
            });
		}
		else{
			ShowError('Р’РІРµРґРёС‚Рµ РІСЃРµ С†РёС„СЂС‹!');
		}
	});
	
	$("#order_form_button_test").click(function() {
		var error='';

        if ($('select.form_from').val()=='empty') {
            error='РљСѓРґР° Р·Р° Р’Р°РјРё РїСЂРёРµС…Р°С‚СЊ?';
        }
        else if ($('select.form_to').val()=='empty') {
            error='РљСѓРґР° Р’С‹ РїРѕРµРґРёС‚Рµ?';
        }

        else if ($('input.form_phone').val()=='') {
            error='Р’РІРµРґРёС‚Рµ СЃРІРѕР№ С‚РµР»РµС„РѕРЅ';
        }
		else if ($('select.form_pay').val()==''){
			error='Р’С‹Р±РµСЂРёС‚Рµ СЃРїРѕСЃРѕР± РѕРїР»Р°С‚С‹';
		}
		if ($('select#type_auto').val()==''){
			error='Р’С‹Р±РµСЂРёС‚Рµ РєР»Р°СЃСЃ Р°РІС‚Рѕ';
		}
        if (error!='') {
           ShowError(error);
        }
        else {
		   if ($('select.form_pay').val()=='Р±РµР·РЅР°Р»РёС‡РЅС‹Р№'){
				$.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "if_pay", ajax: 1, 'price':$('.price_yandex').attr('data-price'),'form_from':$('select.form_from').val(), 'form_to':$('select.form_to').val(),'type':$('select#type_auto').val(),'form_date':$('input.form_date').val(),'form_datetime':$('input.form_datetime').val(),'form_transfer':$('.form_transfer:checked').val(),'form_phone':$('input.form_phone').val()
                }
            })
                .done(function( html ) {
                    ShowMessage('РћРїР»Р°С‚РёС‚Рµ РїСЂСЏРјРѕ РЅР° СЃР°Р№С‚Рµ');
					$("#order_form_button_test").parent().hide();
					$('.pay_div').html('');
					$(".order_pay").show();
					$('.pay_div').prepend(html);
					sendSms('Р‘РµР·РЅР°Р»РёС‡РЅС‹Р№');
                });  	   
		   }
		   else{
			    ShowError('Р’РІРµРґРёС‚Рµ РєРѕРґ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ! РћРЅ РїСЂРёРґРµС‚ РЅР° СѓРєР°Р·Р°РЅРЅС‹Р№ Р’Р°РјРё РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°.');
				$(".order_pay").show();
				$('.pay_div').html('');
				$('.pay_div').prepend(' <label>РњС‹ РІС‹СЃР»Р°Р»Рё РІР°Рј СЃРјСЃ, РІ С‚РµС‡РµРЅРёРµ 2 РјРёРЅСѓС‚ РІРІРµРґРёС‚Рµ РєРѕРґ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ</label><input class="confirm_code" val="" />');
				$('.confirm_code').focus();
				$(".confirm_code").mask("9999");
				$("#order_form_button_test").parent().hide();
			    $.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "order_confirmation", ajax: 1, 'form_from':$('select.form_from').val(), 'form_to':$('select.form_to').val(),'form_phone':$('input.form_phone').val(),'form_date':$('input.form_date').val(),'form_datetime':$('input.form_datetime').val(),
                }
            })
                .done(function( html ) {
					 ShowError(html);
					$('.button_ok').attr('id','confirm_code');
					
                });  
		   }
        }
	
	});
	$(".cancel_pay").click(function() {
		$(".order_pay").hide();
		$(".pay_div").html('');
		$("#order_form_button_test").parent().show();
	});
	$(".cancel_call").click(function() {
		$(".order_call").hide();
		$("#contact_button").show();
	});
	
	function sendSms(pay){
			console.log($('#type_auto').val());
            $.ajax({
                method: "POST",
                url: home_url+"/index.php",
                data: { do: "order_test", ajax: 1, 'form_from':$('select.form_from').val(), 'form_to':$('select.form_to').val(),
                'form_name':$('input.form_name').val(), 'form_class':$('.form_class option:selected').text(), 'form_phone':$('input.form_phone').val(),
                'form_date':$('input.form_date').val(),'form_datetime':$('input.form_datetime').val(), 
				'form_flight_number':$('.form_air_number').val(),'form_class_val':$('#type_auto').val(),
                'form_flight_title':$('.form_air_title').val(), 'form_comment':$('.form_comment').val(),
				'form_transfer':$('.form_transfer:checked').val(),'form_date_transfer':$('.form_date_transfer').val(),
				'form_datetime_transfer':$('.form_datetime_transfer').val(),'form_flight':$('.form_flight').val(),'pay':pay,'price':$('.price_yandex').attr('data-price')
                }
            })
                .done(function( html ) {
                    ShowMessage(html);
                    $(".fields input").val('');
                    $(".fields input").attr('disabled',false);
                    $(".fields textarea").val('');
                    $(".type_select >div").removeClass('active');
                    $(".type_select >div:first-child").addClass('active');
					$('#order_form_button_test').parent().show();
					$(".time_transfer").hide("slow");
					$('.home_main .inner').transition({height: '-=45px'});
                });
        
    }
	
	
    $("#next_r_link").click(function() {
        slider6.goToNextSlide();
    });
    $(".up div").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
    $(".slaider .nav li").click(function() {
        slider.stopAuto();
        slider.goToSlide($(this).attr('data-value'));
        UpSlide($(this).attr('data-value'));
    });

    $(".aero_departured_menu").click(function() {
        $(".aero_menu>div").removeClass('active');
        $(this).addClass('active');
        $(".aero_arrived").hide();
        $(".aero_tables_outer>div").removeClass("active fadeInRight");
        $(".aero_departure").show();
        $(".aero_departure").addClass("animated fadeInRight");
    });

    $(".aero_arrived_menu").click(function() {
        $(".aero_menu>div").removeClass('active');
        $(this).addClass('active');
        $(".aero_departure").hide();
        $(".aero_tables_outer>div").removeClass("active fadeInRight");
        $(".aero_arrived").show();
        $(".aero_arrived").addClass("animated fadeInRight");
    });

    $(".price_menu>div").click(function() {
        $(".price_menu>div").removeClass('active');
        $(this).addClass('active');
        $(".prices_data>div").hide();
        $(".prices_data>div").removeClass('animated fadeInRight');
        $("#data_"+$(this).attr('data-value')).css('display','table');
        $("#data_"+$(this).attr('data-value')).addClass('animated fadeInRight');
		if ($(this).attr('data-value')=='aero') {
			$('.get_taxi').attr('data-from','РђСЌСЂРѕРїРѕСЂС‚ РЎРёРјС„РµСЂРѕРїРѕР»СЏ');
		}
		else {
			$('.get_taxi').attr('data-from','Р–/Рґ РІРѕРєР·Р°Р» РЎРёРјС„РµСЂРѕРїРѕР»СЏ');
		}

    });

    $(".park_menu>div").click(function() {
        var groupName = $(this).attr('data-group');
        $grid.shuffle('shuffle', groupName );
        $(".park_menu .active").removeClass('active');
        $(this).addClass('active');

        $(".class_desc").hide();
        $(".class_desc_"+$(this).attr('data-value')).show();
    });


    $( document ).on( "click", ".fixed_table2 .head .currency i", function() {
        $('.fixed_table2  i.active').removeClass('active');
        var ii= $(this);
        ii.addClass('active');


        $( "#data_zhd .row .car_type" ).each(function( index ) {
            var t=Math.round($(this).attr('data-value')/ii.attr('data-value'))+' <i class="fa fa-'+ii.attr('data-type')+'"></i>';
            $(this).html(t);
        });
    });


    $("#data_zhd .head .currency i").click(function() {
        $('#data_zhd .head .currency i.active').removeClass('active');
        var ii= $(this);
        ii.addClass('active');


        $( "#data_zhd .row .car_type" ).each(function( index ) {
            var t=Math.round($(this).attr('data-value')/ii.attr('data-value'))+' <i class="fa fa-'+ii.attr('data-type')+'"></i>';
            $(this).html(t);
        });
    });


    $( document ).on( "click", "#data_aero .head .currency i", function() {
        $('#data_aero .head .currency i.active').removeClass('active');
        var ii= $(this);
        ii.addClass('active');


        $( "#data_aero .row .car_type" ).each(function( index ) {
            var t=Math.round($(this).attr('data-value')/ii.attr('data-value'))+' <i class="fa fa-'+ii.attr('data-type')+'"></i>';
            $(this).html(t);
        });
    });

    $( document ).on( "click", ".fixed_table .head .currency i", function() {
        $('.fixed_table  i.active').removeClass('active');
        var ii= $(this);
        ii.addClass('active');


        $( "#data_aero .row .car_type" ).each(function( index ) {
            var t=Math.round($(this).attr('data-value')/ii.attr('data-value'))+' <i class="fa fa-'+ii.attr('data-type')+'"></i>';
            $(this).html(t);
        });
    });



    var slider = $('.photos .bxslider').bxSlider({
        pager:false,
        controls:false,
        auto:true,
        pause:3000,
        onSlideNext: function($slideElement, oldIndex, newIndex){
            UpSlide(newIndex);
        }
        ,
        onSlidePrev: function($slideElement, oldIndex, newIndex){
            UpSlide(newIndex);
        }

    });

    var slider2 = $('.car_types .bxslider1').bxSlider({
        pager:false,
        controls:true,
        nextSelector: $(".car_types .next_1"),
        prevSelector: $(".car_types .prev_1"),
        prevText: '<i class="fa fa-angle-left"></i>',
        speed: 1,
        mode:'vertical',
        nextText: '<i class="fa fa-angle-right"></i>',
        onSlideBefore: function (elm, oldIndex, newIndex) {
            $('.car_types .bxslider1 .animated ').removeClass("flipInX animated");
            elm.find('div').addClass("flipInX animated");

        }
    });

    var slider3 = $('.car_types .bxslider2').bxSlider({
        pager:false,
        controls:true,
        speed: 1,
        nextSelector: $(".car_types .next_2"),
        prevSelector: $(".car_types .prev_2"),
        prevText: '<i class="fa fa-angle-left"></i>',
        nextText: '<i class="fa fa-angle-right"></i>',
        mode:'vertical',
        onSlideBefore: function (elm) {
            $('.car_types .bxslider2 .animated ').removeClass("flipInX animated");
            elm.find('div').addClass("flipInX animated");

        }
    });

    var slider4 = $('.car_types .bxslider3').bxSlider({
        pager:false,
        controls:true,
        speed: 1,
        nextSelector: $(".car_types .next_3"),
        prevSelector: $(".car_types .prev_3"),
        prevText: '<i class="fa fa-angle-left"></i>',
        nextText: '<i class="fa fa-angle-right"></i>',
        mode:'vertical',
        onSlideBefore: function (elm) {
            $('.car_types .bxslider3 .animated ').removeClass("flipInX animated");
            elm.find('div').addClass("flipInX animated");

        }
    });

    var slider5 = $('.bxslider_promo').bxSlider({
        pager:true,
        controls:false,
        auto:true,
        pause:3000
    });


    var slider6 = $('.bxslider_rr').bxSlider({
        pager:false,
        controls:false,
        auto:false,
        mode:'fade',
        adaptiveHeight:true,
        pause:3000,
        onSlideBefore: function (elm) {
            $('#next_r_link i').addClass("rotate");
        },
        onSlideAfter: function (elm) {
            $('#next_r_link i').removeClass("rotate");
        }
    });

    var myMap;
    var coor=[];
    if ( $( "#map" ).length ) {
        coor=$( "#map").attr('data-value').split(",");

        function init () {
            myMap = new ymaps.Map("map", {
                    center: coor,
                    zoom: 15
                }),
                myGeoObject = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates:coor
                    }
                });

            myMap.geoObjects.add(myGeoObject);
        }
        ymaps.ready(init);
    }

    if ( $( "#sip_table" ).length ) {
        SipTable ();
    }

    if ( $( ".parom_container" ).length ) {
        Parom ();
    }

    var $grid = $('#grid');
    var hash = window.location.hash.substr(1);
    if (hash!='') {
        $(".park_menu .active").removeClass('active');
        $(".menu_"+hash).addClass('active');

        $grid.shuffle({
            itemSelector: '.grid-item',
            speed: 500,
            group: hash
        });
    }
    else {

            $grid.shuffle({
                itemSelector: '.grid-item',
                speed: 500
            });
    }
    $( document ).on( "click", "#error .close", function() {
        HideError();
    });

    $( document ).on( "click", "#message .close", function() {
        HideMessage();
    });

    var width = $(window).width();
    if ((width <= 480)) {
        var slider_adv = $('section.adv .list').bxSlider({
            slideWidth: 300,
            minSlides: 2,
            maxSlides: 3,
            moveSlides: 2,
            slideMargin: 10,
            pager: true,
            control:false
        });

                var mobileSideMenu = ({

            init: function() {
                this.$menuEl = $('.nav_mobile');
                this.$triggerEl = $('header .mobile_menu_link');
                this.$layout = $('.layout');
                this.bind();
            },

            bind: function(){



                var _this = this;


                this.$triggerEl.click(function(){
                    _this.$menuEl.toggleClass('nav_mobile_open');
                    if (_this.$layout.hasClass('content_nav-mobile-open')) {
                        _this.$layout.addClass('content_nav-mobile-close').removeClass('content_nav-mobile-open');
                        $(' .layout').css({'position':'relative'});
                    } else {
                        _this.$layout.addClass('content_nav-mobile-open').removeClass('content_nav-mobile-close');
                        $(' .layout').css({'position':'fixed'});
                    }


                    return false
                });

            }

        }).init();
    }

    window.addEventListener("orientationchange", function() {
        $("#data_aero .head").css('width','auto');
        $("#data_aero .head").css('height','auto');
        $( "#data_aero .head>div" ).each(function( index ) {
            $(this).css('width','auto');
        });
        $( "#data_aero .head>div>div" ).each(function( index ) {
            $(this).css('width','auto');
        });
    }, false);

    $( window ).scroll(function() {

        if ($('#data_aero .head').length>0 && $('#data_aero').is(":visible")) {
            $("#data_aero .head").width($("#data_aero .head").width());
            $("#data_aero .head").height($("#data_aero .head").height());
            $( "#data_aero .head>div" ).each(function( index ) {
                $(this).width($(this).width());
            });
            $( "#data_aero .head>div>div" ).each(function( index ) {
                $(this).width($(this).width());
            });
            $(".fixed_table").css('left',o_left);
            var t=$(window).scrollTop();
            var t2=$('#data_aero .head').offset().top;
            var o_left=$('#data_aero').offset().left;
            if (t2<t) {

                if ($('.fixed_table').html()=='') {
                    var header = $("#data_aero .head").html();
                    $('.fixed_table').html('<div class="data_price_aero"><div class="head">'+header+'</div></div>');
                }


                $('.fixed_table').css('display','block');
            }
            else {
                $('.fixed_table').css('display','none');
            }
        }

        if ($('#data_zhd .head').length>0 && $('#data_zhd').is(":visible")) {
            var t=$(window).scrollTop();
            var t2=$('#data_zhd .head').offset().top;
            var o_left=$('#data_zhd').offset().left;
            $(".fixed_table2").css('left',o_left);
            $(".fixed_table2").css('width',$("#data_zhd .head").width());

            $("#data_zhd .head").width($("#data_zhd .head").width());
            $("#data_zhd .head").height($("#data_zhd .head").height());
            $( "#data_zhd .head>div" ).each(function( index ) {
                $(this).width($(this).width());
            });
            $( "#data_zhd .head>div>div" ).each(function( index ) {
                $(this).width($(this).width());
            });

            if (t2<t) {
                if ($('.fixed_table2').html()=='') {
                    var header = $("#data_zhd .head").html();
                    $('.fixed_table2').html('<div class="data_price_aero"><div class="head">'+header+'</div></div>');
                }

                $('.fixed_table2').css('display','block');
            }
            else {
                $('.fixed_table2').css('display','none');
            }
        }
    });
});


function Parom () {
    $.ajax({
        method: "POST",
        url: home_url+"/index.php",
        data: { do: "parom", ajax: 1 }
    })
        .done(function( html ) {
           $('.parom_container').html(html);
            setTimeout(Parom , 60000)
        });
}
function CheckPrice(start,end_point,car){
	 $.ajax({
        method: "POST",
        url: home_url+"/index.php",
        data: { do: "price", ajax: 1,'start_point':start,'end_point':end_point,'car':car },
				complete: function(jqXHR) {
					var index = $.xhrPool.indexOf(jqXHR);
					if (index > -1) {
						$.xhrPool.splice(index, 1);
					}
				},
				beforeSend: function (jqXHR) {
					$.xhrPool.abortAll();
					$('.price_to_go').html('<i class="fa fa-refresh fa-spin"></i> РџРѕРґСЃС‡РµС‚ С‚Р°СЂРёС„Р°');
				$('.price_to_go').show();
				$.xhrPool.push(jqXHR);
				}	
					
    })
        .done(function( html ) {
				$('.price_to_go').html(html);
				$('.price_to_go').show();
        });

}
function SipTable () {
    $.ajax({
        method: "POST",
        url: home_url+"/index.php",
        data: { do: "sip", ajax: 1 }
    })
        .done(function( json ) {
            var json = jQuery.parseJSON( json );
            $('#sip_table tbody').html('');
            $.each(json.departured,function(i,el)
            {
                // tech data
                var tdata = el[0];
                // get time
                var time = el[6];
                var time_len = time.length;
                // find space in time
                var space_time = time.indexOf(' ');
                var time = time.substring(space_time + 1, time_len - 3);

                // get flight
                var flight = el[4] + '-' + el[5];

                // get route
                var route = el[1];

                // get terminal
                var terminal = el[8];

                // get stand
                var stand = el[7];

                // get gate
                var gate = el[9];

                // get status
                var status = el[11];

                var row='<tr><td>'+time+'</td><td>'+flight+'</td><td>'+route+'</td><td>'+terminal+'</td><td>'+stand+'</td><td>'+gate+'</td> <td>'+status+'</td></tr>';
               $('#sip_table tbody').append(row);
            });


            $('#sip_table2 tbody').html('');
            $.each(json.arrived,function(i,el)
            {
                // tech data
                var tdata =el[0];
                // get time
                var time =el[6];
                var time_len = time.length;
                // find space in time
                var space_time = time.indexOf(' ');
                var time = time.substring(space_time + 1, time_len - 3);

                // get flight
                var flight =el[4] + '-' +el[5];

                // get route
                var route =el[1];

                // get terminal
                var terminal =el[3];

                // get status
                var status =el[8];

                var row='<tr><td>'+time+'</td><td>'+flight+'</td><td>'+route+'</td><td>'+terminal+'</td><td>'+status+'</td></tr>';
                $('#sip_table2 tbody').append(row);
            });

            setTimeout(SipTable , 60000)
        });

}


function UpSlide(newIndex) {
    var sliders_a = jQuery.parseJSON(sliders);
    $('#s_from').html(sliders_a[newIndex].price);
    $(".slaider .nav li").removeClass('active');
    $("#li_sl_"+newIndex).addClass('active');
}
function Slogan () {
    var slogan='';
    if (taxi_slogan[start_id] != undefined) {
        slogan=taxi_slogan[start_id];
        start_id=start_id+1;
    }
    else {
        slogan=taxi_slogan[0];
        start_id=1;
    }

    $('#taxi_slogan_words').addClass('animated flipInX');
    $('#taxi_slogan_words').html(slogan);



    $('#taxi_slogan_words').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function() {
            $('#taxi_slogan_words').removeClass('animated flipInX');
    });


}

function ShowError (text) {
    $('#error').remove();
    $( '<div id="error" class="animated slideInDown">'+text+'<div class="close"><i class="fa fa-times"></i></div></div>' ).insertAfter( $( "body" ) );

}

function HideError () {
    $("#error").removeClass('animated slideInDown');
    $("#error").addClass('animated slideOutUp');
}

var hidetime;
function ShowMessageAndHide (text,time) {
	$('#error').remove();
    if (typeof hidetime !== 'undefined') {
        clearTimeout(hidetime);
    }
    $('#message').remove();
    $( '<div id="message" class="animated slideInDown">'+text+'<div class="close"><i class="fa fa-times"></i></div></div>' ).insertAfter( $( "body" ) );
    hidetime=setTimeout(
        function()
        {
            HideMessage();
        }, time*1000);
}
function ShowMessage (text) {
    $('#message').remove();
	$('#error').remove();
    $( '<div id="message" class="animated slideInDown">'+text+'<div class="close"><i class="fa fa-times"></i></div></div>' ).insertAfter( $( "body" ) );

}
function HideMessage () {
    $("#message").removeClass('animated slideInDown');
    $("#message").addClass('animated slideOutUp');
}