import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  message = input.required<string>();
}
