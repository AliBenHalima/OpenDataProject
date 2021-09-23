import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommentService } from './../../../Services/comment.service';
import { EvenementsService } from './../../../Services/evenements.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EtablissementService } from 'src/app/Services/etablissement.service';
import { AuthService } from 'src/app/Services/AuthService';
import { Subject} from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-evenementslist-template',
  templateUrl: './evenementslist-template.component.html',
  styleUrls: ['./evenementslist-template.component.scss']
})
export class EvenementslistTemplateComponent implements OnInit {
  environment=environment.APP_URL;
Events:any =[];
Etablissements : any=[];
EventTypes : any=[];
displayModal:Boolean=false;
displayMailModal:Boolean=false;
id ;
idk;
SelectedETab;
Localrole_id= +localStorage.getItem('role_id') ;
OriginalUsers;
id_etab;
permissions=[]
Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));
Localetablissement_id= +localStorage.getItem('etablissement_id')
my_id= +localStorage.getItem('id')
data
text1: string;
negative:number=0;
neutral:number=0;
positive:number=0;
totalComments:number=0;
SelectedEvent;
message;
displayInfo;
form:FormGroup;
Array2=[]
// SatisfactionArray:Array<number> = [];
activityValues:number[] = [0, 100];
test :Subject<any> = new Subject<any>() ;
@ViewChild('dt') table: Table;
constructor(private EtablissementService : EtablissementService,private EvenementsService : EvenementsService,private messageService : MessageService,private confirmationService: ConfirmationService,private CommentService :CommentService ) {
 }

  ngOnInit(): void {
    this.form = new FormGroup({
      subject: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required]),
    })

    this.EvenementsService.Get_EventTypes().subscribe(result=>{
      this.EventTypes = result.eventTypes;
    })

    this.id_etab= this.Localrole ? null  : this.Localetablissement_id;
    this.EvenementsService.GetEventsID(this.id_etab).subscribe(events => {
      events.permissionNames.forEach(element => {
        this.permissions.push(element.name)
      });

      this.Events =events.event
      this.OriginalUsers = events.event
       this.Events =this.Events.map(element => {
        element.score= this.Satisfaction(element.users);
        return element;
       });
           });

  this.EtablissementService.Get_Etablissement().subscribe(result =>{
  console.log(result.etablissements);
  this.Etablissements =result.etablissements;
    });
  }

hideDialog(){
  this.displayModal=false;
  this.negative=0
this.neutral=0
 this.positive=0
 this.totalComments=0;
}
onHide(){
  this.hideDialog();
}
showDialog(comments,event){
  this.CalculateRate(comments)
  this.displayModal=true;
  this.data = {
    labels: ['Positive','Neutral','Negative'],
    datasets: [
        {
            data: [this.positive, this.neutral, this.negative],
            backgroundColor: [
                "#0000FF",
                "#FFCE56",
                "#FF0000"
            ],
            hoverBackgroundColor: [
              "#0000FF",
              "#FFCE56",
              "#FF0000"
            ]
        }]
    };
    this.SelectEvent(event);
}
CalculateRate(comments){
  comments.forEach(element => {
    if(element.pivot.classification=="negative"){
      this.negative=this.negative + 1;
    }else if (element.pivot.classification=="neutral"){
      this.neutral=this.neutral+1;
    }else{
      this.positive++;
    }
  });
this.totalComments=comments.length;

  return;

}
SelectEvent(event){
this.SelectedEvent = event;
}

Satisfaction(comments:Array<any>):Number{
  let positive=0;
    comments.forEach(element=>{
      if(element.pivot.classification=="positive"){
        positive=positive+1;
      }
      return;
    });
    let rate =(positive*100) / comments.length;
    rate = rate || 0 ;

  return +rate.toFixed(2);
  }

  Get_Etablissement_Name(id){
   return  this.Etablissements.filter(etab => etab.id == id);
  }

  DeleteUser(id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Event ?',
      accept: () => {
        this.EvenementsService.DeleteEvent(id).subscribe((result) => {
          if (!result.success) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: result.message,
            });
            return;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Event Deleted',
          });
      this.Events=this.Events.filter(element => element.id != id)
   });
    }

  });
}
goToLink(url: string){
  window.open(url, "_blank");
}

OnChangeEtab(event){
  this.SelectedETab = event.value

this.Events=  this.OriginalUsers;
if(event.value!=null)
  this.Events = this.Events.filter((element=> element.etablissement_id == event.value))
}

onHideMail(){
  this.displayMailModal=false;
  this.form.controls['subject'].setValue("");
  this.form.controls['message'].setValue("");
  this.message="";
}

showMailDialog(event){
  if(event.users.length==0){
    this.displayInfo=true;
    return ;
  }
  this.displayMailModal=true;
  this.SelectEvent(event);
}
SendMail(comments){

  let ids=[];
  comments.forEach(element => {
    if(!ids.includes(element.id)){
        ids.push(element.id);
    }
    return;
});
let data={
  subject:this.form.get("subject").value,
  message:this.message,
  users:ids
}
this.CommentService.SendMail(data).subscribe(result=>{
  if(!result.success){
    this.messageService.add({
      severity: 'error',
      summary: 'error',
      detail: result.message,
    });
    return;
  }
  this.messageService.add({
    severity: 'success',
    summary: 'success',
    detail: 'Mail sent',
  });
  this.onHideMail();
})
}

onActivityChange(event) {
  const value = event.target.value;
  if (value && value.trim().length) {
    const activity = parseInt(value);

    if (!isNaN(activity)) {
      this.table.filter(activity, 'score', 'gte');
    }

  }
}

}
