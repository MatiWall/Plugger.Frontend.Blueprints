import {createExtensionBluePrint, createExtensionDataRef, createExtensionInputNode } from "@plugger/extension"



const pageRef = createExtensionDataRef();
const pageMountPointRef = createExtensionDataRef();

const PageBlueprint = createExtensionBluePrint({
    kind: 'page',
    attachToo: {namespace: 'app', name: 'app', kind: 'routes'}, 
    output: [
        pageRef,
        pageMountPointRef
    ],
    provider: ({input, config, params}) => [
        pageRef.with(params?.page), 
        pageMountPointRef.with(params?.routeRef),
    ]

})


export {
    PageBlueprint,
    pageRef,
    pageMountPointRef
}