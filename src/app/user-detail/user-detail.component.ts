import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SanctionListService } from '../services/sanction-list.service';
import { DataModel } from '../model/DataModel';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  customerId: string;
  uniqueId: string;
  dataModel: DataModel;
  showTable: boolean= false;
  visible: any;

  showDialog() {
      this.visible = true;
  }

  constructor(private activateRoute: ActivatedRoute, private router: Router, private sanctionService: SanctionListService){}
  ngOnInit(): void {
   this.customerId =this.activateRoute.snapshot.paramMap.get("Id");
   console.log("CustomerIdInit: ", this.customerId);
this.getCustomerDetail();
  }
  getCustomerDetail(){
    this.customerId =this.activateRoute.snapshot.paramMap.get("Id");
    console.log("CustomerId: ", this.customerId);
    this.showTable = false;
   this.sanctionService.userDetail(this.customerId).subscribe(data=>{
    this.dataModel =data;
    console.log("Data: ", data);
  });
}

}
