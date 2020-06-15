export interface Message {
    __typename?: string

    text: string
    level: 'info' | 'success' | 'warning' | 'error'
}
