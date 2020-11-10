import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/service/routing/routing.service';
import { DashboardService } from 'src/app/service/dashboard/dashboard.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public routing: RoutingService, 
              public dashboard: DashboardService,
              private router: Router) { }

  ngOnInit(): void {
    this.routing.setTitle(this.router.url);
  }

}
