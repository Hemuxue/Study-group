
const fs = require('fs');
const personConfig = {};
// 配置文件中值为 1 的表示，参加本周的学习任务，所以需要管理人员，管理一下配置文件中的信息
const conf = fs.readFileSync('./personnelConfig.conf');
const confArr = conf.toString().split('\n');
for(let i = 0; i < confArr.length; i++) {
  const tempArr = confArr[i].split('=');
  personConfig[tempArr[0].trim()] = tempArr[1].trim();
}

/*
[{
  name: 'hechangju',
  value: 0
}, {
  name: 'baiMax',
  value: 0
}, {
  name: 'shang',
  value: 0
}];
*/
const participant = [];

for(let prop in personConfig ) {
  if(personConfig[prop]) {
    participant.push({
      name: prop,
      value: 0
    })
  }
}


function allDone() {
  participant.map(ele => ele.value = 1);
}

function noneDone() {
  participant.map(ele => ele.value = 0);
}
/**
 * 完成情况数组，顺序同 participant 的人员顺序，0 为 未完成， 1 为完成, 
 * 如果 doneData 的 length 小于 participant 则后面的都为未完成。
 * */ 
const doneData = [1, 1, 1];
function doneByData(data) {
  noneDone();
  data.forEach( (ele, index) => {
    participant[index].value = ele;
  })
}

// doneByData(doneData);
allDone();


module.exports = participant;