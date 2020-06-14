import { Directive, EventEmitter, HostListener, Output, Input, ElementRef } from '@angular/core'

@Directive({
    selector: '[ocFileDrop]'
})
export class FileDropDirective {
    @Output() public fileDrop = new EventEmitter<File[]>()

    @Input() public allowedExtensions: Array<string> = []
    @Input() public dragOverClass = 'file-drop-over'

    constructor(private el: ElementRef) {}

    @HostListener('dragover', ['$event'])
    public onDragOver(event): boolean {
        event.preventDefault()
        event.stopPropagation()

        this.el.nativeElement.classList.add(this.dragOverClass)

        return false
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event): boolean {
        event.preventDefault()
        event.stopPropagation()

        this.el.nativeElement.classList.remove(this.dragOverClass)

        return false
    }

    @HostListener('drop', ['$event'])
    public onDrop(event): boolean {
        event.preventDefault()
        event.stopPropagation()

        this.el.nativeElement.classList.remove(this.dragOverClass)

        this.fileDrop.emit(this.getValidFiles(event.dataTransfer.files))

        return false
    }

    private getValidFiles(files: File[]): File[] {
        const validFiles: File[] = []

        for (const file of files) {
            const ext = file.name.split('.')[file.name.split('.').length - 1]

            if (this.allowedExtensions.lastIndexOf(ext.toLowerCase()) !== -1) {
                validFiles.push(file)
            }
        }

        return validFiles
    }
}
