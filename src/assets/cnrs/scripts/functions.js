function initialiseForce() {
	return d3.layout.force().gravity(forceGravity)
		.linkDistance(function(d) {
			if (d.source.type == "ego" || d.target.type == "ego") {
				if (d.source.type == "Ami" || d.target.type == "Ami") {
					return linkDistance.Ami;
				} else if(d.source.type == "Connaissance" || d.target.type == "Connaissance"){
					return linkDistance.Connaissance;
				}else{
				    return linkDistance.Married;
				}

			} else {
				return linkDistance.Inconnu;
			}
		})
		.linkStrength(function(d) {
			if (d.source.type == "ego" || d.target.type == "ego") {
				if (d.source.type == "Ami" || d.target.type == "Ami") {
					return linkStrength.Ami;
				} else if(d.source.type == "Connaissance" || d.target.type == "Connaissance"){
					return linkStrength.Connaissance;
				}else{
				    return linkStrength.Married;
				}

			} else {
				if (d.source.type == "Inconnu" && d.target.type == "Inconnu") {
					return 0;
				} else {
					return linkStrength.Inconnu;
				}
			}
		})
		.charge(function(d) {
			if (d.type == "ego") {
				return nodeCharge.ego;
			} else if (d.type == "Ami") {
				return nodeCharge.Ami;
			} else if (d.type == "Connaissance") {
				return nodeCharge.Connaissance;
			} else {
				return nodeCharge.Inconnu;
			}
		})
		.chargeDistance(nodeChargeDistance).friction(0.75);
};

function tick(){
	link.attr("x1", function(d) {
		return d.source.x;
	})
		.attr("y1", function(d) {
			return d.source.y;
		})
		.attr("x2", function(d) {
			return d.target.x;
		})
		.attr("y2", function(d) {
			return d.target.y;
		});
	link.exit().attr("x1", function(d) {
		return d.source.x;
	})
		.attr("y1", function(d) {
			return d.source.y;
		})
		.attr("x2", function(d) {
			return d.target.x;
		})
		.attr("y2", function(d) {
			return d.target.y;
		});
	/*node.attr("cx", function(d) { return d.x; })
				    .attr("cy", function(d) { return d.y; });*/
	node.attr('transform', function(d) {
		return 'translate(' + d.x + ',' + d.y + ')';
	});
	if (nodeMode.state && !nodeMode.transition && !nodeMode.selectMode) {
		centerOnNode(nodeMode.node);
	}
};

