import { PrivatechatService } from './../../Services/privatechat.service';
import { AuthService } from 'src/app/Services/AuthService';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
id : string= localStorage.getItem('id');
photo = localStorage.getItem('photo')
MsgCount=0
Etablissement:any;
Etablissements:any;
  constructor(public AuthService :AuthService,public messageService : MessageService,private PrivatechatService : PrivatechatService) { }

  ngOnInit(): void {
    this.AuthService.watchStorage().subscribe(result=>{
      this.Etablissements=JSON.parse(localStorage.getItem("Etablissements"));
      this.Etablissement=JSON.parse(localStorage.getItem("Etablissement"));
    })
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  // .then(response => response.json())
  // .then(json => console.log("json"))
  this.AuthService.XXX().subscribe(result=>{
    console.log(result);

  })
    this.PrivatechatService.getMsgCount().subscribe(result=>{
      if(result == this.id)
          this.MsgCount= ++this.MsgCount
          console.log(result,'from header');

          // alert(this.MsgCount)
    })
  }
  Logout(){
    localStorage.clear();
    localStorage.setItem("Etablissements",JSON.stringify(this.Etablissements))
    this.AuthService.changeMessage({severity:'error',summary:'Message',detail:'Logged out'});
    // this.router.navigate(['/Login']);
  }

}
