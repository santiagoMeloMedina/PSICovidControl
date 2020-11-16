import { Component, OnInit } from '@angular/core';
import { Citizen } from 'src/app/model/citizen.model';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/service/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-view',
  templateUrl: './qr-view.component.html',
  styleUrls: ['./qr-view.component.scss']
})
export class QrViewComponent implements OnInit {

  private userProfile: Citizen = null;

  constructor(private userService: UserService, 
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.setUserProfile();
  }

  public setUserProfile(): void {
    this.userService.getCitizen(this.authenticationService.getUser()['username']).then(result => {
      this.userProfile = result;
    });
  }

  public getDataForQr(): string {
    let result: string = "No information";
    if (this.userProfile != null) {
      let info: Object = {
        "name": this.userProfile.getName(),
        "lastname": this.userProfile.getLastname(),
        "docNum": this.userProfile.getDocNum(),
        "docType": this.userProfile.getDocType()
      }
      result = JSON.stringify(info);
    }
    return result;
  }

  public saveQrImage(qrcode: any): void {
    const qrcode_rlement = qrcode.qrcElement.nativeElement.querySelector("img").src;
    let data = this.getBlobFromBase64(qrcode_rlement);
    const blob = new Blob([data], { type: "image/png" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = environment.VALUE.QRCODE.QR_FILE(this.userProfile.getUsername());
    link.click();
  }

  private getBlobFromBase64(base64: any) {
    const parts = base64.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

}
