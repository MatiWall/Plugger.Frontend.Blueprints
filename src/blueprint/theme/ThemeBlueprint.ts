import { createTheme } from "@mui/material";

import {createExtensionBluePrint, createExtensionDataRef } from "@plugger/frontend-extension"
import { defaultTheme } from "@plugger/frontend-components";

const themeRef = createExtensionDataRef();


const ThemeBlueprint = createExtensionBluePrint({
    namespace: 'app',
    name: 'app',
    kind: 'theme',
    attachToo: {namespace: 'app', name: 'app', kind: 'app'}, 
    output: [themeRef],
    provider: ({input, config, params}) =>{
        
        const theme = params?.theme || defaultTheme;
        
        return [
            themeRef.with(theme)
        ]
    }
})


export {
    ThemeBlueprint, 
    themeRef
}