$('#play-background2').hide();
$('#play-background3').hide();
//$('svg.pannel').attr('width', $('body').width()).attr('height', $('body').height());
$('.pannel.Informations').on('click',function(){
    $(this).css('height', "0");
});
$('#button').on('click', function() {
	$('#play-background2').show();
	$('#play-background').css('height', "0");
	$('.socle').css('display', 'none');
})
$(".genderButton").on('click', function(e) {
	$('.genderButton').attr("class", "genderButton");
	$(this).attr("class", "genderButton active");
	if ($(this).attr('id') == "genderMale") {
		$('#allBoys').css('display', '');
		$('#allGirls').css('display', 'none');
	} else {
		$('#allBoys').css('display', 'none');;
		$('#allGirls').css('display', '');
	}
	e.stopPropagation();
})
$('.characterSelection').on('click', function() {
	$('#play-background3').show();
	$('#play-background2').css('height', "0");
	console.log($(this).data('strong'));
	startGame($(this).data('strong'),$(this).data('weak'),$(this).data('char'))
})
$(window).resize(function() {
	w = $('#game').width();
	h = $('#game').height();
	size = (w < h) ? w / 40 : h / 40;
	redraw();
	//$('svg.pannel').attr('width', w).attr('height', h);
});

$("#play-background3").on('click', function() {
    console.log(tutorial.state);
    if(tutorial.state == 1){
        tutorial.state = 1.1;
        tutorielDraw();
        centerOnNode(allNodes.select('.ego'),400);
    }else if(tutorial.state == 1.1){
        tutorial.state = 1.2;
        tutorielDraw();
        centerOnNode(allNodes.select('.Ami'),400);
    }else if(tutorial.state == 1.2){
        tutorial.state = 1.3;
        tutorielDraw();
        centerOnNode(allNodes.select('.Connaissance'),400);
    }else if(tutorial.state == 1.3){
        tutorial.state = 1.4;
        tutorielDraw();
        centerOnNode(allNodes.select('.Inconnu'),400);
    }else if(tutorial.state == 1.4){
        tutorial.state = 1.5;
        transform = {l:w/2,t:h/2,s:0.7};
        group.transition().style('transform', 'translate(' + w / 2 + 'px,' + h / 2 + 'px) scale(0.7)').duration(400);
	    //background.transition().attr('patternTransform', 'translate(' + w / 2 + ',' + h / 2 + ') scale(0.7)').duration(400);
        tutorielDraw();
    }else if(tutorial.state > 1.4 && tutorial.clickToContinue && tutorial.state < 2.2){
        tutorial.state = Math.floor((tutorial.state + 0.1)*10)/10;
        tutorielDraw();
    }else if(tutorial.state == 2.2){
        tutorial.state = 11;
        tutorielDraw();
    }else if(tutorial.state>10 && !tutorial.clickToContinue){
    	if (nodeMode.state) {
    	    costActionHoverEnd();
    		reinitialiseCenter();
    		nodeMode.node = null;
    		nodeMode.state = false;
    	} else {
    		nodeMode.justClicked = false;
    	}
    }else{
        console.log("it's clicked");
        tutorielDraw();
    }
});
$("body").on('mousewheel MozMousePixelScroll', function(event) {
            event.preventDefault();
    });