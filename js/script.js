window.onload = () => {
  document.querySelectorAll('button').forEach((btn) => {
    // 버튼 클릭하면 메시지 전달 함수 호출
    btn.addEventListener('click', function (e) {
      buttonDisabled(e.target.id.split('_')[1]);
      sendMsgToChild({ type: 'button', text: e.target.id });
    });
  });
};

function buttonDisabled(targetNum) {
  document.querySelectorAll('button').forEach((btn) => {
    if (targetNum == btn.id.split('_')[1]) {
      btn.classList.add('is-active');
      btn.style.cursor = 'default';
    } else {
      btn.classList.remove('is-active');
      btn.style.cursor = 'pointer';
    }
  });
}

// 자식에게 메시지 전달
function sendMsgToChild(msg) {
  document.getElementById('viewer').contentWindow.postMessage(msg, '*');
}

// 메시지 수신 받는 eventListener 등록
window.addEventListener('message', receiveMsgFromChild);

// 자식으로부터 메시지 수신
function receiveMsgFromChild(e) {
  if (e.data && e.data.text) {
    if (e.data.text.indexOf('BOX') > -1) {
      buttonDisabled(e.data.text.replace('BOX', ''));
    } else if (e.data.text == 'enabled') {
      buttonAllDisabled(false);
    } else if (e.data.text == 'disabled') {
      buttonAllDisabled(true);
    }
  }
}

function buttonAllDisabled(disabled) {
  document.querySelectorAll('button').forEach((btn) => {
    if (disabled) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  });
}
