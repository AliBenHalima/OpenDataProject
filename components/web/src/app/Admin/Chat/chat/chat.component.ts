import { EtablissementService } from './../../../Services/etablissement.service';
import { AuthService } from 'src/app/Services/AuthService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from './../../../Services/chat.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FeedService } from './../../../Services/feed.service';
import { Feed } from './../../../Utils/feed';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable, Subject } from 'rxjs';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

declare var $ ;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

  export class ChatComponent implements OnInit {
    public environment=environment.APP_URL;
    public feeds: Feed[] = [];
    public etab_id = +localStorage.getItem("etablissement_id");
    public Localrole_id= +localStorage.getItem('role_id') ;
    public  SelectedSearchEtab:any=[];
    public etablissements =[];
    public  sujets =[]
    public messages
    public feedSubscription: Subscription;
    public subject: Subject<Feed> = new Subject<Feed>();
    public message="";
    public Allmessages:Array<any>
    public CurrentSujet=null;
    public pusherClient: Pusher;
    public form :FormGroup
    public displayModal;
    public users=[];
    public user_id = +localStorage.getItem("id");
    public role_id = +localStorage.getItem("role_id");
    public visibleSidebar2;
    public newmsg =[];
    public CurrentChatName ="";
    public searchText ;
    public OriginalSujets ;
    Localrole=JSON.parse(localStorage.getItem('isSuperAdmin'));

    constructor(private feedService: FeedService,
      private confirmationService : ConfirmationService,
      private messageService : MessageService,
      private AuthService : AuthService,
      private EtablissementService : EtablissementService,
      private ChatService : ChatService) {}

    ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      etablissement_id: new FormControl(this.etab_id, [Validators.required]),
    });
    this.FetchEtablissements();

this.AuthService.Get_Users(this.etab_id).subscribe(result=>{
  this.users= result.users;
})


      this.feedSubscription = this.feedService
      .getFeedItems()
      .subscribe((message: any) => {
          this.ScrollDown()

        console.log("message",message);
        this.messages.push(message.body)

        this.sujets.map(element=>{
          if(message.user.id ==this.user_id) return;
          if (element.id== message.body.sujet_id){
            if(element.count){
            element.count++
            element.msg = message.body
            element.newmsg=message.body.contenu
            element.newmsgDate=message.body.created_at


           return element
            }
           else{
            element.msg = message.body
            element.count=1
            element.newmsg=message.body.contenu
            element.newmsgDate=message.body.created_at
            console.log("AAAA",this.sujets);


           }
          }
        })
        // this.SortArray(this.sujets)
        // message.body.new=1;
        // this.newmsg.push(message.body)
        // let element = document.getElementById("'chat'+message.body.user_id").innerHTML="<span class='ks-group-amount'>new</span>"
        // this.Allmessages = [...this.Allmessages ,message.body]
        // this.FiltermessagesBySujet(message.body.sujet_id)
        this.Allmessages = this.messages.filter(msg=>msg.sujet_id == message.body.sujet_id)
        this.ScrollDown()
        this.message =""
      });

      this.fetchMessages();
      this.fetchSujets();
      // this.feedService.GetSujets().subscribe(result=>{
      //   this.sujets = result.sujets
      //   this.setSujet(this.sujets)
      //   console.log("sujets",this.sujets);
      // });

      // this.feedService.GetMessages(this.CurrentSujet).subscribe(result=>{
      //   this.messages = result.messages
      //   console.log("messages",this.messages);
      // });





        }



        SendMessage(){

          if(this.message==""){
            alert('Plase insert message')
            return;
          }
          this.ChatService.Send({contenu : this.message,sujet_id:this.CurrentSujet.id}).subscribe(result=>{
              setTimeout(this.ScrolltoEnd,100)
          })
        }
        fetchMessages(){
          this.ChatService.fetchMessages().subscribe(result=>{
            this.messages= result.messages;
            console.log("all messages",this.Allmessages);
          })
        }
        fetchSujets(){
          let id
          if(this.Localrole==false) id=this.etab_id
          else{
            id= null
          }
          this.ChatService.fetchAllSujets(id).subscribe(result=>{
            this.OriginalSujets =  result.sujets;
            this.sujets= this.OriginalSujets

            this.sujets = this.sujets.filter((element=> element.etablissement_id == this.SelectedSearchEtab))


            this.CurrentChatName = result.sujets[0].name;
            this.feedService.PushtoTest( this.sujets)
            if(result.sujets.length==0){
              this.displayModal=true
              return;
            }
            this.setSujet(null,result.sujets[0]);
          })
        }

        ScrolltoEnd(){
          window.scrollTo(0,99999999);
        }

        setSujet(oldVal,newVal){
          this.CurrentSujet = newVal
          this.Allmessages = this.messages.filter(msg=>msg.sujet_id == newVal.id)
          this.ScrollDown()
        }
        FiltermessagesBySujet(sujet_id){
          if (!this.SelectedSearchEtab) {alert("Please select an etablissement"); return ; }
         this.Allmessages = this.messages.filter(msg=>msg.sujet_id == sujet_id)
         this.ScrollDown()
         this.sujets.map(element=>{

          if (element.id==sujet_id){
            if(element.count>0){
            element.count=0
            element.msg =null
            element.newmsg=null
            element.newmsgDate=null
            console.log("AAAA",this.sujets);

           return element
         }}});

         console.log("current",this.CurrentSujet);
         console.log("new messages all",this.Allmessages);

        }

        DeleteSujet(id){
          this.confirmationService.confirm({
            message: 'Are you sure that you want to Delete this role?',
            accept: () => {
              this.ChatService.Deletesujet(id).subscribe(result=>{

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
                  detail: 'Role Deleted',
                });
                this.sujets = this.sujets.filter((element) => element.id != id);
              });
            }
          });

        }

        HandleForm() {
          this.ChatService.AddSujet(this.form.value).subscribe(
            (result) => {
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
                detail: 'Sujet added',
              });
              this.form.addControl('id', new FormControl(result.sujet.id, Validators.required));
              this.sujets = [...this.sujets, this.form.value];
              this.displayModal = false;

            },
            (err) => {
              console.log(err);
            }
          );
        }

        openNew() {
          console.log("tab",this.SelectedSearchEtab);

          this.displayModal = true;
          this.form.patchValue({
            name: '',
            etablissement_id: this.SelectedSearchEtab,
          });
        }
        hideDialog() {
          this.displayModal = false;

        }
        ScrollDown(){
          setTimeout(function () {
            document.getElementById("mychatelement2").scrollTo(0,99999)
          },0);
        }

        onSearchChange(value){
          this.sujets = this.OriginalSujets
          this.sujets = this.sujets.filter(sujet=>sujet.name.toLocaleLowerCase().includes( value.toLocaleLowerCase()));
     }

    OnChangeEtab(event){
      this.SelectedSearchEtab = event.value
      console.log("Nani",this.SelectedSearchEtab);

     this.sujets=  this.OriginalSujets;
    if(event.value!=null)
      this.sujets = this.sujets.filter((element=> element.etablissement_id == event.value))
      if(this.sujets.length==0)
        this.Allmessages=[]
    }
    FetchEtablissements(){
      this.EtablissementService.Get_Etablissement().subscribe(result=>{
        this.etablissements = result.etablissements;
        this.SelectedSearchEtab = result.etablissements[0].id
      })
    }

    }











