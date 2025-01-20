import React from "react";
import {createExtensionBluePrint } from "@plugger/extension"
import { 
    Typography
} from "@mui/material";
import { navbarToolRef } from "./NavbarBlueprint";



const NavbarToolBlueprint = createExtensionBluePrint({
    namespace: 'navbar',
    name: 'tool',
    attachToo: {namespace: 'app', name: 'navbar', kind: 'navbar'}, 
    output: [navbarToolRef],
    input: {},
    provider: ({input, config, params}) =>{

        const DefaultTool = () => (
                <Typography>
                    Tool 1
                </Typography>
        )

        const Tool = params?.tool || DefaultTool 

        return [
            navbarToolRef.with(Tool)
        ]
    }
})


export {
    NavbarToolBlueprint
}