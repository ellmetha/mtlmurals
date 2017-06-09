/* eslint comma-dangle: 0 */
/* eslint import/extensions: [0, {}] */
/* eslint import/no-unresolved: [0, {}] */

import { mount, render } from 'enzyme';
import React from 'react';

import ResultMap from 'controllers/mural/EntrypointController/components/ResultMap';


describe('<ResultMap />', () => {
  test('can be properly rendered', () => {
    const murals = [{ image_url: 'none', title: 'Foo Bar', year: '2017' }];
    const component = render(<ResultMap murals={murals} />);
    expect(component.find('#map')).toHaveLength(1);
  });

  test('can properly initialize the map when mounted', () => {
    const spy = jest.spyOn(ResultMap.prototype, 'componentDidMount');
    const murals = [
      { id: 1, image_url: 'im1', title: 'Foo Bar 1', year: '2016' },
      { id: 2, image_url: 'im2', title: 'Foo Bar 2', year: '2017' },
    ];
    const component = mount(<ResultMap murals={murals} />);
    expect(spy).toHaveBeenCalled();
    expect(component.state().iconDefault).toBeDefined();
    expect(component.state().iconViewed).toBeDefined();
    expect(component.state().map).toBeDefined();
    expect(component.state().tileLayer).toBeDefined();
  });

  test('can properly initialize the map when mounted', () => {
    const spy = jest.spyOn(ResultMap.prototype, 'componentDidUpdate');
    const murals = [
      {
        id: 1, image_url: 'im1', title: 'Foo Bar 1', year: '2016', latitude: 45.12, longitude: 2.2
      },
      {
        id: 2, image_url: 'im2', title: 'Foo Bar 2', year: '2017', latitude: 45.14, longitude: 2.4
      },
    ];
    const component = mount(<ResultMap murals={[]} />);
    component.setProps({ murals });
    expect(spy).toHaveBeenCalled();
    const latlngArray = [];
    component.state().map.eachLayer((layer) => {
      if (layer.options.mural) {
        latlngArray.push([layer.getLatLng().lat, layer.getLatLng().lng]);
      }
    });
    expect(latlngArray).toEqual([[45.12, 2.2], [45.14, 2.4]]);
  });

  test('updates the map only if necessary', () => {
    const spy = jest.spyOn(ResultMap.prototype, 'componentDidUpdate');
    let murals = [
      {
        id: 1, image_url: 'im1', title: 'Foo Bar 1', year: '2016', latitude: 45.12, longitude: 2.2
      },
      {
        id: 2, image_url: 'im2', title: 'Foo Bar 2', year: '2017', latitude: 45.14, longitude: 2.4
      },
    ];
    const component = mount(<ResultMap murals={[]} />);
    expect(spy).toHaveBeenCalledTimes(1);
    component.setProps({ murals });
    component.setProps({ murals });
    expect(spy).toHaveBeenCalledTimes(2);
    murals = [
      {
        id: 3, image_url: 'im1', title: 'Foo Bar 3', year: '2016', latitude: 45.32, longitude: 2.2
      },
      {
        id: 4, image_url: 'im2', title: 'Foo Bar 4', year: '2017', latitude: 45.46, longitude: 2.4
      },
    ];
    component.setProps({ murals });
    expect(spy).toHaveBeenCalledTimes(3);
    const latlngArray = [];
    component.state().map.eachLayer((layer) => {
      if (layer.options.mural) {
        latlngArray.push([layer.getLatLng().lat, layer.getLatLng().lng]);
      }
    });
    expect(latlngArray).toEqual([[45.32, 2.2], [45.46, 2.4]]);
  });

  test('destroys the map object when unmounted', () => {
    const murals = [
      { id: 1, image_url: 'im1', title: 'Foo Bar 1', year: '2016' },
      { id: 2, image_url: 'im2', title: 'Foo Bar 2', year: '2017' },
    ];
    const component = mount(<ResultMap murals={murals} />);
    const leafletMap = component.state().map;
    const spy = jest.spyOn(leafletMap, 'remove');
    component.unmount();
    expect(spy).toHaveBeenCalled();
  });
});
