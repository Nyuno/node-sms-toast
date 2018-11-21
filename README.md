# node-sms-toast

[![npm version](https://img.shields.io/npm/v/sms-toast.svg?style=flat-square)](https://www.npmjs.org/package/sms-toast)
[![Build Status](https://travis-ci.org/Nyuno/node-sms-toast.svg?branch=master)](https://travis-ci.org/Nyuno/node-sms-toast)
[![Coverage Status](https://coveralls.io/repos/github/Nyuno/node-sms-toast/badge.svg?branch=master)](https://coveralls.io/github/Nyuno/node-sms-toast?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/sms-toast.svg?style=flat-square)](http://npm-stat.com/charts.html?package=sms-toast)
[![install size](https://packagephobia.now.sh/badge?p=sms-toast)](https://packagephobia.now.sh/result?p=sms-toast)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

[토스트(Toast)](https://www.toast.com/)를 이용한 문자 메세지 전송 Client


## 기능

- 문자 메세지(SMS, LMS, 인증용 SMS) 전송, 취소

## 설치

npm 사용:

```bash
$ npm install sms-toast
```

yarn 사용:

```bash
$ yarn add sms-toast
```


## 사용 예시

### 셋팅
```js
// 셋팅
const ToastSMS = require('sms-toast');

const client = new ToastSMS({
  appKey: `${YOUR_TOAST_APP_KEY}`,
  secretKey: `${YOUR_TOAST_SECRET_KEY}`,
  sendNo: `${YOUR_TOAST_SMS_SEND_NUMBER}`,
});
```

### SMS 전송
```js
// SMS 치환 전송
// client.sendSMS()
const templateId = 'testTemplateId';
const recipientList = [{
  recipientNo: '01012345678',
  templateParameter: {
    userName: '현호',
  },
}, {
  recipientNo: '01056781234',
  templateParameter: {
    userName: '카플랫',
  },
}];

client.sendSMS(templateId, recipientList);
```

```js
// SMS 전문 전송
// client.sendRawSMS()
const body = '카플랫 이용은 어떠셨나요?';
const recipientList = [{
  recipientNo: '01012345678',
}, {
  recipientNo: '01056781234',
}];

client.sendRawSMS(body, recipientList);
```

### LMS 전송
```js
// LMS 치환 전송
// client.sendLMS()
const templateId = 'testTemplateId';
const recipientList = [{
  recipientNo: '01012345678',
  templateParameter: {
    userName: '현호',
  },
}, {
  recipientNo: '01056781234',
  templateParameter: {
    userName: '카플랫',
  },
}];

client.sendLMS(templateId, recipientList);
```

```js
// LMS 전문 전송
// client.sendRawLMS()
const title = '[CARPLAT] LMS 전송';
const body = `
카플랫 이용은 어떠셨나요?
이렇게 긴 LMS도 전송할 수 있습니다.
템플릿으로 등록한 뒤,
client.sendLMS() 를 이용하시면
더 편리합니다. :)
`;
const recipientList = [{
  recipientNo: '01012345678',
}, {
  recipientNo: '01056781234',
}];

client.sendRawLMS(title, body, recipientList);
```

### 인증용 SMS 전송
```js
// 인증용 SMS 치환 전송
// client.sendAuthSMS()
const templateId = 'testTemplateId';
const recipientList = [{
  recipientNo: '01012345678',
  templateParameter: {
    code: '1234',
  },
}, {
  recipientNo: '01056781234',
  templateParameter: {
    code: '5678',
  },
}];

client.sendAuthSMS(templateId, recipientList);
```

```js
// 인증용 SMS 전문 전송
// client.sendRawAuthSMS()
const body = '인증번호[1234]를 입력해주세요.';
const recipientList = [{
  recipientNo: '01012345678',
}, {
  recipientNo: '01056781234',
}];

client.sendRawAuthSMS(body, recipientList);
```

### 문자 예약 전송 / 취소
```js
// 문자 예약 전송 / 취소
async someFunction(templateId, recipientList, requestDate) {
  try {
    // requestDate 시점에 SMS 예약 전송
    const { requestId } = await client.sendSMS(templateId, recipientList, { requestDate });

    // requestId 에 해당하는 메세지 취소
    const reservationList = [{
      requestId,
      recipientSeq: 1,
    }];
    const updateUser = 'Service administrator';

    await client.cancelToRequest(reservationList, updateUser);
    
    return 'success';
  } catch (err) {
    return err;
  }
}

```
