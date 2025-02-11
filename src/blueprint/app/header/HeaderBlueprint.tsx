import React from "react";
import {createExtensionBluePrint, createExtensionInputNode } from "@plugger/frontend-extension"
import { headerRef } from "../AppLayoutBlueprint";
import { z } from 'zod'

import { Header } from "@plugger/frontend-components";

import { headerIconRef } from "./HeaderIconBlueprint";
import { headerContentRef } from "./HeaderContentBlueprint";

const HeaderBlueprint = createExtensionBluePrint({
    namespace: 'app',
    name: 'layout',
    kind: 'header',
    attachToo: {namespace: 'app', name: 'app', kind: 'layout'}, 
    output: [headerRef],
    input: {
      icon: createExtensionInputNode({ref: headerIconRef}),
      content: createExtensionInputNode({ref: headerContentRef})
    },
    configSchema: z.object({
      
    }),
    provider: ({input, config, params}) => {

      const HeaderWrap = () => {
        const Icon = input.icon;
        const Content = input.content;


        return (
            <Header icon={Icon} content={Content}/>
          );
        }


        
        const HeaderComp = params?.header || HeaderWrap;
        return [
            headerRef.with(HeaderComp)
        ]
    }
})


export {
    HeaderBlueprint, 
    Header
}