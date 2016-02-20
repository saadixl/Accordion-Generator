jQuery.fn.selectText = function(){
   var doc = document;
   var element = this[0];
   console.log(this, element);
   if (doc.body.createTextRange) {
       var range = document.body.createTextRange();
       range.moveToElementText(element);
       range.select();
   } else if (window.getSelection) {
       var selection = window.getSelection();        
       var range = document.createRange();
       range.selectNodeContents(element);
       selection.removeAllRanges();
       selection.addRange(range);
   }
};


// This function is for making the list sortable
 $(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });

// This function will fire while the Add ccordion button is clicked
$("#add-accordion").click(function(){

	// Getting the values from the input fields
	var accTitle = $("#accordion-title").val();
	var accContent = $("#accordion-content").val();
	accTitle = accTitle.replace("<", "&lt;");
	accTitle = accTitle.replace(">", "&gt;");
	accTitle = accTitle.replace("/", "&#47;");
	accContent = accContent.replace("<", "&lt;");
	accContent = accContent.replace(">", "&gt;");
	accContent = accContent.replace("/", "&#47;");
	if(accTitle=="" || accContent==""){
		alert("Please don't keep empty fields");
		return false;
	}

	// Clearing the field values
	$("#accordion-title").val("");
	$("#accordion-content").val("");

	// Adding in the accordion list
	$("#sortable").append("<li><p class='title'>"+accTitle+"</p><p class='content'>"+accContent+"</p><li>");

});

$("#sortable").delegate(".title", "click", function(){
	$(this).parent().find(".content").toggle();
});

$("#generate").click(function(){
	generateAccordionCode();
});

function generateAccordionCode(){
	$("#result").text("");
	var accordionStr = '';
	$("#result").append('<p> &lt;!doctype html&gt; </p>'+
						'<p> &lt;html lang="en"&gt; </p>'+
						'<p> &lt;head&gt;  </p>'+
						'<p> &lt;meta charset="utf-8"&gt;  </p>'+
						'<p> &lt;title&gt;My Accordion&lt;/title&gt;  </p>'+
						'<p> &lt;style type="text/css"&gt;  </p>'+
						'<p> 	.panel{box-shadow: 0 0 1px #323232;}  </p>'+
						'<p>   	.panel-heading a{text-decoration: none;} </p>'+
						'<p>    .panel-heading{background: #f5f5f5;padding: 5px;}</p>'+
						'<p>    .panel-collapse{padding:5px;display: none;}</p>'+
						'<p> &lt;/style&gt;</p>'+
						'<p> &lt;/head&gt;</p>'+
						'<p> &lt;body&gt;  </p>'+
						'<p> 		&lt;div class="panel-group collapsible" id="accordion"&gt;  </p>');
		var i = 0;
		$("#sortable li").each(function(){
			var thisTitle = $(this).find('p.title').text();
			var thisContent = $(this).find('p.content').text();
			if(thisTitle!=="" && thisContent!==""){
			i++;
				thisTitle = thisTitle.replace("<", "&lt;");
				thisTitle = thisTitle.replace(">", "&gt;");
				thisTitle = thisTitle.replace("/", "&#47;");
				thisContent = thisContent.replace("<", "&lt;");
				thisContent = thisContent.replace(">", "&gt;");
				thisContent = thisContent.replace("/", "&#47;");
				$("#result").append('<p> &lt;div class="panel panel-default"&gt; </p>'+
									'<p> &lt;div class="panel-heading"&gt; </p>' +
									'<p> &lt;h3 class="panel-title"&gt;</p>' +
									'<p> &lt;a data-toggle="collapse" data-parent="#accordion"</p>' +
									'<p> href="#collapse'+ i +'"&gt;</p>' +
									'<p> '+thisTitle+'</p>' +
									'<p> &lt;/a&gt;</p>' +
									'<p> &lt;/h3&gt;</p>' +
									'<p> &lt;/div&gt;</p>' +
									'<p> &lt;div id="collapse'+i+'" class="panel-collapse collapse"&gt;</p>' +
									'<p> &lt;div class="panel-body"&gt;</p>' +
									'<p> '+thisContent+'</p>' +
									'<p> &lt;/div&gt;</p>' +
									'<p> &lt;/div&gt;</p>' +
									'<p> &lt;/div&gt;</p>');

			}

		});
		$("#result").append('<p> &lt;/div&gt;</p>'+
							'<p> &lt;script src="http://code.jquery.com/jquery-1.10.2.js"&gt;&lt;/script&gt;</p>'+
							'<p> &lt;script type="text/javascript"&gt;</p>'+
							'<p> 	(function(){$(".panel-heading").click(function(){$(this).parent().siblings(".panel").find(".panel-collapse").slideUp();$(this).siblings(".panel-collapse").slideDown();});}());</p>'+
							'<p> &lt;/script&gt;</p>'+
							'<p> &lt;/body&gt;</p>'+
							'<p> &lt;/html&gt;</p>');
}

$("#select-all").click(function(){
	$("#result").selectText();
});