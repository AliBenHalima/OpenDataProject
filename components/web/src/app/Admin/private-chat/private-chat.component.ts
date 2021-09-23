import { PrivatechatService } from './../../Services/privatechat.service';
import { ChatService } from './../../Services/chat.service';
import { FeedService } from './../../Services/feed.service';
import { AuthService } from 'src/app/Services/AuthService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable, Subject } from 'rxjs';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {
  public environment=environment.APP_URL;

    public feeds: [] = [];
    public  sujets =[]
    public messages=[]
    public feedSubscription: Subscription;
    public subject: Subject<any> = new Subject<any>();
    public message="";
    public Allmessages:Array<any>
    public CurrentSujet=null;
    public pusherClient: Pusher;
    public form :FormGroup
    public displayModal;
    public users=[];
    public etab_id = +localStorage.getItem("etablissement_id");
    public user_id = +localStorage.getItem("id");
    public visibleSidebar2;
    public CurrentFriend;
    public chatname;
    public notification=[]
    public Latestmsg=""
    public searchText ;
    public OriginalUsers ;
    public OnlineMembers=[] ;
    public checked ;
    conv
    OriginalConv
    constructor(private feedService: FeedService,
      private confirmationService : ConfirmationService,
      private messageService : MessageService,
      private AuthService : AuthService,
      private PrivatechatService :PrivatechatService,
      private ChatService : ChatService) {}

    ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      etablissement_id: new FormControl(this.etab_id, [Validators.required]),
    });


    this.AuthService.Get_Users(this.etab_id).subscribe(result=>{
      this.OriginalUsers = result.users

    this.users= this.OriginalUsers


    this.CurrentFriend = result.users.find(user=>user.id!=this.user_id)
    this.fetchPrivateMsg(this.CurrentFriend);
  console.log("CurrentFriend",this.CurrentFriend);

    this.PrivatechatService.PushtoTest( this.users)

  })


    this.ChatService.getPrivateConversations().subscribe(result=>{


    this.conv = result.conversations.filter(ele=>
        ele.etablissement_id==this.etab_id
      )

      this.OriginalConv =this.conv.map((element)=>{
        if(element.users){
          if(element.users.id==this.user_id){
            let user = this.users.find(e=>e.id==element.receiver_id)

            user.newmsg=element.contenu
            user.newmsgDate=element.created_at
            return user
          }else{
            let user=element.users
            user.newmsg=element.contenu
            user.newmsgDate=element.created_at
            return user
          }
        }
        return element

      })
      this.users = this.OriginalConv


      console.log("HEEEEEEEEEEEEEERe",this.users);
    });




      this.feedSubscription = this.PrivatechatService
      .getFeedItems()
      .subscribe((message: any) => {

        console.log("message",message);
        this.messages.push(message.body)
        // this.notification.push(message.body)
        this.users.map(element=>{

          if (element.id== message.body.user_id){
            if(element.count){
            element.count++
            element.msg = message.body
            element.newmsg=message.body.contenu
            element.newmsgDate=message.body.created_at
            this.OnlineMembers[element]=element
           return element
            }
           else{
            element.count=1
            element.msg = message.body
            element.newmsg=message.body.contenu
            element.newmsgDate=message.body.created_at
            this.OnlineMembers[element]=element

           }
          }
        })
        this.SortArray(message.body.user_id)
        console.log("Please",this.users);

      //  console.log("&&&&&",this.CheckNotif(message.body.receiver_id));



      //  this.notification= this.notification.map(element=>{
      //     if (element.id ==message.body.receiver_id){
      //       return element.count++
      //     }
      //     element.id =message.body.receiver_id
      //     element.count =1
      //   })


        // this.notification.push({id:message.body.receiver_id,count:++});
        // this.Allmessages = [...this.Allmessages ,message.body]
        this.FiltermessagesByReceiver(message.body.receiver_id)
        this.message =""
      });

       this.PrivatechatService.getOnlineMembers().subscribe((member: any) => {
        this.OnlineMembers.push(member);

        console.log("Online members",this.OnlineMembers);
        // this.users= this.users.map(element=>{
        //   if (element.id == member.id){
        //     element.online = true
        //     debugger
        //     return element
        //   }
        // })


        // debugger   ;

      });

      this.PrivatechatService.RemoveOnlineMember().subscribe((member: any) => {
        this.OnlineMembers = this.OnlineMembers.filter((element) => element.id != member.id);
      });






      // this.fetchSujets();
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
          this.ChatService.SendPrivateMessages({contenu : this.message,receiver_id:this.CurrentFriend.id}).subscribe(result=>{
        this.messages.push(result.message);
            this.users.forEach(e=>{
          if(e.id == this.CurrentFriend.id){
              e.newmsg = result.message.contenu
              e.created_at= result.message.created_at
          }

          })
          this.SortArray(this.CurrentFriend.id)
        });
      }
        // fetchMessages(){
        //   this.ChatService.fetchMessages().subscribe(result=>{
        //     this.messages= result.messages;
        //     console.log("all messages",this.Allmessages);
        //   })
        // }
        // fetchSujets(){
        //   this.ChatService.fetchSujet(this.etab_id).subscribe(result=>{
        //     this.sujets= result.sujets;
        //     this.feedService.PushtoTest( this.sujets)
        //     this.setSujet(null,result.sujets[0]);
        //     console.log("all sujets",this.sujets);


        //   })
        // }

        ScrolltoEnd(){
          document.getElementById('mychatelement').scrollTo(0,99999);
        }
        setSujet(oldVal,newVal){

          this.CurrentSujet = newVal
          this.FiltermessagesByReceiver(newVal.id)
          // this.feedService.PushtoTest({oldVal:oldVal , newVal : newVal})

        }
        FiltermessagesByReceiver(receiver_id){
          console.log("filter",this.messages);
         this.Allmessages = this.messages.filter(msg=>msg.receiver_id == receiver_id)
        //  this.Latestmsg=  this.Allmessages[ this.Allmessages.length - 1]

         setTimeout(this.ScrolltoEnd,1000)
         console.log("current",this.CurrentSujet);
         console.log("new messages all",this.Allmessages);

        }


        openNew() {

          this.displayModal = true;
          this.form.patchValue({
            name: '',
            etablissement_id: this.etab_id,
          });
        }
        hideDialog() {
          this.displayModal = false;

        }
        setCurrentFriend(user){
          this.CurrentFriend = user;
          this.FiltermessagesByReceiver(user.id)
        }

        fetchPrivateMsg(user){
          this.visibleSidebar2 = false
          this.ChatService.FetchFriendmsg(user.id).subscribe(result=>{
              this.messages = result.users
             console.log("check",this.messages);
             this.chatname = user.name
            this.ScrollDown();
          })

          this.setCurrentFriend(user);
          this.setCountNewMsgs(user);

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
          this.ChatService.SendPrivateMessages(this.form.value).subscribe(
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
              this.sujets.push(this.form.value);
              this.sujets = [...this.sujets, this.form.value];


              this.displayModal = false;

            },
            (err) => {
              console.log(err);
            }
          );
        }

        setCountNewMsgs(user){

          let found =this.users.find(element=>element.id == user.id)
          found.count=0
        console.log("Check users set",this.users);

        }

        onSearchChange(value){
          this.users = this.OriginalConv
          this.users = this.users.filter(user=>user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
     }

     ScrollDown(){
      setTimeout(function () {
        document.getElementById("mychatelement1").scrollTo(0,99999)
      },0);
    }

    CheckOnline(id){
    return  this.OnlineMembers.find(e=>e.id == id) ? true : false ;
    }

    ToggleOnline(event){
      this.users = this.OriginalConv
      let arr=[]
      if(event.checked){

        this.OnlineMembers.forEach(e=>{
        var temp=  this.users.find(element=>element.id==e.id)
        arr.push(temp)
        })
        this.users= arr
      }

    }

//         let alt = this.users.filter(element=>element.newmsg)

//         if(alt.length==0) {
//           this.users = this.OnlineMembers
//           return;
//         }
//         this.OnlineMembers= this.OnlineMembers.map(element=>{
//          let x = alt.find(e=>element.id)
// console.log("x",x);

//           if(element.id ==alt.find(e=>element.id).id && element.id != +this.user_id){

//             return alt.find(e=>element.id)
//           }

//         })
//       this.users = this.OnlineMembers
//         console.log("on",this.OnlineMembers);


 SortArray(id){
  this.users.forEach((item,i)=>{
    if(item.id == id){
      this.users.splice(i, 1);
      this.users.unshift(item);
    }
  });
 }

      // try {

      //   this.pusherClient = new Pusher('22cb5f267d67bb77e2a9');

      //   let channel = this.pusherClient.subscribe('chat');

      //   channel.bind(
      //     'PodcastProcessed',
      //     (data: { title: string; body: string}) => {
      //       this.subject.next(new Feed(data.title, data.body));
      //     }
      //   );


      //   catch (error) {
      //     console.error('Here is the error message', error);
      //    }


      // getFeedItems(): Observable<Feed> {
      //   return this.subject.asObservable();
      // }
    }












