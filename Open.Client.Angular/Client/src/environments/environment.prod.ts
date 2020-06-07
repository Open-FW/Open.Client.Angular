import { BaseEnvironment } from './environment.base'

class Environment extends BaseEnvironment {
    public production: boolean

    constructor() {
        super()

        this.production = true
    }
}

export const environment = new Environment()
