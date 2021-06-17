import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public readonly ngSelectConfig: NgSelectConfig) {
    ngSelectConfig.loadingText = 'Carregando...';
    ngSelectConfig.notFoundText = 'Nenhum tipo de trabalho encontrado';
  }
}
