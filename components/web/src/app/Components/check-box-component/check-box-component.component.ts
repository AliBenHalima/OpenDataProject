import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/app/Services/forms.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check-box-component',
  templateUrl: './check-box-component.component.html',
  styleUrls: ['./check-box-component.component.scss']
})
export class CheckBoxComponentComponent implements OnInit {

  selectedValues: string[] = [];
  @Input() input!:any;
  @Input() form!:FormGroup;
  options=[]


  constructor(public FormsService : FormsService) { }

  ngOnInit(): void {

  }

}
