import React from 'react';
import { Button, Input, Form } from 'antd';
import { FormattedMessage } from 'react-intl';
import styles from './Start.less';

const FormItem = Form.Item;

function Start({ dispatch, form, loading, intl, list }) {
  const { getFieldDecorator, validateFields } = form;
  const onSubmit = () => {
    validateFields(['url'], { force: true }, (err, values) => {
      if (!err) {
        dispatch({ type: 'contribute/validateRepo', payload: values.url });
      }
    });
  };
  return (
    <Form className={styles.form}>
      <h3 className={styles.title}>
        <FormattedMessage id="submit.title" />
      </h3>
      <FormItem>
        {getFieldDecorator('url', {
          rules: [{
            type: 'string',
            required: true,
            pattern: /^https?:\/\/(www\.)?github\.com\/([\w-]+)\/([\w-]+)\/?/,
            message: intl.formatMessage({ id: 'submit.repo.error' }),
          }, {
            type: 'string',
            required: true,
            validator: (rule, value, callback) => {
              let error;
              if (list.some(item => item.html_url === value)) {
                error = new Error(intl.formatMessage({ id: 'submit.repo.duplicate' }));
              }
              callback(error);
            },
          }],
        })(
          <Input
            className={styles.input}
            autoComplete="off"
            placeholder={intl.formatMessage({ id: 'submit.repo.placeholder' })}
          />,
        )}
      </FormItem>
      <FormItem style={{ marginTop: 60 }}>
        <Button
          type="primary"
          size="large"
          loading={loading.models.contribute}
          onClick={onSubmit}
        >
          <FormattedMessage id="submit.next" />
        </Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Start);
