import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from '@anosrv-core/modal.service';
import { IconService } from '@anosrv-core/icon.service';
import { Router } from '@angular/router';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LoginService } from '@anosrv-core/login.service';

@Component({
  selector: 'anosrv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  buttonDisabled = true;
  username = '';
  password = '';
  title = 'INFORMATION';
  arbeitnehmerNr = '';

  public intro: string[] = [];
  public points: string[] = [];
  public help: string[] = [];

  private subscriptions: Subscription[] = [];

  @ViewChild('arbeitNehmerNrInput') arbeitNehmerNrInput: ElementRef;

  constructor(
    public modalService: ModalService,
    private router: Router,
    private translateService: TranslateService,
    private userStoreService: UserStoreService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // populate text arrays, when translation is loaded
    this.subscriptions.push(
      this.translateService.get('login.intro').subscribe( t => this.intro = t ));
    this.subscriptions.push(
      this.translateService.get('login.punkte').subscribe( t => this.points = t ));
    this.subscriptions.push(
      this.translateService.get('login.hilfe.text').subscribe( t => this.help = t ));
  }

  ngOnDestroy(): void {
    // unsubscribe from translation service
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  onChange() {
    if (this.username === '' && this.password === '') {
      this.buttonDisabled = true;
    } else if (this.username !== '' && this.password !== '') {
      this.buttonDisabled = false;
    }
  }

  /**
   * prevent default actrion of an event
   * @param event
   */
  preventDefault(event: any) {
    event.preventDefault();
  }

  /**
   * Call the login service and handle the response
   * @param arbeitnehmerNr
   */
  login(arbeitnehmerNr: string) {
    this.loginService.login(this.username, this.password).subscribe(
      res => {
        // store user, call intial data fetch and navigate to home
        this.arbeitnehmerNr = arbeitnehmerNr;
        this.userStoreService.fetchAll(arbeitnehmerNr);
        this.router.navigateByUrl('home');
      },
      err => {
        // reset formdata if request fails
        this.username = '';
        this.password = '';
      }
    );
  }
}
