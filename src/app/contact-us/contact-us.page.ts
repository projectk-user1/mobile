import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { AppConstants } from '../constants/config.constants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  clientInfo:any;
  noDataPresent = false;
  constructor( private _restService: RestService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this._restService.httpGetServiceCall(AppConstants.clientInfoEndPoint).subscribe((res: any) => {
      this.clientInfo = res;
      this.clientInfo.geotag=this.sanitize(res.latitude,res.longitude);
    }, error => {
      this.noDataPresent = true;
    });
  }
  sanitize(latitude:any,longitude:any){
    return this.sanitizer.bypassSecurityTrustUrl("geo:"+latitude+","+longitude);
}
}
