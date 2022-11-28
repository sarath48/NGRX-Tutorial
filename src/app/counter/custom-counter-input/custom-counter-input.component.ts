import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { changeChannelName, customIncrement } from '../state/counter.action';
import { getChannelName } from '../state/counter.selector';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  channelName!: string;
  constructor(private store: Store<appState>) {}

  ngOnInit(): void {
    this.store
      .select(getChannelName)
      .subscribe((data) => (this.channelName = data));
  }

  onAdd() {
    this.store.dispatch(customIncrement({ value: this.value }));
    console.log(this.value);
  }
  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
