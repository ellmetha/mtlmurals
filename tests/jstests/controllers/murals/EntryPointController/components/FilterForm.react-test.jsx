/* eslint comma-dangle: 0 */
/* eslint import/extensions: [0, {}] */
/* eslint import/no-unresolved: [0, {}] */

import { shallow } from 'enzyme';
import React from 'react';

import { BaseFilterForm, YearSelector }
from 'controllers/mural/EntrypointController/components/FilterForm';


describe('<BaseFilterForm />', () => {
  test('can be properly rendered', () => {
    const onSubmit = jest.fn();
    const component = shallow(<BaseFilterForm onSubmit={onSubmit} />);
    expect(component.find('form')).toHaveLength(1);
  });
});


describe('<YearSelector />', () => {
  test('can properly initialize year options', () => {
    // Set up our document body
    document.body.innerHTML = `<div id="id_filter_form_choices">
      <div id="id_filter_form_choices_year">
        <div data-choicevalue="2016" data-choicelabel="2016" />
        <div data-choicevalue="2017" data-choicelabel="2017" />
      </div>
    </div>`;
    const component = shallow(<YearSelector input={{}} />);
    expect(component.find('option')).toHaveLength(3);
  });
});
