import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { first, mergeMap, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private configService: ConfigService
  ) { }

  config: any;
  playerConfig: any;
  context =  this.configService.playerConfig.PLAYER_CONTEXT;
  isLoading = true;
  sidemenuConfig: any;
  public queryParams: any;
  public contentDetails: any;
  @Input() showPlayerOnly = false; 
  @Output() share = new EventEmitter();

  playerEvent(event) {
    if (event?.edata?.type === 'SHARE') {
      this.share.emit(event);
    }
    if (event.edata.type === 'END') {
      this.configService.setMetaData(event);
    }
  }
  telemetryEvent(event) {
    // todo for telemetry Event
  }

  ngOnInit(): void {
  this.queryParams = this.activatedRoute.snapshot.queryParams;
  this.setConfig();
  this.getContentDetails().pipe(first(),
      tap((data: any) => {
        if (this.contentDetails){
          this.loadContent();
        }else{
          this.loadDefaultData();
        }
      }))
      .subscribe((data) => {
        this.isLoading = false;
      },
        (error) => {
          this.isLoading = false;
          alert('Error to load video, Loading default video');
          this.loadDefaultData();
          console.log('error --->', error);
        }
      );
  }

  loadDefaultData(){
    this.playerConfig = {
      context: this.context,
      config: this.config,
      metadata: this.configService.playerConfig.VIDEO_PLAYER_METADATA
    } ;
  }

  private getContentDetails() {
    if (this.queryParams.identifier) {
      const options: any = { params: { fields: 'mimeType,name,artifactUrl' } };
      return this.helperService.getContent(this.queryParams.identifier, options).
        pipe(mergeMap((data) => {
          if (data){
            this.contentDetails = data.result.content;
          }
          return of(data);
        }));
    } else {
      return of({});
    }
  }

  setConfig(){
    this.config = this.configService.getConfigData('videoConfig');
    this.sidemenuConfig = this.config?.sideMenu;
  }

  loadContent() {
    const metaData = this.configService.getMetaData();
    for(let item in metaData) {
      this.config[item] = metaData[item];
    }
    
    this.playerConfig = {
      context: this.context,
      config: this.config,
      metadata: this.contentDetails
    };
  }
}

