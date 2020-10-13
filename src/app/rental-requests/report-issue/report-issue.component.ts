import { ActivatedRoute } from '@angular/router';
import { Swal } from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from "@angular/core";

import { LanguageUpdateService } from "src/app/shared/providers/language/language.service";
import { RentalRequestsUserService } from "../services/rental-requests.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RequestRentalService } from "src/app/rentals/service/request-rental-service";
import { Subject, zip as observableZip } from "rxjs";

@Component({
  selector: "app-request-issue",
  templateUrl: "./report-issue.component.html",
})
export class ReportIssueComponent implements OnInit {
  public reportIssueForm: FormGroup;
  public validaImages: boolean = true;
  public uploadedFileList = [];
  public loading = false;
  public requestRental = {images:[{}]};
  private myFiles = [];
  public totalsizeOfimages = 10000000;
  unetrequestid: any;

  constructor(
    private rentalRequestsUserService: RentalRequestsUserService,
    private languageUpdateService: LanguageUpdateService,
    private requestRentalService: RequestRentalService,
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute
  ) {
    this.rentalRequestsUserService.setHeaderTitle("ReportIssue.ReportIssue");
    this.languageUpdateService.setMenuItem("request-issue");
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.unetrequestid = params['unetrequestid'];
      console.log(this.unetrequestid);
    });
    this.createForm()
  }

  onSubmit(form: FormGroup) {
    if(this.reportIssueForm.valid){
      let issueObject = Object.assign({},{images:this.requestRental.images},this.reportIssueForm.value);
      console.log(issueObject)
      this.rentalRequestsUserService.reportIssue(issueObject).subscribe(res=>{
        Swal.fire(
          "Thank you...",
          `Issue Sent will contact you soon`,
          "success"
        );
      })
    }

  }

  public checkFiletype(fileExt: string) {
    if (
      fileExt === ".png" ||
      fileExt === ".jpeg" ||
      fileExt === ".jpg" ||
      fileExt === ".jfif"
    ) {
      return true;
    } else {
      return false;
    }
  }
  private createForm() {
    this.reportIssueForm = this.fb.group({
      description: ["", Validators.required],
      unitRequestId:Number(this.unetrequestid)
    })}
  public uploadImages(event: any) {
    for (let i = 0; i < this.requestRental.images.length; i++) {
      if (!this.requestRental.images[i].hasOwnProperty("path")) {
        this.requestRental["images"].splice(i, 1);
      }
    }
    this.loading = true;
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    // console.log(this.myFiles);
    let serviceArray = [];
    for (let index = 0; index < this.myFiles.length; index++) {
      const formData: FormData = new FormData();
      const file = <File>event.target.files[index];
      this.totalsizeOfimages += file.size;
      formData.append("file_" + index, file, file.name);
      formData.append("tenantId", localStorage.getItem("tenantId"));
      serviceArray.push(this.requestRentalService.postFile(formData));
    }

    observableZip(...serviceArray).subscribe((res) => {
      this.loading = false;
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          // console.log(res[i]['body']['result']["filesNames"][0]['fileName']);
          let fileObj = {};
          fileObj = {
            fileName: res[i]["body"]["result"]["filesNames"][0].fileName,
            fileType: this.convertFiletypeToLower(
              res[i]["body"]["result"]["filesNames"][0].fileType
            ),
          };
          this.requestRental["images"].push({
            url: res[i]["body"]["result"]["filesNames"][0].fileName,
          });
          this.uploadedFileList.push(fileObj);
          // console.log(this.uploadedFileList)
        }
      }
    });
    this.myFiles = [];
  }

  private convertFiletypeToLower(fileExtension: string) {
    return fileExtension.toLocaleLowerCase();
  }
}
