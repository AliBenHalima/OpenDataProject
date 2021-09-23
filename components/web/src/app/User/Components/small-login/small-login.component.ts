import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-small-login',
  templateUrl: './small-login.component.html',
  styleUrls: ['./small-login.component.scss']
})
export class SmallLoginComponent implements OnInit {
   @Input() displayLogin:boolean;
  form:FormGroup;
  @Output() countChanged: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.countChanged.emit(this.displayLogin);

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  hideDialog() {
    this.displayLogin = false;
  }
  HandleForm() {
  }

}
