import { compile } from 'svelte';

export function translate(load) {

    // get the compiled svelte template
    const compiled = compile(load.source);
    return compiled.code;
}
