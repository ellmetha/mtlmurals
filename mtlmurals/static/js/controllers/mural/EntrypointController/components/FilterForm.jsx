import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';


const renderYearSelector = ({ input, meta: { touched, error } }) => {
  let yearChoices = [...document.querySelectorAll('#id_filter_form_choices_year div')];
  console.log(yearChoices);
  return (
    <select {...input}>
      <option value="">All years...</option>
      {yearChoices.map(y => <option value={y.dataset.choicevalue} key={y.dataset.choicevalue}>{y.dataset.choicelabel}</option>)}
    </select>
  );
};

class FilterForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <section className="section">
        <form onSubmit={handleSubmit}>
          <div className="columns">
            <div className="column">
              <div className="field has-addons">
                <p className="control">
                  <span className="select">
                    <Field name="year" component={renderYearSelector}/>
                  </span>
                </p>
                <p className="control is-expanded">
                  <Field className="input" name="q" component="input" type="text" placeholder="Search for murals..." />
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
  }
};

// Decorate the form component
FilterForm = reduxForm({
  form: 'filter',
})(FilterForm);

export default FilterForm;
