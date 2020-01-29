import React from "react";
import { Col, Row } from "antd";
import { RegExpFoundData } from "models/regexp";

const gutter = 16;
const md = 12;

declare interface RegExpFindProps {
  regExpData: RegExpFoundData;
}

const RegExpFind: React.FC<RegExpFindProps> = props => {
  const { regExpData } = props;
  const resStr = regExpData.regexp_found.split("<span>").map((item, i) => {
    return i % 2 !== 0 ? (
      <span className="regexp-span" key={`span${i}`}>
        {item}
      </span>
    ) : (
      item
    );
  }, "");
  return (
    <>
      <Row gutter={gutter}>
        <Col md={md}>
          <div>{resStr}</div>
        </Col>
      </Row>
    </>
  );
};

export default RegExpFind;
