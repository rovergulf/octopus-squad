// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    cdn: 'https://storage.googleapis.com/rovergulf/nft-gen/dev',
    infuraId: '7df67714e7824f02960a9b874a98dde9',
    contract: '0xE088f6d45e537B9B4F17f8096757A5911b1F6643',
    contracts: {
        '0x4': '0xE5139DD3aee424E31CD20e13f761496024Da7491',
        '0x89': '0xE088f6d45e537B9B4F17f8096757A5911b1F6643'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
