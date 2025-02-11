import React from 'react'
import { createExtensionBluePrint, createExtensionInputNode, createExtensionDataRef } from "@plugger/frontend-extension"

import {AppRouter, RouteResolver, createRoutableComponent, createRouteResolver} from '@plugger/routing'


const routeResolverRef = createExtensionDataRef();

const mountPointDataRef = createExtensionDataRef();
const mountPathDataRef = createExtensionDataRef();

const RouteResolverBlueprint = createExtensionBluePrint({
    kind: 'resolver',
    namespace: 'app',
    name: 'routing',
    attachToo: {namespace: 'app', name: 'app', kind: 'app'}, 
    output: [
        routeResolverRef
    ],
    input: {
        path: createExtensionInputNode({ref: mountPathDataRef, allowMultiple: true}),
        routeRef: createExtensionInputNode({ref: mountPointDataRef, allowMultiple: true}),
    },

    provider: ({input, config}) => {
        const paths = input.path;
        const routeRefs = input.routeRef;

        const routeResolver = createRouteResolver(); // Setting up global route resolver ensuring routes can be resolved at any point in the app.
        
        if (paths.length !== routeRefs.length){
            throw new Error('Number of paths and route refs are not equal.')
        }

        for (let i=0; i < paths.length; i++){
            routeResolver.addRoute(paths[i], routeRefs[i]);
        }



        return [
            routeResolverRef.with<RouteResolver>(routeResolver)
        ]
    }

})


const RouteBindBluePrint = createExtensionBluePrint({
    kind: 'bind',
    namespace: 'app',
    name: 'routing',
    attachToo: {namespace: 'app', name: 'routing', kind: 'resolver'}, 
    output: [
        mountPointDataRef,
        mountPathDataRef
    ],

    provider: ({input, config, params}) => {
        return [
            mountPathDataRef.with(params?.path),
            mountPointDataRef.with(params?.routeRef)
        ]
    }

})

export {
    RouteResolverBlueprint,
    routeResolverRef,

    RouteBindBluePrint
}