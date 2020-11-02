import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/service/routing/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public routing: RoutingService) { }

  ngOnInit(): void {
  }

}
