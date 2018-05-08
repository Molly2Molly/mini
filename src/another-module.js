import _ from 'lodash';
import { cube,test } from './math.js';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);

cube(5);