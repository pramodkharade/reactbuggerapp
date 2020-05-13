import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        this.setState({
          error: error
        });
        console.log('Interceptor is::', error.message);
      });
    }
    errorConfrimedHandler = () => {
      this.setState({
        error: null
      });
    };
    render() {
      if (this.state.error) {
        console.log('Error is::', this.state.error.message)
      }
      return (
        <Auxiliary>
                  <Modal show={this.state.error} modalClosed={this.errorConfrimedHandler}>
                      
                      {this.state.error ? this.state.error.message : null}
                  </Modal>
              <WrappedComponent {...this.props} />
              </Auxiliary>);
    }
  }

};

export default withErrorHandler;