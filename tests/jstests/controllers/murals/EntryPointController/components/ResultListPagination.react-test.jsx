/* eslint comma-dangle: 0 */
/* eslint import/extensions: [0, {}] */
/* eslint import/no-unresolved: [0, {}] */

import { shallow } from 'enzyme';
import React from 'react';

import ResultListPagination
from 'controllers/mural/EntrypointController/components/ResultListPagination';


describe('<ResultListPagination />', () => {
  test('disables the previous button if the page is the first page', () => {
    const onPaginate = jest.fn();
    const component = shallow(
      <ResultListPagination
        key="pagination" currentPage={1} pagesCount={12}
        onPaginate={onPaginate}
      />
    );
    expect(component.find('.pagination-previous').hasClass('is-disabled')).toBeTruthy();
  });
});
