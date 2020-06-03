import React, { useEffect } from "react";
import { Form, Row, Col, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { NumberRoot } from "models/excel";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { validateChartsFormItem } from "helpers/helpers";

const gutter = 16;
const md = 4;

// type FormTypes = "variable" | "exponent";
//
// const ValidationMessages = {
//   not_a_number: "Не число",
//   not_an_integer: "Не целое",
// };

interface InitialValuesFormProps extends FormComponentProps {
  diagram: NumberRoot;
  onInit: (form: WrappedFormUtils) => void;
  handleSubmit: () => void;
}

const InitialValuesForm: React.FC<InitialValuesFormProps> = props => {
  const { diagram, onInit, handleSubmit, form } = props;

  const { getFieldDecorator } = form;

  useEffect(() => {
    onInit(form);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form>
      <Row gutter={gutter}>
        <Col md={md}>
          <Form.Item label="Переменная X (вещественное)">
            {getFieldDecorator("variable", {
              initialValue: diagram.variable,
              rules: [
                {
                  required: true,
                  validator: async (rule, value) => {
                    const validate = validateChartsFormItem(value, true);
                    if (!validate.valid) {
                      throw new Error(validate.message);
                    }
                    return validate.valid;
                  }
                }
              ]
            })(<Input autoFocus />)}
          </Form.Item>
        </Col>

        <Col md={md}>
          <Form.Item label="Показатель степени N (целое)">
            {getFieldDecorator("exponent", {
              initialValue: diagram.exponent,
              rules: [
                {
                  required: true,
                  validator: async (rule, value) => {
                    const validate = validateChartsFormItem(value, true);
                    if (!validate.valid) {
                      throw new Error(validate.message);
                    }
                    return validate.valid;
                  }
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>

        <Col md={md}>
          <Form.Item label="Кол-во нач. предположений">
            {getFieldDecorator("cols_count", {
              initialValue: diagram.cols_count,
              rules: [
                {
                  required: true,
                  validator: async (rule, value) => {
                    const validate = validateChartsFormItem(value, true);
                    if (!validate.valid) {
                      throw new Error(validate.message);
                    }
                    return validate.valid;
                  }
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>

        <Col md={3}>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                position: "relative",
                top: 32.5
              }}
              onClick={() => {
                const errors = Object.values(form.getFieldsError()).reduce(
                  (res, item) => {
                    return res + (item ? item.length : 0);
                  },
                  0
                );
                !errors && form.isFieldsTouched() && handleSubmit();
              }}
            >
              Применить
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<InitialValuesFormProps>()(InitialValuesForm);
