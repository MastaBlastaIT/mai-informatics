import React, { useState } from "react";
import { Form, Row, Col, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { isNil } from "lodash";

const gutter = 16;
const md = 4;

type FormTypes = "variable" | "exponent";

declare const InitialFormValidateStatuses: [
  "success",
  "warning",
  "error",
  "validating",
  ""
];

declare const ValidationMessages: {
  not_a_number: "Не число";
  not_an_integer: "Не целое";
};

interface ValidateFieldParams {
  status: typeof InitialFormValidateStatuses[number];
  message: string;
}

interface ValidateFields {
  variable?: ValidateFieldParams;
  exponent?: ValidateFieldParams;
}

export function toNum(strNum: string): number {
  return isNil(strNum) || strNum === "" ? NaN : +strNum;
}

const InitialValuesForm: React.FC<FormComponentProps> = props => {
  const { getFieldDecorator } = props.form;

  const [validationStatus, setValidationStatus] = useState<ValidateFields>({});

  const rules = [
    {
      required: true,
      message: "Не должно быть пустым"
    }
  ];

  const validate = (value: string, type?: FormTypes): ValidateFieldParams => {
    const numValue = toNum(value);
    if (isNaN(numValue) || !value.replace(/\s/g, ""))
      return {
        status: "error",
        message: ValidationMessages.not_a_number
      };
    if (type === "exponent" && !Number.isInteger(numValue)) {
      return {
        status: "error",
        message: ValidationMessages.not_an_integer
      };
    }
    return {
      status: "success",
      message: ""
    };
  };

  const onInputHandler = (e: any) => {
    const inputType: FormTypes = e.currentTarget.id;

    if (inputType === "variable") {
      setValidationStatus({
        variable: validate(e.currentTarget.value)
      });
    } else {
      setValidationStatus({
        exponent: validate(e.currentTarget.value, "exponent")
      });
    }
  };

  return (
    <Form>
      <Row gutter={gutter}>
        <Col md={md}>
          <Form.Item
            label="Переменная X (вещественное)"
            validateStatus={validationStatus.variable?.status}
            help={validationStatus.variable?.message}
            hasFeedback
          >
            {getFieldDecorator("variable", {
              rules
            })(<Input autoFocus onInput={onInputHandler} />)}
          </Form.Item>
        </Col>

        <Col md={md}>
          <Form.Item
            label="Показатель степени N (целое)"
            validateStatus={validationStatus.exponent?.status}
            help={validationStatus.exponent?.message}
            hasFeedback
          >
            {getFieldDecorator("exponent", {
              rules
            })(<Input onInput={onInputHandler} />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(InitialValuesForm);