function tutorielDraw(atext){
	var text = (atext)?atext:"";
	$('#clickToContinue').hide();
	if(text == ""){
		switch(tutorial.state) {
		    case 1:
		        text = 'Bienvenue sur "La vie du Réseau" ! Tu as devant toi la représentation de ton réseau de relations personnelles. Nous allons voir ensemble comment il peut évoluer!';
		        tutorial.clickToContinue = true;
		        break;
		    case 1.1:
		    	text = "Tout d'abord le gros cercle rouge au centre c'est toi! Tu es le centre du réseau et tu es relié à toutes les personnes que tu connais. Tu pourras cliquer sur toi à partir de tes 25 ans pour décider de quelques événements majeurs de ta vie!";
		        tutorial.clickToContinue = true;
		        break;
	        case 1.2:
	        	text = "Ensuite tes amis sont représentés par les cercles orange. En cliquant sur eux tu peut prendre de leurs nouvelles et les présenter à d'autres. Attention! Le nombre à leur centre représente le nombre d'années pendant lesquels ils resteront tes amis! Si ce compteur tombe à 0 ils deviendront de simples connaissances... Mais ne t'inquiète pas chaque fois que tu iras prendre de leurs nouvelles ce compteur remontera!";
		        tutorial.clickToContinue = true;
	        	break;
	    	case 1.3:
	        	text = "Ceux représentés par un cercle jaune, ce sont tes connaissances! Tu pourras aussi cliquer dessus pour prendre des nouvelles ou tisser un lien plus solide et en faire des amis! Si tu ne t'occupes pas d'elles à temps, elles s'éloigneront et redeviendront de simples inconnus.";
		        tutorial.clickToContinue = true;
	        	break;
	    	case 1.4:
	        	text = "Enfin les cercles gris représentent les personnes que tu ne connais pas encore! Tu ne peux voir que les connaissances de tes propres connaissances. En cliquant dessus tu pourras les rencontrer et ainsi agrandir ton réseau personnel et découvrir le monde qui t'entoure! ";
		        tutorial.clickToContinue = true;
	        	break;
            case 1.5:
	        	text = 'Tu peux présenter tes amis à d’autres amis ou à tes connaissances. Pour cela, tu cliques sur « présenter quelqu’un », et tu cliques ensuite sur la personne à qui tu veux le présenter.';
		        tutorial.clickToContinue = true;
	        	break;
            case 1.6:
	        	text = "C'est tout pour ton réseau!";
		        tutorial.clickToContinue = true;
	        	break;
            case 1.7:
	        	text = "Commence par essayer de faire connaissance avec quelqu'un. (Clique sur un membre gris de ton réseau et rencontre le!)";
		        tutorial.clickToContinue = false;
	        	break;
            case 1.8:
	        	text = 'Bien joué! Maintenant essaye devenir ami avec lui. (Clique de nouveau sur lui puis sur "devenir ami"!)';
		        tutorial.clickToContinue = false;
	        	break;
            case 1.9:
	        	text = "Génial! Il ne reste plus qu'à lui présenter quelqu'un. (Clique encore une fois sur lui puis sur \" Présenter quelqu'un\"!";
		        tutorial.clickToContinue = false;
	        	break;
	    	case 2:
	        	text = "Parfait! Tu commence à maîtriser ton réseau! Maintenant regarde un peu la partie inférieure. Tu peux y voir une barre qui représente le temps qui passe, mois par mois. Chaque action que tu effectues sur ton réseau te prend du temps, et tu vois défiler les mois en vert. Chaque année passée réduit les compteurs temps de tous les membres de ton réseau. Chaque action que tu fais sur tes relations prend un ou plusieurs mois, tu le vois sur le cercle que tu actives pour agir sur tes relations";
		        tutorial.clickToContinue = true;
	        	break;
	    	case 2.1:
	        	text = "À droite de cette barre tu as un compteur qui ajoute chaque année passée, et un autre compteur rond qui tourne sur 5 années. Tu vas ainsi faire évoluer ton réseau de tes 20 ans à tes 60 ans, où tu pourra prendre ta retraite. Nous verrons alors quel type de réseau tu as construit au fil du temps. Tous les cinq ans tu peux organiser une grande fête qui te permettra de remonter tous les compteurs temps des personnes de ton réseau. C'est un atout à utiliser à bon escient!";
		        tutorial.clickToContinue = true;
	        	break;
	    	case 2.2:
	        	text = "Maintenant que tu sais tout: A toi de jouer !";
		        tutorial.clickToContinue = true;
	        	break;
		    default:
		    text = ""
		    tutorial.clickToContinue = false;
		}
	}else{
        setTimeout(tutorielDraw,2000);
    }
	if(nodeMode.selectMode){
	    text = "Cliquer maintenant sur une personne de votre réseau pour les faires ce rencontrer";
	}
	if(text == ""){
	    $('#hibouText').hide();
	}else{
    	$('#hibouText').show();
    	$('#hibouText').text(text);
        $('#hibouTextContainer').removeClass('clickActivated');
    	if(tutorial.clickToContinue){
            $('#hibouTextContainer').addClass('clickActivated');
    		$('#clickToContinue').show();	
    	}
	}
}
function costActionHoverStart(price) {
    var hoverInf = d3.select('#timeline-hover-inf');
    var hoverSup = d3.select('#timeline-hover-sup'); 
	if ((currentMonth + price) < 13) {
	    hoverInf.transition().attr('width',11.25 * (currentMonth + price));
	} else {
		var dif = currentMonth + price - 12;
		hoverInf.transition().attr('width',11.25 * 12).duration('125').each('end',function(){
		    hoverSup.transition().attr('width',11.25 * dif).duration('125');
		});
	}
}
function costActionHoverEnd() {
    var hoverInf = d3.select('#timeline-hover-inf');
    var hoverSup = d3.select('#timeline-hover-sup'); 
    hoverInf.transition().attr('width',11.25 * currentMonth);
	hoverSup.transition().attr('width',0);
};

