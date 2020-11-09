import { Component, OnInit } from '@angular/core';
import { RoutingService } from './service/routing/routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covidcontrol';

  constructor(private routing: RoutingService, 
              private router: Router) {}
  
  ngOnInit(): void {
    this.routing.setTitle(this.router.url);
  }
}
