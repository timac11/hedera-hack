import React from "react";
import {Button, Divider, Form, Input, InputNumber, Typography} from "antd";
import {ApiProvider} from "../../../providers/api-provider";
import * as hash from 'hash-sdk'

const {Title} = Typography;

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 8},
  size: "large"
};

export class FormCreation extends React.Component {
  constructor(props) {
    super(props);
  }

  onFinish = async values => {
    console.log(values);
    await ApiProvider.postRequest("create-form", values);
    await hash.setProvider('composer');
    let data = {
      time: "1",
      memo: "Google form timestamping",
      contentid: 'test1',
      redirect: '{"nonPayingAccount": "/nomicropaymentreceived.html"}',
      recipientlist: '[{"tinybars": "50000000", "to":"0.0.43013"}]',
      type: 'article'
    };

    window.hash.triggerCryptoTransfer(data, (err, res) => {
      console.log("Callback::Error:", err)
      console.log("Callback::Response:", res)
    });

    // if (result.status === 201) {
    //   // TODO add notification
    // } else {
    //   // TODO add notification
    // }
  };

  render() {
    return (
      <>
        <Title className="gr-ux-user-page__form-creation-title" level={2}>Form Creation</Title>
        <Divider/>
        <Form name="registration"
              className="gr-ux-registration-page__form"
              initialValues={{remember: true}}
              onFinish={this.onFinish}
              {...layout}
        >
          <Form.Item label="Name"
                     name="name"
                     rules={[
                       {
                         required: true,
                         message: 'Please input form name!',
                       },
                     ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item label="Users Count"
                     name="usersCount"
                     rules={[
                       {
                         required: true,
                         message: 'Please input users count!',
                       },
                     ]}
          >
            <InputNumber style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item label="Link to google form"
                     name="link"
                     rules={[
                       {
                         required: true,
                         message: 'Please input link!',
                       },
                     ]}
          >
            <Input/>
          </Form.Item>
          <Divider/>
          <Form.Item style={{display: "flex", width: "100%", justifyContent: "center"}}>
            <Button size="large"
                    type="primary"
                    htmlType="submit">
              Pay for creation and submit
            </Button>
          </Form.Item>
        </Form>
        {/*<Button onClick={async () => {*/}
        {/*  */}
        {/*}}>*/}
        {/*  Pay*/}
        {/*</Button>*/}
      </>
    )
  }
}
