import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import { join } from 'path';
import * as fs from 'fs';
import { existsSync } from 'fs';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';

/**
 * window and document polyfills
 */
import * as domino from 'domino';
import * as prometheus from 'prom-client';

const templateA = fs
    .readFileSync(path.join('dist/octopus-squad/browser', 'index.html'))
    .toString();
const win: any = domino.createWindow(templateA);
win.Object = Object;
win.Math = Math;

global['window'] = win;
global['document'] = win.document;
// @ts-ignore
global['branch'] = null;
// @ts-ignore
global['object'] = win.object;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;
global['localStorage'] = win.localStorage;
global['sessionStorage'] = win.localStorage;

/**
 * Prometheus Metrics
 */
// Create a Registry which registers the metrics
const register = new prometheus.Registry();
// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'octopus-squad'
});
// collect default metrics with registry
prometheus.collectDefaultMetrics({register});

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/octopus-squad/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine('html', ngExpressEngine({
        bootstrap: AppServerModule,
    }));

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Express Rest DevOps required API endpoints
    server.get('/metrics', (req: Request, res: Response) => {
        res.set('Content-Type', register.contentType);
        register.metrics().then(metrics => {
            res.send(metrics);
        }).catch(err => {
            console.error('Unable to collect metrics', err);
            res.send('failed to collect metrics');
        });
    });

    server.get('/metrics/json', (req: Request, res: Response) => {
        res.set('Content-Type', 'application/json');
        register.getMetricsAsJSON().then(metrics => {
            res.send(metrics);
        }).catch(err => {
            console.error('Unable to collect metrics', err);
            res.send('failed to collect metrics');
        });
    });

    server.get('/health', (req: Request, res: Response) => {
        res.set('Content-Type', 'application/json');
        res.send({
            healthy: true,
            timestamp: new Date(),
            message: `I'm fine, thanks`
        });
    });

    // Serve static files from /browser
    server.get('*.*', express.static(distFolder, {
        maxAge: '1y'
    }));

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        res.render(indexHtml, {
            req, providers: [
                {provide: APP_BASE_HREF, useValue: req.baseUrl},
                {provide: 'REQUEST', useValue: req},
                {provide: 'RESPONSE', useValue: res},
            ]
        });
    });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
