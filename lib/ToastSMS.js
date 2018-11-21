const axios = require('axios');
const debug = require('debug')('sms-toast');

/**
 * Class representing a client for Toast SMS.
 */
class ToastSMS {
  /**
   * Create a new instance of ToastSMS.
   *
   * @param {Object} [options={}] - The options of ToastSMS.
   * @param {string} [options.appKey] - The appKey of Toast SMS.
   * @param {string} [options.secretKey] - The secretKey of Toast SMS.
   * @param {string} [options.sendNo] - The sendNo of Toast SMS.
   */
  constructor(options = {}) {
    debug('create an instance');
    this.options = Object.assign({
      appKey: '',
      secretKey: '',
      sendNo: '',
      host: 'https://api-sms.cloud.toast.com',
      timeout: 1000 * 20,
    }, options);

    // Create and setup axios client
    this.client = axios.create({
      baseURL: this.options.host,
      responseType: 'json',
      timeout: this.options.timeout,
    });

    // Setup axios client headers
    this.client.defaults.headers.common['X-Secret-Key'] = this.options.secretKey;
    this.client.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
  }

  /**
   * Send a SMS with template parameters
   *  - https://docs.toast.com/ko/Notification/SMS/ko/api-guide/#_42
   *
   *  TODO: define the rest of the params
   *
   * @param {string} templateId - The template code in Toast.
   * @param {Object[]} recipientList - The messsage list .
   * @param {string} recipientList[].recipientNo - The phone number to send a message.
   * @param {Object} [recipientList[].templateParameter] - The template parameters.
   * @param {Object} [options={}] - The options for request.
   * @param {string} [options.requestDate] - The request date with format(yyyy-MM-dd HH:mm).
   * @param {string} [options.sendNo] - The send number.
   * @returns {Promise} Promise object represents the request to toast.
   */
  async sendSMS(templateId, recipientList, options = {}) {
    const url = `/sms/v2.1/appKeys/${this.options.appKey}/sender/sms`;
    const sendNo = this.options.sendNo || options.sendNo;
    const data = {
      sendNo,
      templateId,
      recipientList,
      body: '',
      ...options,
    };
    let response;

    if (!Array.isArray(recipientList)) {
      throw new TypeError('recipientList is not array');
    }

    try {
      debug(`send a message to ${recipientList.length} destination(s)`);
      response = await this.client.post(url, data);

      if (response.data.header.isSuccessful) {
        return response.data.body.data;
      }
    } catch (err) {
      debug('occured error on sending message');
      debug(err);
      throw new Error('Fail to request to toast');
    }

    throw new Error(`${response.data.header.resultCode} : ${response.data.header.resultMessage}`);
  }

  /**
   * Send a SMS with raw-messages
   *  - https://docs.toast.com/ko/Notification/SMS/ko/api-guide/#sms_1
   *
   *  TODO: define the rest of the params
   *
   * @param {string} body - The message to send.
   * @param {Object[]} recipientList - The recipient list .
   * @param {string} recipientList[].recipientNo - The phone number to send a message.
   * @param {Object} [options={}] - The options for request.
   * @param {string} [options.requestDate] - The request date with format(yyyy-MM-dd HH:mm).
   * @returns {Promise} Promise object represents the request to toast.
   */
  async sendRawSMS(body, recipientList, options = {}) {
    const url = `/sms/v2.1/appKeys/${this.options.appKey}/sender/sms`;
    const sendNo = this.options.sendNo || options.sendNo;
    const data = {
      sendNo,
      body,
      recipientList,
      ...options,
    };
    let response;

    if (!Array.isArray(recipientList)) {
      throw new TypeError('recipientList is not array');
    }

    try {
      debug(`send a message to ${recipientList.length} destination(s)`);
      response = await this.client.post(url, data);

      if (response.data.header.isSuccessful) {
        return response.data.body.data;
      }
    } catch (err) {
      debug('occured error on sending message');
      debug(err);
      throw new Error('Fail to request to toast');
    }

    throw new Error(`${response.data.header.resultCode} : ${response.data.header.resultMessage}`);
  }

  /**
   * Send a LMS with template parameters
   *  - https://docs.toast.com/ko/Notification/SMS/ko/api-guide/#_42
   *
   *  TODO: define the rest of the params
   *
   * @param {string} templateId - The template code in Toast.
   * @param {Object[]} recipientList - The messsage list .
   * @param {string} recipientList[].recipientNo - The phone number to send a message.
   * @param {Object} [recipientList[].templateParameter] - The template parameters.
   * @param {Object} [options={}] - The options for request.
   * @param {string} [options.requestDate] - The request date with format(yyyy-MM-dd HH:mm).
   * @param {string} [options.sendNo] - The send number.
   * @returns {Promise} Promise object represents the request to toast.
   */
  async sendLMS(templateId, recipientList, options = {}) {
    const url = `/sms/v2.1/appKeys/${this.options.appKey}/sender/mms`;
    const sendNo = this.options.sendNo || options.sendNo;
    const data = {
      sendNo,
      templateId,
      recipientList,
      ...options,
    };
    let response;

    if (!Array.isArray(recipientList)) {
      throw new TypeError('recipientList is not array');
    }

    try {
      debug(`send a message to ${recipientList.length} destination(s)`);
      response = await this.client.post(url, data);

      if (response.data.header.isSuccessful) {
        return response.data.body.data;
      }
    } catch (err) {
      debug('occured error on sending message');
      debug(err);
      throw new Error('Fail to request to toast');
    }

    throw new Error(`${response.data.header.resultCode} : ${response.data.header.resultMessage}`);
  }

