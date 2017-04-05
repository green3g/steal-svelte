
import { compile } from 'svelte';

export function translate(load) {
    let result = compile(load.source, {
        format: 'amd',
        amd: {
            id: load.name
        }
    });
    return result.code;
}
