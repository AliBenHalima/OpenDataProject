
import { MessageService, ConfirmationService } from 'primeng/api';
import { exhaustMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { EvenementsService } from './../../../Services/evenements.service';
import { EtablissementService } from './../../../Services/etablissement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendar} from 'primeng/fullcalendar';
import { Event } from 'src/app/Utils/Event';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-crud-events',
  templateUrl: './crud-events.component.html',
  styleUrls: ['./crud-events.component.scss'],
})



export class CrudEventsComponent implements OnInit {
  environment=environment.APP_URL;

  @ViewChild('fc')  fc: FullCalendar;

  date_debut: Date;
  date_fin: Date;
  display;
  etablissements:[]=[]
  SelectedETab : Number=0 ;
  save;
  update;
  SelectedEventType;
  SelectedEtablissement:Number;
  APIS: Array<any>
  EventTypes : Array<any>
  form:FormGroup
  Subject$ = new Subject();
  events: Array<any>=[];
  options: any;
  Selectedfile:any;
  photo:string="";
  uploadedFiles:Array<any>=[]
  permissions:Array<any>=[];
  id:any;
  id_etab:any;
  Localrole_id= +localStorage.getItem('role_id') ;
  Localetablissement_id= +localStorage.getItem('etablissement_id')
  Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));

  constructor(private EtablissementService : EtablissementService,private EvenementsService : EvenementsService,private messageService : MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.id_etab = this.Localrole ? 0 :  this.Localetablissement_id;
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate:  new Date().toISOString().slice(0, 10),
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'newEventButton,dayGridMonth,timeGridWeek,timeGridDay'
      }, customButtons: {
        newEventButton:{
          text:"New Event",
          click: this.click.bind(this)
        }
      }
      ,dateClick: (e) =>  {


    },editable: true,
    eventClick: (e) => {
      console.log(e);

      this.editEvent(e.event);
    },

    eventDragStop: (eventDragStopEvent) => {
      console.log("EVENT DRAG STOP !!!",eventDragStopEvent);
    },

    eventReceive: (eventReceiveEvent) => {
      console.log("EVENT received",eventReceiveEvent);
    }
  }
  if(!this.Localrole){
this.SelectedETab = this.Localetablissement_id;

  this.EvenementsService.GetEventsByID(this.Localetablissement_id).subscribe((result:any)=>{
    console.log("eventbyID",result.events);
    this.events=[]
    result.events.forEach(element => {
      this.events= [...this.events,new Event(element.id,element.titre,element.description,element.localisation,element.date_debut,element.date_fin,element.etablissement_id,element.eventtype_id,element.photo)]
    });
    this.permissions=result.permissionNames.map(e=>e.name);

  }) }

this.APIS = [this.EtablissementService.Get_Etablissement(),this.EvenementsService.Get_EventTypes()]
forkJoin(this.APIS).subscribe((data:any)=>{
  console.log(data,"ggg");

  this.etablissements = data[0].etablissements;
  this.EventTypes = data[1].eventTypes;
  if(this.Localrole){
  this.SelectedETab=data[0].etablissements[0].id
  this.getEventById(this.SelectedETab);
  }
})

this.form = new FormGroup({
  titre: new FormControl('',[Validators.required]),
  description: new FormControl('',[Validators.required]),
  localisation: new FormControl('',[Validators.required]),
  photo: new FormControl(''),
  date_debut: new FormControl('',[Validators.required]),
  date_fin: new FormControl('',[Validators.required]),
  eventtype_id: new FormControl('',[Validators.required]),
  etablissement_id: new FormControl('',[Validators.required]),
})

this.Subject$.pipe(
  exhaustMap((formData) =>
    this.EvenementsService.AddEvent(formData).pipe(
      tap((res: any) => console.log(res))
    )
  )
).subscribe(
  (result) => {
    console.log('events', this.events);
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
      detail: 'Event added',
    });
    this.events = [...this.events,new Event(+result.event,this.form.get("titre").value,this.form.get("description").value,this.form.get("localisation").value,this.date_debut,this.date_fin,this.SelectedEventType,this.SelectedETab,result.eventimage)];

    this.display = false;
  },
  (err) => {
    console.log(err);
  }
);
}

