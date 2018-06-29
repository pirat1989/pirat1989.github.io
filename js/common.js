$(function() {

	$(function(){
    	$(".otz").slice(0, 9).show();
    	$("#More").on("click", function(ejgjh){
    		ejgjh.preventDefault();
    		$("div:hidden").slice(0, 9).slideDown();
    		$("#More").remove()
    	});
    })

	var newsIndex = 1;
function NewsRotator() {
  $(".news").hide();
  $(".news" + newsIndex).show();
  
  var newsCount = 5;
  newsIndex++;
  if(newsIndex > newsCount) {
    newsIndex = 1;
  }
}

$(document).ready(function() {
  NewsRotator();
  setInterval(NewsRotator, 3000);
});

	

	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
			$("#form").trigger("reset");
		});
		return false;
	});

	$(document).ready(function() {
  //прикрепляем клик по заголовкам acc-head
    $('#accordeon .acc-head').on('click', f_acc);
});

function f_acc(){
//скрываем все кроме того, что должны открыть
  $('#accordeon .acc-body').not($(this).next()).slideUp(1000);
// открываем или скрываем блок под заголовоком, по которому кликнули
    $(this).next().slideToggle(2000);
}

   
    $('#carouselExampelIndicators').carousel({
  		interval: 200
	})


    });
