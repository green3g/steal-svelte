import loader from '@loader';
import { compile } from 'svelte';

export function translate(load) {
    load.metadata = {
        format: 'es6'
    };
    let result = compile(load.source, {
        format: 'amd',
        amd: {
            id: load.name
        }
    });
    return result.code;
}
