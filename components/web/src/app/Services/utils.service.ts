import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public AuthService : AuthService,private router:Router,private messageService: MessageService, private primengConfig: PrimeNGConfig)
  { }

  showSuccess(severity_:string, summary_:string,detail_:string  ) {
   return this.messageService.add({severity:severity_, summary:summary_ , detail: detail_});
}
}

