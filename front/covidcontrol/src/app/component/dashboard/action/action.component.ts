import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getActions(): Object[] {
    return [
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
      {
        name: "Parametrizar",
        description: "Parametrizar",
        image: "assets/icons/user.png"
      },
    ];
  }

}
