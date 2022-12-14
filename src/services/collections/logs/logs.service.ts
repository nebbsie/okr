import { Injectable } from '@angular/core';
import { AuthService } from '../../index';
import { LogsCollection, LogType, Store } from '../../store';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private auth: AuthService, private store: Store) {}

  logEvent(type: LogType, extra: any) {
    // Log the action.
    return firstValueFrom(
      this.store.create<LogsCollection>(
        'logs',
        this.auth.getUserId().pipe(
          map((userId) => ({
            type,
            extra,
            userId,
          }))
        )
      ).value$
    );
  }
}
