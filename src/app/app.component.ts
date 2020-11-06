import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ImageItem, YoutubeItem } from "ng-gallery";
import { CnrsModalComponent } from "./cnrs-modal/cnrs-modal.component";
import { TechnologiesMap } from "./technologies-viewer.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "app";
  loaded = false;
  skills = [
    TechnologiesMap.materialDesign,
    TechnologiesMap.flutter,
    TechnologiesMap.angular,
    TechnologiesMap.vuejs,
    TechnologiesMap.ionic,
    TechnologiesMap.javascript,
    TechnologiesMap.typescript,
    TechnologiesMap.pwa,
  ];
  experiences = [
    {
      logo: "./assets/material-shell.svg",
      poste: "Creator of Material Shell",
      categories: [],
      description: `After working for several years building mobile applications and web applications I decided to **rethink** the interface I use the most: the **desktop interface**. \n\n I created Material Shell, a modern open source desktop interface for Linux.`,
      startDate: "October 2018",
      endDate: "Today",
      products: [
        {
          title: "Material Shell",
          description:
            "Designed to **simplify** navigation and **reduce** the need to **manipulate** windows in order to **improve productivity**. It's meant to be 100% **predictable** and bring the benefits of tools coveted by professionals to everyone.",
          technologies: [
            TechnologiesMap.javascript,
            TechnologiesMap.materialDesign,
            TechnologiesMap.gnome,
          ],
          showcases: [new YoutubeItem({ src: `Wc5mbuKrGDE` })],
          links: [
            {
              name: "View the source on Github",
              url: "https://github.com/material-shell/material-shell",
            },
          ],
        },
        {
          title: "Material Shell Website",
          description:
            "Project website designed to look like Material Shell and allow watching the showcase video while reading the documentation and installation instructions.",
          technologies: [
            TechnologiesMap.vuejs,
            TechnologiesMap.vuetify,
            TechnologiesMap.typescript,
          ],
          showcases: [
            new ImageItem({
              src: `./assets/showcase/material_shell/material-shell.com.png`,
            }),
          ],
          links: [
            {
              name: "Access the website",
              url: "https://material-shell.com/",
            },
          ],
        },
      ],
    },
    {
      logo: "./assets/tastr.svg",
      poste: "Mobile App Developer - Product & UX Designer",
      categories: [],
      description: `Assisted two talented friends in order to realize their vision of the perfect recommendation platform by providing a full featured Angular PWA Mobile App.`,
      startDate: "October 2019",
      endDate: "February 2020",
      products: [
        {
          title: "PWA Mobile Application",
          description:
            "Full featured angular PWA Mobile App: authentication, registration, on-boarding, home, searchable and filtrable list, detail view, offline mode, internationalization ",
          technologies: [
            TechnologiesMap.angular,
            TechnologiesMap.materialDesign,
            TechnologiesMap.pwa,
          ],
          showcases: [
            new ImageItem({
              src: `./assets/showcase/tastr/tastr_on-boarding.png`,
            }),
            new ImageItem({
              src: `./assets/showcase/tastr/tastr_home_category_2.png`,
            }),
          ],
          links: [
            {
              name: "View the source on Github",
              url: "https://github.com/material-shell/material-shell",
            },
          ],
        },
      ],
    },
    {
      logo: "./assets/bme_logo_new.png",
      poste: "Lead Developer at BeMyEye",
      categories: [],
      description:
        "Following the fusion between LocalEyes and BeMyEye I had the opportunity to build my own team and step up as Lead Front-end Developer.",
      startDate: "May 2016",
      endDate: "October 2018",
      products: [
        {
          title: "Mobile App",
          description:
            "User Mobile Application dedicated to realize missions all around the world",
          technologies: [
            TechnologiesMap.angular,
            TechnologiesMap.ionic,
            TechnologiesMap.materialDesign,
            TechnologiesMap.typescript,
          ],
          showcases: [
            new ImageItem({ src: `assets/showcase/bemyeye/mobile-app/1.jpg` }),
          ],
          links: [
            {
              name: "Try BeMyEye application",
              url: "http://onelink.to/a2vh6t",
            },
          ],
        },
        {
          title: "Client Dashboard",
          description:
            "WYSIWIG missions editor, dynamic dashboard of missions result, missions validation interface",
          technologies: [
            TechnologiesMap.angular,
            TechnologiesMap.materialDesign,
            TechnologiesMap.typescript,
          ],
          showcases: [],
          links: [],
        },
        {
          title: "InStore",
          description:
            "Database of in-store marketing activations found by shoppers",
          technologies: [
            TechnologiesMap.angular,
            TechnologiesMap.materialDesign,
            TechnologiesMap.typescript,
          ],
          showcases: [
            new ImageItem({ src: `assets/showcase/bemyeye/instore/0.jpeg` }),
          ],
          links: [],
        },
      ],
    },
    {
      logo: "./assets/localeyes_logo.png",
      poste: "Frontend Developer at LocalEyes",
      categories: [],
      description:
        "Single Front-end Developer, responsible of the development of the front-end products",
      startDate: "July 2015",
      endDate: "May 2016",
      products: [
        {
          title: "Mobile App",
          description:
            "User Mobile Application dedicated to realize missions all around the country",
          technologies: [
            TechnologiesMap.ionic,
            TechnologiesMap.materialDesign,
            TechnologiesMap.javascript,
          ],
          showcases: [],
          links: [],
        },
        {
          title: "Client Dashboard",
          description:
            "WYSIWIG missions editor, dynamic dashboard of missions result, missions validation interface",
          technologies: [
            TechnologiesMap.angularJs,
            TechnologiesMap.materialDesign,
            TechnologiesMap.javascript,
          ],
          showcases: [],
          links: [],
        },
      ],
    },
    {
      logo: "./assets/cnrs.svg",
      poste: "Serious Game Development for CNRS - Netting",
      categories: [
        {
          title: "Claire Bidart's research",
          bulletPoints: [
            "Une l’enquête longitudinale qualitative sur l’évolution des réseaux sociaux et l’entrée dans la vie adulte. Cette enquête suit un panel de 87 jeunes qui sont interrogés tous les trois ans (1995, 1998, 2001, 2004, 2007, puis en 2015). Sont étudiés leurs cheminements vers la vie adulte, les interactions entre les diverses sphères de leur vie (études, travail, couple, famille, loisirs, résidences...) et les articulations entre l’évolution de leur réseau relationnel et leurs modes d’insertion sociale. ",
          ],
        },
      ],
      description:
        "Conception and development of a serious game to illustrate the results of sociological research by Claire Bidart",
      startDate: "July 2014",
      endDate: "January 2015",
      products: [
        {
          title: "Game",
          description: "Creation of a node graph engine with D3.js as base",
          technologies: [TechnologiesMap.d3Js, TechnologiesMap.javascript],
          showcases: [new ImageItem({ src: `assets/showcase/cnrs/1.png` })],
          links: [
            {
              name: "Play at Netting",
              callback: () => {
                this.matDialog.open(CnrsModalComponent, {
                  panelClass: "no-padding-dialog",
                  disableClose: true,
                });
              },
            },
          ],
        },
      ],
    },
    {
      icon: "videogame_asset",
      poste: "Independent Game Development",
      description:
        "Development of my own video game with goals of learning new languages, technologies and new experiences on how to create a product from conception to release.",
      startDate: "July 2012",
      endDate: "July 2015",
      products: [
        {
          title: "Game",
          description: "",
          technologies: [TechnologiesMap.pixiJs, TechnologiesMap.javascript],
          showcases: [new ImageItem({ src: `assets/showcase/erakion/1.png` })],
          links: [],
        },
      ],
    },
    {
      icon: "school",
      poste: "BTS Informatique de Gestion option : développeur",
      description: "",
      startDate: "2010",
      endDate: "2012",
      technologies: [],
      discoveries: [],
    },
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private matDialog: MatDialog
  ) {
    matIconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl("./assets/mdi.svg")
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 400);
  }
}
