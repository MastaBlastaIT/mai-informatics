import React, { useEffect } from "react";
import { Form, Row, Col, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { RegExpRequestData } from "models/regexp";

const gutter = 16;
const md = 4;

interface RegExpFormProps extends FormComponentProps {
  initialForm: RegExpRequestData;
  onInit: (form: WrappedFormUtils) => void;
  handleSubmit: () => void;
}

const RegExpForm: React.FC<RegExpFormProps> = props => {
  const { initialForm, onInit, handleSubmit, form } = props;

  const { getFieldDecorator } = form;

  useEffect(() => {
    onInit(form);
    form.setFieldsValue(initialForm);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      onSubmit={() => {
        const errors = Object.values(form.getFieldsError()).reduce(
          (res, item) => {
            return res + (item ? item.length : 0);
          },
          0
        );
        !errors && form.isFieldsTouched() && handleSubmit();
      }}
    >
      <Row gutter={gutter}>
        <Col md={md}>
          <Form.Item label="Регулярное выражение">
            {getFieldDecorator("regex_str", {
              initialValue: initialForm.regex_str,
              rules: [
                {
                  required: true,
                  validator: async (rule, value) => {
                    if (!(value instanceof RegExp)) {
                      throw new Error("Не RegExp");
                    }
                    return true;
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
            >
              Применить
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<RegExpFormProps>()(RegExpForm);
