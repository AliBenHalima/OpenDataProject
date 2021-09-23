import { AuthService } from 'src/app/Services/AuthService';
import { Component, OnInit, NgZone } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  Etablissements = [];
  Etablissement = JSON.parse(localStorage.getItem('Etablissement'));
  constructor(
    private ngZone: NgZone,
    private AuthService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.AuthService.watchStorage().subscribe((result) => {
      this.Etablissements = JSON.parse(localStorage.getItem('Etablissements'));
    });

    this.AuthService.currentToast.subscribe((data: any) => {
      if (data.length == 0) return;
      setTimeout(() => {
        this.messageService.add({
          severity: data.severity,
          summary: data.summary,
          detail: data.detail,
        });
      }, 1000);
    });
  }
}
