import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-title-description',
  templateUrl: './user-title-description.component.html',
  styleUrls: ['./user-title-description.component.scss']
})
export class UserTitleDescriptionComponent implements OnInit {
  Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
  @Input() Component!:any;
  @Input() ComponentDescription!:any;
  constructor() { }

  ngOnInit(): void {
  }

}
