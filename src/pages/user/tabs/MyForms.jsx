import React, {useDebugValue} from "react";
import {Button, List, Modal, Select, Typography} from "antd";
import "./MyForms.less";
import {connect} from "react-redux";
import {fetchUsers} from "../../../store/actions/user";
import {ApiProvider} from "../../../providers/api-provider";
import {fetchMyForms} from "../../../store/actions/myForms";

const {Title} = Typography;
const {Option} = Select;

class MyForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      confirmLoading: false,
      chosenUser: null,
      chosenFormId: undefined
    };
    this.handleReview = this.handleReview.bind(this);
    this.handleCloseReview = this.handleCloseReview.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  async handleReview() {
    await ApiProvider.postRequest("add-reviewer-by-id", {
      userId: this.state.chosenUser,
      formId: this.state.chosenFormId
    });
    this.setState({
      chosenUser: null,
      chosenFormId: undefined,
      modalVisible: false
    });
    this.props.dispatch(fetchMyForms());
  }

  handleCloseReview() {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const forms = this.props.myForms;
    const users = this.props.users;

    return (
      <>
        <Modal
          title="Title"
          visible={this.state.modalVisible}
          onOk={this.handleReview}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCloseReview}
        >
          <p>Chose user for review</p>
          <Select style={{width: 200}}
                  onChange={(val) => this.setState({chosenUser: val})}>
            {users.map(user => <Option value={user.id}>{user.email}</Option>)}
          </Select>
        </Modal>
        <Title className="gr-ux-user-page__form-creation-title" level={2}>My Forms</Title>
        <div style={{overflow: "scroll"}}>
          <List
            dataSource={forms}
            renderItem={form => (
              <List.Item className="ux-my-forms__list-item-wrapper">
                <div className="ux-my-forms__list-item">
                  <Typography.Title level={4}>{form.name}</Typography.Title>
                  <div className="ux-my-forms__list-item-info">
                    <Typography.Text>Author: {form.owner.email}</Typography.Text>
                    <Typography.Text>Reviewer: {form.reviewer ? form.reviewer.email : "-"}</Typography.Text>
                    <Typography.Text>Creation
                      Date: {new Date(form.creationDate).toLocaleString().replace(",", "")}</Typography.Text>
                    <Typography.Text><a>Link to form</a></Typography.Text>
                    <Typography.Text><a href="https://explorer.kabuto.sh/testnet/id/0.0.69138">Hedera Hashgraph</a></Typography.Text>
                  </div>
                  <div>
                  </div>
                  <div className="ux-my-forms__list-item-buttons">
                    {
                      form.reviewer ?
                        <div>Review in process</div> :
                        <>
                          <Button type="dashed"
                                  style={{marginRight: "16px"}}
                                  onClick={() => this.setState({modalVisible: true, chosenFormId: form.id})}
                          >
                            Send to review
                          </Button>
                          <Button type="primary">Share</Button>
                        </>
                    }
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  const {myForms} = state.myForms;
  const {users} = state.user;
  return {myForms, users};
}

export default connect(mapStateToProps)(MyForms);
