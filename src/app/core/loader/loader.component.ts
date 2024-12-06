import { Component } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
	selector:'app-loader',
	templateUrl: './loader.component.html',
	styleUrl: './loader.component.scss',
	standalone: true,
	imports: [MatProgressSpinner]
})
export class LoaderComponent {
}