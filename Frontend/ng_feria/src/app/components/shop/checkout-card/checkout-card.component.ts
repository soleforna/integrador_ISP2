import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-checkout-card',
  templateUrl:'./checkout-card.component.html',
  styleUrls: ['./checkout-card.component.css']
})
export class CheckoutCardComponent implements OnInit{
  @Input() amount: any;
  @Input() items: any;

  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void {

 }


}
