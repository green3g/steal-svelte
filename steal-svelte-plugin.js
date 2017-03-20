import loader from '@loader';
import { compile } from 'svelte';

export function translate(load) {
    load.metadata = {
      format: 'amd'
    };
    const result = compile(load.source, {
        format: 'amd',
        amd: {
            id: load.name
        }
    });
    console.log(result.code);
    return result.code;
}
