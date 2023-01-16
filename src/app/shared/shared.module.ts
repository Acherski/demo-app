import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTMLInputPipe } from './htmlinput.pipe';
import { MainComponent } from '../main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// primeng modules
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HTMLInputPipe, MainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    InputTextModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  exports: [HTMLInputPipe, MainComponent],
})
export class SharedModule {}