  /**
   * Send a LMS with raw-messages
   *  - https://docs.toast.com/ko/Notification/SMS/ko/api-guide/#mms_1
   *
   *  TODO: define the rest of the params
   *
   * @param {string} title - The title to send.
   * @param {string} body - The message to send.
   * @param {Object[]} recipientList - The recipient list .
   * @param {string} recipientList[].recipientNo - The phone number to send a message.
   * @param {Object} [options={}] - The options for request.
   * @param {string} [options.requestDate] - The request date with format(yyyy-MM-dd HH:mm).
   * @returns {Promise} Promise object represents the request to toast.
   */
  async sendRawLMS(title, body, recipientList, options = {}) {
    const url = `/sms/v2.1/appKeys/${this.options.appKey}/sender/mms`;
    const sendNo = this.options.sendNo || options.sendNo;
    const data = {
      sendNo,
      title,
      body,
      recipientList,
      ...options,
    };
    let response;

    if (!Array.isArray(recipientList)) {
      throw new TypeError('recipientList is not array');
    }

    try {
      debug(`send a message to ${recipientList.length} destination(s)`);
      response = await this.client.post(url, data);

      if (response.data.header.isSuccessful) {
        return response.data.body.data;
      }
    } catch (err) {
      debug('occured error on sending message');
      debug(err);
      throw new Error('Fail to request to toast');
    }

    throw new Error(`${response.data.header.resultCode} : ${response.data.header.resultMessage}`);
  }

  /**
   * Send an auth SMS with template parameters
   *  - https://docs.toast.com/ko/Notification/SMS/ko/api-guide/#_42
   *
   *  TODO: define the rest of the params
   *
   * @param {string} templateId - The template code in Toast.
   * @param {Object[]} recipientList - The messsage list .
   * @param {string} recipientList[].recipientNo - The phone number to send a message.
   * @param {Object} [recipientList[].templateParameter] - The template parameters.
   * @param {Object} [options={}] - The options for request.
   * @param {string} [options.requestDate] - The request date with format(yyyy-MM-dd HH:mm).
   * @param {string} [options.sendNo] - The send number.
   * @returns {Promise} Promise object represents the request to toast.
   */
  async sendAuthSMS(templateId, recipientList, options = {}) {
    const url = `/sms/v2.1/appKeys/${this.options.appKey}/sender/auth/sms`;
    const sendNo = this.options.sendNo || options.sendNo;
    const data = {
      sendNo,
      templateId,
      recipientList,
      body: '',
      ...options,
    };
    let response;

    if (!Array.isArray(recipientList)) {
      throw new TypeError('recipientList is not array');
    }

    try {
      debug(`send a message to ${recipientList.length} destination(s)`);
      response = await this.client.post(url, data);

      if (response.data.header.isSuccessful) {
        return response.data.body.data;
      }
    } catch (err) {
      debug('occured error on sending message');
      debug(err);
      throw new Error('Fail to request to toast');
    }

    throw new Error(`${response.data.header.resultCode} : ${response.data.header.resultMessage}`);
  }

  /**
   * Send an auth SMS with raw-messages
   *  - https://docs.toast.com/ko/Notification/SMS/ko/api-guide/#sms_7
   *
   *  TODO: define the rest of the params
   *
   * @param {string} body - The message to send.
   * @param {Object[]} recipientList - The recipient list .
   * @param {string} recipientList[].recipientNo - The phone number to send a message.
   * @param {Object} [options={}] - The options for request.
   * @param {string} [options.requestDate] - The request date with format(yyyy-MM-dd HH:mm).
   * @returns {Promise} Promise object represents the request to toast.
   */
  async sendRawAuthSMS(body, recipientList, options = {}) {
    const url = `/sms/v2.1/appKeys/${this.options.appKey}/sender/auth/sms`;
    const sendNo = this.options.sendNo || options.sendNo;
    const data = {
      sendNo,
      body,
      recipientList,
      ...options,
    };
    let response;

    if (!Array.isArray(recipientList)) {
      throw new TypeError('recipientList is not array');
    }

    try {
      debug(`send a message to ${recipientList.length} destination(s)`);
      response = await this.client.post(url, data);

      if (response.data.header.isSuccessful) {
        return response.data.body.data;
      }
    } catch (err) {
      debug('occured error on sending message');
      debug(err);
      throw new Error('Fail to request to toast');
    }

    throw new Error(`${response.data.header.resultCode} : ${response.data.header.resultMessage}`);
  }

  /**
   * Cancel to request to transmit SMS or LMS or MMS
   *  - https://docs.toast.com/ko/Notification/SMS/ko/api-guide/#_80
   *
   *  TODO
   *   - I do not know how does it work,,
   *     What is the param.recipientSeq and the param.updateUser?
   *
   * @param {Object[]} reservationList - The reservation list .
   * @param {string} reservationList[].requestId - The request id.
   * @param {number} reservationList[].recipientSeq - The sequence of the recipient.
   * @param {string} updateUser - The user to update.
   * @returns {Promise} Promise object represents the request to toast
   */
  async cancelToRequest(reservationList, updateUser) {
    const url = `/sms/v2.1/appKeys/${this.options.appKey}/reservations/cancel`;
    const data = {
      reservationList,
      updateUser,
    };
    let response;

    if (!Array.isArray(reservationList)) {
      throw new TypeError('reservationList is not array');
    }

    try {
      debug(`cancel ${reservationList.length} reservations`);
      response = await this.client.put(url, data);

      if (response.data.header.isSuccessful) {
        return response.data.header.resultMessage;
      }
    } catch (err) {
      debug('occured error on canceling to request');
      debug(err);
      throw new Error('Fail to request to toast');
    }

    throw new Error(`${response.data.header.resultCode} : ${response.data.header.resultMessage}`);
  }
}

module.exports = ToastSMS;
