export interface IConfig {
    orgLogo: string,
    orgName: string,
    apiUri: string
    cognito: {
        userpoolID: string,
        clientID: string
    },
    portalStyles: {
        primaryColor: {
            main: string
        },
        secondaryColor: {    
            light: string,
            main: string,
            dark: string,
        },
        theme: string,
        cssFile: string
    }
}