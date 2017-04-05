import { compile } from 'svelte';
import loader from '@loader'

export function translate(load) {

    // get the compiled svelte template
    const compiled = compile(load.source);
    load.source = compiled.code;

    // transpile the loaded code
    const transformed = loader.transpile.call(this, load);
    return transformed.code;
}
