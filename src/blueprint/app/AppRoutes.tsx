import React from 'react'
import { createExtensionBluePrint, createExtensionInputNode } from "@plugger/frontend-extension";
import { contentRef } from "./AppLayoutBlueprint";
import { RoutesBuilder, createRoutableComponent } from "@plugger/frontend-routing";
import { pageMountPointRef, pageRef } from "./../page/PageBlueprint";



const AppRoutesBlueprint = createExtensionBluePrint({
    kind: 'routes',
    namespace: 'app',
    name: 'app',
    attachToo: { namespace: 'app', name: 'app', kind: 'layout' },
    output: [contentRef],
    input: {
        mountPoints: createExtensionInputNode({ ref: pageMountPointRef, allowMultiple: true }),
        pages: createExtensionInputNode({ ref: pageRef, allowMultiple: true })
    },
    provider: ({ input, config }) => {

        const { mountPoints, pages } = input;

        if (mountPoints.length !== pages.length) {
            throw new Error('Number of mount points does not match number of pages');
        }

        const routableComponents = pages.map((page: React.FC, index: number) =>
            createRoutableComponent({
                mountPoint: mountPoints[index],
                component: page
            })
        );

        const AppRoutes = () => {

            return <RoutesBuilder routeBinds={routableComponents} />
        }

        return [
            contentRef.with(AppRoutes)
        ]
    }
});


export {
    AppRoutesBlueprint
}