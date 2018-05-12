var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var size = (w < h) ? w / 40 : h / 40;
var svg, group, allLinks, allNodes, link, node, nodes, links, force, background, persoData, startGame, egoAge = 20,
	currentMonth = 0,
	fiestaCounter = 0,
	devMode = false;
var transform = {};
var oldtransform = {};
var babyed = false;
var married = false;
var traveled = false;
var nodeMode = {
	state: false,
	node: null,
	beforeAnimation: {},
	justClicked: false,
	transition: false,
	selectMode: false
};
var forceGravity = 0;
var linkDistance = {
	Ami: 80,
	Connaissance: 120,
	Inconnu: 60,
	Married: 100
};
var linkStrength = {
	Ami: 0.4,
	Connaissance: 0.2,
	Inconnu: 0.2,
	Married: 0.6
};
var nodeCharge = {
	ego: -500,
	Ami: -400,
	Connaissance: -250,
	Inconnu: -600
};
var tutorial = {
	state: 1,
	clickToContinue: false
}
var nodeChargeDistance = 1000;
var charactersData = [];
charactersData['#intell-homme'] = {
	wedding: {
		strong: 1.17,
		weak: 0.79,
		text: "La vie en couple fait gagner des liens familiaux, vous vous rapprochez de votre famille et vous ajoutez la belle-famille. Vous gagnez aussi des amis de loisirs, mais vous perdez des connaissances liées aux études et au voisinage. Votre réseau est plus dense car vous avez présenté votre compagne à vos amis."
	},
	baby: {
		strong: 1.08,
		weak: 1,
		text: "Avec l’arrivée d’un bébé, la famille est encore plus présente, concentrée autour du berceau. Mais c’est là surtout que les différences entre les garçons et les filles sont le plus marquées. Vous les garçons, vous gagnez plus de liens familiaux que les filles, mais surtout vous perdez beaucoup moins de relations, à part dans les études et le voisinage. Votre réseau devient plus dense, vous connectez beaucoup les amis et la famille."
	},
	travel: {
		strong: 1.17,
		weak: 0.71,
		text: "Déménager loin (au moins 150 km) ne fait pas toujours perdre ses amis. Cela dépend aussi pourquoi on part. Vous qui partez en général pour faire des études ou travailler, vous pouvez même vous faire rapidement des nouveaux amis. Evidemment vous perdez des relations de voisinage, mais vous rencontrez des personnes par le biais des loisirs ou des études. Ces nouvelles relations ne sont pas connectées avec vos vieux amis, et la densité de votre réseau diminue."
	}
}
charactersData['#intell-femme'] = {
	wedding: {
		strong: 1.07,
		weak: 0.75,
		text: "La vie en couple fait gagner des liens familiaux, vous vous rapprochez de votre famille et vous ajoutez la belle-famille. Mais vous perdez plus de relations que les garçons, en particulier des connaissances liées aux études, aux loisirs et au voisinage. Vous avez donc perdu des connexions même si vous avez présenté votre compagnon à vos amis, car vous avez beaucoup renouvelé vos relations et vous mélangez moins les groupes."
	},
	baby: {
		strong: 1,
		weak: 0.61,
		text: "Avec l’arrivée d’un bébé, les différences entre les garçons et les filles sont très marquées. Et les filles n’y gagnent pas, quelle que soit leur situation ! Même vous les plus diplômées vous perdez beaucoup de relations à ce moment là, dans tous les domaines sauf la famille et le travail. Vous perdez surtout des relations de loisirs et d’études. Contrairement aux garçons, vous n’augmentez pas la part de la famille. Au final la densité de votre réseau ne change pas."
	},
	travel: {
		strong: 1.32,
		weak: 1.35,
		text: ": Déménager loin (au moins 150 km) ne fait pas toujours perdre ses amis. Cela dépend aussi pourquoi on part. Vous qui partez en général pour faire des études ou travailler, vous pouvez même vous faire rapidement des nouveaux amis. C’est surtout le cas pour vous les filles ! Evidemment vous perdez des relations de voisinage, mais vous rencontrez des personnes par le biais du travail, des loisirs des études. Au total, vous gagnez même beaucoup de nouvelles relations, connaissances et aussi amis. Mais elles ne sont pas connectées avec vos vieux amis car ils habitent loin, et la densité de votre réseau diminue."
	}
}
charactersData['#mecano-homme'] = {
	wedding: {
		strong: 1.27,
		weak: 1.08,
		text: "La vie en couple fait gagner des liens familiaux, vous vous rapprochez de votre famille et vous ajoutez la belle-famille, et c’est ce qui fait le plus augmenter votre réseau. A cause de cette forte présence des deux familles liées à votre compagne, votre réseau est aussi plus dense, plus connecté. Vous avez juste perdu quelques relations des études et du voisinage."
	},
	baby: {
		strong: 1.35,
		weak: 1.36,
		text: "Avec l’arrivée d’un bébé, la famille est encore plus présente, concentrée autour du berceau. Mais c’est là surtout que les différences entre les garçons et les filles sont le plus marquées, et surtout pour vous les « professionnels » ! Vous les garçons vous gagnez des liens familiaux, mais aussi des relations de travail et de loisirs, surtout des amis mais aussi des connaissances. Votre réseau devient plus dense, vous présentez les uns aux autres."
	},
	travel: {
		strong: 1.08,
		weak: 0.92,
		text: "Déménager loin (au moins 150 km) ne fait pas toujours perdre ses amis. Cela dépend aussi pourquoi on part. Vous qui partez en général pour travailler, vous perdez quelques relations de voisinage bien sûr, mais aussi d’études et de travail. En revanche vous rencontrez des nouvelles personnes par le biais des loisirs. Mais ces nouvelles relations ne sont pas connectées avec vos vieux amis, et la densité de votre réseau diminue."
	}
}
charactersData['#mecano-femme'] = {
	wedding: {
		strong: 1.10,
		weak: 0.60,
		text: "La vie en couple fait gagner des liens familiaux, vous vous rapprochez de votre famille et vous ajoutez la belle-famille. Mais vous perdez beaucoup plus de relations que les garçons, en particulier des connaissances liées aux études, aux loisirs et au voisinage. Vous avez donc moins d’interconnexions car vous avez beaucoup renouvelé vos relations et vous mélangez moins les groupes."
	},
	baby: {
		strong: 1,
		weak: 0.39,
		text: "Avec l’arrivée d’un bébé, les différences entre les garçons et les filles sont très marquées. Et les filles n’y gagnent pas, quelle que soit leur situation ! C’est vous les professionnelles qui perdez le plus de liens, de loisirs, d’études, de travail, et surtout du côté des connaissances. Contrairement aux garçons, vous n’augmentez pas la part de la famille. Au final la densité de votre réseau ne change pas, elle reste relativement élevée."
	},
	travel: {
		strong: 0.95,
		weak: 0.81,
		text: "Déménager loin (au moins 150 km) peut faire perdre quelques amis et connaissances, et c’est votre cas. Vous qui partez en général pour travailler, vous perdez quelques relations de voisinage bien sûr, mais aussi de loisirs. En revanche vous rencontrez quelques nouvelles personnes par le biais des études ou du travail. Mais ces nouvelles relations ne sont pas connectées avec vos vieux amis, et la densité de votre réseau diminue, ainsi que sa taille globale."
	}
}
charactersData['#artist-homme'] = {
	wedding: {
		strong: 1.11,
		weak: 0.91,
		text: "La vie en couple fait gagner des liens familiaux, vous vous rapprochez de votre famille et vous ajoutez la belle-famille, et c’est ce qui fait un peu augmenter votre réseau malgré les pertes importantes de relations d’études et de travail, bien plus fortes que pour les garçons. Cela montre que vous restez plus concentrée sur le foyer. La part importante de la famille rend votre réseau plus dense, plus connecté."
	},
	baby: {
		strong: 1.21,
		weak: 1.18,
		text: "Avec l’arrivée d’un bébé, la famille se concentre autour du berceau. Mais c’est là surtout que les différences entre les garçons et les filles sont le plus marquées. Vous les garçons vous gagnez des liens familiaux, mais aussi des relations de travail et de loisirs, des amis et aussi des connaissances. Votre réseau devient plus dense, vous présentez vos amis les uns aux autres."
	},
	travel: {
		strong: 0.84,
		weak: 0.58,
		text: "Déménager loin (au moins 150 km) peut faire perdre quelques amis et connaissances, et c’est votre cas. Vous perdez des relations liées au voisinage bien sûr, mais aussi aux loisirs et aux études. Vous gagnez parfois quelques relations de travail, mais cela ne suffit pas à compenser. Votre réseau diminue et se concentre sur quelques relations importantes, et sa densité augmente."
	}
}
charactersData['#artist-femme'] = {
	wedding: {
		strong: 1.23,
		weak: 0.8,
		text: "La vie en couple fait gagner des liens familiaux, vous vous rapprochez de votre famille et vous ajoutez la belle-famille, et c’est ce qui fait un peu augmenter votre réseau malgré les pertes importantes de relations d’études et de travail, bien plus fortes que pour les garçons. Cela montre que vous restez plus concentrée sur le foyer. La part importante de la famille rend votre réseau plus dense, plus connecté."
	},
	baby: {
		strong: 1,
		weak: 0.55,
		text: "Avec l’arrivée d’un bébé, les différences entre les garçons et les filles sont très marquées. Et les filles n’y gagnent pas, quelle que soit leur situation ! Vous les filles vous perdez plus de liens que les garçons, et contrairement à eux vous n’augmentez pas la part de la famille. La densité augmente un peu, mais c’est surtout parce que vous concentrez votre réseau."
	},
	travel: {
		strong: 1.22,
		weak: 0.7,
		text: "Déménager loin (au moins 150 km) ne fait pas toujours perdre ses amis, et dans votre cas les effets ne sont pas très marqués. Vous perdez des relations liées aux études, mais vous pouvez en gagner de nouvelles par le biais des loisirs. Vous conservez surtout des amis, et perdez plutôt des connaissances. La densité de votre réseau augmente très légèrement."
	}
}
var actions = {
	"Inconnu": [{
		text: ["Faire Connaissance"],
		ico: "#ico-shake",
		available: function() {
			return true;
		},
		hibouText: function() {
			return "Les relations naissent dans des contextes où on rencontre des inconnus. Faire connaissance veut dire qu’on identifie la personne et qu’on partage des informations."
		},
		time: 4,
		effect: function(node) {
            nodeMode.state = false;
			reinitialiseCenter(function() {
                nodeMode.node = null;
                node.type = "Connaissance";
                node.sizeFactor = "0.75";
                addLink(nodes[0], node);
                node.life = 4;
                costActionHoverEnd();
				expandGraph(node);
				applyAction(4);
                if(tutorial.state == 1.7){
                    tutorial.state = Math.floor((tutorial.state + 0.1)*10)/10;
                    tutorielDraw();
                }
				redraw();
                
			});
        }
			
	}],
	"Connaissance": [{
		text: ["Devenir", "Ami"],
		ico: "#ico-friend",
		available: function() {
			return true;
		},
		hibouText: function() {
			return "La relation devient plus importante, personnalisée, et ne se réduit plus au contexte. Elle est plus solide et plus durable."
		},
		time: function() {
			return 6
		},
		effect: function(d) {
            nodeMode.state = false;
			reinitialiseCenter(function() {
                nodeMode.node = null;
                d.type = "Ami";
			    d.sizeFactor = "1";
				applyAction(6);
				d.life += 2;
				redraw();
                if(tutorial.state == 1.8){
                    tutorial.state = Math.floor((tutorial.state + 0.1)*10)/10;
                    tutorielDraw();
                }
                console.log(transform);
			});
		}
	}, {
		text: ["Prendre", "des", "nouvelles"],
		ico: "#ico-tel",
		available: function() {
			return true;
		},
		hibouText: function() {
			return "Le lien est réactivé car vous montrez à cette personne qu’elle compte pour vous. Si vous n’avez pas d’interactions, la relation risque de disparaître."
		},
		time: function() {
			return 3
		},
		effect: function(d) {
            nodeMode.state = false;
			reinitialiseCenter(function(){
                nodeMode.node = null;
                d.life += 2;
                applyAction(3);
                redraw();
            });
		}
	}],
	"Ami": [{
		text: ["Présenter", "quelqu'un"],
		ico: "#ico-present",
		available: function() {
			return true;
		},
		hibouText: function() {
			return "Vous interconnectez davantage votre réseau quand vous présentez des personnes les unes aux autres. Cela donne plus de cohésion, mais moins de diversité.";
		},
		time:function()  {
			return 4
		},
		effect: function(d) {
			startSelectMode('linkAll', 'meet');
			$('#hibouText').text('Cliquer maintenant sur une personne de votre réseau pour les faires ce rencontrer');
			reinitialiseCenter();
		}
	}, {
		text: ["Prendre", "des", "nouvelles"],
		ico: "#ico-tel",
		available: function() {
			return true;
		},
		hibouText: function(){
			return "Le lien est réactivé car vous montrez à cette personne qu’elle compte pour vous. Si vous n’avez pas d’interactions, la relation risque de disparaître.";
		},
		time:function(){
			return 4;
		},
		effect: function(d) {
            nodeMode.state = false;
			reinitialiseCenter(function() {
                d.life += 1;
                setTimeout(function(){healAllFriends(d,function(node){node.life += 1;redraw()})},600);
				applyAction(4);
				d.life += 1;
				redraw();
                nodeMode.node = null;
			});
			costActionHoverEnd();
		}
	}],
	"ego": [{
		text: ["Se mettre", "en couple"],
		ico: "#ico-wedding",
		available: function() {

			return !married;
		},
		hibouText: function(){
			return "";
		},
		time: function() {
			return "-";
		},
		effect: function(d) {
			startSelectMode('linkAmis', 'wedding');
			reinitialiseCenter();
		}
	}, {
		text: ["Avoir", "un bébé"],
		ico: "#ico-baby",
		available: function() {
            return !babyed;
		},
		time: function() {
			return "-";
		},
		effect: function(d) {
            nodeMode.state = false;
			tutorial.clickToContinue = true;
		    tutorielDraw(persoData.baby.text);
			reinitialiseCenter(function() {
				eventCore(persoData.baby.strong, persoData.baby.weak);
				redraw();
                nodeMode.node = null;
			})
			costActionHoverEnd();
			babyed = true;
		}
	}, {
		text: ["Partir", "loin"],
		ico: "#ico-travel",
		available: function() {
			return !traveled;
		},
		hibouText: function(){
			return "";
		},
		time: function() {

			return "-";
		},
		effect: function(d) {
            nodeMode.state = false;
			tutorial.clickToContinue = true;
		    tutorielDraw(persoData.travel.text);
			reinitialiseCenter(function() {
				eventCore(persoData.travel.strong, persoData.travel.weak);
                nodeMode.node = null;
			});
			redraw();
			traveled = true;
		}
	}]
}
require(["d3.v3", "jquery-2.1.1.min"], function() {
	require(["functions", "interface","gameInterface"], function() {
		startGame = function(strong, weak, char) {
			//background = d3.select('pattern');
			svg = d3.select("#game").attr("class", "windows").attr("pointer-events", "all");
			var perso = d3.select('.perso').select('use').attr('xlink:href', char);
			persoData = charactersData[char];
			console.log(persoData);
			group = svg.append("g").attr('id','group').style('transition','transform, 400ms').style('will-change','transform');
			allLinks = group.append("g").attr('class', 'links');
			allNodes = group.append("g").attr('class', 'nodes');
			node = allNodes.selectAll(".node");
			link = allLinks.selectAll(".link");
			force = initialiseForce().on("tick", tick);
			nodes = force.nodes();
			links = force.links();
			generateGraph(strong, weak);
			redraw();
            w = $('#game').width();
            h = $('#game').height();
            size = (w < h) ? w / 40 : h / 40;
            transform = {l:w/2,t:h/2,s:0.7};
			group.style('transform', 'translate(' + transform.l + 'px,' + transform.t + 'px) scale('+transform.s+')');
			tutorielDraw();
			console.log(actions);
			//INTERFACE
            loadGameInterface();
            applyAction(0);
		}
	});
});