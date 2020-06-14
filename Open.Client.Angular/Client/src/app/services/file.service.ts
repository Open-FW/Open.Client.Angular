import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class FileService {
    constructor(private readonly httpClient: HttpClient) {

    }

    public upload(url: string, formData: FormData): Observable<any> {
        return this.httpClient.post<any>(url, formData, { reportProgress: true, observe: 'events' })
    }

    public download(url: string) {
        this.httpClient.get(url, { responseType: 'blob', observe: 'response', withCredentials: true }).subscribe(s => {
            const tmpUrl = window.URL.createObjectURL(s.body)
            const anchor = document.createElement('a')
            anchor.download = s.headers.get('File-Name')
            anchor.href = tmpUrl
            anchor.click()
        })
    }
}