function updateBirthday(){
    fiestaCounter++;
    egoAge++;
    d3.select('#yearCounter').text(egoAge);
    $('#fiestaCounters path').css('fill', 'rgb(119, 99, 4)');
    $('#fiestaCounters path:lt(' + fiestaCounter + ')').css('fill', '#FFD609');
    if(fiestaCounter == 5){
        $('#fiestaButton').show();
    }
    for (var i in node.data()) {
		var anode = node.data()[i];
		if (anode.type == "Connaissance" || anode.type == "Ami") {
			anode.life -= 1;
			/*if (anode.life <= 0) {
				if (anode.type == "Ami") {
					transformToConnaissance(anode);
				} else if (anode.type == "Connaissance") {
					transformToInconnu(anode);
					deleteLinkWithEgo(anode);
				}
				anode.life = getMaxLife(anode);
			}*/
		}
	}
    setTimeout(function(){updateZeroNodes();},600);
    redraw();
}
function updateZeroNodes(){
    var zeroNodes = node.filter(function(d){return d.life == 0});
    console.log('updateZeroNodes');
    console.log(zeroNodes);
    var anode = d3.select(zeroNodes.node()).datum();
    console.log(anode);
    force.stop();
    if (anode.type == "Ami") {
        transformToConnaissance(anode);
    } else if (anode.type == "Connaissance") {
        transformToInconnu(anode);
        deleteLinkWithEgo(anode);
    }
    anode.life = getMaxLife(anode);
    var shortest = (w < h) ? w : h;
	var r = 10;
	var scale = Math.round((shortest / (r * 2)) * 0.7 * 10) / 140;
	var newLeft = (w / 2) - scale * anode.px;
	var newTop = (h / 2) - scale * anode.py;
    group.style("transition-duration",400);
    group.style("transform", "translate(" + newLeft + "px," + newTop + "px)" + " scale(" + scale + ")");
    
    setTimeout(function(){redraw()},600);
    setTimeout(function(){
        transform = {l:w/2,t:h/2,s:0.7};
        group.style('transform', 'translate(' + transform.l + 'px,' + transform.t + 'px) scale('+transform.s+')');
    },1600);
    if(zeroNodes.size()>1){
        setTimeout(function(){updateZeroNodes()},2000);
    }
     /*for (var i in node.data()) {
		var anode = node.data()[i];
		if (anode.type == "Connaissance" || anode.type == "Ami") {
			if (anode.life <= 0) {
				if (anode.type == "Ami") {
					transformToConnaissance(anode);
				} else if (anode.type == "Connaissance") {
					transformToInconnu(anode);
					deleteLinkWithEgo(anode);
				}
				anode.life = getMaxLife(anode);
			}
		}
	}*/
}
function birthdayParty(){
    node.each(function(d){
        d.life = getMaxLife(d);
    });
    redraw();
    fiestaCounter = 0;
    $('#fiestaCounters path').css('fill', 'rgb(119, 99, 4)');
    $('#fiestaButton').hide();
}
function applyAction(price) {
    var hoverInf = d3.select('#timeline-hover-inf');
    var hoverSup = d3.select('#timeline-hover-sup'); 
    var hover = d3.select('#timeline-hover');
	node.data().life = node.data().life - price;
	if (currentMonth + price < 12) {
		currentMonth = currentMonth + price;
		hover.transition().attr('width',11.25 * currentMonth);
	} else {
		currentMonth = currentMonth + price - 12;
		hover.transition().attr('width',11.25 * 12).each('end',function(){
		    hover.transition().attr('width',11.25 * currentMonth);
		    setTimeout(updateBirthday,1000);
		});
	}
	costActionHoverEnd();
};

function createNode(node) {
	node.insert("circle")
		.attr("class", "heart")
		.attr("r", function(d) {
    	if (d.type == "Inconnu" && !isItKnown(d)) {
			return 0;
			//return "opacity:0.1";
		}else{
        var percent = d.life / 10 +1;
		d3.select(this.parentNode).select('text').style('font-size', (size * d.sizeFactor) * percent * 1.2 + "px");
		return (size * d.sizeFactor) * percent;
		}
	});
	var lifeCounter = node.insert('g').attr("class", "lifeCounter");
	lifeCounter.insert("text").text(function(d) {
		if (d.type == "Connaissance" || d.type == "Ami") {
			return d.life
		}
	}).style('font-size', function(d) {
		return size * d.sizeFactor * 1.2 + "px"
	});
	lifeCounter.insert('animateTransform').attr('attributeType', "xml").attr('attributeName', "transform").attr('type', "rotate").attr('from', "0 0 0").attr('to', "360 0 0").attr('dur', "0.8s").attr('repeatCount', "0");
	node.on("mouseenter",function(d){
		if(tutorial.step==2){
			$("#hibouText").text("Voici un "+d.type);
		}
	})
	node.on('mouseleave',function(d){
	});
	node.on("click", function(d) {
        if(d.type == "ego" && egoAge < 25){
            tutorielDraw("Tu n'a pas encore 25 ans !");
        }else if(tutorial.state>10 || (d.type == 'Inconnu' && tutorial.state == 1.7) || (d.type == 'Connaissance' && tutorial.state == 1.8) || (d.type == 'Ami' && tutorial.state == 1.9)){
			nodeMode.justClicked = true;
			if (!nodeMode.state) {
				getContent(d3.select(this));
				var buttons = d3.select(this).select('.content');
				nodeMode.state = true;
				nodeMode.node = d3.select(this);
				buttons.transition().style("opacity", "1").duration(800);
                console.log(group.attr('style'));
                console.log(transform);
                saveTransformData();
                console.log(oldtransform);
				centerOnNode(nodeMode.node, 400);
			} else if (nodeMode.selectMode && nodeMode.typeSelect == "meet") {
				if (d.type != 'Inconnu') {
					addLink(nodeMode.node.datum(), d);
					applyAction(4);
                    d.life += 1;
                    nodeMode.node.datum().life +=1; 
					nodeMode.node = null;
					nodeMode.state = false;
					nodeMode.selectMode = false;
					redraw();
					tutorielDraw();
                    if(tutorial.state == 1.9){
                        tutorial.state = Math.floor((tutorial.state + 0.1)*10)/10;
                        tutorielDraw();
                    }
				}
			}else if(nodeMode.selectMode && nodeMode.typeSelect == "wedding") {
                console.log('weeding');
				if (d.type != 'Inconnu' && d.type != 'Connaissance') {
				    d.type = 'Married';
				    d.sizeFactor ="1.25";
				    d.life = 4;
				    var lover = d;
				    redraw();
				    var allNode = d3.selectAll('.node');
				    var list = allNode.filter(function(d){
				        return (d.type == "Ami" || d.type == "Connaissance");
				    });
				    list.each(function(d){
				        addLink(lover,d);
				    })
					nodeMode.node = null;
					nodeMode.state = false;
					nodeMode.selectMode = false;
					eventCore(persoData.wedding.strong,persoData.wedding.weak);
					tutorial.clickToContinue = true;
		            tutorielDraw(persoData.wedding.text);
					married = true;
				}
			}
			d3.event.stopPropagation();
		}
	});
}

