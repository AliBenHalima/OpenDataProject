import { HttpClient } from '@angular/common/http';
import { HttpGet } from './../Utils/HttpCalls';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Pusher from 'pusher-js';
import { Feed } from '../Utils/feed';
import { environment } from 'src/environments/environment';
// declare var require: any
// declare global {
//   interface Window { io: any; }
//   interface Window { Echo: any; }
// }



// window.io = window.io || require('socket.io-client');
// window.Echo = window.Echo || {};
// var Echo=require('laravel-echo');
    @Injectable({
      providedIn: 'root',
    })

    export class FeedService {




// Pusher = require('pusher-js');



      token=localStorage.getItem("token");
      private subject: Subject<any> = new Subject<any>();
      public test: Subject<any> = new Subject<any>();
      public sujet;

      private pusherClient: Pusher;

      constructor(public HttpClient : HttpClient) {
        console.log('fff');
        this.pusherClient = new Pusher(environment.PUSHER_APP_KEY, {
          cluster: environment.PUSHER_CLUSTER
        });

        try {
            this.test.subscribe(data=>{
              // this.sujet = data.newVal.id
              // console.log("oldval newval ",data);
              // if(data.oldVal!=null){
              //   this.pusherClient.unsubscribe("chat."+data.oldVal.id);
              //   console.log("DISCONNECTED from",data.oldVal.id);
              // }



              Pusher.logToConsole = true;
              data.forEach(element => {


              let channel = this.pusherClient.subscribe("chat."+element.id);

              channel.bind(
                'PodcastProcessed',
                (result) => {

                  this.subject.next(result);
                  console.log("data",result);
                  setTimeout(this.ScrolltoEnd,100)
                },(error) => {console.log(error);
                }
              );


            });
              console.log(this.pusherClient.connection.state)

            })
        //   window.Echo = new Echo({
        //     broadcaster: 'pusher',
        //     key: environment.PUSHER_APP_KEY,
        //     cluster: environment.PUSHER_CLUSTER,
        //     forceTLS: true
        // });

        // window.Echo.channel('chat')
        // .listen('PodcastProcessed', (e) => {
        //   console.log("HHHHHHHHHHHHHHHHH");

        //    this.subject.next(e)

        //     console.log(e.user, e.chatMessage);
        // });



        }
        catch (error) {
          console.error('Here is the error message', error);
         }

      }
      getFeedItems(): Observable<Feed> {
        return this.subject.asObservable();
      }

      PushtoTest(data){
        this.test.next(data);
      }

      GetSujets(){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/sujets`,this.token);
      }
      GetMessages(sujet_id){
        return HttpGet(this.HttpClient,`${environment.APP_URL}/api/messages/${sujet_id}`,this.token);
      }

      ScrolltoEnd(){
        var myElement = document.getElementById('mychatelement');

        myElement.scrollTo(0,99999999);
              }

    }
