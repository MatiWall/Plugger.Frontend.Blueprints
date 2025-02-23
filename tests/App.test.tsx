import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createApp } from "@plugger/frontend-app";
import {createPlugin} from '@plugger/frontend-extension'
import { 
    RootExtensionBluePrint,
} from "@plugger/frontend-extension";

import {
    AppBlueprint,
    AppLayoutBlueprint,
    HeaderBlueprint,
    NavbarBlueprint,
    FooterBlueprint,
    RouteResolverBlueprint,
    AppRoutesBlueprint,
    NavbarTitleBlueprint,
    NavbarToolBlueprint,
    HeaderIconBlueprint, 
    PageBlueprint,
    NavbarItemBlueprint,
    RouteBindBluePrint
} from '../src';
import {createRouteRef} from '@plugger/frontend-routing'

import {Link} from 'react-router-dom';

const TestPage = () => {
    console.trace('rendered');
    return <>
    {/*<div>test</div>*/}
    <Link to={'/'}>test page</Link>
    </>
}

const testPageRouteRef = createRouteRef();

const testPage = PageBlueprint.make({
    namespace: 'test', 
    name: 'page',
    kind: 'test',
    params: {
        page: TestPage,
        routeRef: testPageRouteRef

    }
})

const testNavbarItem = NavbarItemBlueprint.make({
    params: {
        title: 'Test Page',
        routeRef: testPageRouteRef
    }
})

const testRouteBind = RouteBindBluePrint.make({
  params: {
    path: '/',
    routeRef: testPageRouteRef
  }  
})


const plugin = createPlugin({
    id: 'test',
    extensions: [
        testPage,
        //testNavbarItem, 
        testRouteBind
    ]
})

// Test rendering the app and verifying its elements
test('Setup Complete App and Render', async () => {
    // Initialize the app
    const app = createApp({
        rootExtensions: [
            RootExtensionBluePrint.make(),
            AppBlueprint.make(),
            AppLayoutBlueprint.make(),
            HeaderBlueprint.make(),
            NavbarBlueprint.make(),
            FooterBlueprint.make(),
            RouteResolverBlueprint.make(),
            AppRoutesBlueprint.make(),
            NavbarTitleBlueprint.make({}),
            NavbarToolBlueprint.make({ kind: 'default' }),
            HeaderIconBlueprint.make()
        ],
        plugins: [
            plugin
        ]
    });

    const Root = app.createRoot();

    // Render the Root component to the virtual DOM
    const { container } = render(Root);

    // Check if the Root component is rendered by querying the container
    expect(container).toBeDefined();
});

