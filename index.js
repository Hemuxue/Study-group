const fs = require('fs');
const fileConfig = require('./config');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const print = console.log;
const log = {
  info   : (msg) => {
    print(chalk.bgBlue.black('INFO'), chalk.blue(msg));
  },
  warn   : (msg) => {
    print(chalk.bgYellow.black('WARN'), chalk.yellow(msg));
  },
  error  : (msg) => {
    print(chalk.bgRed.black('ERROR'), chalk.red(msg));
  },
  success: (msg) => {
    print(chalk.bgGreen.black('SUCCESS'), chalk.green(msg));
  }
};

class AutoRW {
  constructor (fileConfig, data = []) {
    this.fileConfig = fileConfig;
    this.data = data;
  }
  readFile(file) {
    const promise = new Promise((resolve, reject) => {
      fs.readFile(file, (err, res) => {
        if(err) {
          reject(err)
        }else {
          resolve(res);
        }
      })
    })
    return promise;
  }
  writeFile(file, result) {
    const promise = new Promise((resolve, reject) => {
      fs.writeFile(file, result,(err, res) => {
        if(err) {
          reject(err)
        }else {
          resolve(res);
        }
      })
    })
    return promise;
  }

  autoExec() {
    this.readFile(this.fileConfig.month).then((res)=> {
      const str = res.toString();
      const targetArr = str.split('###');
      let last = targetArr[targetArr.length - 1];
      const reg = /(\[.\])/g;
      let count = 0;
      last = last.replace(reg, function () {
        let str = '';
        if(count < data.length && data[count] !== 0) {
          str = '[X]'      
        } else {
          str = '[ ]'
        }
        count ++;
        return str
      });
      targetArr[targetArr.length - 1] = last;
      const result = targetArr.join('###');
      return result;
    }).then((result) => {
      return this.writeFile(this.fileConfig.month, result);
    }).then(() => {
      const isAll = this.data.findIndex(ele => ele === 0) === -1 && this.data.length === +this.fileConfig.targetNum;
      if(isAll) {
        return this.readFile(this.fileConfig.review)
      }else {
        throw new Error('结束')
      }
    }).then((target) => {
      let resTar = target.toString();
      resTar += `\n- [X] ${this.getTime()}`;
      return this.writeFile(this.fileConfig.review, resTar)
    }, (err) => {
      console.log('今日任务未全部完成');
      this.pushCreateTarget();

      return false;
    }).then((res) => {
      if(res !== false) {
        this.unifyOrigin();
        this.pushOrigin();
      }
    })
  }

  unifyOrigin() {
    log.info('push origin master...');
    execSync('git checkout master');
    execSync('git pull hmx master');
    log.success('Origin master unify!');
  }

  pushOrigin() {
    execSync(`git checkout master`);
    execSync('git add .');
    execSync(`git commit -m "feat:${this.getTime()} done"`);
    execSync(`git push hmx master`);
    log.success('Please, Keep learning and keep progressing');
    log.success('Bye!');
  }

  getTime() {
    return `${new Date().getMonth() + 1}.${new Date().getDate()}`;
  }

  pushCreateTarget() {
    execSync(`git checkout master`);
    execSync('git add .');
    execSync(`git commit -m "feat:${this.getTime()} init"`);
    execSync(`git push hmx master`);
    log.success('Please, Keep learning and keep progressing');
    log.success('Bye!');
  }

}
let isInit = true;
// isInit = false;
const data =  isInit ?  [1,1,1,1,1] : [0,0,0,0,0];
const autoRw = new AutoRW(fileConfig, data);
autoRw.autoExec();
// if(isInit) {
  
// } else {
// }
