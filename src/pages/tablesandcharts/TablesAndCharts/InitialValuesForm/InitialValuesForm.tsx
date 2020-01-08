import React, { useEffect } from "react";
import { Form, Row, Col, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { NumberRoot } from "models/excel";
import { WrappedFormUtils } from "antd/lib/form/Form";

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
}

const InitialValuesForm: React.FC<InitialValuesFormProps> = props => {
  const { diagram, onInit, form } = props;

  const { getFieldDecorator } = form;

  useEffect(() => {
    onInit(form);
    form.setFieldsValue(diagram);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form>
      <Row gutter={gutter}>
        <Col md={md}>
          <Form.Item label="Переменная X (вещественное)">
            {getFieldDecorator("variable", {
              initialValue: diagram.variable
            })(<Input autoFocus />)}
          </Form.Item>
        </Col>

        <Col md={md}>
          <Form.Item label="Показатель степени N (целое)">
            {getFieldDecorator("exponent", {
              initialValue: diagram.exponent
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<InitialValuesFormProps>()(InitialValuesForm);
