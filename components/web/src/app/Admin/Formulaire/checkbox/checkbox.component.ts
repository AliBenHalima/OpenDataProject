import { FormsService } from './../../../Services/forms.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  selectedValues: string[] = [];
  @Input() table!:any;
  @Input() field!:any;
  @Input() input!:any;
  @Input() form!:FormGroup;
  options=[]

  constructor(public FormsService : FormsService) { }

  ngOnInit(): void {
    this.FormsService.User_GetTableFieldsValues({table:this.table,field:this.field}).subscribe(result=>{
      console.log(result.data);
      this.options = result.data
    })
  }

}
