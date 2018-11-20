import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newPet: any;
  errors: any;
  error: any;

  constructor(private route:ActivatedRoute, private router: Router, private _httpService: HttpService) { }

  ngOnInit() {
    this.newPet = {name: '', type: '', desc: '', skill1: '', skill2: '', skill3: ''};
  }

  createPet(){
    const obs = this._httpService.createPet(this.newPet);
    obs.subscribe((data) => {
      if(data['errors']){
        this.error = '';
        this.errors = data['errors'];
      }
      else if(data['error']){
        this.errors = '';
        this.error = data['error'];
      }
      else{
        this.router.navigate(['/']);
      }
    })
  }
}
