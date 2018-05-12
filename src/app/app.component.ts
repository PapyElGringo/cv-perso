import { Component, OnInit } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CnrsModalComponent } from './cnrs-modal/cnrs-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  loaded = false;
  technologies = {
    angular: {
      icon: 'assets/angular-icon.svg',
      name: 'Angular'
    },
    angularJs: {
      icon: 'assets/AngularJS-logo.svg',
      name: 'AngularJS'
    },
    materialDesign: {
      icon: 'assets/material-icon.svg',
      name: 'Material Design'
    },
    ionic: {
      icon: 'assets/ionic-icon.svg',
      name: 'Ionic'
    },
    pixiJs: {
      icon: 'assets/bunny.png',
      name: 'PixiJS'
    },
    d3Js: {
      icon: 'assets/d3-logo.svg',
      name: 'D3.js'
    },
    typescript: {
      icon: 'assets/typescript-logo.svg',
      name: 'TypeScript'
    },
    javascript: {
      icon: 'assets/javascript-logo.svg',
      name: 'JavaScript'
    }
  };
  experiences = [
    {
      icon: 'code',
      poste: 'Lead Développeur chez BeMyEye',
      categories: [
        {
          title: 'Lead',
          bulletPoints: [
            'Recrutement d\'une équipe de dévelopement front-end',
            'Mise en place d\'un processe Agile au sein de l\'équipe produit'
          ]
        },
        {
          title: 'Développeur',
          bulletPoints: [
            'Migration de l\'application Ionic vers Ionic 2',
            'Dévelopement d\'Instore une bibliothèque d\'image de théatralisation'
          ]
        }
      ],
      description: 'Suite à la fusion entre LocalEyes et BeMyEye l\'équipe de dévelopement s\'est transformé et j\'ai eu l\'opportunité de former ma propre équipe.',
      startDate: 'Mai 2016',
      endDate: 'Aujourd\'hui',
      technologies: [
        this.technologies.angular,
        this.technologies.ionic,
        this.technologies.materialDesign,
        this.technologies.typescript
      ],
      discoveries: [
        {
          name: 'Essayer l\'application BeMyEye',
          url: 'http://onelink.to/a2vh6t'
        },
        {
          name: 'Découvrir InStore',
          url: 'https://instore.bemyeye.com'
        }
      ]
    },
    {
      icon: 'code',
      poste: 'Développeur Front-End chez LocalEyes',
      categories: [
        {
          title: 'Mobile-App',
          bulletPoints: [
            'Conception et dévelopement d\'une application Hybride Ionic'
          ]
        },
        {
          title: 'Back-office',
          bulletPoints: [
            'Interface WYSIWIG de création de questionnaire',
            'Dashboard et graphiques dynamiques',
            'Interface de validation de rapports',
            'Refonte graphique en Material Design'
          ]
        }
      ],
      description: 'Dévelopement d\'une application hybride de crowdsourcing et d\'une application web back-office',
      startDate: 'Juillet 2015',
      endDate: 'Mai 2016',
      technologies: [
        this.technologies.angularJs,
        this.technologies.ionic,
        this.technologies.materialDesign,
        this.technologies.javascript
      ],
      discoveries: [
        {
          name: 'LocalEyes est devenue BeMyEye',
          url: 'http://onelink.to/a2vh6t'
        }
      ]
    },
    {
      icon: 'videogame_asset',
      poste: 'Développeur de jeu indépendant pour le CNRS - Netting',
      categories: [
        {
          title: 'Recherche de Claire Bidart',
          bulletPoints: [
            'Une l’enquête longitudinale qualitative sur l’évolution des réseaux sociaux et l’entrée dans la vie adulte. Cette enquête suit un panel de 87 jeunes qui sont interrogés tous les trois ans (1995, 1998, 2001, 2004, 2007, puis en 2015). Sont étudiés leurs cheminements vers la vie adulte, les interactions entre les diverses sphères de leur vie (études, travail, couple, famille, loisirs, résidences...) et les articulations entre l’évolution de leur réseau relationnel et leurs modes d’insertion sociale. '
          ]
        },
        {
          title: 'Conception',
          bulletPoints: [
            'Elaboration d\'un sérious game illustrant la recherche de Claire Bidart tout en y intégrant une notion pédagogique.'
          ]
        },
        {
          title: 'Dévelopement',
          bulletPoints: [
            'Création d\'un moteur de graphe de noeud avec l\'aide de D3.js'
          ]
        }
      ],
      description: 'Conception, élaboration et développement d\'un jeux vidéo dans l\'objectif d\'illustrer les résultats de la recherche sociologique de Claire Bidart.',
      startDate: 'Juillet 2014',
      endDate: 'Janvier 2015',
      technologies: [
        this.technologies.d3Js,
        this.technologies.javascript
      ],
      discoveries: [
        {
          name: 'Jouer a Netting',
          callback: () => {
            this.matDialog.open(CnrsModalComponent, {
              panelClass: 'no-padding-dialog',
              disableClose: true
            })
          }
        }
      ]
    },
    {
      icon: 'videogame_asset',
      poste: 'Développeur de jeu indépendant',
      description: 'Développement de mon propre jeu video Objectifs : apprentissage de nouveaux langages, de nouvelles technologies, de nouvelles façons de résonner pour développer un produit de sa conception à sa commercialisation',
      startDate: 'Juillet 2012',
      endDate: 'Juillet 2015',
      technologies: [
        this.technologies.pixiJs,
        this.technologies.javascript
      ]
    },
    {
      icon: 'school',
      poste: 'BTS Informatique de Gestion option : développeur',
      description: '',
      startDate: '2010',
      endDate: '2012'
    }
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private matDialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon('github', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/github-circle.svg'));
    this.matIconRegistry.addSvgIcon('linkedin', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/linkedin-box.svg'));
  }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;

    }, 400);
  }
}
