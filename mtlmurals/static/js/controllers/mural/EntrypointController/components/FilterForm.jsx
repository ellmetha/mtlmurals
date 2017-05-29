/* eslint react/prop-types: [0, {}] */
/* eslint react/no-multi-comp: [0, {}] */

import React from 'react';
import { Field, reduxForm } from 'redux-form';


const YearSelector = ({ input }) => {
  const yearChoices = [...document.querySelectorAll('#id_filter_form_choices_year div')];
  return (
    <select {...input}>
      <option value="">All years...</option>
      {yearChoices.map(y =>
        (<option value={y.dataset.choicevalue} key={y.dataset.choicevalue}>{y.dataset.choicelabel}
        </option>))}
    </select>
  );
};

const _FilterForm = ({ handleSubmit }) => (
  <section className="section">
    <form onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column">
          <div className="field has-addons">
            <p className="control">
              <span className="select">
                <Field name="year" component={YearSelector} />
              </span>
            </p>
            <p className="control is-expanded">
              <Field
                className="input" name="q" component="input" type="text"
                placeholder="Search for murals..."
              />
            </p>
            <p className="control">
              <button className="button is-primary" type="submit">Submit</button>
            </p>
          </div>
        </div>
      </div>
    </form>
  </section>
);

// Decorate the form component
const FilterForm = reduxForm({
  form: 'filter',
})(_FilterForm);

export default FilterForm;
