
import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/Services/roles.service';

@Component({
  selector: 'app-crudrole',
  templateUrl: './crudrole.component.html',
  styleUrls: ['./crudrole.component.scss']
})
export class CrudroleComponent implements OnInit {
  roles  ;
  constructor(public RolesService: RolesService) { }

  ngOnInit(): void {
    this.RolesService.GetRoles().subscribe(data=>{
      this.roles = data.role
      console.log(data.role);

    });
  }


}
