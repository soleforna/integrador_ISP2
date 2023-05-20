import { Component} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  isScrolled = false;


  scroll(el:HTMLElement){
    el.scrollIntoView()
  }
  
}