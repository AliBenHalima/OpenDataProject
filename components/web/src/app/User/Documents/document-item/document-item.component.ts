import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.scss']
})
export class DocumentItemComponent implements OnInit {
  @Input() Sujet!:any;
  @Input() Documents!: Array<any>;
  public environment=environment.APP_URL;

  constructor() { }

  ngOnInit(): void {
console.log(this.Documents,"ih");

  }
  onTabOpen(sujet){
    console.log("Tab Event",sujet);
    this.Documents=this.Documents.filter(element=>element.sujetdocuments.id == sujet.id)
  }

}
