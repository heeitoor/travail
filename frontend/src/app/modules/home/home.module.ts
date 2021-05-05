import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeIndexComponent } from './home-index/home-index.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
