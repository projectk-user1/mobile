import { Injectable } from '@angular/core';
import { IUserPrefs, IFieldMap } from 'src/app/_models/user';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MasterFieldsService {

  private _userPrefs: IUserPrefs;
  starMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  maritalStatusMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  religionMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  rasiMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  occupationMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  gotramMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  familyValuesMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  familyTypeMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  familyStatusMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  educationMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  complexionMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  casteMap: Map<number, IFieldMap> = new Map<number, IFieldMap>();
  tagMap: Map<number,String> =new Map<number,String>();
  messageTemplateMap: Map<number,IFieldMap> =new Map<number,IFieldMap>();

  public get userPrefs(): IUserPrefs {
    return this._userPrefs;
  }
  public set userPrefs(value: IUserPrefs) {
    this._userPrefs = value;
  }

  constructor(private sanitizer: DomSanitizer) { }

  createMstrFieldMap(res: any) {
    for (let familyType of res.FAMILY_TYPE) {
      this.familyTypeMap.set(familyType.fieldValue, familyType);
    }
    for (let familyStatus of res.FAMILY_STATUS) {
      this.familyStatusMap.set(familyStatus.fieldValue, familyStatus);
    }
    for (let familyValues of res.FAMILY_VALUES) {
      this.familyValuesMap.set(familyValues.fieldValue, familyValues);
    }
    for (let maritalstatus of res.MARITAL_STATUS) {
      this.maritalStatusMap.set(maritalstatus.fieldValue, maritalstatus);
    }
    for (let gotram of res.GOTRAM) {
      this.gotramMap.set(gotram.fieldValue, gotram);
    }
    for (let star of res.STAR) {
      this.starMap.set(star.fieldValue, star);
    }
    for (let religion of res.RELIGION) {
      this.religionMap.set(religion.fieldValue, religion);
    }
    for (let rasi of res.RASI) {
      this.rasiMap.set(rasi.fieldValue, rasi);
    }
    for (let occupation of res.OCCUPATION) {
      this.occupationMap.set(occupation.fieldValue, occupation);
    }
    for (let caste of res.CASTE) {
      this.casteMap.set(caste.fieldValue, caste);
    }
    for (let education of res.EDUCATION) {
      this.educationMap.set(education.fieldValue, education);
    }
    for (let complexion of res.COMPLEXION) {
      this.complexionMap.set(complexion.fieldValue, complexion);
    }
    for (let tag of res.TAG) {
      this.tagMap.set(tag.fieldName, tag.fieldValue);
    }
    for (let msgTmplt of res.MSGTMPLT) {
      this.messageTemplateMap.set(msgTmplt.fieldValue, msgTmplt);
    }
  }
  parseSearchResults(obj) {
    let commentsCnt = 0;
    obj.disableLike = false;
    obj.favorite = 'medium'
    obj.likeColor= 'medium';
    if (null != obj.eventLogs) {
      obj.eventLogs.forEach(element => {
        if (element.eventType == 1) {
          obj.likeColor="primary";
        } if (element.eventType == 2) {
          commentsCnt = commentsCnt + 1;
          element.message=this.messageTemplateMap.get(element.message).fieldName;
        } else if (element.eventType == 3) {
          obj.favorite = "primary";
        }
      });
    }
    obj.commentsCnt = commentsCnt;
    obj.complexion = this.complexionMap.get(obj.complexion).fieldName;
    obj.education = this.educationMap.get(obj.education).fieldName;
    obj.caste = this.casteMap.get(obj.caste).fieldName;
    obj.familyStatus = this.familyStatusMap.get(obj.familyStatus).fieldName;
    obj.familyType = this.familyTypeMap.get(obj.familyType).fieldName;
    obj.familyValues = this.familyValuesMap.get(obj.familyValues).fieldName;
    obj.paternalGotram = this.gotramMap.get(obj.paternalGotram).fieldName;
    obj.maternalGotram = this.gotramMap.get(obj.maternalGotram).fieldName;
    obj.maritalstatus = this.maritalStatusMap.get(obj.maritalstatus).fieldName;
    obj.occupation = this.occupationMap.get(obj.occupation).fieldName;
    obj.rasi = this.rasiMap.get(obj.rasi).fieldName;
    obj.religion = this.religionMap.get(obj.religion).fieldName;
    obj.star = this.starMap.get(obj.star).fieldName;
    obj.images = [];
    obj.images.push({ src: obj.photoLink ,type:'image' });
    obj.images.push({ src: 'data:image/png;base64,' + obj.qr,type:'image' });
    obj.images.push({ src: obj.videoLink, type:'video' });
    obj.videoLink=this.sanitizer.bypassSecurityTrustResourceUrl(obj.videoLink);
    return obj;
  }
}