function updateNode(node) {
	node.attr("class", function(d) {
		return "Node "+d.type;
	});
    
	node.each(function(d) {
        var percent = d.life / 10 +1;
	    var thenode = d3.select(this);
		var text = thenode.select('text');
		var textval = text.text();
		var heart = thenode.select('.heart');
		var animate = thenode.select('.lifeCounter')[0][0].childNodes[1];
		if (d.type == "Connaissance" || d.type == "Ami") {
			if(textval != d.life){
				if (textval > d.life) {
					heart.style('transition-duration', '0').style('fill', '#E15142');
                    heart.transition().attr('r',(size * d.sizeFactor) * percent/1.5).duration(400);
                    text.transition().style('font-size',((size * d.sizeFactor) * percent * 1.2)/1.5).duration(400);
				} else if (textval < d.life) {
					heart.style('transition-duration', '0').style('fill', '#00D82F');
                    heart.transition().attr('r',(size * d.sizeFactor) * percent*1.5).duration(400);
                    text.transition().style('font-size',((size * d.sizeFactor) * percent * 1.2)*1.5).duration(400);
				}
				setTimeout(function() {
					heart.style('transition-duration', '').style('fill', '');
				}, 100);
				setTimeout(function(){
                    heart.transition().ease("elastic").attr('r',(size * d.sizeFactor) * percent).duration(800);
                    text.transition().ease("elastic").style('font-size', (size * d.sizeFactor) * percent * 1.2 + "px").duration(800);
					text.text(d.life);
				},400);
				animate.beginElement();
			}else{
                heart.attr('r',(size * d.sizeFactor) * percent);
                text.style('font-size', (size * d.sizeFactor) * percent * 1.2 + "px");
            }
		}else{
            if (d.type == "Inconnu" && !isItKnown(d)) {
			 heart.transition().attr('r',0).duration(1000);
			 //return "opacity:0.1";
          }else{
            heart.transition().attr('r',(size * d.sizeFactor) * percent).duration(1000);
          }
		    text.text("");
		}
	});
    
};

function updateLink(link) {
	link.attr('class', function(d) {
		if(d.deleting){
			return 'link deleting';
		}
		if (d.source.type == "ego" || d.target.type == "ego") {
			if (d.source.type == "Ami" || d.target.type == "Ami") {
				return "link Ami";
			} else if(d.source.type == "Connaissance" || d.target.type == "Connaissance"){
				return "link Connaissance";
			}else{
			    return "link Married";
			}
		} else {
			return "link Inconnu";
		}
	});
    link.each(function(d){
        if(d.healing){
            var thelink = d3.select(this);
            console.log(thelink);
            thelink.style('stroke','#11F71C');
            thelink.style('stroke-width','6');
            d.healing = false;
            setTimeout(function(){
                thelink.style('stroke','');
            thelink.style('stroke-width','');
            },400);
        }
    });
	link.transition().style('opacity', function(l) {
		if ((isItKnown(l.source) === false || isItKnown(l.target) === false) || (l.source.type == "Inconnu" && l.target.type == "Inconnu")) {
			return 0;
		}else if(l.source.type != "ego" && l.target.type != "ego") {
			return 0.6;	
		}else{
			return 1;
		}
	}).duration(1000);
}

