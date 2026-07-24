import { Component } from '@angular/core';
import { AboutComponent } from '../../sections/about/about.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { MethodologiesComponent } from '../../sections/methodologies/methodologies.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { SiteHeaderComponent } from '../../sections/site-header/site-header.component';
import { TestimonialsComponent } from '../../sections/testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  imports: [
    SiteHeaderComponent,
    HeroComponent,
    AboutComponent,
    MethodologiesComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
