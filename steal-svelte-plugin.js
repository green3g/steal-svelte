import { compile } from 'svelte';
import loader from '@loader';

export function translate(load) {

    // get the compiled svelte template
    const compiled = compile(load.source);
    load.source = compiled.code;
    // return loader.transpile.call(this, load);
    return load.source;
}