function eventCore(strongFactor, weakFactor){
    console.log("strongFactor: "+strongFactor+" weakFactor: "+weakFactor);
    var amis = d3.selectAll('.Node.Ami')[0];
    var connaissances = d3.selectAll('.Node.Connaissance')[0];
    var amisDiff = Math.round(amis.length * strongFactor) - amis.length;
    var connaissancesDiff = Math.round(connaissances.length * weakFactor) - connaissances.length;
    var amisToGet = amis.length+amisDiff;
    var connaissancesToGet = connaissances.length+connaissancesDiff;
    console.log('Amis: '+amis.length+" Connaissances: "+connaissances.length);
    console.log('AmisDiff: '+amisDiff+" ConnaissancesDiff: "+connaissancesDiff);
    console.log('AmisToGet: '+amisToGet+" ConnaissancesToGet: "+connaissancesToGet);
    for(var a = 0; a<Math.abs(amisDiff); a++){
    	if(amisDiff < 0){
    		console.log('Un ami est devenu une connaissance');
    		var node = allNodes.select(".Ami");
            var d = node.datum();
            transformToConnaissance(d);
    	}else{
    		if(connaissances.length > 0){
    			console.log('Une connaissance est devenue un ami');
    			var node = allNodes.select(".Connaissance");
                var d = node.datum();
                d.life= getMaxLife(d);
                transformToAmi(d);
    		}else{
    			console.log('Un inconnu est devenu un ami');
    			var node = allNodes.select(".Inconnu");
                var d = node.datum();
                transformToAmi(d);
                addLink(nodes[0], d);
				expandGraph(d);
    		}
    	}
    	redraw();
    	connaissances = allNodes.selectAll('.Connaissance')[0];
    	console.log(connaissances);
    }
    connaissancesDiff = connaissancesToGet - connaissances.length;
    console.log("connaissancesDiff: "+connaissancesDiff);
    for(var c = 0; c < Math.abs(connaissancesDiff) ; c++){
    	if(connaissancesDiff < 0){
    		console.log('Une connaissance est devenu un inconnu');
    		var node = allNodes.select(".Connaissance");
            var d = node.datum();
            transformToInconnu(d);
            deleteLinkWithEgo(d);
    	}else{
    		console.log('Un inconnu est devenu une connaissance');
			var node = allNodes.select(".Inconnu");
			var d = node.datum();
        	transformToConnaissance(d);
            addLink(allNodes.select('.ego').datum(), d);
			expandGraph(d);
    	}
    	redraw();
    }
}
function getContent(node) {
	var data = node.datum();
	var allActions = actions[data.type];
	if (allActions.length > 1) {
		var r = node.select('.heart').attr("r");
		var buttons = node.insert("g").attr("class", "content").style("opacity", "0").style('font-size', function(d) {
			return r / 6;
		}).style('font-weight', "bold");
		
		var dataCircle = buttons.insert('circle').attr('r', function(d) {
			return r / 2;
		}).attr('class', 'centerCircle');
		var datas = buttons.insert('g').attr("class", "datas");
		datas.insert('text').text(data.type);
		for (var i = 0; i < allActions.length; i++) {
			var action = allActions[i];
			var button = buttons.insert('g').attr('class', function(d){console.log(action.available());return "button "+((action.available())?"":"disabled")});
			button.attr('data-actionid', i);
			var x1 = Math.sin(2 * i * Math.PI / allActions.length) * r / 2;
			var y1 = Math.cos(2 * i * Math.PI / allActions.length) * r / 2;
			var x2 = Math.sin(2 * i * Math.PI / allActions.length) * r;
			var y2 = Math.cos(2 * i * Math.PI / allActions.length) * r;
			var x3 = Math.sin(2 * (i + 1) * Math.PI / allActions.length) * r;
			var y3 = Math.cos(2 * (i + 1) * Math.PI / allActions.length) * r;
			var x4 = Math.sin(2 * (i + 1) * Math.PI / allActions.length) * r / 2;
			var y4 = Math.cos(2 * (i + 1) * Math.PI / allActions.length) * r / 2;
			var centerX = Math.sin((2 * (i + 1) * Math.PI / allActions.length) - 2 * Math.PI / (allActions.length * 2)) * (r - r / 4);
			var centerY = Math.cos((2 * (i + 1) * Math.PI / allActions.length) - 2 * Math.PI / (allActions.length * 2)) * (r - r / 4);
			button.insert('path').attr('d', function(d) {
				return "M" + x1 + "," + y1 + "L" + x2 + "," + y2 + " A " + r + "," + r + " 0 0,0 " + x3 + "," + y3 + "L" + x4 + "," + y4 + " A " + r / 2 + "," + r / 2 + " 0 0,1 " + x1 + "," + y1;
			}).attr('class', "inputs").style('stroke-width', function(d) {
				return size * d.sizeFactor / 22
			});
			button.insert('use').attr('xlink:href', action.ico).attr('class', 'icon').attr('width', function(d) {
				return r / 3;
			}).attr('height', function(d) {
				return r / 3;
			}).attr('x', function(d) {
				return centerX - (r / 3 / 2);
			}).attr('y', function(d) {
				return centerY - (r / 3 / 2);
			});
			var textContainer = button.insert('g').attr("class", "informations").style('opacity', '0');
			textContainer.insert('use').attr('xlink:href', "#ico-time").attr('class', 'icon').attr('width', function(d) {
				return r / 5;
			}).attr('height', function(d) {
				return r / 5;
			}).attr('x', function(d) {
				return r / 10 - (r / 5 / 2);
			}).attr('y', function(d) {
				return r / 6;
			});
			textContainer.insert('text').text(action.time).attr('transform', function(d) {
				return "translate(" + (-r / 10) + "," + (r / 6 + r / 10) + ")";
			}).style('font-size', r / 3.8).style('fill', '#B2D73F');
			for (var j = 0; j < action.text.length; j++) {
				textContainer.insert('text').text(action.text[(action.text.length - 1) - j]).attr('transform', function(d) {
					return "translate(0," + ((-r / 2.2) / action.text.length) * j + ")";
				});
			}
			button.on('mouseenter', function(d) {
			    if(actions[d.type][$(this).attr('data-actionid')].available()){
    				d3.select(this).select('.informations').transition().style('opacity', 1);
    				node.select('.datas').transition().style('opacity', 0);
    				costActionHoverStart(parseInt(actions[d.type][$(this).attr('data-actionid')].time()));
    				tutorielDraw(actions[d.type][$(this).attr('data-actionid')].hibouText());
			    }
			});
			button.on('mouseleave', function(d) {
			    if(actions[d.type][$(this).attr('data-actionid')].available()){
    				d3.select(this).select('.informations').transition().style('opacity', 0);
    				node.select('.datas').transition().style('opacity', 1);
    				costActionHoverEnd();
    				tutorielDraw();
			    }
			});
			button.on('click', function(d) {
			    if(actions[d.type][$(this).attr('data-actionid')].available()){
    				actions[d.type][$(this).attr('data-actionid')].effect(d);
    				tutorielDraw();
    				d3.event.stopPropagation();
			    }
			});
		}
	} else {
		var action = allActions[0];
		var buttons = node.insert("g").attr('class', 'content').style('opacity', '0').on('click', function(d) {
            actions[d.type][0].effect(d);
            nodeMode.state = false;
			d3.event.stopPropagation();
		}).on('mouseenter', function() {
			costActionHoverStart(action.time);
		}).on('mouseleave', function() {
			costActionHoverEnd();
		});
		var button = buttons.insert('g').attr('class', 'button');
		button.insert('circle').attr("r", function(d) {
			return node.select('.heart').attr("r");
		}).attr("class", "nodeButton");
		var textContainer = button.insert('g').attr("class", "textContainer").style('font-size', function(d) {
			return size * d.sizeFactor / 6;
		}).style('font-weight', "bold");
		textContainer.insert('text').text(action.text);
		textContainer.insert('use').attr('class', 'icon').attr("xlink:href", action.ico).attr('width', function(d) {
			return size * d.sizeFactor / 1.5;
		}).attr('height', function(d) {
			return size * d.sizeFactor / 1.5;
		}).attr("x", function(d) {
			return (-1 * size * d.sizeFactor / 1.5 / 2);
		}).attr('y', function(d) {
			return (size * d.sizeFactor / 1.5 / 8);
		});
	}
}

