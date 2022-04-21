import Ember from 'ember';
import {
  macroCondition,
  importSync,
  dependencySatisfies,
} from '@embroider/macros';

let renderSettled: () => Promise<void>;

// TODO need to add the actual version `@ember/renderer` landed once we know it
if (macroCondition(dependencySatisfies('ember-source', '>=4.9999999.0'))) {
  //@ts-ignore
  renderSettled = importSync('@ember/renderer').renderSettled;
} else if (
  macroCondition(dependencySatisfies('ember-source', '>=3.27.0-alpha.1'))
) {
  //@ts-ignore
  renderSettled = importSync('@ember/-internals/glimmer').renderSettled;
} else if (
  macroCondition(dependencySatisfies('ember-source', '>=3.6.0-alpha.1'))
) {
  renderSettled = (Ember as any).__loader.require(
    '@ember/-internals/glimmer'
  ).renderSettled;
} else {
  renderSettled = (Ember as any).__loader.require(
    'ember-glimmer'
  ).renderSettled;
}

export default renderSettled;
