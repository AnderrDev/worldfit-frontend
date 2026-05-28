import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllRoutinesUseCase } from '../../../application/use-cases/get-all-routines.use-case';
import { Routine } from '../../../domain/entities/routine.entity';

@Component({
  selector: 'wf-routine-list',
  templateUrl: './routine-list.page.html',
  styleUrls: ['./routine-list.page.scss']
})
export class RoutineListPageComponent implements OnInit {
  routines$!: Observable<Routine[]>;

  constructor(private readonly getAllRoutines: GetAllRoutinesUseCase) {}

  ngOnInit(): void {
    this.routines$ = this.getAllRoutines.execute();
  }
}
