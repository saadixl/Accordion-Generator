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
/*	accTitle = accTitle.replace("<", "&lt;");
	accTitle = accTitle.replace(">", "&gt;");
	accTitle = accTitle.replace("/", "&#47;");
	accContent = accContent.replace("<", "&lt;");
	accContent = accContent.replace(">", "&gt;");
	accContent = accContent.replace("/", "&#47;");*/
	if(accTitle=="" || accContent==""){
		alert("Please don't keep empty fields");
		return false;
	}
	// Clearing the field values
	$("#accordion-title").val("");
	$("#accordion-content").val("");

	// Adding in the accordion list
	$("#sortable").append("<li><span class='delete-button'>X</span><p class='title'>"+$('<div>').text(accTitle).html()+"</p><p class='content'>"+$('<div>').text(accContent).html()+"</p><li>");

});

$("#sortable").delegate(".delete-button","click",function(){
	$(this).parent().remove();
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
	$("#result").append('<p>&lt;div class="panel-group collapsible" id="accordion"&gt;  </p>');
		var i = 0;
		$("#sortable li").each(function(){
			var thisTitle = $(this).find('p.title').text();
			var thisContent = $(this).find('p.content').text();
			if(thisTitle!=="" && thisContent!==""){
			i++;
/*				thisTitle = thisTitle.replace("<", "&lt;");
				thisTitle = thisTitle.replace(">", "&gt;");
				thisTitle = thisTitle.replace("/", "&#47;");
				thisContent = thisContent.replace("<", "&lt;");
				thisContent = thisContent.replace(">", "&gt;");
				thisContent = thisContent.replace("/", "&#47;");*/
				$("#result").append('<p> &nbsp;&nbsp;&lt;div class="panel panel-default"&gt; </p>'+
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="panel-heading"&gt; </p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3 class="panel-title"&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;a data-toggle="collapse" data-parent="#accordion"</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;href="#collapse'+ i +'"&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+$('<div>').text(thisTitle).html()+'</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/a&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/h3&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&lt;div id="collapse'+i+'" class="panel-collapse collapse"&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="panel-body"&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+$('<div>').text(thisContent).html()+'</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</p>' +
									'<p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</p>' +
									'<p> &nbsp;&nbsp;&lt;/div&gt;</p>');

			}

		});
		$("#result").append('<p> &lt;/div&gt;</p>');
}

$("#select-all").click(function(){
	$("#result").selectText();
});