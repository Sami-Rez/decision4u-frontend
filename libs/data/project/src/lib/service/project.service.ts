import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProjectCreateCommand, ProjectVoteCommand } from '../actions/project.actions';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  create(command: ProjectCreateCommand) {
    return lastValueFrom(
      this.http.post<void>('/api/project', command)
    );
  }

  vote(command: ProjectVoteCommand) {
    return lastValueFrom(
      this.http.put<void>(`/api/project`, command)
      // TODO fix the endpoint
      // this.http.post<void>(`/api/project/vote/${command.projectId}`, command)
    );
  }
}