function dumpData() {
	console.log(JSON.stringify(node.data()));
	var linksdata = [];
	for (var i in link.data()) {
		linksdata.push({
			source: link.data()[i].source.index,
			target: link.data()[i].target.index
		});
	}
	console.log(JSON.stringify(linksdata));
}

function generate(x, y) {
	nodes.push({
		"name": "new",
		"x": x,
		"y": y,
		type: "Inconnu",
		sizeFactor: "0.6",
		life: "5"
	});
	redraw();
}

function addLink(first, second) {
	if (first != second) {
		var link = {
			"id":(links.length == 0)?1:links[links.length-1].id+1,
			"source": first,
			"target": second
		}
		links.push(link);
	}
}

function deleteLinkWithEgo(node) {
	for (var i in links) {
		var alink = links[i];
		if ((alink.source.index === 0 || alink.target.index === 0) && (alink.source == node || alink.target == node)) {
			links.splice(i,1);
		}
	}
}

function healAllFriends(node,callback){
    var allLinks = links.filter(function(link) {
			if ((link.source == node || link.target == node) && (link.source.type == "Ami" && link.target.type == "Ami")) {
				return true;
			} else {
				return false;
			}
		});
    for(var i in allLinks){
        var link = allLinks[i];
        link.healing = true;
        var anode = (link.source == node)?link.target:link.source;
        callback(anode);
    }
}

