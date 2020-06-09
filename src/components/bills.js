/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import Box from '@material-ui/core/Box';
import { fetchCongressBills } from '../actions/index';

class Bills extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { show: false };
  }

  componentDidMount() {
    this.props.fetchCongressBills();
  }

  showDiv = (billId) => {
    console.log(billId);
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
    console.log(document.getElementById(billId));
    // document.getElementById(billId).display = 'block';
    // console.log(document.getElementById(billId).textContent);
  }

  billsList = () => {
    // if (document.getElementById('outlined-search') === '') {
    // this.filteredTopics = this.props.topics.map((topic) => {
    return this.props.bills.map((billsOuter) => {
      return billsOuter.bills.map((bill, key) => {
        return (
          <div>
            {/* {this.state.show && <Typography className="congressPostItem"> {bill.summary_short}</Typography>} */}
            {/* <Box id={bill.bill_id} display="none"> {bill.summary_short}</Box> */}
            {/* { showResults ? <Results /> : null } */}

            <li key={bill.bill_id} className="congressPostItem" onClick={() => { this.showDiv(bill.bill_id); }}>
              <Typography id="congressPostTitle" variant="h4" component="h2">
                {bill.short_title}
                {/* {bill.summary} */}
              </Typography>
              <Typography>
                {`Sponsored by: ${bill.sponsor_party}`}
              </Typography>
            </li>
            {this.state.show && <Typography className="congressPostSummary"> Bill Summary: { bill.summary ? bill.summary : 'not available' }</Typography>}

          </div>
        );
      });
    });
  }

  render() {
    console.log(this.props);
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
              <ul id="congress-posts">
                {/* {this.filteredTopics} */}
                {this.billsList()}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    bills: reduxState.bills.all.results,
  };
}

export default connect(mapStateToProps, { fetchCongressBills })(Bills);
