import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PublishedPopupComponent } from '../published-popup/published-popup.component';
import { LocalStorageService } from 'src/app/services/user/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isContentReviewer = false;
  public showPublishPopup = false;
  public contentId: string;
  public userData: any;

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.userData = this.localStorageService.getItem('userData');
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.contentId = params.identifier;
      this.isContentReviewer = params.mode && params.mode === 'review' ? true : false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PublishedPopupComponent, {
      data: { contentId: this.contentId, userId: this.userData.userId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
