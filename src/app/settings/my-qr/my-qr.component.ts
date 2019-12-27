import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConstants } from 'src/app/constants/config.constants';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-my-qr',
  templateUrl: './my-qr.component.html',
  styleUrls: ['./my-qr.component.scss'],
})
export class MyQRComponent implements OnInit {
  qrCode:any;
  constructor(public navCtrl: NavController,
              private _restService: RestService,
              private socialSharing: SocialSharing,
              public loading: LoadingService,
              public toastService: ToastService,
              private base64ToGallery: Base64ToGallery) { }

  ngOnInit() {
    this.loading.present();
    this.getQRCode();
  }

  getQRCode(){
    this._restService.httpGetServiceCall(AppConstants.myQRCodeEndPoint)
    .subscribe((response:any) => {
      this.qrCode="data:image/png;base64," + response.qr;
      this.loading.dismiss();
    },
    error => {
      this.loading.dismiss();
    }
  );
  
}
  backToList(){
    this.navCtrl.back()
  }

  sendShare() {
    this.socialSharing.share(null, null, this.qrCode, null);
  } 

  saveImage(){
    this.base64ToGallery.base64ToGallery(this.qrCode, { prefix: '_img',mediaScanner: true }
    ).then(
      res => {console.log('Saved image to gallery ', res)
      this.toastService.presentToast('Saved image to gallery');
    },
      err => {
        console.log('Error saving image to gallery ', err);
        this.toastService.presentToast('Error saving image to gallery');
        }
    );
  }
}
