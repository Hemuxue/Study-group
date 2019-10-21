const fs = require('fs');
const fileConfig = require('./config');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const print = console.log;
const participant = require('./participant');
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
  constructor (fileConfig, participant = []) {
    this.fileConfig = fileConfig;
    this.participant = participant;
    this.title = `# 本周完成情况（${this.fileConfig.date}）\n`;
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

    this.writeCurrent();
    this.writeHistoryReview();

    setTimeout(() => {
      this.pushOrigin();
    }, 2000);
  }

  writeCurrent() {
    let currentStr = '';
    this.participant.forEach(ele => {
      const str = `- ${ele.value === 1 ? '[X]' : '[ ]'} ${ele.name} \n`;
      currentStr += str;
    })
    this.writeFile(this.fileConfig.current, this.title + currentStr).then((res) => {
      console.log('current 写入成功');
    })
  }

  writeHistoryReview() {
    this.participant.forEach(ele => {
      if(ele.value === 1) {
        const fileName = `./history/${ele.name}/review.md`;
        this.readFile(fileName).then(res => {
          const result = res + `\n- [X] ${this.fileConfig.date}`
          this.writeFile(fileName, result).then(() => console.log('review 写入完成'))
        })
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
    execSync(`git commit -m "feat(module: condition) ${this.fileConfig.date}"`);
    execSync(`git push origin master`);
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

const autoRw = new AutoRW(fileConfig, participant);
autoRw.autoExec();
