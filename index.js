import * as svelte from 'svelte';
import source from './template.html';

const Component = svelte.create(source, { format: 'eval' });

new Component({
    target: document.body,
    data: {}
})
