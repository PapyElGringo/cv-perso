import { Component, Input, OnInit } from "@angular/core";

interface Technology {
  icon: String;
  name: String;
}
const url = "assets/technology/";
export const TechnologiesMap = {
  angular: {
    icon: url + "angular-icon.svg",
    name: "Angular",
  },
  angularJs: {
    icon: url + "AngularJS-logo.svg",
    name: "AngularJS",
  },
  materialDesign: {
    icon: url + "material-icon.svg",
    name: "Material Design",
  },
  ionic: {
    icon: url + "ionic-icon.svg",
    name: "Ionic",
  },
  pixiJs: {
    icon: url + "bunny.png",
    name: "PixiJS",
  },
  d3Js: {
    icon: url + "d3-logo.svg",
    name: "D3.js",
  },
  typescript: {
    icon: url + "typescript-logo.svg",
    name: "TypeScript",
  },
  javascript: {
    icon: url + "javascript-logo.svg",
    name: "JavaScript",
  },
  gnome: {
    icon: url + "gnome.svg",
    name: "GNOME Technologies",
  },
  vuejs: {
    icon: url + "vuejs.svg",
    name: "Vue.js",
  },
  vuetify: {
    icon: url + "vuetify.svg",
    name: "Vuetify",
  },
  pwa: {
    icon: url + "pwalogo.svg",
    name: "Progressive Web App",
  },
  flutter: {
    icon: url + "flutter.svg",
    name: "Flutter",
  },
};

@Component({
  selector: "technologies-viewer",
  template: `
    <span class="mat-body-2">Technologies used</span>
    <div>
      <mat-chip-list style="display:block;" class="padding-top padding-bottom">
        <mat-chip *ngFor="let tech of technologies">
          <img class="mat-chip-avatar" [src]="tech.icon" />
          <span>{{ tech.name }}</span>
        </mat-chip>
      </mat-chip-list>
    </div>
  `,
  styles: [],
})
export class TechnologiesViewerComponent implements OnInit {
  @Input() technologies: Technology[];
  constructor() {}

  ngOnInit() {}
}