HandleForm() {
console.log(this.form.get('date_debut').value.toISOString());
  console.log(this.form.value);

  let formData :FormData = new FormData();
  formData.append('photo', this.Selectedfile,this.Selectedfile.name);
  formData.append('titre', this.form.get('titre').value);
  formData.append('description', this.form.get('description').value);
  formData.append('localisation', this.form.get('localisation').value);
  formData.append('date_debut', this.form.get('date_debut').value.toISOString());
  formData.append('date_fin', this.form.get('date_fin').value.toISOString());
  formData.append('eventtype_id', this.form.get('eventtype_id').value);
  formData.append('etablissement_id', this.form.get('etablissement_id').value);
  this.Subject$.next(formData);
}

onSelect(event) {
  this.uploadedFiles.push(event.currentFiles[0]);
  this.Selectedfile =event.currentFiles[0];
}

hideDialog() {
  this.display = false;
  this.update = false;
  this.save = false;

}


OnChangeEtab(event){
  console.log(event);
if(event.value==null){
  this.SelectedETab=null
  return ;
}
this.getEventById(event.value);
 }

 getEventById(id){
 this.EvenementsService.GetEventsByID(id).subscribe((result:any)=>{
  console.log(result.events);
  this.events=[]
  result.events.forEach(element => {
    this.events= [...this.events,new Event(element.id,element.titre,element.description,element.localisation,element.date_debut,element.date_fin,element.etablissement_id,element.eventtype_id,element.photo)]
  });
  this.permissions=result.permissionNames.map(e=>e.name);

console.log("h",this.events);
})
 }

gotoDate(date: Date) {
  this.fc.getCalendar().gotoDate(date);
  console.log(date);

}
click(){
  if(!this.permissions.includes('create events')){
    window.alert("You dont have permissions to create events")
    return;
  }
  if(this.SelectedETab!=null){
    this.openNew();
    return ;
  }
  window.alert("Select an Etablissement")
}
dropdown() {

}
openNew() {
  this.save = true;
  this.display = true;

  this.form.addControl('etablissement_id', new FormControl('', Validators.required));

  this.form.patchValue({
    titre: '',
    description: '',
    localisation:'',
    date_debut: '',
    date_fin: '',
    eventtype_id:'',
    photo:'',
    etablissement_id:this.SelectedETab
})
this.photo=null;
this.SelectedEventType=null;
}
editEvent(event) {
  if(!this.permissions.includes('update events')|| !this.permissions.includes('update events')){
    window.alert("You dont have permissions to modify events")
    return;
  }
  this.update = true;
  this.display = true;
  this.SelectedEventType=event.extendedProps.eventtype_id ;

this.date_debut =event.start;
this.date_fin =event.start;
this.photo = event.extendedProps.photo;

this.form.addControl('id', new FormControl(event.id, Validators.required));
    this.form.patchValue({
      id:event.id,
      titre: event.title,
      description: event.extendedProps.description,
      localisation:event.extendedProps.localisation,
      photo:event.extendedProps.photo,
      date_debut: this.date_debut,
      date_fin: this.date_fin,
      eventtype_id: this.SelectedEventType,
      etablissement_id:this.SelectedETab
    });

  }

  updateEvent(){
console.log(this.form.value);
let formData :FormData = new FormData();
  formData.append('id', this.form.get('id').value);
  if(this.Selectedfile){
    formData.append('photo', this.Selectedfile,this.Selectedfile.name);
  }
  formData.append('titre', this.form.get('titre').value);
  formData.append('description', this.form.get('description').value);
  formData.append('localisation', this.form.get('localisation').value);
  formData.append('date_debut', this.form.get('date_debut').value.toISOString());
  formData.append('date_fin', this.form.get('date_fin').value.toISOString());
  formData.append('eventtype_id', this.form.get('eventtype_id').value);
  formData.append('etablissement_id', this.form.get('etablissement_id').value);

this.EvenementsService.UpdateEvent(formData,this.form.get('id').value).subscribe((result) => {
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
    detail: 'Event updated',
  });
  this.display = false;

    let element = this.events.filter((element) => element.id == this.form.get("id").value);
  this.events = this.events.map(obj=>{
    if(obj.id ==  this.form.get("id").value){
      return  obj = new Event(element[0].id,this.form.get("titre").value,this.form.get("description").value,this.form.get("localisation").value,this.date_debut,this.date_fin,this.SelectedEventType,this.SelectedETab,result.eventimage)
    }
    return obj
  })

});
  }

  DeleteEvent() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Event ?',
      accept: () => {
        this.EvenementsService.DeleteEvent(this.form.get("id").value).subscribe((result) => {
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
          this.events = this.events.filter((element) => element.id != this.form.get("id").value);
          this.display = false;
        });
      },
    });
  }

}
