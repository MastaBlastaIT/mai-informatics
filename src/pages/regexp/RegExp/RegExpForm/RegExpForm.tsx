import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { RegExpRequestData } from "models/regexp";
import styles from "styles/RegExp.module.sass";
import AutosizeInput from "react-input-autosize";

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form>
      <Row gutter={gutter}>
        <Col md={md}>
          <div className={styles.regexpBlock}>
            <span className={styles.regexpSpan}>/</span>
            <Form.Item label="Регулярное выражение">
              {getFieldDecorator("regex_str", {
                rules: [
                  {
                    required: true,
                    validator: async (rule, value) => {
                      /*if (!(value instanceof RegExp)) {
                        throw new Error("Не RegExp");
                      }*/
                      return true;
                    }
                  }
                ],
                getValueFromEvent: e => {
                  return e.target.value;
                }
              })(<AutosizeInput className={styles.regexpInput} autoFocus />)}
            </Form.Item>
            <span className={styles.regexpSpan}>/</span>
          </div>
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

export default Form.create<RegExpFormProps>()(RegExpForm);
