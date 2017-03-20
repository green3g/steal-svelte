import { compile } from 'svelte';
import loader from '@loader';

export function translate(load) {
    return new Promise((resolve, reject) => {
        steal.import('svelte').then((svelte) => {
          debugger;
            const result = svelte.compile(load.source, { format: 'eval' });
            resolve(result.code);
        });
    });
}

export function instantiate(load) {
    return {
        deps: [],
        execute: function() {
            return loader.newModule({
                default: eval(load.source)
            });
        }
    }
}
