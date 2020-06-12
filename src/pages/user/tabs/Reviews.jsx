import React from "react";
import {Button, List, Typography} from "antd";
import {fetchUsers} from "../../../store/actions/user";
import {connect} from "react-redux";

const {Title} = Typography;

class Reviews extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    const forms = this.props.myReviews;

    return (
      <>
        <Title className="gr-ux-user-page__form-creation-title" level={2}>My Reviews</Title>
        <div style={{overflow: "scroll"}}>
          <List
            dataSource={forms}
            renderItem={form => (
              <List.Item className="ux-my-forms__list-item-wrapper">
                <div className="ux-my-forms__list-item">
                  <Typography.Title level={4}>{form.name}</Typography.Title>
                  <div className="ux-my-forms__list-item-info">
                    <Typography.Text>Author: {form.owner.email}</Typography.Text>
                    <Typography.Text>Creation Date: {new Date(form.creationDate).toLocaleString().replace(",", "")}</Typography.Text>
                    <Typography.Text><a href="https://docs.google.com/spreadsheets/d/130iefP-CJEqKjORXtyb2G65H69GOyj50WYRsipAZc6c/edit#gid=1680356273">Link to table</a></Typography.Text>
                    <Typography.Text><a href="https://explorer.kabuto.sh/testnet/id/0.0.69138">Hedera Hashgraph</a></Typography.Text>
                  </div>
                  <div>
                  </div>
                  <div className="ux-my-forms__list-item-buttons">
                    <Button type="primary">Confirm review</Button>
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
  const {myReviews} = state.reviews;
  const {users} = state.user;
  return {myReviews, users};
}

export default connect(mapStateToProps)(Reviews);
