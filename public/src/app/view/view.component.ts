import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  onePet: any;
  isDisabled: any;

  constructor(private route:ActivatedRoute, private router: Router, private _httpService: HttpService) { }

  ngOnInit() {
    this.onePet = {_id: '', name: '', type: '', desc: '', skill1: '', skill2: '', skill3: ''};
    this.showOnePet();
    this.isDisabled = false;
  }

  showOnePet(){
    this.route.params.subscribe((params: Params) => {
      const obs = this._httpService.getOnePet(params['id']);
      obs.subscribe((data) => {
        this.onePet = data[0];
      })
     })
   }

   deletePet(){
     const obs = this._httpService.deletePet(this.onePet);
     obs.subscribe((data) => {
       this.router.navigate(['/']);
     })
   }

   like(){
     const obs = this._httpService.likePet(this.onePet);
     obs.subscribe((data) => {
       this.showOnePet();
       this.isDisabled = true;
     })
   }

}
