/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fetchCongressBills } from '../actions/index';

class Bills extends Component {
  componentDidMount() {
    this.props.fetchCongressBills();
  }

  billsList = () => {
    // if (document.getElementById('outlined-search') === '') {
    // this.filteredTopics = this.props.topics.map((topic) => {
    if (!this.props.bills) {
      return (
        <div>
          Loading
        </div>
      );
    } else if (!this.props.bills) {
      return (
        <div>
          Loading
        </div>
      );
    } else {
      return this.props.bills.map((billsOuter) => {
        return billsOuter.bills.map((bill, key) => {
          return (
            <li key={bill.bill_id} className="postItem">
              <Typography id="postTitle" variant="h4" component="h2">
                {bill.short_title}
              </Typography>
              <Typography>
                {`Sponsored by: ${bill.sponsor_party}`}
              </Typography>
            </li>
          );
        });
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div id="topics-parent">
        <div id="projName">
          Varify
        </div>
        <div id="inner-page">
          <div id="postsBG">
            <div id="postsBGHead">
              <div id="recent-topics">
                Recent Bills
              </div>
              <NavLink id="see-all-btn" className="nav" to="/topics">View All</NavLink>
              <TextField id="outlined-search" label="Search Topics" type="search" variant="outlined" />
            </div>
            <ul id="posts">
              {/* {this.filteredTopics} */}
              {this.billsList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    bills: reduxState.bills.all.results,
  };
}

export default connect(mapStateToProps, { fetchCongressBills })(Bills);
