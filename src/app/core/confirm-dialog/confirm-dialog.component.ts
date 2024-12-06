import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmDialogComponent {
	dialogRef = inject(MatDialogRef)

	confirm() {
		this.dialogRef.close(true)
	}

	cancel() {
		this.dialogRef.close(false)
	}
}