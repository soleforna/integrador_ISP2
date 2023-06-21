import { Component } from '@angular/core';
import {NewsletterService} from 'src/app/services/newsletter.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  correoElectronico = '';
  esCorreoValido = false;

  ngOnInit(): void {
    this.correoElectronico = '';
  }

  validarCorreoElectronico(): void {
    if (this.correoElectronico.trim() === '') {
      this.esCorreoValido = false;
      return;
    }
  }
}
