import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
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

@Component({
  selector: 'app-user-events-calendar',
  templateUrl: './user-events-calendar.component.html',
  styleUrls: ['./user-events-calendar.component.scss']
})
export class UserEventsCalendarComponent implements OnInit {
  @ViewChild('fc')  fc: FullCalendar;
  environment=environment;
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
  id
  Etablissement=JSON.parse(localStorage.getItem("Etablissement"));

  constructor(private EtablissementService : EtablissementService,private EvenementsService : EvenementsService,private messageService : MessageService,private confirmationService: ConfirmationService,private route:Router) { }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      // defaultDate: '2021-02-09T16:00:00',
      defaultDate:  new Date().toISOString().slice(0, 10),
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'newEventButton,dayGridMonth,timeGridWeek,timeGridDay'
      }, customButtons: {

      }
      ,dateClick: (e) =>  {
      },
      editable: true,
    eventClick: (e) => {
      console.log(e);

      this.GotoEvent(e.event);
    },
    droppable: false,
      disableDragging: true,

    eventReceive: (eventReceiveEvent) => {
      console.log("aaa",eventReceiveEvent);
      // eventReceiveEvent.event.setAllDay(false, {maintainDuration: true});
      eventReceiveEvent.eventColor = '#000000';
      eventReceiveEvent.event.eventColor = '#000000';
      eventReceiveEvent.event.css('background-color', '#000000');
      // this.eventService.addEvent(eventReceiveEvent);
    }
  }
  if(this.Etablissement!=null){
this.SelectedETab = this.Etablissement.id;

  this.EvenementsService.User_GetEventsByID(this.Etablissement.id).subscribe((result:any)=>{
    console.log("eventbyID",result.events);
    this.events=[]
    result.events.forEach(element => {
      this.events= [...this.events,new Event(element.id,element.titre,element.description,element.localisation,element.date_debut,element.date_fin,element.etablissement_id,element.eventtype_id,element.photo,this.Etablissement.color,this.Etablissement.color)]
    });
console.log("h",this.events);


  }) }





// this.APIS = [this.EtablissementService.Get_Etablissement(),this.EvenementsService.Get_EventTypes()]
// forkJoin(this.APIS).subscribe((data:any)=>{
//   console.log(data,"ggg");

//   this.etablissements = data[0].etablissements;
//   this.EventTypes = data[1].eventTypes;

// })

// this.form = new FormGroup({
//   titre: new FormControl('',[Validators.required]),
//   description: new FormControl('',[Validators.required]),
//   localisation: new FormControl('',[Validators.required]),
//   photo: new FormControl(''),
//   date_debut: new FormControl('',[Validators.required]),
//   date_fin: new FormControl('',[Validators.required]),
//   eventtype_id: new FormControl('',[Validators.required]),
//   etablissement_id: new FormControl('',[Validators.required]),
// })


}
GotoEvent(event) {
  console.log("event",event);
  this.route.navigate(['/user/events/',event.id]);
  }



// hideDialog() {
//   this.display = false;
//   this.update = false;
//   this.save = false;
// }


 getEventById(id){
 this.EvenementsService.User_GetEventsByID(id).subscribe((result:any)=>{
  console.log(result.events);
  this.events=[]
  result.events.forEach(element => {
    this.events= [...this.events,new Event(element.id,element.titre,element.description,element.localisation,element.date_debut,element.date_fin,element.etablissement_id,element.eventtype_id,element.photo)]
  });
console.log("h",this.events);
})
 }

gotoDate(date: Date) {
  this.fc.getCalendar().gotoDate(date);
  console.log(date);

}








  // DeleteEvent() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to Delete this Event ?',
  //     accept: () => {
  //       this.EvenementsService.DeleteEvent(this.form.get("id").value).subscribe((result) => {
  //         if (!result.success) {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'error',
  //             detail: result.message,
  //           });
  //           return;
  //         }
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'success',
  //           detail: 'Event Deleted',
  //         });
  //         this.events = this.events.filter((element) => element.id != this.form.get("id").value);
  //         this.display = false;
  //       });
  //     },
  //   });
  // }


}
