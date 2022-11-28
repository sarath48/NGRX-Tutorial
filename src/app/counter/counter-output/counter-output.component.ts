import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { appState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selector';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter!: number;
  counterSubscription!: Subscription;
  // counter$!:Observable<{counter:number}>
  constructor(private store: Store<appState>) {}

  ngOnInit(): void {
    this.counterSubscription = this.store
      .select(getCounter)
      .subscribe((data) => {
        this.counter = data;
      });

    // this.counter$=this.store.select('counter');
  }
  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
