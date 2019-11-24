import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
})
export class DashboardDetailComponent implements OnInit {
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
  constructor(public navCtrl: NavController,private router: Router,private route: ActivatedRoute) {
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
  }

  backToDashboard(){
    this.navCtrl.back()
  }
  showProfile(item:any){
    this.navCtrl.navigateForward(`/list/details/${item.profileId}`);
  }
}