function getMaxLife(node) {
	if (node.type == "Ami" || node.type == "Connaissance") {
		var allLinks = links.filter(function(link) {
			if ((link.source == node || link.target == node) && (link.source.type == "Ami" && link.target.type == "Ami")) {
				return true;
			} else {
				return false;
			}
		});
		if (node.type == "Ami") {
			return 4 + allLinks.length * 1;
		} else {
			return 4 + allLinks.length * 1;
		}
	} else {
		return 1;
	}
}

function isItKnown(node) {
	for (var i in links) {
		var alink = links[i];
		if (alink.source == node || alink.target == node) {
			if (alink.source.type != "Inconnu" || alink.target.type != "Inconnu") {
				node.known = true;
				return true;
			}
		}
	}
	node.known = false;
	return false;
}

function generateGraph(Amis, Connaissances) {
	var ego = {
		"x": 0,
		"y": 0,
		type: "ego",
		sizeFactor: "1.5",
		life: 4,
		fixed: true
	};
	nodes.push(ego);
	for (var i = 0; i < Amis; i++) {
		generateNode("Ami");
	}
	for (var j = 0; j < Connaissances; j++) {
		generateNode("Connaissance");
	}
	node.each(function(d) {
		d.life = getMaxLife(d);
	});
}

function generateNode(type) {
	var x = (Math.random() * 200) - 100;
	var y = (Math.random() * 200) - 100;
	var newNode = {
		"x": x,
		"y": y,
		type: type,
		sizeFactor: (type == "Ami") ? 1 : 0.75,
		life: 0,
		expanded: false
	};
	nodes.push(newNode);
	addLink(nodes[0], newNode);
	var manynodes = node.filter(function(d){
		return (d.type != "ego");
	});
	console.log(manynodes)
	var res = manynodes.sort(function(a, b) {
		var d1 = (a.x - x) * (a.x - x) + (a.y - y) * (a.y - y);
		var d2 = (b.x - x) * (b.x - x) + (b.y - y) * (b.y - y);
		return d1 - d2;
	});
	var numLink = Math.floor(Math.random() * 2);
	res.each(function(d) {
	    console.log('linkroutine');
		if (newNode != d && numLink > 0 && Math.random() > 0.3) {
			numLink--;
			addLink(newNode, d);
		}
	});
	newNode.life = getMaxLife(newNode);
	expandGraph(newNode);
	redraw();
}

function addNodeToGraph(parent) {
	var x = parent.x;
	var y = parent.y;
	var r = Math.sqrt(x * x + y * y);
	var ang = Math.atan2(y, x) * 180 /
		Math.PI;
	var r2 = Math.random() * 100 + r + 20;
	var ang2 = ang + (Math.random() - 0.5) * 40;
	var x2 = r2 * Math.cos(ang2 * Math.PI / 180);
	var y2 = r2 * Math.sin(ang2 * Math.PI / 180);
	var newNode = {
		"x": x2,
		"y": y2,
		type: "Inconnu",
		sizeFactor: "0.6",
		life: 0,
		expanded: false
	};
	nodes.push(newNode);
	addLink(newNode, parent);
	var manynodes = node.filter(function(d) {
		return (d.type == "Inconnu" && d.index != parent.index);
	});
	var res = manynodes.sort(function(a, b) {
		var d1 = (a.x - x2) * (a.x - x2) + (a.y - y2) * (a.y - y2);
		var d2 = (b.x - x2) * (b.x - x2) + (b.y - y2) * (b.y - y2);
		return d1 - d2;
	});
	var numLink = Math.floor(Math.random() * 2);
	res.each(function(d) {
		if (newNode != d && numLink > 0 && Math.random() > 0.8) {
			numLink--;
			addLink(newNode, d);
		}
	});
	newNode.life = getMaxLife(newNode);
}

function expandGraph(parent) {
	if (parent.expanded === false) {
		parent.expanded = true;
		var length = Math.floor(Math.random() * 3) + 1;
		for (var i = 0; i < length; i++) {
			addNodeToGraph(parent);
		}
	}
}

function transformToInconnu(d) {
	d.type = "Inconnu";
	d.sizeFactor = 0.6;
}

function transformToConnaissance(d) {
	d.type = "Connaissance";
	d.sizeFactor = 0.75;
}

function transformToAmi(d) {
	d.type = "Ami";
	d.sizeFactor = 1;
}

