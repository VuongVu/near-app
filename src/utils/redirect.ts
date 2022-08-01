import { ServerResponse } from 'http';

import HttpStatus from 'constants/http-status';

export function redirect(res: ServerResponse, statusOrUrl: string | number, url?: string) {
    if (typeof statusOrUrl === 'string') {
        url = statusOrUrl;
        statusOrUrl = HttpStatus.TEMPORARY_REDIRECT;
    }

    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
        throw new Error(
            `Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`,
        );
    }

    res.writeHead(statusOrUrl, { Location: url });
    res.write(url);
    res.end();

    return res;
}
