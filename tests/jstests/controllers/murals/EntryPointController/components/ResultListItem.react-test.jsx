/* eslint comma-dangle: 0 */
/* eslint import/extensions: [0, {}] */
/* eslint import/no-unresolved: [0, {}] */

import { shallow } from 'enzyme';
import React from 'react';

import ResultListItem from 'controllers/mural/EntrypointController/components/ResultListItem';


describe('<ResultListItem />', () => {
  test('can be properly rendered', () => {
    const mural = { image_url: 'none', title: 'Foo Bar', year: '2017' };
    const component = shallow(<ResultListItem mural={mural} />);
    expect(component.contains(<span className="item-title title is-4">{mural.title}</span>))
      .toBeTruthy();
  });
});
