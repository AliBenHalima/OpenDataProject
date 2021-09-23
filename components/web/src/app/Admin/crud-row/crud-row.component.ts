import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-row',
  templateUrl: './crud-row.component.html',
  styleUrls: ['./crud-row.component.scss']
})
export class CrudRowComponent implements OnInit {
  @Input () etab: any;
  constructor() { }
  users= [
    {
			"id": "1000",
			"name": "Bamboo Watch"

		},
    {
			"id": "1000",
			"name": "Bamboo Watch"

		},
    {
			"id": "1000",
			"name": "Bamboo Watch"

		},
    {
			"id": "1000",
			"name": "Bamboo Watch"

		},
    {
			"id": "1000",
			"name": "Bamboo Watch"

		},
    {
			"id": "1000",
			"name": "Bamboo Watch"

		},
		{
			"id": "1001",
			"name": "Black Watch"
    }

  ];
  ngOnInit(): void {
  }
  DeleteEtab(etab){
   }
}
