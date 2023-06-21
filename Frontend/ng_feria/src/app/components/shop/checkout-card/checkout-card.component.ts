import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-checkout-card',
  templateUrl:'./checkout-card.component.html',
  styleUrls: ['./checkout-card.component.css']
})
export class CheckoutCardComponent implements OnInit{
  @Input() price: any;
  @Input() items: any;

  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void {

    console.log('price is ', this.price);
    console.log(this.items)

  }


}
