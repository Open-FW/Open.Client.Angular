import { BaseEnvironment } from './environment.base'

class Environment extends BaseEnvironment {
    constructor() {
        super()

        this.production = true
    }
}

export const environment = new Environment()
