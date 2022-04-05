import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  clientForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private matDialogRef : MatDialogRef<DialogueComponent>) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      clientName : ['',Validators.required],
      clientID : ['',Validators.required],
      Email : ['', Validators.required]
    })  ;

    if(this.editData){
       this.actionBtn = "Update";
      this.clientForm.controls['clientName'].setValue(this.editData.clientName);
      this.clientForm.controls['clientID'].setValue(this.editData.clientID);
      this.clientForm.controls['Email'].setValue(this.editData.Email);
    }
  }

  addClient(){
   if(!this.editData){
     if(this.clientForm.valid){
       this.api.postClient(this.clientForm.value)
         .subscribe({
           next:(res)=>{
             alert("Client Added Successfully");
             this.clientForm.reset();
             this.matDialogRef.close('save');

           },
           error:()=>("Client can't be add")
         })
     }
   }          else{
     this.updateClient()
  }
}
updateClient(){
this.api.putClient(this.clientForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Client Data Updated Successfully");
      this.clientForm.reset();
      this.matDialogRef.close("update");
    } ,
    error:()=>{
      alert("Client Updating Fail");
    }
  })
}

}
