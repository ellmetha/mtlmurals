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

  test('disables the next button if the page is the last page', () => {
    const onPaginate = jest.fn();
    const component = shallow(
      <ResultListPagination
        key="pagination" currentPage={12} pagesCount={12}
        onPaginate={onPaginate}
      />
    );
    expect(component.find('.pagination-next').hasClass('is-disabled')).toBeTruthy();
  });

  test('can properly set the is-current class on the link to the current page', () => {
    const onPaginate = jest.fn();
    const component = shallow(
      <ResultListPagination
        key="pagination" currentPage={3} pagesCount={12}
        onPaginate={onPaginate}
      />
    );
    expect(component.find('.is-current').prop('data-page-number')).toEqual(3);
  });

  test('can properly place ellipsis items in the final pagination', () => {
    const onPaginate = jest.fn();

    const component1 = shallow(
      <ResultListPagination
        key="pagination" currentPage={2} pagesCount={12}
        onPaginate={onPaginate}
      />
    );
    expect(component1.find('ul.pagination-list li')).toHaveLength(7);
    expect(component1.find('ul.pagination-list li').at(5).children()
           .hasClass('pagination-ellipsis')).toBeTruthy();

    const component3 = shallow(
      <ResultListPagination
        key="pagination" currentPage={6} pagesCount={12}
        onPaginate={onPaginate}
      />
    );
    expect(component3.find('ul.pagination-list li')).toHaveLength(9);
    expect(component3.find('ul.pagination-list li').at(1).children()
           .hasClass('pagination-ellipsis')).toBeTruthy();
    expect(component3.find('ul.pagination-list li').at(7).children()
           .hasClass('pagination-ellipsis')).toBeTruthy();
  });

  test('can trigger pagination', () => {
    const onPaginate = jest.fn();
    const component = shallow(
      <ResultListPagination
        key="pagination" currentPage={3} pagesCount={12}
        onPaginate={onPaginate}
      />
    );
    const ret = { value: 4 };
    const mockedEvent = {
      preventDefault: jest.fn(),
      target: {
        attributes: {
          getNamedItem: jest.fn(() => ret),
        },
      },
    };
    component.find('.pagination-next').simulate('click', mockedEvent);
    expect(onPaginate).toHaveBeenCalled();
  });
});
