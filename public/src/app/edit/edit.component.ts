import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editPet: any;
  onePet: any;
  errors: any;

  constructor(private route:ActivatedRoute, private router: Router, private _httpService: HttpService) { }

  ngOnInit() {
    this.editPet = {_id: '', name: '', type: '', desc: '', skill1: '', skill2: '', skill3: ''};
    this.onePet = {_id: '', name: '', type: '', desc: '', skill1: '', skill2: '', skill3: ''};
    this.showOnePet();
  }

  editPetfunc(){
    const obs = this._httpService.editPet(this.editPet);
    obs.subscribe((data) => {
      if(data['errors']){
        this.errors = data['errors'];
      }
      else{
        this.router.navigate(['/view/' + this.editPet._id]);
      }
    })
  }

  showOnePet(){
    this.route.params.subscribe((params: Params) => {
      const obs = this._httpService.getOnePet(params['id']);
      obs.subscribe((data) => {
        this.onePet = data[0];
        this.editPet._id = this.onePet._id;
      })
   })
 }
}
