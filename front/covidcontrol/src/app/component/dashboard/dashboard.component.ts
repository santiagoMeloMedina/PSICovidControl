import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/service/routing/routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public routing: RoutingService) { }

  ngOnInit(): void {
  }

}
