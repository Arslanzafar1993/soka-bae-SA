import { Component} from '@angular/core';
import { UserStoreService } from '@anosrv-core/user-store.service';

@Component({
  selector: 'anosrv-hilfe-allgemein',
  templateUrl: './hilfe-allgemein.component.html',
  styleUrls: ['./hilfe-allgemein.component.scss']
})
export class HilfeAllgemeinComponent {

  get artbeitnehmerNr(): { nummer: string } {
    return { nummer: `${this.userStoreService.user.value.arbeitnehmerNr || '1234567891011'}` };
  }

  constructor(
    private userStoreService: UserStoreService
  ) { }

}
