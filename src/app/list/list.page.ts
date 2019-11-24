import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DetailComponent } from './detail/detail.component';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common-service.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  private images =[ 
    'https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ',
    'https://lh5.googleusercontent.com/2kP5Bms20JOCLLIpA-4ym0B7Ln6ElWVrAlw5reppcCNcv9FJuyhr-I6V0xI',
    'https://lh4.googleusercontent.com/mO03ov7EvVC-U6C99KzdQy8HCrVOEDdRHuzlB4XFvld769-OwwvLqJW9R6Q',
    'https://lh5.googleusercontent.com/WAFlWOoKXXNCT2-BguvTp38br0ihxZX3t7Y4Kv7iB1cGHmp8kTVBb2NykFA',
    'https://lh3.googleusercontent.com/8vGmplduFWzJuSij00VnYQHzezRtXEoioQCbr1ZAmlw4FJqnN3KwZQQNbgA',
    'https://lh5.googleusercontent.com/S1aXj_jJdyy-lgFUoF_--qdC49DQanr9Fk4Anfn9ffTEb8B8SWQ8ZShmmyQ',
    'https://lh5.googleusercontent.com/2kP5Bms20JOCLLIpA-4ym0B7Ln6ElWVrAlw5reppcCNcv9FJuyhr-I6V0xI',
    'https://lh4.googleusercontent.com/mO03ov7EvVC-U6C99KzdQy8HCrVOEDdRHuzlB4XFvld769-OwwvLqJW9R6Q',
    'https://lh5.googleusercontent.com/WAFlWOoKXXNCT2-BguvTp38br0ihxZX3t7Y4Kv7iB1cGHmp8kTVBb2NykFA',
    'https://lh3.googleusercontent.com/8vGmplduFWzJuSij00VnYQHzezRtXEoioQCbr1ZAmlw4FJqnN3KwZQQNbgA'
  ]
  public items: Array<{ profileId:string,firstName:string,
    age:string,height:string,maritalStatus:string,
    occupation:string,education:string,
    distance:string,gunacount:string,salary:string, title: string; note: string; icon: string }> = [];
  constructor(public navCtrl: NavController,private router: Router,private route: ActivatedRoute,private commonService:CommonService) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        profileId: '8P2' + i,
        firstName:'Mahesh',
        age:Math.floor(Math.random() * this.images.length)+'',
        height:'5 ft 3 in',
        maritalStatus:'unmarried',
        occupation:'Software Engineer',
        education:'B. Tech',
        distance:'180 km',
        gunacount:'24',
        salary:'100000',
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.images[Math.floor(Math.random() * this.images.length)]
      });
    }
  }
  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.commonService.filterValueChanged.subscribe(res =>{
      console.log(res);
    },
    errror => {
      console.warn("something went wrong", errror);
    })
  }

  
  showProfile(item:any){
    this.navCtrl.navigateForward(`/list/details/${item.profileId}`);
  }

  navigateTofilter(){
    this.navCtrl.navigateForward(`/list/filter`);
  }
  
 
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  // showDetail(item:any){
  //   // const nav = document.querySelector('ion-nav');
  //   // nav.push('detail', { item });
  //   item.title="Mahesh";
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //         item: JSON.stringify(item)
  //     }
  // };
  //   // this.navCtrl.navigateForward('/list/detail',navigationExtras);
  //   // this.router.navigate(['/list/detail', item]);
  //   this.navCtrl.navigateForward(`/list/details/${item.profileId}`);
  // }
}
