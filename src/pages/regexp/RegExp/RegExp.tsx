import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import PageLayout from "layouts/PageLayout";
import { WrappedFormUtils } from "antd/lib/form/Form";
import RegExpForm from "pages/regexp/RegExp/RegExpForm";
import Loading from "components/Loading";
import RegExpService from "services/RegExpService";
import RegExpFind from "pages/regexp/RegExp/RegExpFind";
import { RegExpFoundData, RegExpRequestData } from "models/regexp";

let initialForm: RegExpRequestData = {
  text_type: 1,
  regex_str: /IP/
};

const RegExp: React.FC<RouteComponentProps> = () => {
  const [form, setForm] = useState<WrappedFormUtils>();
  const [regExpFoundData, setRegExpFoundData] = useState<RegExpFoundData>({
    initial_text: "",
    regexp_found: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    RegExpService.regExpFind({
      text_type: initialForm.text_type,
      regex_str: initialForm.regex_str
    }).then(r => {
      if (unmounted) {
        return;
      }
      setRegExpFoundData(r);
      setLoading(false);
    });
    return () => {
      unmounted = true;
    };
  }, []);

  const handleSubmit = () => {
    form &&
      form.validateFields(errors => {
        if (errors) {
          return null;
        }
        setLoading(true);
        const formFields = form.getFieldsValue();
        RegExpService.regExpFind({
          text_type: formFields.text_type,
          regex_str: formFields.regex_str
        }).then(r => {
          setRegExpFoundData(r);
          setLoading(false);
        });
        return 1;
      });
  };

  return (
    <PageLayout title="Регулярные выражения">
      <RegExpForm
        initialForm={initialForm}
        onInit={setForm}
        handleSubmit={handleSubmit}
      />
      {(() => {
        if (loading) {
          return <Loading />;
        }
        return regExpFoundData && <RegExpFind regExpData={regExpFoundData} />;
      })()}
    </PageLayout>
  );
};

export default RegExp;
