import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { FormService } from './services/form.service';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public state$ = this.mainService.currentExchangeRateState$;
  public dateValue!: Date;
  public form = this.formService.createForm();
  private subscription = new Subscription();

  constructor(
    private mainService: MainService,
    private formService: FormService
  ) {}

  public get dateControl() {
    return this.form.controls.date;
  }

  public ngOnInit(): void {
    this.mainService.getCurrentExchangeRate();

    this.form.valueChanges.pipe(debounceTime(500)).subscribe((formValues) => {
      if (formValues.date && this.form.valid)
        this.mainService.getCurrentExchangeRate(
          this.formatDateToString(formValues.date)
        );
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private formatDateToString(date: string) {
    return date.split('T')[0];
  }
}
