import { HttpClient } from '@angular/common/http';
import { HttpGet } from './../Utils/HttpCalls';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Pusher from 'pusher-js';
import { Feed } from '../Utils/feed';
import { environment } from 'src/environments/environment';

    @Injectable({
      providedIn: 'root',
    })

    export class PrivatechatService {

      token=localStorage.getItem("token");
      user_id=localStorage.getItem("id");
      private subject: Subject<any> = new Subject<any>();
      public test: Subject<any> = new Subject<any>();
      public sujet;
      public MsgCount :Subject<any> = new Subject<any>();
      public AddOnline :Subject<any> = new Subject<any>();
      public removeOnline :Subject<any> = new Subject<any>();


      private pusherClient: Pusher;

      constructor(public HttpClient : HttpClient) {
        console.log('fff');
        this.pusherClient = new Pusher(environment.PUSHER_APP_KEY, {
          cluster: environment.PUSHER_CLUSTER,
          forceTLS: false,


          // authEndpoint: 'broadcasting/auth',
          authEndpoint: `${environment.APP_URL}/api/broadcasting/auth`,

          auth: {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        },

          // encrypted: true
        });

        try {
            // this.test.subscribe(data=>{
            //   data.forEach(element => {


                let channel = this.pusherClient.subscribe("private-PrivateChat."+this.user_id);

                channel.bind(
                  'PrivateMessages',
                  (result) => {

                    this.subject.next(result);
                    this.MsgCount.next(result.body.receiver_id);
                    console.log("data",result);

                  },(error) => {console.log(error);
                  }
                );
                channel.bind("pusher:subscription_error", (error) => {
                  console.log("error",error);

                });


              // });
                console.log(this.pusherClient.connection.state)

              // })

          }
          catch (error) {
            console.error('Here is the error message', error);
           }


              // this.sujet = data.newVal.id
              // console.log("oldval newval ",data);
              // if(data.oldVal!=null){
              //   this.pusherClient.unsubscribe("chat."+data.oldVal.id);
              //   console.log("DISCONNECTED from",data.oldVal.id);
              // }



              // Pusher.logToConsole = true;

              var presenceChannel :any= this.pusherClient.subscribe("presence-Online");

              presenceChannel.bind("pusher:subscription_succeeded",  (members)=> {
                var me = presenceChannel.members.me;
                var userId = me.id;
                var userInfo = me.info;
                let Users = []
                console.log(members.members,"MMMMMMMMMM");
                for (const property in members.members) {
                  this.AddOnline.next(members.members[property]);
                }
                // members.members.forEach(element => {
                //   this.Online.next(element);
                // });
                // for (let [key, value] of Object.entries(members.members)) {
                //    Users.push(value['user']);
                // }
              //   this.Online.next(Users);
              });
              presenceChannel.bind("pusher:member_added", (member) => {
                // For example
                console.log("Joining",member.info);
                this.AddOnline.next(member.info);
              });

              presenceChannel.bind("pusher:member_removed", (member) => {
                this.removeOnline.next(member.info);
              });


              presenceChannel.bind("pusher:subscription_error", (error) => {
                console.log("ERROR",error);

              });

              // presenceChannel.members.each(function (member) {
              //   var userId = member.id;
              //   var userInfo = member.info;
              //   console.log(member);
              //   alert(userId)

              // });
              // presenceChannel.bind("pusher:member_added", (member) => {
                // For example
              //   alert(member)
              // });

              // presenceChannel.bind("pusher:member_removed", (member) => {
              //   // For example
              //   // remove_member(member.id, member.info);
              // });

            }




      getFeedItems(): Observable<any> {
        return this.subject.asObservable();
      }
      getMsgCount(): Observable<any> {
        return this.MsgCount.asObservable();
      }

      getOnlineMembers(): Observable<any> {
        return this.AddOnline.asObservable();
      }

      RemoveOnlineMember(): Observable<any> {
        return this.removeOnline.asObservable();
      }

      PushtoTest(data){
        this.test.next(data);
      }


    }
