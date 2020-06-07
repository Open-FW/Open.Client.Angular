import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { environment } from 'src/environments/environment'
import { ApolloLink } from 'apollo-link'
import { AuthService } from './services/auth.service'

const uri = `${environment.api.url}/graphql`
export function createApollo(httpLink: HttpLink, authService: AuthService) {
    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext({
            header: {
                Authorization: authService.authorizationHeaderValue
            }
        })

        return forward(operation)
    })

    return {
        link: authLink.concat(httpLink.create({ uri })),
        cache: new InMemoryCache(),
    }
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, AuthService],
        },
    ],
})
export class GraphQLModule { }
