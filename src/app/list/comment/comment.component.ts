import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-service.service';
import { MasterFieldsService } from 'src/app/services/master-fields/master-fields.service';
import { IUserPrefs } from 'src/app/_models/user';
import { RestService } from 'src/app/services/rest.service';
import { AppConstants } from 'src/app/constants/config.constants';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  constructor(private commonService: CommonService,
              private _restService: RestService,
              private masterFieldsService: MasterFieldsService,
              private popoverController: PopoverController) { }
  selectedMsgTmplt:any;
  userPrefs: IUserPrefs = {
    CASTE: [],
    COMPLEXION: [],
    EDUCATION: [],
    FAMILY_STATUS: [],
    FAMILY_TYPE: [],
    FAMILY_VALUES: [],
    GOTRAM: [],
    OCCUPATION: [],
    RASI: [],
    RELIGION: [],
    STAR: [],
    MARITAL_STATUS: [],
    TAG: [],
    MSGTMPLT:[]
  };
  ngOnInit() {
    if (this.masterFieldsService.userPrefs) {
      this.userPrefs = this.masterFieldsService.userPrefs;
      this.masterFieldsService.createMstrFieldMap(this.userPrefs);
    } else {
      this._restService.httpGetServiceCall(AppConstants.mstrFieldsEndPoint).subscribe((res: any) => {
        this.userPrefs = res;
        this.masterFieldsService.createMstrFieldMap(res);
        this.masterFieldsService.userPrefs = res;
      }, error => {

      });
    }
  }
  applyComment(selectedMsgTmplt:any){
    console.log(selectedMsgTmplt);
    this.commonService.saveSelectedComment(selectedMsgTmplt);
    this.close();
  }
  async close() {
    try {
        await this.popoverController.dismiss();
    } catch (e) {
        //click more than one time popover throws error, so ignore...
    }

}
}
