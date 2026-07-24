import { Component } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss'
})
export class SiteHeaderComponent {
  protected readonly navItems = [
    { label: 'Quien soy', href: '#quien-soy' },
    { label: 'Metodologias', href: '#metodologias' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Contacto', href: '#contacto' }
  ];
}
