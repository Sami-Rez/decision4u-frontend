import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import zxcvbn from 'zxcvbn';
import { ZXCVBNResult, ZXCVBNScore } from 'zxcvbn';

@Component({
	selector: 'ui-password-strength-bar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './password-strength-bar.component.html',
	styleUrls: ['./password-strength-bar.component.css'],
	// OnPush means that the component will only be updated when the input changes
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStrengthBarComponent {
	// Whenever the input changes the `barLevelClass` getter is executed
	@Input() password = '';

	// This is a TypeScript get property
	get barLevelClass() {
		const result: ZXCVBNResult = zxcvbn(this.password);
		const score: ZXCVBNScore = result.score;
		// returns `bar level-x` as a string for the [ngClass]
		return `bar level-${score}`;
	}
}
