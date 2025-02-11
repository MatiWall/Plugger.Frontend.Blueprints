import React from 'react'
import { Link } from 'react-router-dom'

import { createExtensionBluePrint, createExtensionDataRef } from "@plugger/frontend-extension"
import { useRouteRef } from '@plugger/routing';
import { useTheme } from '@emotion/react';
import { ListItem, ListItemText } from '@mui/material'

import { SideBarNavItem } from '@plugger/frontend-components';

const navbarItemRef = createExtensionDataRef();

const NavbarItemBlueprint = createExtensionBluePrint({
    namespace: 'app',
    name: 'routing',
    kind: 'route',
    attachToo: { namespace: 'app', name: 'navbar', kind: 'navbar' },
    output: [navbarItemRef],
    provider: ({ input, config, params }) => {

        const routeRef = params?.routeRef;
        const Icon = params?.icon;
        const title = params?.title;

        const Item = () => {

            const routeGenerator = useRouteRef(routeRef);
            if (!routeGenerator) {
                return <span>Invalid Route</span>;
            }
            return <SideBarNavItem icon={Icon} path={routeGenerator()} text={title} ></SideBarNavItem>
        };

        return [
            navbarItemRef.with(Item)
        ];
    }
});

export {
    NavbarItemBlueprint,
    navbarItemRef
}