import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-showform',
  templateUrl: './showform.component.html',
  styleUrls: ['./showform.component.scss']
})
export class ShowformComponent implements OnInit {

  constructor(
    public FormsService : FormsService
  ) { }
  questions=[]
  FormData:any
  form:any;
  ngOnInit(): void {

    this.FormsService.GetFormById(48).subscribe((result)=>{
      console.log("result",result);
      this.FormData = result.form
    })

  }

  onSubmit(){

  }

}
