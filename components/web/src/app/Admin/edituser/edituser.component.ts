// import { AuthService } from 'src/app/Services/auth.service';
// import { UtilsService } from './../../Services/utils.service';
// import { MessageService } from 'primeng/api';
// import { Router, ActivatedRoute } from '@angular/router';
// import { EtablissementService } from './../../Services/etablissement.service';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-edituser',
//   templateUrl: './edituser.component.html',
//   styleUrls: ['./edituser.component.scss']
// })
// export class EdituserComponent implements OnInit {
//   form : FormGroup;
//   user_id: Number ;
//   constructor(private router : Router,public EtablissementService:EtablissementService,private _route: ActivatedRoute,private UtilsService : UtilsService
//     ,private messageService: MessageService, private AuthService :AuthService) { }

//   ngOnInit(): void {

//     this.form = new FormGroup({
//             nom: new FormControl('',[Validators.required]),
//             description: new FormControl('',[Validators.required]),
//             addresse: new FormControl('',[Validators.required]),
//             role : 1,

//           });
//     this.user_id = this._route.snapshot.params['user'] ;

//   }


// EditForm(){

//   console.log("val form",this.form.value);
//   this.AuthService.EditUser(this.user_id,this.form.value).subscribe((result)=>{
//     console.log("res",result);
//     if (result.success){
//       this.router.navigate(['/users']);
//     }
//     else{
//       console.log('false');
//       this.messageService.add({severity:'success', summary: 'Success', detail: 'Welcome Ali'});

//     }



//   });

// }



// }
