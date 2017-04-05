import { compile } from 'svelte';
import { transform } from 'buble';

export function translate(load) {
    const compiled = compile(load.source, {
        format: 'amd',
        amd: {
            id: load.name
        }
    });
    const transformed = transform(compiled.code);
    return transformed.code;
}
