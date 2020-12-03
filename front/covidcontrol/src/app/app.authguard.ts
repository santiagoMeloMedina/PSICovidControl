import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './service/authentication/authentication.service';
import { RoutingService } from './service/routing/routing.service';

@Injectable({
    providedIn: 'root'
})
export class ActionGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, 
                private routing: RoutingService,
                private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot): boolean {
        let result: boolean = false;
        let routeName: string = route.data['name'];
        let action: Object = environment.ACTION.ACTIONS.filter(section => {
            return section.id == routeName;
        })[0];
        let reroute: string = environment.ROUTING.REROUTE[routeName];
        let rol: string = this.authenticationService.getUser()[environment.AUTHENTICATION.ATTR.ROL];
        if (action['roles'].includes(rol)) {
            result = true;
        } else {
            result = false;
            this.routing.absoluteRoute(reroute);
        }
        return result;
    }

}

@Injectable({
    providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, 
                private routing: RoutingService,
                private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot): boolean {
        let result: boolean;
        if (this.authenticationService.isLogged()) {
            result = true;
        } else {
            result = false;
            this.routing.absoluteRoute(environment.ROUTING.REROUTE.DASHBOARD);
        }
        return result;
    }

}

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, 
                private routing: RoutingService,
                private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot): boolean {
        let result: boolean;
        if (!this.authenticationService.isLogged()) {
            result = true;
        } else {
            result = false;
            this.routing.absoluteRoute(environment.ROUTING.REROUTE.MAIN);
        }
        return result;
    }

}