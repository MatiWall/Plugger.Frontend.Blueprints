import React, { ReactElement } from "react";
import {createExtensionBluePrint, createExtensionDataRef, createExtensionInputNode } from "@plugger/frontend-extension"
import { SideBar } from "@plugger/frontend-components";
import { navbarRef } from "../AppLayoutBlueprint";
import { 
    Box, 
    CssBaseline, 
    Toolbar,
    Divider, 
    Typography,
    useTheme,
    List
} from "@mui/material";
import { navbarItemRef } from "./NavbarItemBlueprint";
import { z } from 'zod';

const navbarToolRef = createExtensionDataRef();
const navbarTitleRef =  createExtensionDataRef();



const NavbarBlueprint = createExtensionBluePrint({
    namespace: 'app',
    name: 'navbar',
    kind: 'navbar',
    attachToo: {namespace: 'app', name: 'app', kind: 'layout'}, 
    output: [navbarRef],
    input: {
        routeItems: createExtensionInputNode({ref: navbarItemRef, allowMultiple: true}), 
        tools: createExtensionInputNode({ref: navbarToolRef, allowMultiple: true}),
        title: createExtensionInputNode({ref: navbarTitleRef})
    },
    provider: ({input, config}) =>{
        
        const Navbar = () => {
            return <SideBar title={input.title} links={input.routeItems} tools={input.tools}></SideBar>
        }
            
        return [
            navbarRef.with(Navbar)
        ]
    }
})


export {
    NavbarBlueprint,
    navbarTitleRef,
    navbarToolRef
}