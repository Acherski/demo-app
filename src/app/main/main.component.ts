import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form.service';
import { MainService } from '../services/main.service';
import { Mode } from '../services/model';

export const lightMode = { name: 'Jasny', mode: 'LIGHT' };
export const darkMode = { name: 'Ciemny', mode: 'DARK' };

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public state$ = this.mainService.currentExchangeRateState$;
  public dateValue!: Date;
  public dateForm = this.formService.createDateForm();
  public themeModeForm = this.formService.createThemeModeForm();
  public modes: Mode[] = [darkMode, lightMode];
  public selectedMode = lightMode;
  private subscription = new Subscription();

  constructor(
    private mainService: MainService,
    private formService: FormService
  ) {}

  public get dateControl() {
    return this.dateForm.controls.dateControl;
  }

  public ngOnInit(): void {
    this.mainService.getCurrentExchangeRate();

    this.subscription.add(
      this.dateForm.valueChanges
        .subscribe((formValues) => {
          if (formValues.dateControl && this.dateForm.valid)
            this.mainService.getCurrentExchangeRate(
              this.formatDateToString(formValues.dateControl)
            );
        })
    );

    this.subscription.add(
      this.themeModeForm.valueChanges.subscribe((res) => {
        if (res.modeControl) this.mainService.setTheme(res.modeControl.mode);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public resetTable() {
    this.dateControl.reset();
    this.mainService.getCurrentExchangeRate();
  }

  // funkcja użyte w template lin. 62, by TS nie krzyczał
  // wiem, ze to jest zla praktyka i powinien być pipe użyty
  // ale gdy próbowałem użyć pipe'a zamiast tej funkcji nie wiedzieć czemu angular go nie wykrywa...
  public formatToHTMLInputElement(value: any) {
    return value as HTMLInputElement;
  }

  private formatDateToString(date: string) {
    return date.split('T')[0];
  }
}
