import { Injectable } from '@angular/core';
import { EnterprisesCollection, Store } from '@core/services/store';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class EnterprisesService {
  constructor(private auth: AuthService, private store: Store) {}

  async createEnterprise(enterpriseName: string) {
    return await firstValueFrom(
      this.store.create<EnterprisesCollection>(
        'enterprises',
        this.auth.getUserId().pipe(
          map((userId) => ({
            creatorId: userId,
            name: enterpriseName,
            teams: {},
          }))
        )
      ).result$
    );
  }
}