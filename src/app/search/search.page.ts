import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { MasterFieldsService } from '../services/master-fields/master-fields.service';
import { LoadingService } from '../services/loading.service';
import { ToastService } from '../services/toast.service';
import { AppConstants } from '../constants/config.constants';
import { isNumber } from 'util';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  profileId;
  profile: any;
  //QR COde
  encodedData = '';
  scannedData: any;
  constructor(public navCtrl: NavController,
    // public qrScanCtrl: QRScanner,
    public barcodeCtrl: BarcodeScanner,
    private _restService: RestService,
    private masterFieldsService: MasterFieldsService,
    public toastService: ToastService,
    public loading: LoadingService) { }

  ngOnInit() {
    if (!this.masterFieldsService.userPrefs) {
      this.loading.present();
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint).subscribe((res: any) => {
        this.masterFieldsService.createMstrFieldMap(res);
        this.masterFieldsService.userPrefs = res;
        this.loading.dismiss();
      }, error => {
        this.loading.dismiss();
        
      });
    }
  }

  search() {
    console.log(this.profileId);
    this.loading.present();
    this.profile=null ;
    this._restService.httpGetServiceCall(AppConstants.searchByIdEndPoint + "/" + this.profileId).subscribe((res: any) => {
      this.loading.dismiss();
      if (res != null) {
        let response = this.parseSearchResults(res)
        this.profile = response;
        this.profile.sharableLink = 'https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ'
      } else {
        this.toastService.presentToast('Profile not found');
      }
    }, error => {
      this.loading.dismiss();
      this.toastService.presentToast('Profile not found');
    });
  }
  searchByUuid(uuid:any) {
    this.loading.present();
    this.profile=null ;
    this._restService.httpGetServiceCall(AppConstants.searchByUuidEndPoint + "/" + uuid).subscribe((res: any) => {
      this.loading.dismiss();
      if (res != null) {
        let response = this.parseSearchResults(res);
        this.profileId=response.userId;
        this.profile = response;
        this.profile.sharableLink = 'https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ'
      } else {
        this.toastService.presentToast('Profile not found');
      }
    }, error => {
      this.loading.dismiss();
      this.toastService.presentToast('Profile not found');
    });
  }
  parseSearchResults(obj) {
    return this.masterFieldsService.parseSearchResults(obj);
  }
  formatCurrency(number){
    if(isNumber(number))
    return number.toLocaleString('en-IN', {
      maximumFractionDigits: 0, 
      minimumFractionDigits: 0,
       style: 'currency',
       currency: 'INR'
   });
   }
   showProfile(item:any){
    this.navCtrl.navigateForward(`/list/details/${item.userId}`);
  }
  backToHome(){
    this.navCtrl.back()
  }
  goToBarcodeScan() {
    // const options: BarcodeScannerOptions = {
    //   preferFrontCamera: true,
    //   showFlipCameraButton: true,
    //   showTorchButton: true,
    //   torchOn: false,
    //   prompt: 'Place a barcode inside the scan area',
    //   resultDisplayDuration: 500,
    //   formats: 'QR_CODE,PDF_417 ',
    //   orientation: 'landscape',
    // };

    this.barcodeCtrl.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = JSON.parse(barcodeData.text);
      if(this.scannedData.profileUuid){
        this.searchByUuid(this.scannedData.profileUuid);
      }else{
        // alert('Not a Valid QR Code');
        this.toastService.presentToast('Not a Valid QR Code');
      }
      // alert(this.scannedData);
    }).catch(err => {
      console.log('Error', err);
      this.toastService.presentToast('Error parsing QR Code');
    });
  }
  // goToQrScan() {
  //   this.qrScanCtrl.prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
          
  //         // start scanning
  //         const scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
  //           // console.log('Scanned something', text);
  //           alert("QR code data " + JSON.stringify(text));
  //           this.scannedData = text;
  //           this.closeScanner();
  //           scanSub.unsubscribe();
  //         });
  //         this.showCamera();
  //         this.qrScanCtrl.resumePreview();
  //         this.qrScanCtrl.show();
  //       } else if (status.denied) {
  //         this.toastService.presentToast('camera permission denied');
  //         this.qrScanCtrl.openSettings();
  //       } else {

  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));
  // }

  // closeScanner() {
  //   this.qrScanCtrl.hide();
  //   this.qrScanCtrl.destroy();
  //   this.hideCamera();
  // }

  // showCamera() {
  //   (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  // }
  
  // hideCamera() {
  //   (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  // }

//   ionViewWillEnter(){
//     this.showCamera();
//  }
//  ionViewWillLeave(){
//     this.hideCamera(); 
//  }
}