function startSelectMode(type,mode) {
	nodeMode.selectMode = true;
	nodeMode.typeSelect = mode;
	if (type == 'linkAll') {
		nodeMode.node.attr('class', 'node Ami sourceNode');
		var Inconnu = allNodes.selectAll('.Inconnu');
		Inconnu.attr('class', 'node Inconnu notselectable');
		console.log(Inconnu);
	}
	if(type == 'linkAmis'){
	    nodeMode.node.attr('class', 'node Ego sourceNode');
	    var Connaissance = allNodes.selectAll('.Connaissance');
	    Connaissance.attr('class', 'node Connaissance notselectable');
		var Inconnu = allNodes.selectAll('.Inconnu');
		Inconnu.attr('class', 'node Inconnu notselectable');
	}
}

function saveTransformData(){
    console.log("Saving: l:"+transform.l+" t:"+transform.t+" s:"+transform.s);
    oldtransform.l = transform.l;
    oldtransform.t = transform.t;
    oldtransform.s = transform.s;
}

function centerOnNode(nod, dur) {
    var d = nod.datum();
	var transition = (dur) ? true : false;
	var oldscale = oldtransform.s;
	var shortest = (w < h) ? w : h;
	var r = nod.select('.heart').attr("r");
	var scale = Math.round((shortest / (r * 2)) * 0.7 * 10) / 20;
	var newLeft = (w / 2) - scale * d.px;
	var newTop = (h / 2) - scale * d.py;
	//nodeMode.beforeAnimation = {x:newLeft, y:newTop, scale:scale, all:group.attr('style')};
	if (transition) {
		nodeMode.transition = true;
        group.style("transition-duration",dur);
		group.style("transform", "translate(" + newLeft + "px," + newTop + "px)" + " scale(" + scale + ")");
        setTimeout(function(){nodeMode.transition = false;},400);
		//background.transition().attr("patternTransform", "translate(" + newLeft + "," + newTop + ")" + " scale(" + scale + ")").duration(dur/2);
        //background.style("transform","translate(" + Math.round(newLeft + (w/2)) + "px," + Math.round(newTop +(h/2) )+ "px)" + " scale(" + scale + ")");
        transform = {l:newLeft, t:newTop, s:scale};
        console.log("savetransform");
	} else {
        console.log("zooom");
        group.style("transition-duration",0);
		group.style("transform", "translate(" + newLeft + "px," + newTop + "px)" + " scale(" + scale + ")");
		//background.attr("patternTransform", "translate(" + newLeft + "," + newTop + ")" + " scale(" + scale + ")");
	}
}

function reinitialiseCenter(callback) {
	var buttons = nodeMode.node.select('g.content');
	buttons.transition().style("opacity", "0").duration(50).remove();
    console.log("translate(" + oldtransform.l + "px," + oldtransform.t + "px)" + " scale(" + oldtransform.s + ")");
    group.style("transition-duration",400);
	group.style("transform", "translate(" + oldtransform.l + "px," + oldtransform.t + "px)" + " scale(" + oldtransform.s + ")");
    transform.l = oldtransform.l;
    transform.t = oldtransform.t;
    transform.s = oldtransform.s;
    console.log("reinitialiseCenter");
    console.log(transform);
	//background.transition().attr("patternTransform", "translate(" + nodeMode.beforeAnimation.x + "," + nodeMode.beforeAnimation.y + ")" + " scale(" + nodeMode.beforeAnimation.scale + ")").duration(400);
	setTimeout(callback, 400);
}
function redraw() {
	force.charge(function(d) {
		var percent = d.life/10 + 1;
		if (d.type == "ego") {
			return nodeCharge.ego;
		} else if (d.type == "Ami") {
			return nodeCharge.Ami * percent;
		} else if (d.type == "Connaissance") {
			return nodeCharge.Connaissance * percent;
		} else {
			return nodeCharge.Inconnu;
		}
	})
	node = node.data(nodes);
	createNode(node.enter().insert("g"));
	updateNode(node);
	link = link.data(links,function(l){return l.id});
	link.enter().insert("line").style('opacity',0);
	link.exit().transition().style('opacity',0).duration(1000).each('end',function(){
		d3.select(this).remove();
	})
	updateLink(link);
	
	var friends = node.filter(function(d) {
		return (d.type == "Ami")
	});
	var known = node.filter(function(d) {
		return (d.type == "Connaissance")
	});
	$('#friend-count').text(friends[0].length);
	$('#connaissance-count').text(known[0].length);

	var nodesNeeded = node.filter(function(d){
        return (d.type == "Ami" || d.type == "Connaissance");
    })[0];
    var linksNeeded = link.filter(function(d){
       return ((d.source.type == "Ami" || d.source.type == "Connaissance") && (d.target.type == "Ami" || d.target.type == "Connaisssance"));
    })[0];
    var potentialConnections = (nodesNeeded.length * (nodesNeeded.length - 1)/2);
    var actualConnections = linksNeeded.length;
	$("#density-count").text(Math.round(actualConnections/potentialConnections*100) + "%");
	force.start();
    force.alpha(0.3)
}