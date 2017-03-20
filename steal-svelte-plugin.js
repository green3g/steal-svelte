import loader from '@loader';
import { compile } from 'svelte';

export function translate(load) {
    return new Promise((resolve, reject) => {
        const result = compile(load.source, { format: 'eval' });
        resolve(result.code);
    });
}

export function instantiate(load) {
  const module = eval(load.source);
    return {
        deps: [],
        execute: function() {
            return loader.newModule({
                default: module
            });
        }
    }
}
